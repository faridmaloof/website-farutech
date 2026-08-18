<?php

declare(strict_types=1);

namespace App\Validation;

/**
 * Validador minimalista basado en reglas por string, similar en espíritu
 * a Laravel pero sin dependencia externa (hosting compartido).
 * Reglas soportadas: required, email, max:N, min:N
 */
final class Validator
{
    /** @return array<string,string> mapa campo => mensaje de error (vacío si es válido) */
    public static function validate(array $data, array $rules): array
    {
        $errors = [];

        foreach ($rules as $field => $ruleString) {
            $value = trim((string) ($data[$field] ?? ''));
            $ruleList = explode('|', $ruleString);

            foreach ($ruleList as $rule) {
                if ($rule === 'required' && $value === '') {
                    $errors[$field] = 'Este campo es obligatorio.';
                    break;
                }

                if ($value === '') {
                    continue; // campos opcionales vacíos no se validan más
                }

                if ($rule === 'email' && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
                    $errors[$field] = 'El correo electrónico no es válido.';
                    break;
                }

                if (str_starts_with($rule, 'max:')) {
                    $max = (int) substr($rule, 4);
                    if (mb_strlen($value) > $max) {
                        $errors[$field] = "Máximo {$max} caracteres.";
                        break;
                    }
                }

                if (str_starts_with($rule, 'min:')) {
                    $min = (int) substr($rule, 4);
                    if (mb_strlen($value) < $min) {
                        $errors[$field] = "Mínimo {$min} caracteres.";
                        break;
                    }
                }
            }
        }

        return $errors;
    }
}
