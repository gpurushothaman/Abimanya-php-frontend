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
                <img
                src="<?= url('assets/logo/company-logo.PNG') ?>"
                alt="Abimanya Doors"
                class="abimanya-header-logo"
            >
            </a>

            <!-- Right: Header Icons -->
            <nav class="abimanya-header-nav">

                <?php
                $username = $email = $initial = "";
                if (!empty($_SESSION['user'])) {
                    $username = $_SESSION['user']['name'] ?? '';
                    $email = $_SESSION['user']['email'] ?? '';

                    // First letter of the email address
                    $initial = !empty($email)
                        ? strtoupper(substr(trim($email), 0, 1))
                        : '?';
                }
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


                <?php

                if (!empty($_SESSION['user'])) : ?>

                    <div class="user-profile">
                        <button
                            type="button"
                            class="profile-trigger"
                            id="profileTrigger"
                            aria-label="Open profile"
                            aria-expanded="false">
                            <?= htmlspecialchars($initial, ENT_QUOTES, 'UTF-8') ?>
                        </button>

                        <div class="profile-card" id="profileCard">

                            <div class="profile-card-header">
                                <div class="profile-avatar">
                                    <?= htmlspecialchars($initial, ENT_QUOTES, 'UTF-8') ?>
                                </div>

                                <div class="profile-username">
                                    <?= htmlspecialchars($username, ENT_QUOTES, 'UTF-8') ?>
                                </div>

                                <div class="profile-email">
                                    <?= htmlspecialchars($email, ENT_QUOTES, 'UTF-8') ?>
                                </div>
                            </div>

                            <a
                                href="<?= url('public/logout.php') ?>"
                                class="profile-signout">
                                <i class="bi bi-box-arrow-right"></i>
                                <span>Sign out</span>
                            </a>

                        </div>
                    </div>
                <?php else : ?>

                    <div class="user-profile">
                        <button
                            type="button"
                            class="profile-trigger"                         
                            aria-label="Open profile"
                            aria-expanded="false">
                            <?= htmlspecialchars("P", ENT_QUOTES, 'UTF-8') ?>
                        </button>
                    </div>

                <?php endif; ?>

            </nav>
        </div>
    </header>

    <script>
        (() => {
            const trigger = document.getElementById('profileTrigger');
            const card = document.getElementById('profileCard');

            if (!trigger || !card) return;

            trigger.addEventListener('click', (event) => {
                event.stopPropagation();

                const isOpen = card.classList.toggle('show');
                trigger.setAttribute('aria-expanded', String(isOpen));
            });

            document.addEventListener('click', (event) => {
                if (!event.target.closest('.user-profile')) {
                    card.classList.remove('show');
                    trigger.setAttribute('aria-expanded', 'false');
                }
            });
        })();
    </script>

    <main>