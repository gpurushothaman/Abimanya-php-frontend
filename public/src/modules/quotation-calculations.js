function getFrameThickness(frameSectionStr) {
  if (!frameSectionStr) return 0;
  let parts = frameSectionStr.toLowerCase().replace(/mm/g, "").split("x");
  if (parts.length > 1) {
    return parseFloat(parts[1].trim());
  }
  return 0;
}
function resolveProfileWrappingKey(thicknessMM, mmStr) {
  const t = parseInt(thicknessMM, 10);
  if (isNaN(t)) return null;

  if (mmStr === "45") {
    // Brackets: 90-99, 100-114, 115-159, 160-179, 180-199, 200-229, 230-259, 260+
    if (t >= 260) return "260x45";
    if (t >= 230) return "230x45";
    if (t >= 200) return "200x45";
    if (t >= 180) return "180x45";
    if (t >= 160) return "160x45";
    if (t >= 115) return "115x45";
    if (t >= 100) return "100x45";
    return "90x45";
  }

  if (mmStr === "38") {
    // Brackets: 90-99, 100-114, 115-139, 140-169, 170-199, 200-219, 220-249, 250+
    if (t >= 250) return "250x38";
    if (t >= 220) return "220x38";
    if (t >= 200) return "200x38";
    if (t >= 170) return "170x38";
    if (t >= 140) return "140x38";
    if (t >= 115) return "115x38";
    if (t >= 100) return "100x38";
    return "90x38";
  }

  return null;
}
// ── SHUTTER DIMENSION FORMULAS (confirmed from PDF Image 3) ──────────────

function calculateFinishedHeight(H, S, hasThreshold) {
  // WITH threshold:    H - 2S + 18
  // WITHOUT threshold: H - S  + 4
  const h = parseFloat(H) || 0;
  const s = parseFloat(S) || 0;
  if (hasThreshold) {
    return h - 2 * s + 18;
  } else {
    return h - s + 4;
  }
}

function calculateFinishedWidth(W, S, hasThreshold) {
  // Both cases: W - 2S + 18
  const w = parseFloat(W) || 0;
  const s = parseFloat(S) || 0;
  return w - 2 * s + 18;
}

// ── END FORMULAS ──────────────────────────────────────────────────────────

function calculateDoorSFT(heightMM, widthMM) {
  let heightFeet = heightMM / 304.8;
  let widthFeet = widthMM / 304.8;
  return heightFeet * widthFeet;
}

function calculateDoorCost(sft, rate) {
  return sft * rate;
}

function calculateFrameRFT(H, W, hasThreshold) {
  const h = parseFloat(H) || 0;
  const w = parseFloat(W) || 0;

  // Image 1 formula:
  //   With threshold    → 2H + 2W
  //   Without threshold → 2H + W
  const mm = hasThreshold ? 2 * h + 2 * w : 2 * h + w;

  return mm / 304.8; // convert mm → RFT
}

function calculateArchitraveRFT(H, W, sizeStr) {
  if (!sizeStr) return 0;
  const s = sizeStr.trim().toLowerCase();
  if (s === "" || s.includes("select") || s === "none") return 0;

  // Extract face-width (first numeric group)
  const match = s.match(/(\d+(\.\d+)?)/);
  if (!match) return 0;
  const faceWidthMM = parseFloat(match[1]);
  if (!faceWidthMM || faceWidthMM === 0) return 0;

  const h = parseFloat(H) || 0;
  const w = parseFloat(W) || 0;
  if (h === 0 || w === 0) return 0;

  // Standard architrave RFT formula:
  //   (2 × H  +  W)  +  offset allowance
  // offset = faceWidth − 15  (15 mm is the rebate behind the frame)
  const offset = faceWidthMM - 15;
  const mm = 2 * (h + offset) + (w + offset);
  return mm / 304.8;
}

