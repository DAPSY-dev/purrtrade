<?php
namespace App\Router;

require_once "Strings.php";

use App\Strings;

class Router
{
  private $apiBaseUrl;
  private $routes = [];

  public function __construct($apiBaseUrl)
  {
    $this->apiBaseUrl = $apiBaseUrl;
  }

  public function addRoute($method, $route, $callback)
  {
    $this->routes[] = [
      "method" => $method,
      "route" => $route,
      "callback" => $callback
    ];
  }

  public function dispatch()
  {
    $requestUri = $_SERVER["REQUEST_URI"];
    $method = $_SERVER["REQUEST_METHOD"];

    foreach ($this->routes as $route) {
      if ($route["method"] === $method && $requestUri === $this->apiBaseUrl . $route["route"]) {
        call_user_func($route["callback"]);
        return;
      }
    }

    http_response_code(404);
    echo json_encode(["error" => Strings\TEXTS["ENDPOINT_NOT_FOUND"]]);
  }
}
