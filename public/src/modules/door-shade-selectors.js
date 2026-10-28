function loadDoorShades(shadeItems) {
  const doorShadesDropdown = $("#door-shades");

  // Clear old options
  doorShadesDropdown.empty();

  if (shadeItems) {
    // Add default option
    doorShadesDropdown.append(
      `<option selected disabled>Select Door Shade</option>`
    );
  } else {
    doorShadesDropdown.append(`<option selected disabled>No Shades</option>`);
  }

  // If valid selection
  if (shadeItems) {
    $.each(shadeItems, function (index, door) {
      doorShadesDropdown.append(
        `<option value="${door?.itmValue}">${door?.itmName}</option>`
      );
    });
  }

  if (
    (selectedDoorDesign === "laminate" ||
      selectedDoorDesign === "skinClassic" ||
      selectedDoorDesign === "royalPaint") &&
    (selectedDoorSubDesign === "elite" ||
      selectedDoorSubDesign === "titan" ||
      selectedDoorSubDesign === "classic" ||
      selectedDoorSubDesign === "RP")
  ) {
    selectedDoorActiveTab = "shades";
    doorShadesDropdown.prop("selectedIndex", 3);
    selectedDoorShadeType = doorShadesDropdown.find("option:eq(3)").val();
    let renderModel =
      MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.shades?.[
        selectedDoorSubDesign
      ]?.[selectedDoorShadeType];

    //Change all object texture
    changeAllObjectTexture();
  } else if (
    selectedDoorDesign === "veneer" &&
    selectedDoorSubDesign === "emporium"
  ) {
    selectedDoorActiveTab = "shades";
    doorShadesDropdown.prop("selectedIndex", 1);
    selectedDoorShadeType = doorShadesDropdown.find("option:eq(1)").val();

    //Change all object texture
    changeAllObjectTexture();
  } else if (
    selectedDoorDesign === "veneer" &&
    selectedDoorSubDesign === "luxe"
  ) {
    selectedDoorActiveTab = "shades";
    doorShadesDropdown.prop("selectedIndex", 6);
    selectedDoorShadeType = doorShadesDropdown.find("option:eq(6)").val();

    //Change all object texture
    changeAllObjectTexture();
  } else {
    selectedDoorActiveTab = "models";
    changeAllObjectTexture();
  }
}

$("#door-models").on("change", function () {
  //Door front/back
  let doorJambLoc = selectedJambLocation === "front" ? "3A" : "3B";
  selectedDoorActiveTab = "models";
  selectedDoorModelType = $(this).val();
  STORE_CUSTOMIZED_DATA.door_design["models"] = $(
    "#door-models option:selected"
  ).text();

  //Apply Dynamic door
  let dynamicDoorData =
    MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.models?.[
      selectedDoorSubDesign
    ]?.[selectedDoorModelType];

  //Half door
  if (
    selectedDoorModelType === "VE_6" ||
    selectedDoorModelType === "VE_7" ||
    selectedDoorModelType === "VL_15" ||
    selectedDoorModelType === "RP_2" ||
    selectedDoorModelType === "RP_3" ||
    selectedDoorModelType === "RP_4" ||
    selectedDoorModelType === "SC_2" ||
    selectedDoorModelType === "SC_3" ||
    selectedDoorModelType === "SC_4"
  ) {
    if (selectedDoorFrame === "half") {
      loadDoors(
        dynamicDoorData?.halfModelPath,
        dynamicDoorData?.halfModelName,
        storePreviousSelectedDoorModelType,
        DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.[selectedDoorModelType]
          ?.mesh
      );
    } else if (selectedDoorFrame === "full") {
      if (
        selectedDoorFrameType === "veneerProfileWrappingTeak" &&
        ["VE_6", "VE_7", "VL_15"]?.indexOf(selectedDoorModelType) != -1
      ) {
        loadDoors(
          dynamicDoorData?.full1ModelPath,
          dynamicDoorData?.full1ModelName,
          storePreviousSelectedDoorModelType,
          DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["full1"]?.[
            selectedDoorModelType
          ]?.mesh
        );
      } else if (
        selectedDoorFrameType === "veneerProfileWrappingTeakWallCase" &&
        ["VE_6", "VE_7", "VL_15"]?.indexOf(selectedDoorModelType) != -1
      ) {
        loadDoors(
          dynamicDoorData?.full2ModelPath,
          dynamicDoorData?.full2ModelName,
          storePreviousSelectedDoorModelType,
          DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["full2"]?.[
            selectedDoorModelType
          ]?.mesh
        );
      } else {
        if (
          selectedDoorFrameType !== "laminateWrapping" &&
          selectedDoorFrameType !== "veneerProfileWrappingTeak" &&
          selectedDoorFrameType !== "laminateWrappingWallCase" &&
          selectedDoorFrameType !== "veneerProfileWrappingTeakWallCase"
        ) {
          loadDoors(
            selectedJambLocation === "front"
              ? dynamicDoorData?.full3AModelPath
              : dynamicDoorData?.full3BModelPath,
            selectedJambLocation === "front"
              ? dynamicDoorData?.full3AModelName
              : dynamicDoorData?.full3BModelName,
            storePreviousSelectedDoorModelType,
            DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.[doorJambLoc]?.[
              selectedDoorModelType
            ]?.mesh
          );
        }
      }
    }
  } else {
    if (selectedDoorFrame === "half") {
      loadDoors(
        "",
        "",
        storePreviousSelectedDoorModelType,
        DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["plain"]?.mesh
      );
    } else if (selectedDoorFrame === "full") {
      if (
        selectedDoorFrameType === "laminateWrapping" ||
        selectedDoorFrameType === "veneerProfileWrappingTeak"
      ) {
        loadDoors(
          "",
          "",
          storePreviousSelectedDoorModelType,
          DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["full1"]?.["plain"]?.mesh
        );
      } else if (
        selectedDoorFrameType === "laminateWrappingWallCase" ||
        selectedDoorFrameType === "veneerProfileWrappingTeakWallCase"
      ) {
        loadDoors(
          "",
          "",
          storePreviousSelectedDoorModelType,
          DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["full2"]?.["plain"]?.mesh
        );
      } else {
        loadDoors(
          "",
          "",
          storePreviousSelectedDoorModelType,
          DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.[doorJambLoc]?.["plain"]
            ?.mesh
        );
      }
    }
  }

  //Ascending order to display the shades
  const loadShadesItems = [
    ...(MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.shades?.[
      selectedDoorSubDesign
    ]?.UIItems?.[selectedDoorModelType] || []),
  ].sort((a, b) => a.itmName.localeCompare(b.itmName));

  loadDoorShades(loadShadesItems);

  // setTimeout(function () {
  //   changeAllObjectTexture();
  // }, 1000);
});

$("#door-shades").on("change", function () {
  selectedDoorActiveTab = "shades";
  selectedDoorShadeType = $(this).val();
  STORE_CUSTOMIZED_DATA.door_design["shades"] = $(
    "#door-shades option:selected"
  ).text();

  let renderModel =
    MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.shades?.[
      selectedDoorSubDesign
    ]?.[selectedDoorShadeType];

  //Change all object texture
  changeAllObjectTexture();
});
