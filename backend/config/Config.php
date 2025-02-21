<?php
namespace App\Config;

require_once __DIR__ . "/../vendor/autoload.php";

use \Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . "/../");
$dotenv->load();

define("App\Config\ENDPOINTS", [
  "API_BASE_URL" => $_ENV["API_BASE_URL"],
  "FRONTEND_URL" => $_ENV["FRONTEND_URL"],
]);
