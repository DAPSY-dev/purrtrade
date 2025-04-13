<?php
require_once __DIR__ . "/../core/RedisHelper.php";

use PHPUnit\Framework\TestCase;
use App\RedisHelper\RedisHelper;

class MockRedisClient extends \Predis\Client
{
  public function get($key)
  {
  }
  public function set($key, $value)
  {
  }
  public function setex($key, $seconds, $value)
  {
  }
  public function del(array $keys)
  {
  }
  public function incr($key)
  {
  }
}

class RedisHelperTest extends TestCase
{
  private $mockClient;
  private RedisHelper $redisHelper;

  protected function setUp(): void
  {
    $this->mockClient = $this->getMockBuilder(MockRedisClient::class)
      ->onlyMethods(["get", "set", "setex", "del", "incr"])
      ->disableOriginalConstructor()
      ->getMock();

    $this->redisHelper = new RedisHelper("tcp", "localhost", 6379);

    $reflection = new \ReflectionClass($this->redisHelper);
    $property = $reflection->getProperty("client");
    $property->setAccessible(true);
    $property->setValue($this->redisHelper, $this->mockClient);
  }

  public function testGetReturnsValue(): void
  {
    $this->mockClient->method("get")->with("my_key")->willReturn("my_value");

    $this->assertSame("my_value", $this->redisHelper->get("my_key"));
  }

  public function testSetWithExpiration(): void
  {
    $this->mockClient->expects($this->once())
      ->method("setex")
      ->with("temp_key", 60, "temp_value");

    $this->assertTrue($this->redisHelper->set("temp_key", "temp_value", 60));
  }

  public function testSetWithoutExpiration(): void
  {
    $this->mockClient->expects($this->once())
      ->method("set")
      ->with("perm_key", "perm_value");

    $this->assertTrue($this->redisHelper->set("perm_key", "perm_value"));
  }

  public function testDeleteReturnsCount(): void
  {
    $this->mockClient->expects($this->once())
      ->method("del")
      ->with(["my_key"])
      ->willReturn(1);

    $this->assertSame(1, $this->redisHelper->delete("my_key"));
  }

  public function testIncrementReturnsNewValue(): void
  {
    $this->mockClient->expects($this->once())
      ->method("incr")
      ->with("counter")
      ->willReturn(5);

    $this->assertSame(5, $this->redisHelper->increment("counter"));
  }
}
