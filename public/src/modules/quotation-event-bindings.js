document.addEventListener("DOMContentLoaded", () => {
  // 1. Bind to the REAL green submit button in the sidebar
  const submitBtn = document.getElementById("submitdata");

  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // 2. Close the Bootstrap sidebar (offcanvas) smoothly when submitted
      const specPanelEl = document.getElementById("specPanel");
      if (specPanelEl && typeof bootstrap !== "undefined") {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(specPanelEl);
        if (bsOffcanvas) {
          bsOffcanvas.hide();
        }
      }

      generateQuotation();
    });
  }

  // Bind live calculations if the quotation overlay is already visible
  const inputsToWatch = [
    "#WallHeightSlider",
    "#WallWidthSlider",
    "#door-threshold",
    "#door-frameSection",
    "#door-thickness",
    "#door-design",
    "#door-subdesign",
    "#door-frameType",
    "#door-frontArchitrave",
    "#door-backArchitrave",
    "#jamb-location",
  ];
  $(inputsToWatch.join(", ")).on("change input", function () {
    if (!$("#quotation-overlay").hasClass("hidden")) {
      generateQuotation();
    }
  });
});
