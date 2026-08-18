<?php

declare(strict_types=1);

namespace App\Repositories;

interface SubscriberRepositoryInterface
{
    public function findByEmail(string $email): ?array;
    public function save(string $email, string $token): int;
    public function confirm(string $token): bool;
}
