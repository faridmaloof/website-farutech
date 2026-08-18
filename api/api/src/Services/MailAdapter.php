<?php

declare(strict_types=1);

namespace App\Services;

/**
 * Implementación base usando la función mail() nativa de PHP, suficiente
 * para hosting compartido tipo Hostinger (SMTP local del servidor).
 * Si más adelante se necesita mejor entregabilidad, reemplazar por un
 * adaptador de PHPMailer/SMTP externo que implemente la misma interfaz.
 */
final class MailAdapter implements MailerInterface
{
    public function __construct(private readonly string $from) {}

    public function send(string $to, string $subject, string $body): bool
    {
        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            "From: FaruTech <{$this->from}>",
            "Reply-To: {$this->from}",
        ];

        return mail($to, $subject, $body, implode("\r\n", $headers));
    }
}
