  function changeWallThicknessFrameSectionReset() {
    const doorFrameSectionDropdown = $("#door-frameSection");
    doorFrameSectionDropdown.empty();

    // Add default option
    doorFrameSectionDropdown.append(
      `<option selected disabled>Select Frame Section</option>`
    );
    let loadMdlItems =
      MODEL_SETTINGS?.frames?.UIItems?.[selectedDoorFrame]?.frameSection?.[
        selectedDoorDesign
      ]?.[selectedDoorFrameType]?.[selectedDoorFrameTypeOption]?.dropdownItems;
    let wallThicknessValue = $("#WallThicknessSlider").val();
    if (loadMdlItems) {
      $.each(loadMdlItems, function (index, door) {
        if (
          selectedDoorFrameTypeOption === "solidWoodEnggSolidAfricanTeak" ||
          selectedDoorFrameTypeOption === "solidWoodEnggMahogany"
        ) {
          if (
            (wallThicknessValue >= 220 && door?.itmValue?.includes("_220")) ||
            (wallThicknessValue >= 160 && door?.itmValue?.includes("_160")) ||
            (wallThicknessValue >= 180 && door?.itmValue?.includes("_180")) ||
            (wallThicknessValue >= 250 && door?.itmValue?.includes("_250"))
          ) {
            doorFrameSectionDropdown.append(
              `<option value="${door?.itmValue}" data-cost="${door?.cost}">${door?.itmName}</option>`
            );
          }
        } else if (
          (selectedDoorFrameTypeOption === "38mm" ||
            selectedDoorFrameTypeOption === "45mm") &&
          selectedDoorFrame === "full" &&
          (selectedDoorFrameType === "laminateWrapping" ||
            selectedDoorFrameType === "veneerProfileWrappingTeak")
        ) {
          if (index == 0) {
            doorFrameSectionDropdown.append(
              `<option value="${door?.itmValue}" data-cost="${door?.cost}">${wallThicknessValue} X ${selectedDoorFrameTypeOption}</option>`
            );
          }
        } else if (
          (selectedDoorFrameTypeOption === "solidAfricanTeak" ||
            selectedDoorFrameTypeOption === "mahoganyHardwood") &&
          selectedDoorFrame === "full" &&
          selectedDoorFrameType === "engineeringWood"
        ) {
          if (index == 0) {
            doorFrameSectionDropdown.append(
              `<option value="${door?.itmValue}" data-cost="${door?.cost}">${wallThicknessValue} X 50 mm</option>`
            );
          }
        } else {
          doorFrameSectionDropdown.append(
            `<option value="${door?.itmValue}" data-cost="${door?.cost}">${door?.itmName}</option>`
          );
        }
      });
    }

    if (
      selectedDoorFrame === "full" &&
      (selectedDoorFrameType === "laminateWrappingWallCase" ||
        selectedDoorFrameType === "veneerProfileWrappingTeakWallCase")
    ) {
      const doorFrontArchitraveDropdown = $("#door-frontArchitrave");
      const doorBackArchitraveDropdown = $("#door-backArchitrave");
      doorFrontArchitraveDropdown.empty();
      doorBackArchitraveDropdown.empty();

      const architravefull_2_Dict =
        mesh_full_2_architrave.morphTargetDictionary;
      mesh_full_2_architrave.morphTargetInfluences[
        architravefull_2_Dict["L_100_45"]
      ] = 0;
      mesh_full_2_architrave.morphTargetInfluences[
        architravefull_2_Dict["L_80_80"]
      ] = 0;
      mesh_full_2_architrave.morphTargetInfluences[
        architravefull_2_Dict["L_100_80"]
      ] = 0;
      mesh_full_2_architrave.morphTargetInfluences[
        architravefull_2_Dict["L_100_100"]
      ] = 0;

      const wallfull_2_Dict = mesh_full_2_wall.morphTargetDictionary;
      mesh_full_2_wall.morphTargetInfluences[wallfull_2_Dict["L_100_45"]] = 0;
      mesh_full_2_wall.morphTargetInfluences[wallfull_2_Dict["L_80_80"]] = 0;
      mesh_full_2_wall.morphTargetInfluences[wallfull_2_Dict["L_100_80"]] = 0;
      mesh_full_2_wall.morphTargetInfluences[wallfull_2_Dict["L_100_100"]] = 0;
      if (wallThicknessValue >= 140 && wallThicknessValue <= 164) {
        doorFrontArchitraveDropdown.append(
          `<option selected disabled>60 x 80</option>`
        );
        doorBackArchitraveDropdown.append(
          `<option selected disabled>60 x 33</option>`
        );
      } else if (wallThicknessValue >= 165 && wallThicknessValue <= 188) {
        doorFrontArchitraveDropdown.append(
          `<option selected disabled>60 x 100</option>`
        );
        doorBackArchitraveDropdown.append(
          `<option selected disabled>60 x 45</option>`
        );
        mesh_full_2_architrave.morphTargetInfluences[
          architravefull_2_Dict["L_100_45"]
        ] = 1;
        mesh_full_2_wall.morphTargetInfluences[wallfull_2_Dict["L_100_45"]] = 1;
      } else if (wallThicknessValue >= 189 && wallThicknessValue <= 213) {
        doorFrontArchitraveDropdown.append(
          `<option selected disabled>60 x 80</option>`
        );
        doorBackArchitraveDropdown.append(
          `<option selected disabled>60 x 80</option>`
        );
        mesh_full_2_architrave.morphTargetInfluences[
          architravefull_2_Dict["L_80_80"]
        ] = 1;
        mesh_full_2_wall.morphTargetInfluences[wallfull_2_Dict["L_80_80"]] = 1;
      } else if (wallThicknessValue >= 214 && wallThicknessValue <= 238) {
        doorFrontArchitraveDropdown.append(
          `<option selected disabled>60 x 100</option>`
        );
        doorBackArchitraveDropdown.append(
          `<option selected disabled>60 x 80</option>`
        );
        mesh_full_2_architrave.morphTargetInfluences[
          architravefull_2_Dict["L_100_80"]
        ] = 1;
        mesh_full_2_wall.morphTargetInfluences[wallfull_2_Dict["L_100_80"]] = 1;
      } else if (wallThicknessValue >= 239 && wallThicknessValue <= 260) {
        doorFrontArchitraveDropdown.append(
          `<option selected disabled>60 x 100</option>`
        );
        doorBackArchitraveDropdown.append(
          `<option selected disabled>60 x 100</option>`
        );
        mesh_full_2_architrave.morphTargetInfluences[
          architravefull_2_Dict["L_100_100"]
        ] = 1;
        mesh_full_2_wall.morphTargetInfluences[
          wallfull_2_Dict["L_100_100"]
        ] = 1;
      }
    }
  }

  $("#WallHeightText").on("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
    let val = parseInt(this.value, 10);

    if (!isNaN(val) && val >= 1800 && val <= 2400) {
      $("#WallHeightBtn").prop("disabled", false);
    } else {
      $("#WallHeightBtn").prop("disabled", true);
    }
  });

  $("#WallWidthText").on("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
    let val = parseInt(this.value, 10);

    if (!isNaN(val) && val >= 600 && val <= 1200) {
      $("#WallWidthBtn").prop("disabled", false);
    } else {
      $("#WallWidthBtn").prop("disabled", true);
    }
  });

  $("#WallThicknessText").on("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
    let val = parseInt(this.value, 10);

    if (!isNaN(val) && val >= 140 && val <= 260) {
      $("#WallThicknessBtn").prop("disabled", false);
    } else {
      $("#WallThicknessBtn").prop("disabled", true);
    }
  });

