<?php

declare(strict_types=1);

namespace App\Repositories;

use PDO;

final class PdoSubscriberRepository implements SubscriberRepositoryInterface
{
    public function __construct(private readonly PDO $pdo) {}

    public function findByEmail(string $email): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM subscribers WHERE email = :email LIMIT 1');
        $stmt->execute([':email' => $email]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function save(string $email, string $token): int
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO subscribers (email, status, token, created_at) VALUES (:email, 'pending', :token, NOW())"
        );
        $stmt->execute([':email' => $email, ':token' => $token]);
        return (int) $this->pdo->lastInsertId();
    }

    public function confirm(string $token): bool
    {
        $stmt = $this->pdo->prepare(
            "UPDATE subscribers SET status = 'confirmed', confirmed_at = NOW() WHERE token = :token AND status = 'pending'"
        );
        $stmt->execute([':token' => $token]);
        return $stmt->rowCount() > 0;
    }
}
