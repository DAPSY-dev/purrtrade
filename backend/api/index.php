<?php
// require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../config/Config.php";
// require_once __DIR__ . "/../core/Strings.php";
require_once __DIR__ . "/../core/Router.php";
require_once __DIR__ . "/controllers/StringsController.php";

// use \Dotenv\Dotenv;
use App\Router\Router;
use App\StringsController\StringsController;
use const App\Config\ENDPOINTS;
// use const App\Strings\TEXTS;

header("Access-Control-Allow-Origin: " . ENDPOINTS["FRONTEND_URL"]);
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(204);
  exit();
}

// $dotenv = Dotenv::createImmutable(__DIR__ . "/../");
// $dotenv->load();

$router = new Router(ENDPOINTS["API_BASE_URL"]);

$router->addRoute("GET", "/strings", function () {
  $stringsController = new StringsController();
  $stringsController->getStrings();
});

// $router->addRoute("GET", "/env-test", function () {
//   echo json_encode(["DB_HOST" => $_ENV["DB_HOST"]]);
// });

// $router->addRoute("GET", "/data", function () {
//   echo json_encode(["message" => "Hello from PHP API!"]);
// });

// $router->addRoute("POST", "/data", function () {
//   $input = json_decode(file_get_contents("php://input"), true);
//   if (json_last_error() !== JSON_ERROR_NONE) {
//     http_response_code(400);
//     echo json_encode(["error" => TEXTS["INVALID_JSON"]]);
//     exit();
//   }
//   echo json_encode(["received" => $input]);
// });

$router->dispatch();
