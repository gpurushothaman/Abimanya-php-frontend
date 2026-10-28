
<?php
require_once dirname(__DIR__, 2) . '/app/config/env.php';
$basePath = getenv('APP_BASE_PATH');

// if ($basePath === false) {
//     $basePath = '/abimanyaphp';
// }

define('BASE_PATH', rtrim($basePath, '/'));


function url(string $path = ''): string
{
    $base = rtrim(BASE_PATH, '/');
    
    return $base . '/' . ltrim($path, '/');
}


function assets(string $path): string
{
    return url('assets/' . ltrim($path, '/'));
}


function source(string $path = ''): string
{
    return url('source/' . ltrim($path, '/'));
}


function main(string $path = ''): string
{
    return url('main/' . ltrim($path, '/'));
}
