<?php
require_once __DIR__ . "/../api/Config.php";
require_once __DIR__ . "/../api/Router.php";

use PHPUnit\Framework\TestCase;
use App\Config;
use App\Router\Router;

class RouterTest extends TestCase
{
  private $router;

  protected function setUp(): void
  {
    $this->router = new Router(Config\ENDPOINTS["API_BASE_URL"]);
  }

  public function testAddRoute()
  {
    $this->router->addRoute("GET", "/test", function () {
      echo "Hello, World!";
    });

    $reflection = new \ReflectionClass($this->router);
    $routesProperty = $reflection->getProperty("routes");
    $routesProperty->setAccessible(true);
    $routes = $routesProperty->getValue($this->router);

    $this->assertCount(1, $routes);
    $this->assertEquals("GET", $routes[0]["method"]);
    $this->assertEquals("/test", $routes[0]["route"]);
  }

  public function testDispatchWithMatchingRoute()
  {
    $this->router->addRoute("GET", "/test", function () {
      echo "Hello, World!";
    });

    $_SERVER["REQUEST_URI"] = Config\ENDPOINTS["API_BASE_URL"] . "/test";
    $_SERVER["REQUEST_METHOD"] = "GET";

    ob_start();
    $this->router->dispatch();
    $output = ob_get_clean();

    $this->assertStringContainsString("Hello, World!", $output);
  }

  public function testDispatchWithNoMatchingRoute()
  {
    $this->router->addRoute("GET", "/test", function () {
      echo "Hello, World!";
    });

    $_SERVER["REQUEST_URI"] = Config\ENDPOINTS["API_BASE_URL"] . "/another";
    $_SERVER["REQUEST_METHOD"] = "GET";

    ob_start();
    $this->router->dispatch();
    $output = ob_get_clean();

    $this->assertEquals(404, http_response_code());
    $this->assertJsonStringEqualsJsonString(
      '{"error":"Endpoint not found"}',
      $output
    );
  }

  public function testDispatchWithNoMethodMatch()
  {
    $this->router->addRoute("GET", "/test", function () {
      echo "Hello, World!";
    });

    $_SERVER["REQUEST_URI"] = Config\ENDPOINTS["API_BASE_URL"] . "/test";
    $_SERVER["REQUEST_METHOD"] = "POST";

    ob_start();
    $this->router->dispatch();
    $output = ob_get_clean();

    $this->assertEquals(404, http_response_code());
    $this->assertJsonStringEqualsJsonString(
      '{"error":"Endpoint not found"}',
      $output
    );
  }

  public function testDispatchWithNoUriMatch()
  {
    $this->router->addRoute("GET", "/test", function () {
      echo "Hello, World!";
    });

    $_SERVER["REQUEST_URI"] = Config\ENDPOINTS["API_BASE_URL"] . "/another";
    $_SERVER["REQUEST_METHOD"] = "GET";

    ob_start();
    $this->router->dispatch();
    $output = ob_get_clean();

    $this->assertEquals(404, http_response_code());
    $this->assertJsonStringEqualsJsonString(
      '{"error":"Endpoint not found"}',
      $output
    );
  }
}
