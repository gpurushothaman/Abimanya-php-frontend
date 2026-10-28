<?php

declare(strict_types=1);

// Route paths are matched by public/index.php.
// Page files are resolved only from the public directory.
return [
    '/' => [
        'file' => 'pages/home/index.php',
        'middleware' => ['guest'],
    ],
    '/home' => [
        'file' => 'pages/home/index.php',
        'middleware' => ['guest'],
    ],
    '/dhome' => [
        'file' => 'pages/home/index.php',
        'middleware' => ['auth'],
    ],
    '/login' => [
        'file' => 'login.php',
        'middleware' => ['guest'],
    ],
    '/logout' => [
        'file' => 'logout.php',
        'middleware' => ['guest'],
    ],
    '/tools' => [
        'file' => 'pages/tools/index.php',
        'middleware' => ['auth'],
    ],
    '/register' => [
        'file' => 'pages/userregister/index.php',
        'middleware' => ['guest'],
    ],
];
