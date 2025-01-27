<?php
require_once './Config.php';
require_once './Strings.php';
require_once './Router.php';

use App\Config\Config;
use App\Strings\Strings;
use App\Router\Router;

header("Access-Control-Allow-Origin: " . Config::FRONTEND_URL);
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit();
}

$router = new Router(Config::API_BASE_URL);

$router->addRoute('GET', '/strings', function () {
  $reflection = new ReflectionClass(Strings::class);
  $constants = $reflection->getConstants();
  echo json_encode($constants);
});

// $router->addRoute('GET', '/data', function () {
//   echo json_encode(['message' => 'Hello from PHP API!']);
// });

// $router->addRoute('POST', '/data', function () {
//   $input = json_decode(file_get_contents('php://input'), true);
//   if (json_last_error() !== JSON_ERROR_NONE) {
//     http_response_code(400);
//     echo json_encode(['error' => Strings::INVALID_JSON]);
//     exit();
//   }
//   echo json_encode(['received' => $input]);
// });

$router->dispatch();
