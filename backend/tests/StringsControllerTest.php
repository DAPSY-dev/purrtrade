<?php
require_once __DIR__ . "/../api/controllers/StringsController.php";

use PHPUnit\Framework\TestCase;
use App\StringsController\StringsController;
use const App\Strings\TEXTS;

class StringsControllerTest extends TestCase
{
  public function testGetStrings()
  {
    $controller = new StringsController();

    ob_start();
    $controller->getStrings();
    $output = ob_get_clean();

    $expectedOutput = json_encode(TEXTS);

    $this->assertEquals($expectedOutput, $output);
  }
}
