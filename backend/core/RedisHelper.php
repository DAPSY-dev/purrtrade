<?php
namespace App\RedisHelper;

require_once __DIR__ . "/../vendor/autoload.php";

use Predis\Client;

class RedisHelper
{
  private Client $client;

  public function __construct(string $scheme, string $host, int $port)
  {
    $this->client = new Client([
      "scheme" => $scheme,
      "host" => $host,
      "port" => $port,
    ]);
  }

  public function get(string $key): mixed
  {
    return $this->client->get($key);
  }

  public function set(string $key, mixed $value, int $expireSeconds = 0): bool
  {
    if ($expireSeconds > 0) {
      $this->client->setex($key, $expireSeconds, $value);
    } else {
      $this->client->set($key, $value);
    }

    return true;
  }

  public function delete(string $key): int
  {
    return $this->client->del([$key]);
  }

  public function increment(string $key): int
  {
    return $this->client->incr($key);
  }
}
