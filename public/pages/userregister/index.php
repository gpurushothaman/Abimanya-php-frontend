<?php require_once __DIR__ . '/../../../app/includes/cssheader.php'; ?>
<div class="register-page">

    <div class="register-card">

        <!-- LEFT SIDE: Registration Form -->
        <div class="register-form-panel">

            <!-- Logo: Add your logo path inside src -->
            <a href="<?= url('/home') ?>">
                <div class="register-logo">
                    <img src="<?= url('assets/logo/company-logo.PNG') ?>" alt="Abimanya Doors Logo">
                </div>
            </a>

            <div class="register-heading">
                <h2>Create Your Account</h2>
                <p>Register to start customizing your doors.</p>
            </div>

            <div id="formAlert" class="alert alert-danger d-none" role="alert">
                Please correct the errors in the form.
            </div>

            <div id="formSuccessAlert" class="alert alert-success d-none" role="alert">
                User registration successfully!.
            </div>

            <form id="registerForm" action="" method="POST" novalidate>

                <!-- Personal Information -->
                <h2 class="section-heading">
                    <i class="bi bi-person me-2"></i>
                    Personal Information
                </h2>

                <div class="row">

                    <!-- Full Name -->
                    <div class="col-md-6 mb-3">
                        <label for="name" class="form-label">
                            Full Name <span class="required-star">*</span>
                        </label>

                        <input type="text" class="form-control" id="name" name="name" placeholder="Enter full name" minlength="2" maxlength="100" autocomplete="name" required>

                        <div class="field-error" id="nameError"></div>
                    </div>

                    <!-- Email -->
                    <div class="col-md-6 mb-3">
                        <label for="email" class="form-label">
                            Email Address <span class="required-star">*</span>
                        </label>

                        <input type="email" class="form-control" id="email" name="email" placeholder="name@example.com" maxlength="254" autocomplete="email" required>

                        <div class="field-error" id="emailError"></div>
                    </div>

                    <!-- Username -->
                    <div class="col-md-6 mb-3">
                        <label for="username" class="form-label">
                            Username <span class="required-star">*</span>
                        </label>

                        <input type="text" class="form-control" id="username" name="username" placeholder="Choose a username" minlength="3" maxlength="30" autocomplete="username" required>

                        <div class="field-error" id="usernameError"></div>

                        <div class="password-hint">
                            3–30 characters: letters, numbers, dots and underscores.
                        </div>
                    </div>

                    <!-- Phone -->
                    <div class="col-md-6 mb-3">
                        <label for="phone" class="form-label">
                            Phone Number <span class="required-star">*</span>
                        </label>

                        <input type="tel" class="form-control" id="phone" name="phone_input" placeholder="Enter phone number" autocomplete="tel" required>

                        <div class="field-error" id="phoneError"></div>

                        <input type="hidden" name="phone_e164" id="phone_e164">

                        <input type="hidden" name="country_iso2" id="country_iso2">

                        <input type="hidden" name="country_name" id="country_name">

                        <div class="password-hint">
                            Select your country using the flag dropdown.
                        </div>
                    </div>

                </div>

                <!-- Address Information -->
                <h2 class="section-heading mt-4">
                    <i class="bi bi-geo-alt me-2"></i>
                    Address Information
                </h2>

                <div class="row">

                    <!-- State -->
                    <div class="col-md-6 mb-3">
                        <label for="state" class="form-label">
                            State / Province
                            <span class="required-star">*</span>
                        </label>

                        <input type="text" class="form-control" id="state" name="state" placeholder="Enter state or province" minlength="2" maxlength="100" autocomplete="address-level1" required>

                        <div class="field-error" id="stateError"></div>
                    </div>

                    <!-- City -->
                    <div class="col-md-6 mb-3">
                        <label for="city" class="form-label">
                            City <span class="required-star">*</span>
                        </label>

                        <input type="text" class="form-control" id="city" name="city" placeholder="Enter city" minlength="2" maxlength="100" autocomplete="address-level2" required>

                        <div class="field-error" id="cityError"></div>
                    </div>

                    <!-- Address -->
                    <div class="col-12 mb-3">
                        <label for="address" class="form-label">
                            Full Address <span class="required-star">*</span>
                        </label>

                        <textarea class="form-control" id="address" name="address" placeholder="House / Building, Street, Area, Postal Code" minlength="5" maxlength="500" autocomplete="street-address" required></textarea>

                        <div class="field-error" id="addressError"></div>
                    </div>

                </div>

                <!-- Security Information -->
                <h2 class="section-heading mt-4">
                    <i class="bi bi-shield-lock me-2"></i>
                    Account Security
                </h2>

                <div class="row">

                    <!-- Password -->
                    <div class="col-md-6 mb-3">
                        <label for="password" class="form-label">
                            Password <span class="required-star">*</span>
                        </label>

                        <input type="password" class="form-control" id="password" name="password" placeholder="Create a password" minlength="8" maxlength="128" autocomplete="new-password" required>

                        <div class="field-error" id="passwordError"></div>

                        <div class="password-hint">
                            Use 8+ characters, uppercase and lowercase letters,
                            a number and a special character.
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="col-md-6 mb-3">
                        <label for="confirm_password" class="form-label">
                            Confirm Password
                            <span class="required-star">*</span>
                        </label>

                        <input type="password" class="form-control" id="confirm_password" name="confirm_password" placeholder="Re-enter password" minlength="8" maxlength="128" autocomplete="new-password" required>

                        <div class="field-error" id="confirm_passwordError"></div>
                    </div>

                </div>

                <!-- Submit -->
                <div class="d-grid mt-4">
                    <button type="submit" class="btn btn-register">
                        <i class="bi bi-person-check me-2"></i>
                        Create Account
                    </button>
                </div>

                <div class="text-center mt-4">
                    <a href="<?= url('/login') ?>">
                        <span class="text-secondary">
                            Already have an account?
                        </span>
                    </a>

                    <a href="/abimanyaphp/login" class="login-link ms-1">
                        Sign In
                    </a>
                    <input type="submit" value="click" />
                </div>

            </form>

        </div>
        <!-- RIGHT SIDE: Door Image -->
        <div class="register-image-panel">
            <img src="<?= url('assets/images/door.jpeg') ?>" alt="Modern wooden door">
        </div>
    </div>
</div>
<!-- Load the intl-tel-input library first -->
<script src="https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/intlTelInput.min.js"></script>
<script>
    window.APP_CONFIG = <?= json_encode([
                            'userRegisterUrl' => rtrim(getenv('APP_API_URL'), '/') . '/auth/register',
                            'loginUrl' => htmlspecialchars(url('login')),
                        ], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?>;
</script>

<script src="<?= htmlspecialchars(assets('js/userregister.js')) ?>"></script>
<?php require_once __DIR__ . '/../../../app/includes/footer.php'; ?>