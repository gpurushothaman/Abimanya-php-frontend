const COSTING = {
  door: {
    laminate: {
      flute: {
        DT_32: { cost: 792 },
        DT_35: { cost: 792 },
        DT_38: { cost: 842 },
        DT_40: { cost: 865 },
        DT_45: { cost: 922 },
        DT_50: { cost: 1001 },
      },
      elite: {
        DT_32: { cost: 723 },
        DT_35: { cost: 723 },
        DT_38: { cost: 773 },
        DT_40: { cost: 796 },
        DT_45: { cost: 853 },
        DT_50: { cost: 932 },
      },
      titan: {
        DT_32: { cost: 804 },
        DT_35: { cost: 804 },
        DT_38: { cost: 853 },
        DT_40: { cost: 876 },
        DT_45: { cost: 934 },
        DT_50: { cost: 1012 },
      },
      plantina: {
        DT_32: { cost: 873 },
        DT_35: { cost: 873 },
        DT_38: { cost: 922 },
        DT_40: { cost: 945 },
        DT_45: { cost: 1003 },
        DT_50: { cost: 1081 },
      },
    },

    // ── ADD THIS VENEER SECTION ──────────────────────────────────────────
    veneer: {
      luxe: {
        DT_32: { cost: 0 },
        DT_35: { cost: 0 },
        DT_38: { cost: 0 },
        DT_40: { cost: 1380 },
        DT_45: { cost: 1438 },
        DT_50: { cost: 1516 },
        DT_55: { cost: 1573 },
        // Golden Teak shades — separate rate table
        goldenTeak: {
          DT_32: { cost: 0 },
          DT_35: { cost: 0 },
          DT_38: { cost: 0 },
          DT_40: { cost: 1551 },
          DT_45: { cost: 1609 },
          DT_50: { cost: 1687 },
          DT_55: { cost: 1745 },
        },
      },
      emporium: {
        DT_32: { cost: 0 },
        DT_35: { cost: 0 },
        DT_38: { cost: 0 },
        DT_40: { cost: 1540 },
        DT_45: { cost: 1597 },
        DT_50: { cost: 1676 },
        DT_55: { cost: 1733 },
        // Golden Teak shades — separate rate table
        goldenTeak: {
          DT_32: { cost: 0 },
          DT_35: { cost: 0 },
          DT_38: { cost: 0 },
          DT_40: { cost: 1714 },
          DT_45: { cost: 1771 },
          DT_50: { cost: 1849 },
          DT_55: { cost: 1907 },
        },
      },
    },
    // ── END VENEER SECTION ───────────────────────────────────────────────
  },
  // frames now references FRAME_RATES which is already declared above
  frames: FRAME_RATES,
  architraves: {
    solidWoodAfricanTeak: { 30: 90, 40: 115, 60: 161 },
    mahagonyHardwood: { 30: 60, 40: 76, 60: 104 },
    solidSteamBeach: { 30: 64, 40: 85, 60: 113 },
    profileWrappingLaminate: { 30: 85, 40: 104, 60: 133 },
    profileWrappingTeak: { 30: 161, 40: 193, 60: 239 },
    profileWrappingAmericanWalnut: { 30: 159, 40: 189, 60: 235 },
    profileWrappingSapeliRedOakRecon: { 30: 140, 40: 168, 60: 209 },
  },
  jambs: {
    front: { j100: 500, j150: 600 },
    back: { j100: 450, j150: 550 },
  },
};

const STORE_CUSTOMIZED_DATA = {
  door_location: {},
  door_design: {
    design: "Laminate",
    type: "Elite",
    models: "LE 2",
    shades: "European Walnut",
  },
  door_thickness: {},
  frame: { frame: "Full" },
  threshold: {},
  orientation: {},
  architrave: {},
  jamb: { location: "Front" },
};
// ADDED: Logic to handle Submit & Generate Quotation Design

// --- DYNAMIC QUOTATION CALCULATIONS ---
