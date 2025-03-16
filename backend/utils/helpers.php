<?php
namespace App\Helpers;

function getApiKeyData($db, $apiKey)
{
  $apiKeyData = $db->fetch("SELECT * FROM api_keys WHERE api_key = ?", [hash("sha256", $apiKey)]);

  if (!$apiKeyData) {
    return [
      "success" => false,
      "error" => "Invalid API key",
      "data" => [],
    ];
  }

  return [
    "success" => true,
    "error" => null,
    "data" => $apiKeyData,
  ];
}
