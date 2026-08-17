<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
header('Content-Type: application/json; charset=utf-8'); header('X-Content-Type-Options: nosniff');
apiRequirePost(); $input = apiInput(); $email = apiText($input, 'email', 254); $consent = (bool)($input['consent'] ?? false);
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !$consent) apiRespond(422, ['ok' => false, 'message' => 'Confirma tu email y autorización.']);
try { $statement = apiPdo()->prepare("INSERT INTO newsletter_subscribers (email, consented_at, status, source_ip, created_at, updated_at) VALUES (:email, UTC_TIMESTAMP(), 'subscribed', :ip, UTC_TIMESTAMP(), UTC_TIMESTAMP()) ON DUPLICATE KEY UPDATE status = 'subscribed', consented_at = UTC_TIMESTAMP(), updated_at = UTC_TIMESTAMP()"); $statement->execute([':email' => $email, ':ip' => substr((string)($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45)]); apiRespond(201, ['ok' => true, 'message' => 'Te registramos para recibir notas de FaruTech.']); } catch (Throwable $error) { error_log('FaruTech newsletter: ' . $error->getMessage()); apiRespond(500, ['ok' => false, 'message' => 'No pudimos completar el registro.']); }
