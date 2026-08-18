<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\ContactRepositoryInterface;
use App\Validation\Validator;

final class ContactService
{
    private const RULES = [
        'name' => 'required|max:120',
        'email' => 'required|email|max:180',
        'message' => 'required|min:10|max:2000',
    ];

    public function __construct(
        private readonly ContactRepositoryInterface $repository,
        private readonly MailerInterface $mailer,
        private readonly string $notifyTo
    ) {}

    /** @return array{success:bool,message:string,errors:array} */
    public function handle(array $input, string $ip): array
    {
        // Honeypot: si el bot llenó este campo oculto, respondemos "éxito"
        // sin guardar ni notificar (no delatamos la trampa).
        if (!empty($input['website'])) {
            return ['success' => true, 'message' => 'Mensaje enviado.', 'errors' => []];
        }

        if ($this->isRateLimited($ip)) {
            return ['success' => false, 'message' => 'Demasiadas solicitudes, intenta más tarde.', 'errors' => []];
        }

        $errors = Validator::validate($input, self::RULES);
        if ($errors !== []) {
            return ['success' => false, 'message' => 'Revisa los campos del formulario.', 'errors' => $errors];
        }

        $data = [
            'name' => trim($input['name']),
            'email' => trim($input['email']),
            'message' => trim($input['message']),
            'serviceInterest' => trim($input['serviceInterest'] ?? '') ?: null,
            'ip' => $ip,
        ];

        $this->repository->save($data);

        $body = sprintf(
            '<p><strong>Nombre:</strong> %s</p><p><strong>Email:</strong> %s</p><p><strong>Servicio de interés:</strong> %s</p><p><strong>Mensaje:</strong><br>%s</p>',
            htmlspecialchars($data['name']),
            htmlspecialchars($data['email']),
            htmlspecialchars($data['serviceInterest'] ?? 'No especificado'),
            nl2br(htmlspecialchars($data['message']))
        );

        $this->mailer->send($this->notifyTo, 'Nuevo contacto desde FaruTech.com', $body);

        return ['success' => true, 'message' => 'Gracias, te contactaremos pronto.', 'errors' => []];
    }

    /** Rate limit simple basado en archivo temporal (sin dependencia de Redis/APCu). */
    private function isRateLimited(string $ip): bool
    {
        $key = 'farutech_contact_' . md5($ip) . '_' . date('Y-m-d-H');
        $file = sys_get_temp_dir() . '/' . $key;
        $count = is_file($file) ? (int) file_get_contents($file) : 0;

        if ($count >= 5) {
            return true;
        }

        file_put_contents($file, (string) ($count + 1));
        return false;
    }
}
