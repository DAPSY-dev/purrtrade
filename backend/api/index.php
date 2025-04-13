<?php
require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../config/Config.php";
require_once __DIR__ . "/../core/Router.php";
require_once __DIR__ . "/../core/Database.php";
require_once __DIR__ . "/../core/RedisHelper.php";
require_once __DIR__ . "/../core/ApiKeyManager.php";
require_once __DIR__ . "/../core/RateLimiter.php";
require_once __DIR__ . "/routes/StringsRoutes.php";

use const App\Config\ENDPOINTS;
use \Dotenv\Dotenv;
use App\Router\Router;
use App\Database\Database;
use App\RedisHelper\RedisHelper;
use App\ApiKeyManager\ApiKeyManager;
use App\RateLimiter\RateLimiter;
use App\StringsRoutes\StringsRoutes;

header("Access-Control-Allow-Origin: " . ENDPOINTS["FRONTEND_URL"]);
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, API-KEY");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(204);
  exit();
}

if (!isset($_SERVER["HTTP_API_KEY"]) || empty($_SERVER["HTTP_API_KEY"])) {
  http_response_code(400);
  echo json_encode(["error" => "API-KEY is required"]);
  exit();
}

$dotenv = Dotenv::createImmutable(__DIR__ . "/../");
$dotenv->load();

$db = new Database(
  $_ENV["DB_HOST"],
  $_ENV["DB_PORT"],
  $_ENV["DB_NAME"],
  $_ENV["DB_CHARSET"],
  $_ENV["DB_USERNAME"],
  $_ENV["DB_PASSWORD"]
);

$redis = new RedisHelper(
  $_ENV["REDIS_SCHEME"],
  $_ENV["REDIS_HOST"],
  $_ENV["REDIS_PORT"]
);

$apiKeyManager = new ApiKeyManager($db, $_SERVER["HTTP_API_KEY"]);
$apiKeyData = $apiKeyManager->getData();
if (!$apiKeyData) {
  http_response_code(401);
  echo json_encode(["error" => "Invalid API key"]);
  exit();
}
$apiPermissions = json_decode($apiKeyData["permissions"], true);

$rateLimiter = new RateLimiter($redis, 1000, 60);
if (!$rateLimiter->rateLimit($apiKeyData["api_key"])) {
  http_response_code(429);
  header("Retry-After: 60");
  echo json_encode(["error" => "Rate limit exceeded, try again later"]);
  exit();
}

$router = new Router(ENDPOINTS["API_BASE_URL"]);

$router->addRoute("GET", "/strings", function ($query) use ($db, $apiPermissions) {
  $stringsRoutes = new StringsRoutes($db, $apiPermissions["strings"]);
  echo $stringsRoutes->fetchStrings($query);
});

// $router->addRoute("GET", "/data", function () {
//   echo json_encode(["message" => "Hello from PHP API!"]);
// });

// $router->addRoute("POST", "/data", function () {
//   $input = json_decode(file_get_contents("php://input"), true);
//   if (json_last_error() !== JSON_ERROR_NONE) {
//     http_response_code(400);
//     echo json_encode(["error" => "Invalid JSON"]);
//     exit();
//   }
//   echo json_encode(["received" => $input]);
// });

// $router->addRoute("GET", "/env-test", function () {
//   echo json_encode(["DB_HOST" => $_ENV["DB_HOST"]]);
// });

// $router->addRoute("GET", "/db-test", function () use ($db) {
//   // $userId = $db->insert("users", [
//   //   "name" => "John Doe",
//   //   "email" => "john@example.com"
//   // ]);
//   // $user = $db->fetch("SELECT * FROM users WHERE id = ?", [$userId]);
//   // $users = $db->fetchAll("SELECT * FROM users");
//   // $db->update("users", ["name" => "Jane Doe"], ["id" => $userId]);
//   // $db->delete("users", ["id" => $userId]);
//   $apiKeys = $db->fetchAll("SELECT * FROM api_keys");
//   echo json_encode(["API_KEYS" => $apiKeys]);
//   // echo "\n\n" . hash("sha256", "DATA");
// });

$router->dispatch();

$db->close();
