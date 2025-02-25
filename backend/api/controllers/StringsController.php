<?php
namespace App\StringsController;

require_once __DIR__ . "/../../core/Database.php";

class StringsController
{
  private $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  public function getStrings($lang)
  {
    $texts = $this->db->fetch("SELECT * FROM strings WHERE lang = ?", [$lang]);

    if (!$texts) {
      return null;
    }

    return $texts["translations"];
  }
}
