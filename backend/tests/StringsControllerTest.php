<?php
require_once __DIR__ . "/../api/controllers/StringsController.php";

use PHPUnit\Framework\TestCase;
use App\StringsController\StringsController;
use App\Database\Database;

class StringsControllerTest extends TestCase
{
  public function testGetStrings()
  {
    $dbMock = $this->createMock(Database::class);

    $expectedTranslations = ['translations' => 'Hello, World!'];

    $dbMock->expects($this->once())
      ->method('fetch')
      ->with("SELECT * FROM strings WHERE lang = ?", ['en'])
      ->willReturn($expectedTranslations);

    $controller = new StringsController($dbMock);

    ob_start();
    $controller->getStrings('en');
    $output = ob_get_clean();

    $this->assertEquals('Hello, World!', $output);
  }
}
