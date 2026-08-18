<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\SubscriberRepositoryInterface;
use App\Validation\Validator;

final class NewsletterService
{
    private const RULES = ['email' => 'required|email|max:180'];

    public function __construct(
        private readonly SubscriberRepositoryInterface $repository,
        private readonly MailerInterface $mailer,
        private readonly string $appUrl
    ) {}

    /** @return array{success:bool,message:string,errors:array} */
    public function subscribe(array $input): array
    {
        if (!empty($input['website'])) {
            return ['success' => true, 'message' => 'Suscripción recibida.', 'errors' => []];
        }

        $errors = Validator::validate($input, self::RULES);
        if ($errors !== []) {
            return ['success' => false, 'message' => 'Correo no válido.', 'errors' => $errors];
        }

        $email = trim($input['email']);
        $existing = $this->repository->findByEmail($email);

        if ($existing && $existing['status'] === 'confirmed') {
            return ['success' => true, 'message' => 'Ya estás suscrito. ¡Gracias!', 'errors' => []];
        }

        $token = bin2hex(random_bytes(16));

        if (!$existing) {
            $this->repository->save($email, $token);
        }

        $confirmUrl = rtrim($this->appUrl, '/') . '/api/newsletter.php?confirm=' . $token;
        $body = sprintf(
            '<p>Confirma tu suscripción al newsletter de FaruTech:</p><p><a href="%s">Confirmar suscripción</a></p>',
            htmlspecialchars($confirmUrl)
        );

        $this->mailer->send($email, 'Confirma tu suscripción — FaruTech', $body);

        return ['success' => true, 'message' => 'Revisa tu correo para confirmar la suscripción.', 'errors' => []];
    }

    public function confirm(string $token): bool
    {
        return $this->repository->confirm($token);
    }
}
