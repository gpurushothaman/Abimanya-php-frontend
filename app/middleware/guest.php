<?php
declare(strict_types=1);

function requireGuest(): void
{
    if (!empty($_SESSION['user']['id'])) {   
        header('Location: ' . url('dhome'));
        exit;
    }

  
}
