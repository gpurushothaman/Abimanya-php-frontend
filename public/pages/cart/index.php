
<?php
require_once __DIR__ . '/../../../app/includes/header.php';

$url = rtrim(getenv('APP_API_URL'), '/') . '/cart?customerCode=' . urlencode($_SESSION['user']['customerCode']);

$ch = curl_init($url);

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPGET => true,
    CURLOPT_HTTPHEADER => [
        "Accept: application/json",
        "Authorization: Bearer " . $_SESSION['api_token']
    ]
]);

$response = curl_exec($ch);
$cartData = json_decode($response, true);

curl_close($ch);

$cartData = is_array($cartData) ? $cartData : [];

$_SESSION['user']['cartCount'] = (string)((int)($cartData['count'] ?? 0));
?>

<main class="enquiry-page">

    <section class="enquiry-container">

        <a href="<?= url('/dhome') ?>">
            <div class="enquiry-logo">
                <img src="<?= url('assets/logo/company-logo.PNG') ?>" alt="Abhimanya Doors Logo">
            </div>
        </a>

        <div class="enquiry-toolbar">

            <h2>Enquiry List</h2>

            <div class="enquiry-search">
                <input
                    type="search"
                    id="enquirySearch"
                    placeholder="-search-"
                    aria-label="Search enquiries">
            </div>

            <a href="add-enquiry.php" class="enquiry-add-button">
                Add Enquiry
            </a>

        </div>

        <!-- Enquiry Table -->
        <div class="enquiry-table-wrapper">

            <table class="enquiry-table">

                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Date</th>
                        <th>E. No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Place Order</th>
                    </tr>
                </thead>

                <tbody id="enquiryTableBody">

                    <?php if (!empty($cartData['data'])) : ?>

                        <?php foreach ($cartData['data'] as $index => $item) : ?>

                            <?php
                            $description = json_decode($item['description'] ?? '{}', true);

                            $description = is_array($description) ? $description : [];

                            $door = $description['door'] ?? [];

                            $imageUrl = rtrim(getenv('APP_BACKEND_URL'), '/') . "/" . ($item['frontImage'] ?? '');

                            $popupDetails = htmlspecialchars(
                                json_encode($description, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                                ENT_QUOTES,
                                'UTF-8'
                            );
                            ?>

                            <tr class="enquiry-row">
<<<<<<< HEAD

                                <!-- Product Image -->
                                <td>
                                    <img
                                        src="<?= htmlspecialchars($imageUrl, ENT_QUOTES, 'UTF-8') ?>"
                                        width="60"
                                        height="60"
                                        style="border-radius:50%; object-fit:cover;"
                                        alt="Door Image">
=======
                                <td>
                                    <center>
                                    <img src="<?= $imageUrl ?>" width="60" height="60" style="border-radius: 50%; object-fit: cover;" alt="Avatar" />
                                    </center>
                                </td>
                                <td><span class="enquiry-label"><?= !empty($item['updatedAt'])
                                                                    ? date('jS M Y', strtotime($item['updatedAt']))
                                                                    : '-' ?></span></td>
                                <td><?= htmlspecialchars($item['customerCode'] ?? '') ?></td>
                                <td><?= htmlspecialchars($item['title'] ?? '') ?></td>
                                <td><?= htmlspecialchars($door['design'] ?? '') ?></td>
                                <td>
                                    <center>
                                        <input type="number" class="enquiry-quantity" name="quantity" min="1" step="1" value="<?= htmlspecialchars((string)($item['quantity'] ?? 1), ENT_QUOTES, 'UTF-8') ?>" aria-label="Quantity">
                                    </center>
>>>>>>> aaeee971b823a3cd7f23fb14804961d93ad46ee0
                                </td>

                                <!-- Date -->
                                <td>
<<<<<<< HEAD
                                    <span class="enquiry-label">
                                        <?= !empty($item['updatedAt'])
                                            ? date('jS M Y', strtotime($item['updatedAt']))
                                            : '-' ?>
=======
                                    INR
                                    <span class="enquiry-total-price" data-unit-price="<?= htmlspecialchars((string)($item['price'] ?? 0), ENT_QUOTES, 'UTF-8') ?>">
                                        <?= number_format((float)($item['price'] ?? 0) * (int)($item['quantity'] ?? 1), 2, '.', '') ?>
>>>>>>> aaeee971b823a3cd7f23fb14804961d93ad46ee0
                                    </span>
                                </td>

                                <!-- Enquiry Number -->
                                <td>
                                    <?= htmlspecialchars($item['customerCode'] ?? '', ENT_QUOTES, 'UTF-8') ?>
                                </td>

                                <!-- Title -->
                                <td>
                                    <?= htmlspecialchars($item['title'] ?? '', ENT_QUOTES, 'UTF-8') ?>
                                </td>

                                <!-- Description + View More -->
                                <td class="enquiry-description-cell">

                                    <span class="enquiry-label enquiry-description">
                                        <?= htmlspecialchars($door['design'] ?? '', ENT_QUOTES, 'UTF-8') ?>
                                    </span>

                                    <button
                                        type="button"
                                        class="enquiry-view-more"
                                        data-title="<?= htmlspecialchars($item['title'] ?? 'Door Details', ENT_QUOTES, 'UTF-8') ?>"
                                        data-enquiry-no="<?= htmlspecialchars($item['customerCode'] ?? '', ENT_QUOTES, 'UTF-8') ?>"
                                        data-details="<?= $popupDetails ?>">

                                        View More

                                    </button>

                                </td>

                                <!-- Quantity -->
                                <td>
                                    <input
                                        type="number"
                                        class="enquiry-quantity"
                                        name="quantity"
                                        min="1"
                                        step="1"
                                        value="<?= htmlspecialchars(
                                            (string)($item['quantity'] ?? 1),
                                            ENT_QUOTES,
                                            'UTF-8'
                                        ) ?>"
                                        aria-label="Quantity">
                                </td>

                                <!-- Price -->
                                <td>
                                    <span
                                        class="enquiry-total-price"
                                        data-unit-price="<?= htmlspecialchars(
                                            (string)($item['price'] ?? 0),
                                            ENT_QUOTES,
                                            'UTF-8'
                                        ) ?>">

                                        <?= number_format(
                                            (float)($item['price'] ?? 0) * (int)($item['quantity'] ?? 1),
                                            2,
                                            '.',
                                            ''
                                        ) ?>

                                    </span>
                                </td>

                                <!-- Place Order -->
                                <td>
                                    <i
                                        class="bi bi-arrow-right-circle-fill enquiry-order-button"
                                        data-enquiry-no="<?= htmlspecialchars($item['customerCode'] ?? '', ENT_QUOTES, 'UTF-8') ?>">
                                    </i>
                                </td>
                            </tr>

                        <?php endforeach; ?>

