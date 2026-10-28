<?php require_once __DIR__ . '/../../../app/includes/header.php';
?>
  <!-- Home Page -->
  <div class="home-page">

<!-- Hero Section -->
<section class="home-hero">

    <!-- Left Content -->
    <div class="home-hero-content">

        <span class="home-eyebrow">
            Build Your Dream Entrance
        </span>

        <h1>
            Design Your Door
            <span>Your Way</span>
        </h1>

        <p class="home-description">
            Experience the next generation of door customization.
            Choose your style, material, color and design — all in 3D.
        </p>

        <!-- Features -->
        <div class="home-features">

            <div class="home-feature">
                <i class="bi bi-box"></i>
                <h6>3D Customization</h6>
                <p>Visualize in real time</p>
            </div>

            <div class="home-feature">
                <i class="bi bi-shield-check"></i>
                <h6>Premium Quality</h6>
                <p>Built to last</p>
            </div>

            <div class="home-feature">
                <i class="bi bi-house-door"></i>
                <h6>Wide Collection</h6>
                <p>Modern & Classic</p>
            </div>

            <div class="home-feature">
                <i class="bi bi-calendar-check"></i>
                <h6>Easy Booking</h6>
                <p>Fast & Secure</p>
            </div>

        </div>

        <!-- Sign In + Watch Video -->
        <div class="home-actions">


        <?php 
         
         if (!empty($_SESSION['user'])): ?>

<a href="<?= url('/tools') ?>" class="home-signin-button">
Design Your Door
                <i class="bi bi-arrow-right"></i>
            </a>


<?php else: ?>

    <a href="<?= url('/register') ?>" class="home-signin-button">
                Sign In
                <i class="bi bi-arrow-right"></i>
            </a>


<?php endif; ?>

       
            <!-- <a href="#home-benefits" class="home-video-link">
                <span>
                    <i class="bi bi-play-fill"></i>
                </span>
                Explore Our Features
            </a> -->

        </div>

    </div>

    <!-- Right Side: Door Image -->
    <div class="home-hero-image">

        <img
            src="<?= url('assets/images/homedoor.jpeg') ?>"
            alt="Modern wooden door"
        >

        <!-- <div class="home-image-caption">
            <h2>
                Your Door<br>
                Your Style
            </h2>
        </div> -->

    </div>

</section>

<!-- Bottom Benefits Section -->
<section class="home-benefits" id="home-benefits">

    <div class="home-benefit">
        <i class="bi bi-truck"></i>
        <div>
            <h6>On-Time Delivery</h6>
            <p>Across India</p>
        </div>
    </div>

    <div class="home-benefit">
        <i class="bi bi-shield-check"></i>
        <div>
            <h6>Secure Payments</h6>
            <p>Safe & Trusted</p>
        </div>
    </div>

    <div class="home-benefit">
        <i class="bi bi-headset"></i>
        <div>
            <h6>Dedicated Support</h6>
            <p>We're here for you</p>
        </div>
    </div>

    <div class="home-benefit">
        <i class="bi bi-tree"></i>
        <div>
            <h6>Eco Friendly</h6>
            <p>Sustainable Choices</p>
        </div>
    </div>

</section>

</div>
