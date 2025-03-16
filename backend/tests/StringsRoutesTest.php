<?php
require_once __DIR__ . "/../api/routes/StringsRoutes.php";

use PHPUnit\Framework\TestCase;
use App\StringsRoutes\StringsRoutes;
use App\Database\Database;

class StringsRoutesTest extends TestCase
{
  private $dbMock;
  private $apiStringsPermissions;
  private $stringsRoutes;

  protected function setUp(): void
  {
    $this->dbMock = $this->createMock(Database::class);
    $this->apiStringsPermissions = ["read"];
    $this->stringsRoutes = new StringsRoutes($this->dbMock, $this->apiStringsPermissions);
  }

  public function testFetchStringsReturnsErrorWhenLangIsMissing()
  {
    $query = [];

    $response = $this->stringsRoutes->fetchStrings($query);

    $this->assertJsonStringEqualsJsonString(
      json_encode(["error" => "Query parameter 'lang' is required"]),
      $response
    );

    $this->assertEquals(400, http_response_code());
  }

  public function testFetchStringsReturnsPermissionDeniedWhenNoReadPermission()
  {
    $this->apiStringsPermissions = [];
    $this->stringsRoutes = new StringsRoutes($this->dbMock, $this->apiStringsPermissions);

    $query = ["lang" => "en"];

    $response = $this->stringsRoutes->fetchStrings($query);

    $this->assertJsonStringEqualsJsonString(
      json_encode(["error" => "Permission denied"]),
      $response
    );

    $this->assertEquals(403, http_response_code());
  }

  public function testFetchStringsReturnsErrorWhenNoTranslationsFound()
  {
    $query = ["lang" => "fr"];

    $this->dbMock
      ->expects($this->once())
      ->method('fetch')
      ->willReturn(false);

    $response = $this->stringsRoutes->fetchStrings($query);

    $this->assertJsonStringEqualsJsonString(
      json_encode(["error" => "No translations found for 'fr'"]),
      $response
    );

    $this->assertEquals(404, http_response_code());
  }

  public function testFetchStringsReturnsTranslationsWhenFound()
  {
    $query = ["lang" => "en"];

    $mockedTranslations = json_encode(["hello" => "Hello", "bye" => "Goodbye"]);
    $this->dbMock
      ->expects($this->once())
      ->method('fetch')
      ->willReturn(["translations" => $mockedTranslations]);

    $response = $this->stringsRoutes->fetchStrings($query);

    $this->assertEquals($mockedTranslations, $response);
  }
}
