<?php

declare(strict_types=1);

namespace App\Repositories;

interface ContactRepositoryInterface
{
    /** @return int ID del registro insertado */
    public function save(array $data): int;
}
