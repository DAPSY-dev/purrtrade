<?php
require_once __DIR__ . "/../core/RateLimiter.php";
require_once __DIR__ . "/../core/RedisHelper.php";

use PHPUnit\Framework\TestCase;
use App\RateLimiter\RateLimiter;
use App\RedisHelper\RedisHelper;

class RateLimiterTest extends TestCase
{
  private $mockRedisHelper;
  private RateLimiter $rateLimiter;

  protected function setUp(): void
  {
    $this->mockRedisHelper = $this->getMockBuilder(RedisHelper::class)
      ->disableOriginalConstructor()
      ->onlyMethods(["get", "set", "increment"])
      ->getMock();

    $this->rateLimiter = new RateLimiter($this->mockRedisHelper, 5, 60);
  }

  public function testFirstRequestSucceeds(): void
  {
    $this->mockRedisHelper->method("get")
      ->with("user_key")
      ->willReturn(null);

    $this->mockRedisHelper->expects($this->once())
      ->method("set")
      ->with("user_key", 1, 60);

    $this->assertTrue($this->rateLimiter->rateLimit("user_key"));
  }

  public function testUnderLimitRequestSucceeds(): void
  {
    $this->mockRedisHelper->method("get")
      ->with("user_key")
      ->willReturn(3);

    $this->mockRedisHelper->expects($this->once())
      ->method("increment")
      ->with("user_key");

    $this->assertTrue($this->rateLimiter->rateLimit("user_key"));
  }

  public function testAtLimitRequestFails(): void
  {
    $this->mockRedisHelper->method("get")
      ->with("user_key")
      ->willReturn(5);

    $this->mockRedisHelper->expects($this->never())
      ->method("set");
    $this->mockRedisHelper->expects($this->never())
      ->method("increment");

    $this->assertFalse($this->rateLimiter->rateLimit("user_key"));
  }

  public function testRequestAfterLimitIsNotExceeded(): void
  {
    $this->mockRedisHelper->method("get")
      ->with("user_key")
      ->willReturn(4);

    $this->mockRedisHelper->expects($this->once())
      ->method("increment")
      ->with("user_key");

    $this->assertTrue($this->rateLimiter->rateLimit("user_key"));
  }
}
