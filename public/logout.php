<?php
require_once __DIR__ . '/../app/config/env.php';
require_once __DIR__ . '/../app/helpers/url.php';
require_once __DIR__ . '/../app/config/session.php';

$_SESSION = [];

if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', [
        'expires' => time() - 3600,
        'path' => $params['path'] ?: '/',
        'domain' => $params['domain'] ?? '',
        'secure' => (bool)($params['secure'] ?? false),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

if (session_status() === PHP_SESSION_ACTIVE) {
session_destroy();
}
header('Location: ' . url('home'));
exit;