<<<<<<< HEAD
                        <!-- Grand Total -->
=======
>>>>>>> aaeee971b823a3cd7f23fb14804961d93ad46ee0
                        <tr class="enquiry-grand-total-row">

                            <td colspan="6" style="text-align:right;">
                                <strong>Grand Total:</strong>
                            </td>

                            <td>
                                INR
                                <strong id="enquiryGrandTotal">0.00</strong>
                            </td>
<<<<<<< HEAD

                            <td></td>

=======
                            <td> <i class="bi bi-arrow-right-circle-fill enquiry-order-button"></i></td>
>>>>>>> aaeee971b823a3cd7f23fb14804961d93ad46ee0
                        </tr>

                    <?php else : ?>

                        <tr id="enquiryEmptyRow">
                            <td colspan="8" class="enquiry-empty">
                                No enquiries available.
                            </td>
                        </tr>

                    <?php endif; ?>

                </tbody>

            </table>

        </div>

    </section>

</main>


<!-- ==================================
     ENQUIRY DETAILS POPUP
=================================== -->

<div class="enquiry-modal" id="enquiryDetailsModal" hidden>

    <div class="enquiry-modal-overlay"></div>

    <div
        class="enquiry-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiryModalTitle">

        <!-- Popup Header -->
        <div class="enquiry-modal-header">

            <div class="enquiry-modal-product">

                <!-- Image placeholder: Senior developer can connect dynamic image here -->
                <div class="enquiry-modal-image">
                </div>

                <div class="enquiry-modal-heading">

                    <h3 id="enquiryModalTitle">Bathroom Door</h3>

                    <p id="enquiryModalSubtitle">
                        Customization details
                    </p>

                </div>

            </div>

            <button
                type="button"
                class="enquiry-modal-close"
                aria-label="Close popup">

                &times;

            </button>

        </div>

        <!-- Dynamic Customization Details -->
        <div
            class="enquiry-modal-details"
            id="enquiryModalDetails">

        </div>

        <!-- Popup Footer -->
        <div class="enquiry-modal-footer">

            <!-- <button
                type="button"
                class="enquiry-modal-close enquiry-close-button">

                Close

            </button>

            <button
                type="button"
                class="enquiry-edit-button"
                id="enquiryEditButton">

                Edit Customization

            </button> -->

        </div>

    </div>

