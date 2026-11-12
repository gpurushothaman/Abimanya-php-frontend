<?php require_once __DIR__ . '/../../../app/includes/header.php';
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

//print_r($cartData);

$_SESSION['user']['cartCount'] =
    (string)((int)$cartData['count']);
?>
<main class="enquiry-page">

    <section class="enquiry-container">

        <!-- Logo: Add your logo path inside src -->
        <a href="<?= url('/dhome') ?>">
            <div class="enquiry-logo">
                <img src="<?= url('assets/logo/company-logo.PNG') ?>" alt="Abhimanya Doors Logo">
            </div>
        </a>

        <!-- Search and Add Enquiry -->
        <div class="enquiry-toolbar">

            <h2>Enquiry List</h2>

            <div class="enquiry-search">
                <input type="search" id="enquirySearch" placeholder="-search-" aria-label="Search enquiries">
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
                            $door = $description['door'] ?? [];
                            $imageUrl = rtrim(getenv('APP_BACKEND_URL'), '/') . "/" . $item['frontImage'];
                            ?>

                            <tr class="enquiry-row">
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
                                </td>

                                <td>
                                    INR
                                    <span class="enquiry-total-price" data-unit-price="<?= htmlspecialchars((string)($item['price'] ?? 0), ENT_QUOTES, 'UTF-8') ?>">
                                        <?= number_format((float)($item['price'] ?? 0) * (int)($item['quantity'] ?? 1), 2, '.', '') ?>
                                    </span>
                                </td>
                                <td>
                                    <i class="bi bi-arrow-right-circle-fill enquiry-order-button"></i>
                                </td>
                            </tr>

                        <?php endforeach; ?>

                        <tr class="enquiry-grand-total-row">
                            <td colspan="6" style="text-align: right;">
                                <strong>Grand Total:</strong>
                            </td>
                            <td>
                                INR
                                <strong id="enquiryGrandTotal">0.00</strong>
                            </td>
                            <td> <i class="bi bi-arrow-right-circle-fill enquiry-order-button"></i></td>
                        </tr>

                    <?php else : ?>
                        <tr id="enquiryEmptyRow">
                            <td colspan="7" class="enquiry-empty">
                                No enquiries available.
                            </td>
                        </tr>
                    <?php endif; ?>

                </tbody>

            </table>

        </div>

    </section>

</main>

<script>
    document.getElementById('cartCount').textContent = <?= json_encode((string)($cartData['count'] ?? '0')) ?>;

    // Search enquiries by the visible text in each row.
    const searchInput = document.getElementById('enquirySearch');
    const tableBody = document.getElementById('enquiryTableBody');

    searchInput.addEventListener('input', function() {
        const searchText = this.value.trim().toLowerCase();
        const rows = tableBody.querySelectorAll('.enquiry-row');

        rows.forEach(function(row) {
            const rowText = row.textContent.toLowerCase();

            row.style.display = rowText.includes(searchText) ?
                '' :
                'none';
        });
    });



    function updateEnquiryGrandTotal() {

        let grandTotal = 0;

        document.querySelectorAll(".enquiry-row").forEach(row => {

            const quantityInput = row.querySelector(".enquiry-quantity");
            const priceElement = row.querySelector(".enquiry-total-price");

            const quantity = Math.max(1, parseInt(quantityInput.value) || 1);
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





    // Quantity is editable. Connect this button to your order API
    // when the backend order endpoint is available.
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

            // UI validation is complete.
            // Send enquiryNo and quantity to your backend here.
            console.log({
                enquiry_no: enquiryNo,
                quantity: quantity
            });
        });

    });
</script>