<?php
namespace App\ApiKeyManager;

require_once __DIR__ . "/Database.php";

use App\Database\Database;

class ApiKeyManager
{
  private Database $db;
  private string $hashedApiKey;

  public function __construct(Database $db, string $apiKey)
  {
    $this->db = $db;
    $this->hashedApiKey = hash("sha256", $apiKey);
  }

  public function getData(): mixed
  {
    $apiKeyData = $this->db->fetch("SELECT * FROM api_keys WHERE api_key = ?", [$this->hashedApiKey]);

    if (!$apiKeyData) {
      return null;
    }

    return $apiKeyData;
  }
}
