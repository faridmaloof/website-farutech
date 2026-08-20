<?php

return [
    'db' => [
        'host' => getenv('DB_HOST') ?: 'localhost',
        'name' => getenv('DB_NAME') ?: 'farutech_db',
        'user' => getenv('DB_USER') ?: 'root',
        'pass' => getenv('DB_PASS') ?: '',
        'charset' => 'utf8mb4',
    ],
    'jwt' => [
        'secret' => getenv('JWT_SECRET') ?: 'change-me',
        'issuer' => getenv('JWT_ISSUER') ?: 'farutech-api',
        'audience' => getenv('JWT_AUDIENCE') ?: 'farutech-frontend',
        'expires' => 3600, // 1 hour
    ],
    'cors' => [
        'allowed_origins' => ['http://localhost:5173', 'https://farutech.com', 'https://www.farutech.com'],
        'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With'],
    ],
];
