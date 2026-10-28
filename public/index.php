<?php

declare(strict_types=1);

require_once __DIR__ . '/../app/config/env.php';
require_once __DIR__ . '/../app/helpers/url.php';
require_once __DIR__ . '/../app/config/session.php';
require_once __DIR__ . '/../app/middleware/auth.php';
require_once __DIR__ . '/../app/middleware/guest.php';

$routes = require __DIR__ . '/../app/routes/web.php';

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$path = rtrim($path, '/') ?: '/';

// If deployed under a subdirectory, set APP_BASE_PATH (e.g. /myapp).
$basePath = rtrim(getenv('APP_BASE_PATH') ?: '', '/');

if ($basePath !== '' && str_starts_with($path, $basePath)) {
    $path = substr($path, strlen($basePath)) ?: '/';
    $path = '/' . ltrim($path, '/');
    $path = rtrim($path, '/') ?: '/';
}

$route = $routes[$path] ?? null;

if (!$route) {
    http_response_code(404);
    echo '404 - Page Not Found';
    exit;
}

foreach ($route['middleware'] ?? [] as $middleware) {
    if ($middleware === 'auth') {
        requireAuth();
    } elseif ($middleware === 'guest') {
        requireGuest();
    }
}

// Route targets are fixed in web.php; prevent path traversal.
$allowedRoot = realpath(__DIR__);
$file = realpath(__DIR__ . '/' . $route['file']);

if (
    $file === false ||
    $allowedRoot === false ||
    !str_starts_with($file, $allowedRoot . DIRECTORY_SEPARATOR) ||
    !is_file($file)
) {
    http_response_code(404);
    echo '404 - Page Not Foundsdfg';
    exit;
}

require $file;
