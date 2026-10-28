  function loadDoorModels(mdlItems) {
    const doorModelsDropdown = $("#door-models");

    // Clear old options
    doorModelsDropdown.empty();

    if (
      selectedDoorDesign === "laminate" &&
      (selectedDoorSubDesign === "elite" || selectedDoorSubDesign === "titan")
    ) {
      doorModelsDropdown.prop("selectedIndex", 1);
    } else if (
      selectedDoorDesign === "veneer" &&
      (selectedDoorSubDesign === "emporium" || selectedDoorSubDesign === "luxe")
    ) {
      if (selectedDoorSubDesign === "emporium") {
        doorModelsDropdown.prop("selectedIndex", 1);
      } else if (selectedDoorSubDesign === "luxe") {
        doorModelsDropdown.prop("selectedIndex", 1);
      }
    } else {
      doorModelsDropdown.prop("selectedIndex", 1);
    }

    // If valid selection
    if (mdlItems) {
      $.each(mdlItems, function (index, door) {
        doorModelsDropdown.append(
          `<option value="${door?.itmValue}" data-modelPath="${door?.modelPath}" data-modelName="${door?.modelName}">${door?.itmName}</option>`
        );
      });
    }
  }

