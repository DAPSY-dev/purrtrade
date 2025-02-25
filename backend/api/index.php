<?php
require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../config/Config.php";
require_once __DIR__ . "/../core/Router.php";
require_once __DIR__ . "/../core/Database.php";
require_once __DIR__ . "/controllers/StringsController.php";

use \Dotenv\Dotenv;
use App\Router\Router;
use App\Database\Database;
use App\StringsController\StringsController;
use const App\Config\ENDPOINTS;

header("Access-Control-Allow-Origin: " . ENDPOINTS["FRONTEND_URL"]);
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, API-KEY");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(204);
  exit();
}

$dotenv = Dotenv::createImmutable(__DIR__ . "/../");
$dotenv->load();

$router = new Router(ENDPOINTS["API_BASE_URL"]);

$db = new Database(
  $_ENV["DB_HOST"],
  $_ENV["DB_PORT"],
  $_ENV["DB_NAME"],
  $_ENV["DB_CHARSET"],
  $_ENV["DB_USERNAME"],
  $_ENV["DB_PASSWORD"]
);

$router->addRoute("GET", "/strings", function ($query) use ($db) {
  $lang = $query["lang"] ?? null;

  if (empty($lang)) {
    http_response_code(400);
    echo json_encode(["error" => "Query parameter 'lang' is required"]);
    exit();
  }

  $stringsController = new StringsController($db);
  $translations = $stringsController->getStrings($lang);

  if (!$translations) {
    http_response_code(404);
    echo json_encode(["error" => "No translations found for '$lang'"]);
    exit();
  }

  echo $translations;
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
// });

$router->dispatch();

$db->close();
