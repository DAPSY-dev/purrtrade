<?php
namespace App\StringsController;

require_once __DIR__ . "/../../core/Strings.php";

use const App\Strings\TEXTS;

class StringsController
{
  public function getStrings()
  {
    echo json_encode(TEXTS);
  }
}
