<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

use App\Http\Request;
use App\Http\Response;
use App\Repositories\PdoContactRepository;
use App\Services\ContactService;
use App\Services\MailAdapter;

applyCors();

if (Request::method() !== 'POST') {
    Response::error('Método no permitido.', [], 405);
}

try {
    $pdo = getDb();
    $repository = new PdoContactRepository($pdo);
    $mailer = new MailAdapter(env('MAIL_FROM', 'no-reply@farutech.com'));
    $service = new ContactService($repository, $mailer, env('MAIL_TO', 'contacto@farutech.com'));

    $result = $service->handle(Request::jsonBody(), Request::clientIp());

    if ($result['success']) {
        Response::success($result['message']);
    }

    Response::error($result['message'], $result['errors']);
} catch (\Throwable $e) {
    error_log('[FaruTech API] contact.php error: ' . $e->getMessage());
    Response::error('Ocurrió un error inesperado. Intenta más tarde.', [], 500);
}
