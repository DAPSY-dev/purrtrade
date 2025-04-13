<?php
namespace App\Router;

class Router
{
  private $apiBaseUrl;
  private $routes = [];

  public function __construct(string $apiBaseUrl)
  {
    $this->apiBaseUrl = $apiBaseUrl;
  }

  public function addRoute(string $method, string $route, callable $callback): void
  {
    $this->routes[] = [
      "method" => $method,
      "route" => $route,
      "callback" => $callback
    ];
  }

  public function dispatch(): void
  {
    $requestUri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
    $method = $_SERVER["REQUEST_METHOD"];

    foreach ($this->routes as $route) {
      if ($route["method"] === $method && $requestUri === $this->apiBaseUrl . $route["route"]) {
        call_user_func($route["callback"], $_GET);
        return;
      }
    }

    http_response_code(404);
    echo json_encode(["error" => "Endpoint not found"]);
  }
}
