<?php
declare(strict_types=1);

$envFile = dirname(__DIR__, 2) . '/.env';

if (is_file($envFile) && is_readable($envFile)) {
    $variables = parse_ini_file($envFile, false, INI_SCANNER_RAW);

    if ($variables !== false) {
        foreach ($variables as $key => $value) {
            if (getenv($key) === false) {
                putenv("$key=$value");
                $_ENV[$key] = $value;
            }
        }
    }
}
