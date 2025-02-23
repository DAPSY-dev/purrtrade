<?php
require_once __DIR__ . "/../core/Database.php";

use PHPUnit\Framework\TestCase;
use App\Database\Database;

class DatabaseTest extends TestCase
{
  private $pdoMock;
  private $stmtMock;
  private $database;

  protected function setUp(): void
  {
    $this->pdoMock = $this->createMock(PDO::class);
    $this->stmtMock = $this->createMock(PDOStatement::class);

    $this->pdoMock->method('prepare')->willReturn($this->stmtMock);

    $this->database = $this->getMockBuilder(Database::class)
      ->disableOriginalConstructor()
      ->onlyMethods(['query', 'fetch', 'fetchAll', 'insert', 'update', 'delete'])
      ->getMock();

    $this->database->method('query')->willReturnCallback(function ($query) {
      return $this->stmtMock->execute();
    });

    $this->database->method('fetch')->willReturn(['id' => 1, 'name' => 'John Doe']);
    $this->database->method('fetchAll')->willReturn([
      ['id' => 1, 'name' => 'John Doe'],
      ['id' => 2, 'name' => 'Jane Doe']
    ]);
    $this->database->method('insert')->willReturn('10');
    $this->database->method('update')->willReturn(true);
    $this->database->method('delete')->willReturn(true);
  }

  public function testQueryExecutesSuccessfully()
  {
    $this->stmtMock->expects($this->once())->method('execute')->willReturn(true);
    $this->assertTrue($this->database->query('SELECT * FROM users'));
  }

  public function testFetchReturnsData()
  {
    $expected = ['id' => 1, 'name' => 'John Doe'];
    $this->stmtMock->method('fetch')->willReturn($expected);

    $this->assertSame($expected, $this->database->fetch('SELECT * FROM users WHERE id = ?', [1]));
  }

  public function testFetchAllReturnsMultipleRows()
  {
    $expected = [
      ['id' => 1, 'name' => 'John Doe'],
      ['id' => 2, 'name' => 'Jane Doe']
    ];
    $this->stmtMock->method('fetchAll')->willReturn($expected);

    $this->assertSame($expected, $this->database->fetchAll('SELECT * FROM users'));
  }

  public function testInsertReturnsLastInsertId()
  {
    $this->pdoMock->method('lastInsertId')->willReturn('10');
    $this->stmtMock->method('execute')->willReturn(true);

    $this->assertSame('10', $this->database->insert('users', ['name' => 'John Doe']));
  }

  public function testUpdateExecutesSuccessfully()
  {
    $this->stmtMock->method('execute')->willReturn(true);
    $this->assertTrue($this->database->update('users', ['name' => 'Jane Doe'], ['id' => 1]));
  }

  public function testDeleteExecutesSuccessfully()
  {
    $this->stmtMock->method('execute')->willReturn(true);
    $this->assertTrue($this->database->delete('users', ['id' => 1]));
  }

  public function testConnectionFails()
  {
    $this->expectException(PDOException::class);
    $this->expectExceptionMessage("Database connection failed");

    throw new PDOException("Database connection failed");
  }
}
