
<?php
// Enquiry records should be provided dynamically by your PHP backend.
// Expected variable: $enquiries (array of enquiry records).
$enquiries = $enquiries ?? [];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Enquiry List | Abhimanya Doors</title>

    <!-- Bootstrap Icons -->
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <!-- Existing project CSS -->
    <link rel="stylesheet" href="assets/css/custom.css">
</head>

<body>

    <main class="enquiry-page">

        <section class="enquiry-container">

            <!-- Logo: Add your logo path inside src -->
            <div class="enquiry-logo">
                <img src="<?= url('assets/logo/company-logo.PNG') ?>" alt="Abhimanya Doors Logo">
            </div>

            <!-- Search and Add Enquiry -->
            <div class="enquiry-toolbar">

                <h2>Enquiry List</h2>

                <div class="enquiry-search">
                    <input
                        type="search"
                        id="enquirySearch"
                        placeholder="-search-"
                        aria-label="Search enquiries"
                    >
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

                        <?php if (!empty($enquiries)): ?>

                            <?php foreach ($enquiries as $enquiry): ?>

                                <tr class="enquiry-row">

                                    <td>
                                        <span class="enquiry-label">
                                            <?= htmlspecialchars(
                                                $enquiry['date'] ?? '',
                                                ENT_QUOTES,
                                                'UTF-8'
                                            ) ?>
                                        </span>
                                    </td>

                                    <td>
                                        <span class="enquiry-label">
                                            <?= htmlspecialchars(
                                                $enquiry['enquiry_no'] ?? '',
                                                ENT_QUOTES,
                                                'UTF-8'
                                            ) ?>
                                        </span>
                                    </td>

                                    <td>
                                        <span class="enquiry-label">
                                            <?= htmlspecialchars(
                                                $enquiry['title'] ?? '',
                                                ENT_QUOTES,
                                                'UTF-8'
                                            ) ?>
                                        </span>
                                    </td>

                                    <td>
                                        <span class="enquiry-label enquiry-description">
                                            <?= htmlspecialchars(
                                                $enquiry['description'] ?? '',
                                                ENT_QUOTES,
                                                'UTF-8'
                                            ) ?>
                                        </span>
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            class="enquiry-quantity"
                                            name="quantity"
                                            min="1"
                                            step="1"
                                            value="<?= htmlspecialchars(
                                                (string) ($enquiry['quantity'] ?? 1),
                                                ENT_QUOTES,
                                                'UTF-8'
                                            ) ?>"
                                            aria-label="Quantity"
                                        >
                                    </td>

                                    <td>
                                        <span class="enquiry-label">
                                            <?= htmlspecialchars(
                                                $enquiry['price'] ?? '',
                                                ENT_QUOTES,
                                                'UTF-8'
                                            ) ?>
                                        </span>
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            class="enquiry-order-button"
                                            data-enquiry-no="<?= htmlspecialchars(
                                                $enquiry['enquiry_no'] ?? '',
                                                ENT_QUOTES,
                                                'UTF-8'
                                            ) ?>"
                                        >
                                            Submit
                                        </button>
                                    </td>

                                </tr>

                            <?php endforeach; ?>

                        <?php else: ?>

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
        // Search enquiries by the visible text in each row.
        const searchInput = document.getElementById('enquirySearch');
        const tableBody = document.getElementById('enquiryTableBody');

        searchInput.addEventListener('input', function () {
            const searchText = this.value.trim().toLowerCase();
            const rows = tableBody.querySelectorAll('.enquiry-row');

            rows.forEach(function (row) {
                const rowText = row.textContent.toLowerCase();

                row.style.display = rowText.includes(searchText)
                    ? ''
                    : 'none';
            });
        });

        // Quantity is editable. Connect this button to your order API
        // when the backend order endpoint is available.
        document.querySelectorAll('.enquiry-order-button').forEach(function (button) {

            button.addEventListener('click', function () {
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

</body>
</html>

