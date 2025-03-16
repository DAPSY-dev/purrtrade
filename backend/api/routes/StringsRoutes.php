<?php
namespace App\StringsRoutes;

class StringsRoutes
{
  private $db;
  private $apiPermissions;

  public function __construct($db, $apiPermissions)
  {
    $this->db = $db;
    $this->apiPermissions = $apiPermissions;
  }

  public function fetchStrings($query)
  {
    if (!in_array("read", $this->apiPermissions)) {
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
