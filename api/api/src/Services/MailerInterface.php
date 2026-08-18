<?php

declare(strict_types=1);

namespace App\Services;

/**
 * Abstracción de envío de correo (Dependency Inversion): ContactService y
 * NewsletterService dependen de esta interfaz, nunca de PHP mail() directo.
 * Permite cambiar a PHPMailer/SMTP transaccional sin tocar la lógica de negocio.
 */
interface MailerInterface
{
    public function send(string $to, string $subject, string $body): bool;
}
