<?php
require_once __DIR__ . "/Config.php";
// require_once __DIR__ . "/Strings.php";
require_once __DIR__ . "/Router.php";
require_once __DIR__ . "/controllers/StringsController.php";

use App\Config;
// use App\Strings;
use App\Router\Router;
use App\StringsController\StringsController;

header("Access-Control-Allow-Origin: " . Config\ENDPOINTS["FRONTEND_URL"]);
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(204);
  exit();
}

$router = new Router(Config\ENDPOINTS["API_BASE_URL"]);

$router->addRoute("GET", "/strings", function () {
  $stringsController = new StringsController();
  $stringsController->getStrings();
});

// $router->addRoute("GET", "/data", function () {
//   echo json_encode(["message" => "Hello from PHP API!"]);
// });

// $router->addRoute("POST", "/data", function () {
//   $input = json_decode(file_get_contents("php://input"), true);
//   if (json_last_error() !== JSON_ERROR_NONE) {
//     http_response_code(400);
//     echo json_encode(["error" => Strings\TEXTS["INVALID_JSON"]]);
//     exit();
//   }
//   echo json_encode(["received" => $input]);
// });

$router->dispatch();