</div>


<script>

    // Cart count
    const cartCountElement = document.getElementById('cartCount');

    if (cartCountElement) {
        cartCountElement.textContent =
            <?= json_encode((string)($cartData['count'] ?? '0')) ?>;
    }


    // ==================================
    // SEARCH FUNCTIONALITY
    // ==================================

    const searchInput = document.getElementById('enquirySearch');
    const tableBody = document.getElementById('enquiryTableBody');

    searchInput.addEventListener('input', function() {

        const searchText = this.value.trim().toLowerCase();

        const rows = tableBody.querySelectorAll('.enquiry-row');

        rows.forEach(function(row) {

            const rowText = row.textContent.toLowerCase();

            row.style.display = rowText.includes(searchText) ? '' : 'none';

        });

    });


    // ==================================
    // GRAND TOTAL CALCULATION
    // ==================================

    function updateEnquiryGrandTotal() {

        let grandTotal = 0;

        document.querySelectorAll(".enquiry-row").forEach(row => {

            const quantityInput = row.querySelector(".enquiry-quantity");
            const priceElement = row.querySelector(".enquiry-total-price");

            const quantity = Math.max(1, parseInt(quantityInput.value) || 1);
<<<<<<< HEAD

            const unitPrice = parseFloat(priceElement.dataset.unitPrice) || 0;

            const totalPrice = quantity * unitPrice;

            priceElement.textContent = totalPrice.toFixed(2);

            grandTotal += totalPrice;

        });

        const grandTotalElement = document.getElementById("enquiryGrandTotal");

        if (grandTotalElement) {
            grandTotalElement.textContent = grandTotal.toFixed(2);
        }

    }


    document.addEventListener("input", function(e) {

        if (e.target.classList.contains("enquiry-quantity")) {
            updateEnquiryGrandTotal();
        }

    });

    updateEnquiryGrandTotal();
=======
            const unitPrice = parseFloat(priceElement.dataset.unitPrice) || 0;

            const totalPrice = quantity * unitPrice;

            priceElement.textContent = totalPrice.toFixed(2);

            grandTotal += totalPrice;
        });

        document.getElementById("enquiryGrandTotal").textContent =
            grandTotal.toFixed(2);
    }

    document.addEventListener("input", function(e) {
        if (e.target.classList.contains("enquiry-quantity")) {
            updateEnquiryGrandTotal();
        }
    });

    document.addEventListener("DOMContentLoaded", updateEnquiryGrandTotal);
>>>>>>> aaeee971b823a3cd7f23fb14804961d93ad46ee0


    // ==================================
    // VIEW MORE POPUP
    // ==================================

<<<<<<< HEAD
    const enquiryModal = document.getElementById('enquiryDetailsModal');

    const modalTitle = document.getElementById('enquiryModalTitle');

    const modalSubtitle = document.getElementById('enquiryModalSubtitle');

    const modalDetails = document.getElementById('enquiryModalDetails');


    // Convert field names into readable labels
    function formatDetailLabel(key) {

        return key
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/[_-]/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());

    }

