<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

use App\Http\Request;
use App\Http\Response;
use App\Repositories\PdoSubscriberRepository;
use App\Services\MailAdapter;
use App\Services\NewsletterService;

applyCors();

try {
    $pdo = getDb();
    $repository = new PdoSubscriberRepository($pdo);
    $mailer = new MailAdapter(env('MAIL_FROM', 'no-reply@farutech.com'));
    $service = new NewsletterService($repository, $mailer, env('APP_URL', 'https://farutech.com'));

    // Confirmación de suscripción vía link de correo (GET ?confirm=token)
    $token = Request::query('confirm');
    if ($token !== null) {
        $confirmed = $service->confirm($token);
        Response::json([
            'success' => $confirmed,
            'message' => $confirmed ? 'Suscripción confirmada. ¡Gracias!' : 'Token inválido o ya utilizado.',
        ], $confirmed ? 200 : 400);
    }

    if (Request::method() !== 'POST') {
        Response::error('Método no permitido.', [], 405);
    }

    $result = $service->subscribe(Request::jsonBody());

    if ($result['success']) {
        Response::success($result['message']);
    }

    Response::error($result['message'], $result['errors']);
} catch (\Throwable $e) {
    error_log('[FaruTech API] newsletter.php error: ' . $e->getMessage());
    Response::error('Ocurrió un error inesperado. Intenta más tarde.', [], 500);
}
