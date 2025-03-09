<?php
require_once __DIR__ . "/config/Config.php";

use const App\Config\ENDPOINTS;

header("Access-Control-Allow-Origin: " . ENDPOINTS["FRONTEND_URL"]);
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

http_response_code(403);
echo json_encode(["error" => "403 Forbidden"]);