=======

>>>>>>> aaeee971b823a3cd7f23fb14804961d93ad46ee0

    // Display nested JSON details dynamically
    function flattenDetails(data, prefix = '', result = []) {

        if (data && typeof data === 'object') {

            if (Array.isArray(data)) {

                data.forEach((value, index) => {
                    flattenDetails(value, prefix ? prefix + ' ' + (index + 1) : 'Item ' + (index + 1), result);
                });

            } else {

                Object.entries(data).forEach(([key, value]) => {

                    const label = prefix
                        ? prefix + ' ' + formatDetailLabel(key)
                        : formatDetailLabel(key);

                    flattenDetails(value, label, result);

                });

            }

        } else if (data !== null && data !== undefined && data !== '') {

            result.push({
                label: prefix,
                value: String(data)
            });

        }

        return result;

    }


    // Open popup
    document.querySelectorAll('.enquiry-view-more').forEach(button => {

        button.addEventListener('click', function() {

            const title = this.dataset.title || 'Door Details';

            const enquiryNo = this.dataset.enquiryNo || '';

            let details = {};

            try {

                details = JSON.parse(this.dataset.details || '{}');

            } catch (error) {

                console.error('Invalid enquiry details JSON:', error);

            }

            modalTitle.textContent = title;

            modalSubtitle.textContent =
                'Customization details · ' + enquiryNo;


            // Clear previous popup content
            modalDetails.replaceChildren();


            const detailItems = flattenDetails(details);

            if (detailItems.length === 0) {

                const emptyMessage = document.createElement('p');

                emptyMessage.className = 'enquiry-modal-empty';

                emptyMessage.textContent = 'No customization details available.';

                modalDetails.appendChild(emptyMessage);

            } else {

                detailItems.forEach(item => {

                    const row = document.createElement('div');

                    row.className = 'enquiry-modal-detail-row';

                    const label = document.createElement('span');

                    label.className = 'enquiry-modal-detail-label';

                    label.textContent = item.label;

                    const value = document.createElement('strong');

                    value.className = 'enquiry-modal-detail-value';

                    value.textContent = item.value;

                    row.appendChild(label);

                    row.appendChild(value);

                    modalDetails.appendChild(row);

                });

            }


            enquiryModal.hidden = false;

            document.body.classList.add('enquiry-modal-open');

        });

    });


    // Close popup
    function closeEnquiryModal() {

        enquiryModal.hidden = true;

        document.body.classList.remove('enquiry-modal-open');

    }


    document.querySelectorAll('.enquiry-modal-close').forEach(button => {

        button.addEventListener('click', closeEnquiryModal);

    });


    // Close when clicking outside popup
    enquiryModal.querySelector('.enquiry-modal-overlay').addEventListener('click', closeEnquiryModal);


    // Close using Escape key
    document.addEventListener('keydown', function(e) {

        if (e.key === 'Escape' && !enquiryModal.hidden) {

            closeEnquiryModal();

        }

    });


    // Edit button is a UI placeholder until the edit route/API is connected.
    document.getElementById('enquiryEditButton').addEventListener('click', function() {

        console.log('Connect Edit Customization to the existing customization page/API.');

    });


    // ==================================
    // EXISTING PLACE ORDER VALIDATION
    // ==================================

    document.querySelectorAll('.enquiry-order-button').forEach(function(button) {

        button.addEventListener('click', function() {

            const row = this.closest('.enquiry-row');

            const quantityInput = row.querySelector('.enquiry-quantity');

            const quantity = Number(quantityInput.value);

            if (!Number.isInteger(quantity) || quantity < 1) {

                alert('Please enter a valid quantity.');

                quantityInput.focus();

                return;

            }

            const enquiryNo = this.dataset.enquiryNo;

            console.log({
                enquiry_no: enquiryNo,
                quantity: quantity
            });

        });

    });

</script>
