async function generateQuotation() {
  try {
    // Hide the 3D Viewer & overlay icons so the quotation displays on a clean white page
    const container = document.getElementById("container");
    if (container) container.style.display = "none";

    const overlays = document.querySelectorAll(
      ".logo-top-right, .logo-bottom-right, .floating-ui, .up-arrow"
    );
    overlays.forEach((el) => (el.style.display = "none"));

    // Generate Dynamic Configuration Data
    let estId =
      "EST-" +
      new Date().getFullYear() +
      "-" +
      Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");

    let doorLoc = $("#door-locations option:selected").text() || "Not Selected";
    if (doorLoc.includes("Select")) doorLoc = "Not Selected";
    let thicknessVal = $("#door-thickness").val() || "DT_32";
    let thicknessLabel = $("#door-thickness option:selected").text() || "32mm";

    let h = $("#WallHeightSlider").val() || 1800;
    let w = $("#WallWidthSlider").val() || 850;
    let t = $("#WallThicknessSlider").val() || 140;
    let orientation = $("#door-orientation option:selected").text();
    let threshold = $("#door-threshold option:selected").text();
    let jambLoc = $("#jamb-location option:selected").text();
    let archFront = $("#door-frontArchitrave option:selected").text();
    let archBack = $("#door-backArchitrave option:selected").text();

    const data = {
      estimateId: estId,
      doorConfig: {
        left: [
          { key: "Door Location", value: doorLoc },
          { key: "Door Design", value: selectedDoorDesign },
          { key: "Door Sub Design", value: selectedDoorSubDesign },
          { key: "Door Model", value: selectedDoorModelType },
          { key: "Door Shade", value: selectedDoorShadeType },
          { key: "Door Thickness", value: thicknessLabel },
          { key: "Door Orientation", value: orientation },
          { key: "Wall Size (HxWxT)", value: `${h} x ${w} x ${t} mm` },
        ],
        right: [
          { key: "Frame Included", value: selectedDoorFrame },
          { key: "Frame Type", value: selectedDoorFrameType },
          { key: "Frame Option", value: selectedDoorFrameTypeOption },
          { key: "Threshold", value: threshold },
          { key: "Jamb Location", value: jambLoc },
          { key: "Architrave - Front", value: archFront },
          { key: "Architrave - Back", value: archBack },
          { key: "Quantity", value: "1" },
        ],
      },
      breakdown: [],
    };

    // Calculate Sizes
    let frameSectionText = $("#door-frameSection option:selected").text();
    let S = getFrameThickness(frameSectionText);
    let hasThreshold = threshold.toLowerCase().includes("yes");

    let finishedHeight = calculateFinishedHeight(h, S, hasThreshold);
    let finishedWidth = calculateFinishedWidth(w, S, hasThreshold);
    let effectiveSFT = calculateDoorSFT(finishedHeight, finishedWidth);

    // Append calculated results to config for display
    data.doorConfig.left.push({
      key: "Finished Door Height",
      value: (isNaN(finishedHeight) ? 0 : finishedHeight.toFixed(0)) + " mm",
    });
    data.doorConfig.left.push({
      key: "Finished Door Width",
      value: (isNaN(finishedWidth) ? 0 : finishedWidth.toFixed(0)) + " mm",
    });
    data.doorConfig.right.push({
      key: "Effective SFT",
      value: isNaN(effectiveSFT) ? 0 : effectiveSFT.toFixed(5),
    });

    // Calculate Costs
    // ── THICKNESS-BASED RATE LOOKUP ──────────────────────────────────────────
    let ratePerSft = 0;
    try {
      // thicknessVal is like "DT_40", "DT_45" etc from the dropdown
      const designRates = COSTING?.door?.[selectedDoorDesign];

      if (designRates) {
        // Try direct lookup: COSTING.door.veneer.luxe.DT_40
        const subRate =
          designRates?.[selectedDoorSubDesign]?.[thicknessVal]?.cost;

        if (subRate !== undefined && subRate !== null) {
          ratePerSft = subRate;
        }

        // If veneer and rate is 0, it means thickness not available for veneer
        // Show warning badge — handled below via isDoorCostMissing
      }
    } catch (e) {
      ratePerSft = 0;
    }
    // ── END RATE LOOKUP ───────────────────────────────────────────────────────

    let totalDoorCost = calculateDoorCost(effectiveSFT, ratePerSft) || 0;

    let idCounter = 1;
    let isDoorCostMissing = ratePerSft === 0;

    data.breakdown.push({
      id: idCounter++,
      desc:
        "Door Shutter " +
        (isDoorCostMissing
          ? "<span class='badge bg-warning text-dark'>Price Not Configured</span>"
          : ""),
      qty: isNaN(effectiveSFT) ? 0 : effectiveSFT.toFixed(5),
      unit: "SFT",
      rate: ratePerSft,
      amount: totalDoorCost,
    });

    if (selectedDoorFrame !== "no") {
      let frameRFT = calculateFrameRFT(h, w, hasThreshold);
      let frameTypeStr = $("#door-frameType option:selected").text();
      let frameRate = getFrameRate(frameTypeStr, frameSectionText);
      let frameCost = frameRFT * frameRate;

      data.breakdown.push({
        id: idCounter++,
        desc:
          "Wooden Frame " +
          (frameRate === 0
            ? "<span class='badge bg-warning text-dark'>Price Not Configured</span>"
            : ""),
        qty: isNaN(frameRFT) ? 0 : frameRFT.toFixed(5),
        unit: "RFT",
        rate: frameRate,
        amount: frameCost,
      });
    }

    if (archFront && !archFront.includes("Select")) {
      let archFrontRFT = calculateArchitraveRFT(h, w, archFront);
      let archFrontRate = getArchitraveRate("front", archFront);
      let archFrontCost = archFrontRFT * archFrontRate;

      data.breakdown.push({
        id: idCounter++,
        desc:
          "Architrave Front (" +
          archFront +
          ") " +
          (archFrontRate === 0
            ? "<span class='badge bg-warning text-dark'>Price Not Configured</span>"
            : ""),
        qty: isNaN(archFrontRFT) ? 0 : archFrontRFT.toFixed(5),
        unit: "RFT",
        rate: archFrontRate,
        amount: archFrontCost,
      });
    }

    if (archBack && !archBack.includes("Select")) {
      let archBackRFT = calculateArchitraveRFT(h, w, archBack);
      let archBackRate = getArchitraveRate("back", archBack);
      let archBackCost = archBackRFT * archBackRate;

      data.breakdown.push({
        id: idCounter++,
        desc:
          "Architrave Back (" +
          archBack +
          ") " +
          (archBackRate === 0
            ? "<span class='badge bg-warning text-dark'>Price Not Configured</span>"
            : ""),
        qty: isNaN(archBackRFT) ? 0 : archBackRFT.toFixed(5),
        unit: "RFT",
        rate: archBackRate,
        amount: archBackCost,
      });
    }

    // Add Jamb
    let jambSelected = $("#jamb-location option:selected").val();
    if (jambSelected && jambSelected !== "Select Location") {
      let jambLocText = $("#jamb-location option:selected").text();
      let jambRFT = calculateJambRFT(h, w, hasThreshold);
      let jambRate = getJambRate(jambLocText, hasThreshold);
      let jambCost = jambRFT * jambRate;

      data.breakdown.push({
        id: idCounter++,
        desc:
          "Jamb (" +
          jambLocText +
          ") " +
          (jambRate === 0
            ? "<span class='badge bg-warning text-dark'>Price Not Configured</span>"
            : ""),
        qty: isNaN(jambRFT) ? 0 : jambRFT.toFixed(5),
        unit: "RFT",
        rate: jambRate,
        amount: jambCost,
      });
    }

    data.breakdown.push({
      id: idCounter++,
      desc: "Hardware & Accessories <span class='badge bg-warning text-dark'>Price Not Configured</span>",
      qty: 1,
      unit: "Lot",
      rate: 0,
      amount: 0,
    });

    // Calculate initial subtotals
    let subtotalA = 0;
    data.breakdown.forEach((item) => (subtotalA += item.amount));

    let transport = 1500;
    let marginPerc = 10;
    let marginAmt = Math.round(subtotalA * (marginPerc / 100));
    let subtotalB = subtotalA + transport + marginAmt;
    let gstPerc = 18;
    let gstAmt = Math.round(subtotalB * (gstPerc / 100));
    let grandTotal = subtotalB + gstAmt;

    data.commercial = {
      subtotalA,
      transport,
      marginAmt,
      subtotalB,
      gstAmt,
      grandTotal,
    };

    // Show Quotation Container
    const quoteOverlay = document.getElementById("quotation-overlay");
    if (quoteOverlay) {
      quoteOverlay.classList.remove("hidden");
      // Populate Data dynamically
      populateQuotation(data);
    }
  } catch (err) {
    console.error("Error loading quotation data:", err);
    alert("Failed to load quotation data. Please check console.");
  }
}

