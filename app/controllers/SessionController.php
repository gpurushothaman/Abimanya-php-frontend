<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/env.php';
require_once __DIR__ . '/../config/session.php';

/**
 * Establish a PHP session only after the Node API token is validated.
 *
 * Configure NODE_API_ME_URL to an endpoint that validates the bearer token
 * and returns the authenticated user's trusted profile, e.g.:
 * {"id":"123","name":"Example User","email":"user@example.com","role":"user"}
 *
 * This example uses PHP streams rather than cURL. It is a small PHP endpoint,
 * not a replacement backend. In production, use HTTPS and handle API failures.
 */
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$token = is_array($data) ? trim((string)($data['token'] ?? '')) : '';

if ($token === '') {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Token required']);
    exit;
}

$verifyUrl = rtrim(getenv('APP_API_URL'), '/') . '/auth/me';


  
$context = stream_context_create([
    'http' => [
        'method' => 'GET',
        'header' => "Authorization: Bearer " . $token . "\r\nAccept: application/json\r\n",
        'timeout' => 1000,
        'ignore_errors' => true,
    ],
]);

$response = @file_get_contents($verifyUrl, false, $context);

$statusLine = $http_response_header[0] ?? '';
if ($response === false || !preg_match('/\s200\s/', $statusLine)) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Token validation failed']);
    exit;
}

$verifiedUser = json_decode($response, true);


// Accept either {user:{...}} or a direct user object from the verification API.
if (isset($verifiedUser['user']) && is_array($verifiedUser['user'])) {
    $verifiedUser = $verifiedUser['user'];
}

if (!is_array($verifiedUser) || empty($verifiedUser['id']) && empty($verifiedUser['_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid user response']);
    exit;
}

$userId = (string)($verifiedUser['id'] ?? $verifiedUser['_id']);

session_regenerate_id(true);
$_SESSION['user'] = [
    'id' => $userId,
    'name' => (string)($verifiedUser['name'] ?? ''),
    'email' => (string)($verifiedUser['email'] ?? ''),
    'role' => (string)($verifiedUser['role'] ?? 'user'),
];
$_SESSION['api_token'] = $token;

echo json_encode(['success' => true]);
