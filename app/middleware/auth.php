<?php
declare(strict_types=1);

function requireAuth(): void
{
    if (empty($_SESSION['user']['id'])) {
        header('Location: ' . url('login'));
        exit;
    }
}
