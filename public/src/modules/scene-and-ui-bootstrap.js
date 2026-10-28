$(document).ready(function () {
  console.log("new code");
  //Init load
  $("#frame-customize-option").show();
  $("#wallWidthValue").text(850);
  $("#WallWidthSlider").val(850);

  $("#wallHeightValue").text(2100);
  $("#WallHeightSlider").val(2100);

  const subDesignDropdown = $("#door-subdesign");
  const doorModelsDropdown = $("#door-models");
  const doorShadesDropdown = $("#door-shades");

  // Clear old options
  subDesignDropdown.empty();
  doorModelsDropdown.empty();
  doorShadesDropdown.empty();

  // Add default option
  subDesignDropdown.append(`<option disabled>Select Sub Design</option>`);

  // If valid selection
  let doorSubDesignData =
    MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.UIItems;
  if (doorSubDesignData) {
    $.each(doorSubDesignData, function (index, door) {
      subDesignDropdown.append(
        `<option value="${door?.itmValue}" ${index === 1 ? "selected" : ""}>${
          door?.itmName
        }</option>`
      );
    });
  }

  let loadMdlItems =
    MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.models?.[
      selectedDoorSubDesign
    ]?.UIItems;

  //Ascending order to display the shades
  const loadShadesItems = [
    ...(MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.shades?.[
      selectedDoorSubDesign
    ]?.UIItems?.[selectedDoorModelType] || []),
  ].sort((a, b) => a.itmName.localeCompare(b.itmName));

  if (loadMdlItems) {
    doorModelsDropdown.append(`<option disabled>Select Door Model</option>`);
    $.each(loadMdlItems, function (index, door) {
      doorModelsDropdown.append(
        `<option ${index === 0 ? "selected" : ""} value="${
          door?.itmValue
        }" data-modelPath="${door?.modelPath}" data-modelName="${
          door?.modelName
        }">${door?.itmName}</option>`
      );
    });
  }

  // Add default option
  doorShadesDropdown.append(`<option disabled>Select Door Shade</option>`);

  if (loadShadesItems) {
    $.each(loadShadesItems, function (index, door) {
      doorShadesDropdown.append(
        `<option value="${door?.itmValue}"  ${index === 4 ? "selected" : ""}>${
          door?.itmName
        }</option>`
      );
    });
  }

  const doorFrameTypeDropdown = $("#door-frameType");
  const doorFrameTypeOptionsDropdown = $("#door-frameTypeOptions");
  doorFrameTypeDropdown.empty();
  doorFrameTypeOptionsDropdown.empty();

  // Add default option
  doorFrameTypeDropdown.append(
    `<option selected disabled>Select Frame Type</option>`
  );

  let loadFMdlItems =
    MODEL_SETTINGS?.frames?.UIItems?.[selectedDoorFrame]?.frameType?.[
      selectedDoorDesign
    ]?.dropdownItems;
  if (loadFMdlItems) {
    $.each(loadFMdlItems, function (index, door) {
      doorFrameTypeDropdown.append(
        `<option value="${door?.itmValue}" ${index === 0 ? "selected" : ""}>${
          door?.itmName
        }</option>`
      );
    });
  }

  doorFrameTypeOptionsDropdown.append(
    `<option selected disabled>Select Option</option>`
  );

  let loadftMdlItems =
    MODEL_SETTINGS?.frames?.UIItems?.[selectedDoorFrame]?.frameType?.[
      selectedDoorDesign
    ]?.[selectedDoorFrameType]?.dropdownItems;
  if (loadftMdlItems) {
    $.each(loadftMdlItems, function (index, door) {
      doorFrameTypeOptionsDropdown.append(
        `<option value="${door?.itmValue}">${door?.itmName}</option>`
      );
    });
  }

  initDoorTypes(MODEL_SETTINGS?.["doors"]?.doorItems, "door-designs");
  initDoorTypes(MODEL_SETTINGS?.["frames"]?.frameItems, "frames");
  initDoorTypes(MODEL_SETTINGS?.["jamb"]?.jambItems, "jamb");
  initDoorTypes(
    MODEL_SETTINGS?.["architraves"]?.architravesItems,
    "architraves"
  );
