<?php
require_once __DIR__ . "/../api/controllers/StringsController.php";

use PHPUnit\Framework\TestCase;
use App\StringsController\StringsController;
use App\Database\Database;

class StringsControllerTest extends TestCase
{
  public function testGetStringsWithValidLang()
  {
    $dbMock = $this->createMock(Database::class);

    $expectedTranslations = ['translations' => 'Hello, World!'];

    $dbMock->expects($this->once())
      ->method('fetch')
      ->with("SELECT * FROM strings WHERE lang = ?", ['en'])
      ->willReturn($expectedTranslations);

    $controller = new StringsController($dbMock);

    $result = $controller->getStrings('en');

    $this->assertEquals('Hello, World!', $result);
  }

  public function testGetStringsWithNoTranslations()
  {
    $dbMock = $this->createMock(Database::class);

    $dbMock->expects($this->once())
      ->method('fetch')
      ->with("SELECT * FROM strings WHERE lang = ?", ['fr'])
      ->willReturn(false);

    $controller = new StringsController($dbMock);

    $result = $controller->getStrings('fr');

    $this->assertNull($result);
  }
}
