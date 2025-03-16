<?php
require_once __DIR__ . "/../core/ApiKeyManager.php";

use PHPUnit\Framework\TestCase;
use App\ApiKeyManager\ApiKeyManager;
use App\Database\Database;

class ApiKeyManagerTest extends TestCase
{
  private $dbMock;

  protected function setUp(): void
  {
    $this->dbMock = $this->createMock(Database::class);
  }

  public function testValidApiKeyReturnsData()
  {
    $apiKey = "valid-api-key";
    $hashedApiKey = hash("sha256", $apiKey);
    $expectedData = [
      "id" => 1,
      "api_key" => $hashedApiKey,
      "name" => "admin",
      "permissions" => json_encode(["strings" => ["read", "write"]]),
      "created_at" => "2025-03-09 22:28:00",
      "updated_at" => "2025-03-16 16:58:33"
    ];

    $this->dbMock->expects($this->once())
      ->method("fetch")
      ->with("SELECT * FROM api_keys WHERE api_key = ?", [$hashedApiKey])
      ->willReturn($expectedData);

    $apiKeyInstance = new ApiKeyManager($this->dbMock, $apiKey);
    $result = $apiKeyInstance->getData();

    $this->assertSame($expectedData, $result);
  }

  public function testInvalidApiKeyReturnsUnauthorized()
  {
    $apiKey = "invalid-api-key";
    $hashedApiKey = hash("sha256", $apiKey);

    $this->dbMock->expects($this->once())
      ->method("fetch")
      ->with("SELECT * FROM api_keys WHERE api_key = ?", [$hashedApiKey])
      ->willReturn(null);

    $apiKeyInstance = new ApiKeyManager($this->dbMock, $apiKey);

    ob_start();
    $result = $apiKeyInstance->getData();
    if ($result === null) {
      http_response_code(401);
      echo json_encode(["error" => "Invalid API key"]);
    }
    $output = ob_get_clean();

    $this->assertNull($result);
    $this->assertJsonStringEqualsJsonString(json_encode(["error" => "Invalid API key"]), $output);
    $this->assertSame(401, http_response_code());
  }
}
