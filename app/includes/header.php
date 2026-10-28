<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Abimanya Doors</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

    <!-- International Phone Input CSS -->
    <link href="https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/css/intlTelInput.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="<?= assets('css/custom.css') ?>" rel="stylesheet">
</head>

<body>

    <!-- Abimanya Header -->
    <header class="abimanya-header">
        <div class="container-fluid d-flex align-items-center justify-content-between">

            <!-- Left: Company Logo -->
            <a href="<?= url('/') ?>" class="abimanya-logo-link">
                <!-- <img
                src="<?= url('assets/logo/company-logo.PNG') ?>"
                alt="Abimanya Doors"
                class="abimanya-header-logo"
            > -->
            </a>

            <!-- Right: Header Icons -->
            <nav class="abimanya-header-nav">

                <?php

                if (empty($_SESSION['user'])) : ?>

                    <a href="<?= url('/register') ?>" class="abimanya-header-link">
                        <i class="bi bi-person-plus"></i>
                        <span>Sign In</span>
                    </a>

                <?php endif; ?>


                <?php

                if (!empty($_SESSION['user'])) : ?>

                    <a href="<?= url('public/logout.php') ?>" class="abimanya-header-link">
                        <i class="bi bi-box-arrow-in-right"></i>
                        <span>Logout</span>
                    </a>

                <?php else : ?>

                    <a href="<?= url('login') ?>" class="abimanya-header-link">
                        <i class="bi bi-box-arrow-in-right"></i>
                        <span>Login</span>
                    </a>

                <?php endif; ?>
                <a href="<?= url('/profile') ?>" class="abimanya-header-link">
                    <i class="bi bi-person-circle"></i>
                    <span>Profile</span>
                </a>

            </nav>
        </div>
    </header>

    <main>