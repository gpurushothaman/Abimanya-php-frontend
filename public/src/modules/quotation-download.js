document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("quotation-download-btn").onclick = function () {
    const downloadBtn = document.getElementById("quotation-download-btn");
    const closeBtn = document.getElementById("quotation-close-btn");
    const placeOrderBtn = document.getElementById("placeorder_btn");
    // Hide buttons
    downloadBtn.style.display = "none";
    closeBtn.style.display = "none";
    placeOrderBtn.style.display = "none";
    const container = document.getElementById("quotation-container");
    // Store original values
    const oldHeight = container.style.height;
    const oldOverflow = container.style.overflow;
    // Make full content visible for PDF
    container.style.height = "auto";
    container.style.overflow = "visible";
    html2pdf()
      .set({
        margin: 0.3,
        filename: "quotation.pdf",
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(container)
      .save()
      .then(() => {
        // Restore original styles
        container.style.height = oldHeight;
        container.style.overflow = oldOverflow;
        // Show buttons again
        downloadBtn.style.display = "inline-flex";
        closeBtn.style.display = "flex";
        placeOrderBtn.style.display = "inline-flex";
      });
  };
});

