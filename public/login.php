<?php require_once __DIR__ . '/../app/includes/cssheader.php'; ?>

<!-- Login Page -->
<div class="login-page">

    <!-- Login Card -->
    <div class="login-card">

        <!-- Logo -->
        <a href="<?= url('/home') ?>">
            <div class="login-card-logo">
                <img src="<?= url('assets/logo/company-logo.PNG') ?>" alt="Abimanya Doors Logo">
            </div>
        </a>

        <!-- Heading -->
        <h2>Welcome Back</h2>

        <p class="login-subtitle">
            Login to continue customizing your doors.
        </p>
        <p id="error" role="alert"></p>
        <!-- Login Form -->
        <form id="loginForm">

            <!-- Email -->
            <div class="mb-4">

                <label for="email" class="form-label">
                    Email
                </label>

                <div class="login-input-group">

                    <i class="bi bi-envelope"></i>

                    <input type="email" id="email" name="email" class="form-control" placeholder="Enter your email" required>

                </div>

            </div>

            <!-- Password -->
            <div class="mb-3">

                <label for="password" class="form-label">
                    Password
                </label>

                <div class="login-input-group">

                    <i class="bi bi-lock"></i>

                    <input type="password" id="password" name="password" class="form-control" placeholder="Enter your password" required>

                    <button type="button" class="password-toggle" id="togglePassword" aria-label="Show password">
                        <i class="bi bi-eye-slash"></i>
                    </button>

                </div>

            </div>
            <!-- Login Button -->
            <button type="submit" class="login-button">
                Login
            </button>

        </form>

    </div>

</div>

<script>
    window.APP_CONFIG = <?= json_encode([
                            'basePath' => getenv('APP_BASE_PATH'),
                            'apiBaseUrl' => getenv('APP_API_URL'),
                            'sessionLoginUrl' => htmlspecialchars(url('session-login.php')),
                            'homeUrl' => htmlspecialchars(url('dhome')),
                        ], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?>;

    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // Show password while pressing the eye icon
    function showPassword() {
        passwordInput.type = 'text';
        togglePassword.innerHTML = '<i class="bi bi-eye"></i>';
    }

    // Hide password when the press is released
    function hidePassword() {
        passwordInput.type = 'password';
        togglePassword.innerHTML = '<i class="bi bi-eye-slash"></i>';
    }

    // Mouse support
    togglePassword.addEventListener('mousedown', function(event) {
        event.preventDefault();
        showPassword();
    });

    document.addEventListener('mouseup', hidePassword);

    // Mobile / touch-screen support
    togglePassword.addEventListener('touchstart', function(event) {
        event.preventDefault();
        showPassword();
    });

    document.addEventListener('touchend', hidePassword);
    document.addEventListener('touchcancel', hidePassword);

    // Hide if the user moves away from the button
    togglePassword.addEventListener('mouseleave', hidePassword);
</script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="<?= htmlspecialchars(assets('js/login.js')) ?>"></script>
</body>
</html>