// ─────────────────────────────────────────────────────────────
function calculateJambRFT(H, W, hasThreshold) {
  const h = parseFloat(H) || 0;
  const w = parseFloat(W) || 0;

  const mm = hasThreshold
    ? 2 * h + 2 * w // WITH threshold:    2H + 2W
    : 2 * h + w; // WITHOUT threshold: 2H + W

  return mm / 304.8;
}
function getFrameRate(frameTypeKey, frameSectionText) {
  if (!frameSectionText) return 0;

  // ── 1. Detect if this is a profile-wrapping dynamic label ──────────────
  // The UI generates labels like "194 X 45mm" or "184 X 38mm"
  // (wallThickness × selectedDoorFrameTypeOption).
  const dynMatch = frameSectionText
    .trim()
    .replace(/\s+/g, "")
    .match(/^(\d+)[xX](\d+)mm$/i);

  if (dynMatch) {
    const thicknessMM = dynMatch[1]; // e.g. "194"
    const mmStr = dynMatch[2]; // e.g. "45" or "38"

    const bracketKey = resolveProfileWrappingKey(thicknessMM, mmStr);
    if (!bracketKey) return 0;

    // Determine which rate table to use from the sub-type option / frame type
    const subOptVal =
      typeof $ !== "undefined"
        ? (
            $("#door-frameTypeOptions option:selected").val() || ""
          ).toLowerCase()
        : "";
    const frameTypeVal = (frameTypeKey || "").trim().toLowerCase();

    const profileTable = resolveProfileTable(subOptVal, frameTypeVal, mmStr);
    if (profileTable && profileTable[bracketKey] !== undefined) {
      return profileTable[bracketKey];
    }

    // Fallback: laminate profile wrapping
    const fallbackTable =
      mmStr === "38"
        ? FRAME_RATES.profileWrappingLaminate38
        : FRAME_RATES.profileWrappingLaminate;
    return fallbackTable[bracketKey] || 0;
  }

  // ── 2. Standard / solid-wood lookup (unchanged original logic) ──────────
  const sectionNorm = frameSectionText
    .replace(/\(mm\)/gi, "")
    .replace(/mm/gi, "")
    .replace(/\s*[xX]\s*/g, "x")
    .replace(/\s+/g, "")
    .toLowerCase();

  function lookupInTable(table) {
    if (!table) return 0;
    if (table[sectionNorm] !== undefined) return table[sectionNorm];
    const widthPart = sectionNorm.split("x")[0];
    for (const k of Object.keys(table)) {
      if (k.startsWith(widthPart + "x")) return table[k];
    }
    return 0;
  }

  function resolveTableByKey(rawKey) {
    if (!rawKey) return null;
    const k = rawKey.trim().toLowerCase();
    if (FRAME_RATES[k]) return FRAME_RATES[k];
    const aliases = {
      africanteak: FRAME_RATES.africanteak,
      mahogany: FRAME_RATES.mahogany,
      steambeech: FRAME_RATES.steambeech,
      "45mm": FRAME_RATES.laminatewrapping,
      "38mm": FRAME_RATES.profileWrappingLaminate38,
      laminatewrapping: FRAME_RATES.laminatewrapping,
      laminatewrappingwallcase: FRAME_RATES.laminatewrapping,
      veneerprofilewrappingteak: FRAME_RATES.profileWrappingTeakVeneer,
      veneerprofilewrappingteakwallcase: FRAME_RATES.profileWrappingTeakVeneer,
      veneerprofilewrapping: FRAME_RATES.profileWrappingTeakVeneer,
      "laminate profile wrapping": FRAME_RATES.laminatewrapping,
      "laminate profile wrapping + wall case": FRAME_RATES.laminatewrapping,
    };
    return aliases[k] !== undefined ? aliases[k] : null;
  }

  const subOptVal =
    typeof $ !== "undefined"
      ? $("#door-frameTypeOptions option:selected").val() || ""
      : "";
  const frameTypeVal = frameTypeKey || "";

  let table = resolveTableByKey(subOptVal);
  let rate = lookupInTable(table);
  if (rate) return rate;

  table = resolveTableByKey(frameTypeVal);
  rate = lookupInTable(table);
  if (rate) return rate;

  return 0;
}

function resolveProfileTable(subOptVal, frameTypeVal, mmStr) {
  // Sub-option takes priority (most specific)
  const subLower = (subOptVal || "").toLowerCase();
  const typeLower = (frameTypeVal || "").toLowerCase();

  // 38mm always uses laminate38 table regardless of veneer type
  if (mmStr === "38") {
    return FRAME_RATES.profileWrappingLaminate38;
  }

  // 45mm — pick by veneer type
  if (
    subLower.includes("americanwalnut") ||
    typeLower.includes("americanwalnut")
  ) {
    return FRAME_RATES.profileWrappingAmericanWalnut;
  }
  if (
    subLower.includes("sapele") ||
    subLower.includes("redoak") ||
    subLower.includes("recon") ||
    typeLower.includes("sapele") ||
    typeLower.includes("redoak") ||
    typeLower.includes("recon")
  ) {
    return FRAME_RATES.profileWrappingSapeleRedOak;
  }
  if (subLower.includes("teak") || typeLower.includes("teak")) {
    return FRAME_RATES.profileWrappingTeakVeneer;
  }
  // Default 45mm → laminate
  return FRAME_RATES.profileWrappingLaminate;
}

function getArchitraveRate(side, sizeStr) {
  if (!sizeStr) return 0;

  // Extract face-width mm (same logic as calculateArchitraveRFT)
  const match = sizeStr.trim().match(/(\d+(\.\d+)?)/);
  if (!match) return 0;
  const faceWidthMM = String(Math.round(parseFloat(match[1])));

  // Pick the right architrave table based on the current sub-type
  const subOpt =
    typeof $ !== "undefined"
      ? ($("#door-frameTypeOptions option:selected").val() || "").toLowerCase()
      : "";

  let table = COSTING.architraves.solidWoodAfricanTeak; // default

  if (subOpt.includes("mahogany")) table = COSTING.architraves.mahagonyHardwood;
  if (subOpt.includes("steambeech") || subOpt.includes("steam"))
    table = COSTING.architraves.solidSteamBeach;
  if (subOpt === "45mm" || subOpt === "38mm")
    table = COSTING.architraves.profileWrappingLaminate;

  const rate = table?.[faceWidthMM];
  if (rate !== undefined) return rate;

  // Absolute fallback: look in solidWoodAfricanTeak
  return COSTING.architraves.solidWoodAfricanTeak?.[faceWidthMM] || 0;
}

function getJambRate(jambLocation, hasThreshold) {
  // If threshold is present, use the "front" rate (500)
  // If threshold is absent,  use the "back"  rate (450)
  // This mirrors the Excel table exactly.
  const rateKey = hasThreshold ? "front" : "back";

  try {
    const rate = COSTING.jambs?.[rateKey]?.["j100"];
    if (rate !== undefined && rate !== null) return rate;
  } catch (e) {}

  // Hard fallback — always correct even if COSTING is missing
  return hasThreshold ? 500 : 450;
}

