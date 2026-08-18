<?php

declare(strict_types=1);

namespace App\Repositories;

use PDO;

final class PdoContactRepository implements ContactRepositoryInterface
{
    public function __construct(private readonly PDO $pdo) {}

    public function save(array $data): int
    {
        $stmt = $this->pdo->prepare(
            'INSERT INTO contacts (name, email, message, service_interest, ip_address, created_at)
             VALUES (:name, :email, :message, :service_interest, :ip_address, NOW())'
        );

        $stmt->execute([
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':message' => $data['message'],
            ':service_interest' => $data['serviceInterest'] ?? null,
            ':ip_address' => $data['ip'] ?? null,
        ]);

        return (int) $this->pdo->lastInsertId();
    }
}
