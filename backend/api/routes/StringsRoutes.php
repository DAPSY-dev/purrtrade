<?php
namespace App\StringsRoutes;

class StringsRoutes
{
  private $db;
  private $apiStringsPermissions;

  public function __construct($db, $apiStringsPermissions)
  {
    $this->db = $db;
    $this->apiStringsPermissions = $apiStringsPermissions;
  }

  public function fetchStrings($query)
  {
    if (!in_array("read", $this->apiStringsPermissions)) {
      http_response_code(403);
      return json_encode(["error" => "Permission denied"]);
    }

    $lang = $query["lang"] ?? null;

    if (empty($lang)) {
      http_response_code(400);
      return json_encode(["error" => "Query parameter 'lang' is required"]);
    }

    $strings = $this->db->fetch("SELECT * FROM strings WHERE lang = ?", [$lang]);

    if (!$strings) {
      http_response_code(404);
      return json_encode(["error" => "No translations found for '$lang'"]);
    }

    return $strings["translations"];
  }
}
