<?php
namespace App\Database;

use \PDO;
use \PDOException;

class Database
{
  private $pdo;
  private $stmt;

  public function __construct(string $host, int $port, string $dbname, string $charset, string $user, string $pass)
  {
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=$charset";
    $options = [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES => false,
    ];
    try {
      $this->pdo = new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
      echo "Database connection failed: " . $e->getMessage();
      exit();
    }
  }

  public function query(string $sql, array $params = []): bool
  {
    $this->stmt = $this->pdo->prepare($sql);
    return $this->stmt->execute($params);
  }

  public function fetch(string $sql, array $params = []): mixed
  {
    $this->stmt = $this->pdo->prepare($sql);
    $this->stmt->execute($params);
    return $this->stmt->fetch();
  }

  public function fetchAll(string $sql, array $params = []): mixed
  {
    $this->stmt = $this->pdo->prepare($sql);
    $this->stmt->execute($params);
    return $this->stmt->fetchAll();
  }

  public function insert(string $table, array $data): string
  {
    $columns = implode(", ", array_keys($data));
    $placeholders = ":" . implode(", :", array_keys($data));
    $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";
    $this->query($sql, $data);
    return $this->pdo->lastInsertId();
  }

  public function update(string $table, array $data, array $where): bool
  {
    $set = implode(", ", array_map(fn($key) => "$key = :$key", array_keys($data)));
    $whereClause = implode(" AND ", array_map(fn($key) => "$key = :w_$key", array_keys($where)));

    $params = array_merge($data, array_combine(
      array_map(fn($key) => "w_$key", array_keys($where)),
      array_values($where)
    ));

    $sql = "UPDATE $table SET $set WHERE $whereClause";
    return $this->query($sql, $params);
  }

  public function delete(string $table, array $where): bool
  {
    $whereClause = implode(" AND ", array_map(fn($key) => "$key = :$key", array_keys($where)));
    $sql = "DELETE FROM $table WHERE $whereClause";
    return $this->query($sql, $where);
  }

  public function close(): void
  {
    $this->pdo = null;
  }
}
