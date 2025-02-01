<?php
namespace App\StringsController;

require_once __DIR__ . "/../Strings.php";

use App\Strings;

class StringsController
{
  public function getStrings()
  {
    echo json_encode(Strings\TEXTS);
  }
}
