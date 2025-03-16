<?php
require_once __DIR__ . "/../utils/helpers.php";

use PHPUnit\Framework\TestCase;
use App\Helpers;
use App\Database\Database;

class GetApiKeyDataTest extends TestCase
{
  private $dbMock;

  protected function setUp(): void
  {
    $this->dbMock = $this->getMockBuilder(Database::class)
      ->disableOriginalConstructor()
      ->onlyMethods(["fetch"])
      ->getMock();
  }

  public function testGetApiKeyDataReturnsData()
  {
    $apiKeyData = [
      "id" => 1,
      "api_key" => hash("sha256", "sample-api-key"),
      "permissions" => json_encode(["strings" => ["read", "write"]]),
    ];

    $this->dbMock->method("fetch")
      ->willReturn($apiKeyData);

    $result = Helpers\getApiKeyData($this->dbMock, "sample-api-key");

    $this->assertTrue($result["success"]);
    $this->assertNull($result["error"]);
    $this->assertSame($apiKeyData, $result["data"]);
  }

  public function testGetApiKeyDataReturnsErrorWhenNotFound()
  {
    $this->dbMock->method("fetch")
      ->willReturn(null);

    $result = Helpers\getApiKeyData($this->dbMock, "non-existing-api-key");

    $this->assertFalse($result["success"]);
    $this->assertEquals("Invalid API key", $result["error"]);
    $this->assertEmpty($result["data"]);
  }
}
