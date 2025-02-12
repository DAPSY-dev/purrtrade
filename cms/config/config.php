<?php

require_once(__DIR__ . '/../lib/_autoload.php');

return [
  'cors' => [
    'Access-Control-Allow-Origin' => $_ENV['FRONTEND_URL'],
  ],
];
