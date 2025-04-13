<?php
namespace App\RateLimiter;

use App\RedisHelper\RedisHelper;

class RateLimiter
{
  private RedisHelper $redisHelper;
  private int $limit;
  private int $expireSeconds;

  public function __construct(RedisHelper $redisHelper, int $limit, int $expireSeconds)
  {
    $this->redisHelper = $redisHelper;
    $this->limit = $limit;
    $this->expireSeconds = $expireSeconds;
  }

  public function rateLimit(string $key): bool
  {
    $currentRequests = $this->redisHelper->get($key);

    if (!$currentRequests) {
      $this->redisHelper->set($key, 1, $this->expireSeconds);
      return true;
    }

    if ((int) $currentRequests >= $this->limit) {
      return false;
    }

    $this->redisHelper->increment($key);
    return true;
  }
}
