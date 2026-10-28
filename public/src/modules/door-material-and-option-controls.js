$("#door-design").on("change", function () {
  selectedDoorDesign = $(this).val();
  STORE_CUSTOMIZED_DATA.door_design["design"] = $(
    "#door-design option:selected"
  ).text();

  const subDesignDropdown = $("#door-subdesign");
  const doorModelsDropdown = $("#door-models");
  const doorShadesDropdown = $("#door-shades");

  // Clear old options
  subDesignDropdown.empty();
  doorModelsDropdown.empty();
  doorShadesDropdown.empty();

  //depends dropdown settings
  const doorFrameTypeOptionsDropdown = $("#door-frameTypeOptions");
  const doorFrameSectionDropdown = $("#door-frameSection");
  const doorFrontArchitraveDropdown = $("#door-frontArchitrave");
  const doorBackArchitraveDropdown = $("#door-backArchitrave");
  doorFrameTypeOptionsDropdown.empty();
  doorFrameSectionDropdown.empty();
  doorFrontArchitraveDropdown.empty();
  doorBackArchitraveDropdown.empty();

  const doorFrameTypeDropdown = $("#door-frameType");
  doorFrameTypeDropdown.empty();

  // Add default option
  doorFrameTypeDropdown.append(
    `<option selected disabled>Select Frame Type</option>`
  );

  let loadMdlItems =
    MODEL_SETTINGS?.frames?.UIItems?.[selectedDoorFrame]?.frameType?.[
      selectedDoorDesign
    ]?.dropdownItems;
  if (loadMdlItems) {
    $.each(loadMdlItems, function (index, door) {
      doorFrameTypeDropdown.append(
        `<option value="${door?.itmValue}">${door?.itmName}</option>`
      );
    });
  }

  // Add default option
  subDesignDropdown.append(
    `<option selected disabled>Select Sub Design</option>`
  );

  // If valid selection
  let doorSubDesignData =
    MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.UIItems;
  if (doorSubDesignData) {
    $.each(doorSubDesignData, function (index, door) {
      subDesignDropdown.append(
        `<option value="${door?.itmValue}">${door?.itmName}</option>`
      );
    });
  }
});

$("#door-frames").on("change", function () {
  previousSelectedDoorFrame = selectedDoorFrame;
  selectedDoorFrame = $(this).val();

  //Simple to work ( No - option )
  let selectedDoorFrameText = $(this).find("option:selected").text();
  if (selectedDoorFrameText === "No") {
    $("#doorOnly").hide();
    $("#doorOnly").trigger("click");
  } else {
    $("#doorOnly").show();
  }

  STORE_CUSTOMIZED_DATA.frame["frame"] = $(
    "#door-frames option:selected"
  ).text();

  //Reset all type of doors and render current selected door
  selectedFrameSection = "";
  selectedDoorThickness = "";
  const doorFrameSectionDropdown = $("#door-frameSection");
  doorFrameSectionDropdown.empty();
  $("#door-thickness").val("");
  resetDoorForChangedFrames(selectedDoorFrame);

  if (selectedDoorFrame === "full") {
    //half directly switch into full
    if (selectedDoorFrameType === "veneerProfileWrapping") {
      selectedDoorFrameType = "solidWood";
    }

    if (
      selectedDoorFrameType === "laminateWrapping" ||
      selectedDoorFrameType === "veneerProfileWrappingTeak"
    ) {
      if (scene.getObjectByName("full_2")) {
        scene.getObjectByName("full_2").visible = false;
      }
      if (scene.getObjectByName("half")) {
        scene.getObjectByName("half").visible = false;
      }
      if (scene.getObjectByName("3A")) {
        scene.getObjectByName("3A").visible = false;
        scene.getObjectByName("3a_front_architrave").visible = false;
        scene.getObjectByName("3a_back_architrave").visible = false;
      }
      if (scene.getObjectByName("3B")) {
        scene.getObjectByName("3B").visible = false;
        scene.getObjectByName("3b_front_architrave").visible = false;
        scene.getObjectByName("3b_back_architrave").visible = false;
      }
      loadAdjustableModelFull_1(ADJUSTABLE_MODEL_SETTINGS.modelFull_1, true);
    }
    if (
      selectedDoorFrameType === "laminateWrappingWallCase" ||
      selectedDoorFrameType === "veneerProfileWrappingTeakWallCase"
    ) {
      if (scene.getObjectByName("full_1")) {
        scene.getObjectByName("full_1").visible = false;
      }
      if (scene.getObjectByName("half")) {
        scene.getObjectByName("half").visible = false;
      }
      if (scene.getObjectByName("3A")) {
        scene.getObjectByName("3A").visible = false;
        scene.getObjectByName("3a_front_architrave").visible = false;
        scene.getObjectByName("3a_back_architrave").visible = false;
      }
      if (scene.getObjectByName("3B")) {
        scene.getObjectByName("3B").visible = false;
        scene.getObjectByName("3b_front_architrave").visible = false;
        scene.getObjectByName("3b_back_architrave").visible = false;
      }
      loadAdjustableModelFull_2(ADJUSTABLE_MODEL_SETTINGS.modelFull_2, true);
    }
    if (
      selectedDoorFrameType === "solidWoodJamb" ||
      selectedDoorFrameType === "solidWood" ||
      selectedDoorFrameType === "engineeringWood"
    ) {
      if (scene.getObjectByName("full_1")) {
        scene.getObjectByName("full_1").visible = false;
      }
      if (scene.getObjectByName("full_2")) {
        scene.getObjectByName("full_2").visible = false;
      }
      if (scene.getObjectByName("half")) {
        scene.getObjectByName("half").visible = false;
      }

      //New logic for ( shuffle the frame and shuffle the jamb )
      if (selectedJambLocation === "front") {
        loadAdjustableModel3a(ADJUSTABLE_MODEL_SETTINGS.model3a, true);
      } else if (selectedJambLocation === "back") {
        loadAdjustableModel3b(ADJUSTABLE_MODEL_SETTINGS.model3b, true);
      }
    }
  } else if (selectedDoorFrame === "no") {
    $("#doorOnly").prop("checked", true);
    visibleDoorOnly(true, false);
  } else if (selectedDoorFrame === "half") {
    if (scene.getObjectByName("full_1")) {
      scene.getObjectByName("full_1").visible = false;
    }
    if (scene.getObjectByName("full_2")) {
      scene.getObjectByName("full_2").visible = false;
    }
    if (scene.getObjectByName("3A")) {
      scene.getObjectByName("3A").visible = false;
      scene.getObjectByName("3a_front_architrave").visible = false;
      scene.getObjectByName("3a_back_architrave").visible = false;
    }
    if (scene.getObjectByName("3B")) {
      scene.getObjectByName("3B").visible = false;
      scene.getObjectByName("3b_front_architrave").visible = false;
      scene.getObjectByName("3b_back_architrave").visible = false;
    }

    loadAdjustableModelHalf(ADJUSTABLE_MODEL_SETTINGS.modelHalf, true);
  }

  const doorFrameTypeDropdown = $("#door-frameType");
  const doorFrameTypeOptionsDropdown = $("#door-frameTypeOptions");
  doorFrameTypeDropdown.empty();
  doorFrameTypeOptionsDropdown.empty();

  // Add default option
  doorFrameTypeDropdown.append(
    `<option selected disabled>Select Frame Type</option>`
  );

  let loadMdlItems =
    MODEL_SETTINGS?.frames?.UIItems?.[selectedDoorFrame]?.frameType?.[
      selectedDoorDesign
    ]?.dropdownItems;
  if (loadMdlItems) {
    $.each(loadMdlItems, function (index, door) {
      doorFrameTypeDropdown.append(
        `<option value="${door?.itmValue}">${door?.itmName}</option>`
      );
    });
  }

  if (selectedDoorFrame === "half" && selectedDoorFrameText !== "No") {
    otherModelCategory = "frames";
    otherModelType = "frame_type_1";

    $("#frame-customize-option").show();
    $("#wallOptions").show();
    $("#architraveoptions").show();
    $("#door-orientation-accordion").show();
    $("#WallThicknessDiv").hide();
    $("#jamboptions").hide();
    $("#doorThicknessOptions").show();

    camera.position.set(0, 0, 5);
  } else if (selectedDoorFrame === "full" && selectedDoorFrameText !== "No") {
    //$("#jamb-location option:eq(1)").prop("selected", true);
    $("#frame-customize-option").show();
    $("#architraveoptions").show();
    $("#wallOptions").show();
    $("#door-orientation-accordion").show();
    $("#WallThicknessDiv").show();
    $("#doorThicknessOptions").show();
    if (
      selectedDoorFrameType === "laminateWrapping" ||
      selectedDoorFrameType === "laminateWrappingWallCase"
    ) {
      $("#jamboptions").hide();
    } else {
      $("#jamboptions").show();
    }
    camera.position.set(0, 0, 5);
  } else if (selectedDoorFrame === "no" || selectedDoorFrameText === "No") {
    $("#frame-customize-option").hide();
    $("#wallOptions").hide();
    $("#architraveoptions").hide();
    $("#jamboptions").hide();
    $("#door-orientation-accordion").hide();
    $("#doorThicknessOptions").hide();
    camera.position.set(0, 0, 5);
  }
});

$("#door-orientation").on("change", function () {
  let orentation = $(this).val();
  STORE_CUSTOMIZED_DATA.orientation["position"] = $(
    "#door-orientation option:selected"
  ).text();
});

$("#door-threshold").on("change", function () {
  selectedDoorThreshold = $(this).val();
  STORE_CUSTOMIZED_DATA.threshold["option"] = $(
    "#door-threshold option:selected"
  ).text();

  if (selectedDoorThreshold === "yes") {
    if (scene.getObjectByName("3A")) {
      mesh_3a_threshold.visible = true;
    }
    if (scene.getObjectByName("3B")) {
      mesh_3b_threshold.visible = true;
    }
    if (scene.getObjectByName("half")) {
      mesh_half_threshold.visible = true;
    }
    if (scene.getObjectByName("full_1")) {
      mesh_full_1_threshold.visible = true;
    }
    if (scene.getObjectByName("full_2")) {
      mesh_full_2_threshold.visible = true;
    }
  } else if (selectedDoorThreshold === "no") {
    if (scene.getObjectByName("3A")) {
      mesh_3a_threshold.visible = false;
    }
    if (scene.getObjectByName("3B")) {
      mesh_3b_threshold.visible = false;
    }
    if (scene.getObjectByName("half")) {
      mesh_half_threshold.visible = false;
    }
    if (scene.getObjectByName("full_1")) {
      mesh_full_1_threshold.visible = false;
    }
    if (scene.getObjectByName("full_2")) {
      mesh_full_2_threshold.visible = false;
    }
  }
});

$("#door-frameType").on("change", function () {
  selectedDoorFrameType = $(this).val();
  STORE_CUSTOMIZED_DATA.frame["type"] = $(
    "#door-frameType option:selected"
  ).text();

  const doorFrameTypeOptionsDropdown = $("#door-frameTypeOptions");
  const doorFrameSectionDropdown = $("#door-frameSection");
  const doorFrontArchitraveDropdown = $("#door-frontArchitrave");
  const doorBackArchitraveDropdown = $("#door-backArchitrave");
  doorFrameTypeOptionsDropdown.empty();
  doorFrameSectionDropdown.empty();
  doorFrontArchitraveDropdown.empty();
  doorBackArchitraveDropdown.empty();

  // Add default option
  doorFrameTypeOptionsDropdown.append(
    `<option selected disabled>Select Option</option>`
  );

  let loadMdlItems =
    MODEL_SETTINGS?.frames?.UIItems?.[selectedDoorFrame]?.frameType?.[
      selectedDoorDesign
    ]?.[selectedDoorFrameType]?.dropdownItems;
  if (loadMdlItems) {
    $.each(loadMdlItems, function (index, door) {
      doorFrameTypeOptionsDropdown.append(
        `<option value="${door?.itmValue}">${door?.itmName}</option>`
      );
    });
  }

  //half
  if (selectedDoorFrame === "half") {
    const architraveDict = mesh_half_architrave_front.morphTargetDictionary;
    const architraveMesh = mesh_half_architrave_front;
    architraveMesh.morphTargetInfluences[architraveDict["S_60"]] = 0;
  }

  //full -> laminatewrapping
  if (selectedDoorFrame === "full") {
    if (
      selectedDoorFrameType === "laminateWrapping" ||
      selectedDoorFrameType === "veneerProfileWrappingTeak"
    ) {
      resetDoorForChangedFrames(selectedDoorFrame);

      if (scene.getObjectByName("half")) {
        scene.getObjectByName("half").visible = false;
      }
      if (scene.getObjectByName("full_2")) {
        scene.getObjectByName("full_2").visible = false;
      }
      if (scene.getObjectByName("3A")) {
        scene.getObjectByName("3A").visible = false;
        scene.getObjectByName("3a_front_architrave").visible = false;
        scene.getObjectByName("3a_back_architrave").visible = false;
      }
      if (scene.getObjectByName("3B")) {
        scene.getObjectByName("3B").visible = false;
        scene.getObjectByName("3b_front_architrave").visible = false;
        scene.getObjectByName("3b_back_architrave").visible = false;
      }
      loadAdjustableModelFull_1(ADJUSTABLE_MODEL_SETTINGS.modelFull_1, true);
      $("#jamboptions").hide();
    } else if (
      selectedDoorFrameType === "laminateWrappingWallCase" ||
      selectedDoorFrameType === "veneerProfileWrappingTeakWallCase"
    ) {
      resetDoorForChangedFrames(selectedDoorFrame);

      if (scene.getObjectByName("half")) {
        scene.getObjectByName("half").visible = false;
      }
      if (scene.getObjectByName("full_1")) {
        scene.getObjectByName("full_1").visible = false;
      }
      if (scene.getObjectByName("3B")) {
        scene.getObjectByName("3B").visible = false;
        scene.getObjectByName("3b_front_architrave").visible = false;
        scene.getObjectByName("3b_back_architrave").visible = false;
      }
      if (scene.getObjectByName("3A")) {
        scene.getObjectByName("3A").visible = false;
        scene.getObjectByName("3a_front_architrave").visible = false;
        scene.getObjectByName("3a_back_architrave").visible = false;
      }
      loadAdjustableModelFull_2(ADJUSTABLE_MODEL_SETTINGS.modelFull_2, true);
      $("#jamboptions").hide();
    } else if (
      selectedDoorFrameType === "solidWoodJamb" ||
      selectedDoorFrameType === "solidWood" ||
      selectedDoorFrameType === "engineeringWood"
    ) {
      resetDoorForChangedFrames(selectedDoorFrame);
      if (scene.getObjectByName("half")) {
        scene.getObjectByName("half").visible = false;
      }
      if (scene.getObjectByName("full_1")) {
        scene.getObjectByName("full_1").visible = false;
      }
      if (scene.getObjectByName("full_2")) {
        scene.getObjectByName("full_2").visible = false;
      }
      if (scene.getObjectByName("3B")) {
        scene.getObjectByName("3B").visible = false;
        scene.getObjectByName("3b_front_architrave").visible = false;
        scene.getObjectByName("3b_back_architrave").visible = false;
      }
      if (scene.getObjectByName("3A")) {
        scene.getObjectByName("3A").visible = false;
        scene.getObjectByName("3a_front_architrave").visible = false;
        scene.getObjectByName("3a_back_architrave").visible = false;
      }

      if (selectedJambLocation === "front") {
        loadAdjustableModel3a(ADJUSTABLE_MODEL_SETTINGS.model3a, true);
      } else if (selectedJambLocation === "back") {
        loadAdjustableModel3b(ADJUSTABLE_MODEL_SETTINGS.model3b, true);
      }

      if (selectedDoorFrameType === "engineeringWood") {
        $("#jamboptions").hide();
      } else {
        $("#jamboptions").show();
      }
    }
  }
});

$(document).on("change", "#door-frameSection", function () {
  //Door front/back
  let doorJambLoc = selectedJambLocation === "front" ? "3A" : "3B";
  const frameSectionDict = mesh_3a_90_60_frame.morphTargetDictionary;
  const thresholdDict = mesh_3a_threshold.morphTargetDictionary;
  const frameSection3bDict = mesh_3b_90_60_frame.morphTargetDictionary;
  const threshold3bDict = mesh_3b_threshold.morphTargetDictionary;
  const door3bDict = mesh_3b_Door.morphTargetDictionary;
  const doorlock3bDict = mesh_3b_DoorLock.morphTargetDictionary;

  //half
  const frameSectionHalfDict = mesh_half_frame?.morphTargetDictionary || "";
  const thresholdHalfDict = mesh_half_threshold?.morphTargetDictionary || "";
  const doorHalfDict = mesh_half_Door.morphTargetDictionary || "";
  const doorlockHalfDict = mesh_half_DoorLock.morphTargetDictionary || "";
  const architraveBackHalfDict =
    mesh_half_architrave_back.morphTargetDictionary || "";

  //Full 1
  const frameFull_1_Dict = mesh_full_1_frame?.morphTargetDictionary || "";
  const architraveFull_1_Dict =
    mesh_full_1_architrave?.morphTargetDictionary || "";
  const doorlockFull_1_Dict = mesh_full_1_DoorLock.morphTargetDictionary || "";
  const doorFull_1_Dict = mesh_full_1_Door.morphTargetDictionary || "";
  const thresholdFull_1_Dict =
    mesh_full_1_threshold.morphTargetDictionary || "";

  //Full 2
  const architraveFull_2_Dict =
    mesh_full_2_architrave?.morphTargetDictionary || "";
  const doorlockFull_2_Dict = mesh_full_2_DoorLock.morphTargetDictionary || "";
  const doorFull_2_Dict = mesh_full_2_Door.morphTargetDictionary || "";
  const thresholdFull_2_Dict =
    mesh_full_2_threshold.morphTargetDictionary || "";

  //Reset
  if (selectedFrameSection) {
    let framesection3bDictName = selectedFrameSection?.replace("_3a", "_3b");
    let thresholdDictName = selectedFrameSection?.replace("_F", "_T");
    let threshold3bDictName = selectedFrameSection
      ?.replace("_F", "_T")
      ?.replace("_3a", "_3b");

    if (selectedDoorFrame === "full") {
      if (
        selectedDoorFrameType === "solidWoodJamb" ||
        selectedDoorFrameType === "solidWood" ||
        selectedDoorFrameType === "engineeringWood"
      ) {
        if (scene.getObjectByName("3A")) {
          mesh_3a_90_60_frame.morphTargetInfluences[
            frameSectionDict[selectedFrameSection]
          ] = 0;
          mesh_3a_threshold.morphTargetInfluences[
            thresholdDict[thresholdDictName]
          ] = 0;
        }

        if (scene.getObjectByName("3B")) {
          mesh_3b_90_60_frame.morphTargetInfluences[
            frameSection3bDict[framesection3bDictName]
          ] = 0;
          mesh_3b_threshold.morphTargetInfluences[
            threshold3bDict[threshold3bDictName]
          ] = 0;
        }
      }
    } else if (selectedDoorFrame === "half") {
      //half
      if (scene.getObjectByName("half")) {
        mesh_half_frame.morphTargetInfluences[
          frameSectionHalfDict[selectedFrameSection]
        ] = 0;
        mesh_half_threshold.morphTargetInfluences[
          thresholdHalfDict[thresholdDictName]
        ] = 0;

        //door & lock for 3b
        if (selectedFrameSection?.includes("_115")) {
          mesh_half_architrave_back.morphTargetInfluences[
            architraveBackHalfDict["_115_A"]
          ] = 0;
        } else if (selectedFrameSection?.includes("_140")) {
          mesh_half_architrave_back.morphTargetInfluences[
            architraveBackHalfDict["_140_A"]
          ] = 0;
        } else if (selectedFrameSection?.includes("_150")) {
          mesh_half_architrave_back.morphTargetInfluences[
            architraveBackHalfDict["_150_A"]
          ] = 0;
        }
      }
    }
  }

  selectedFrameSection = $(this).val();
  STORE_CUSTOMIZED_DATA.frame["size"] = $(
    "#door-frameSection option:selected"
  ).text();
  STORE_CUSTOMIZED_DATA.frame["cost"] =
    $("#door-frameSection option:selected").data("cost") || "";

  let framesection3bDictName = selectedFrameSection?.replace("_3a", "_3b");
  let thresholdDictName = selectedFrameSection?.replace("_F", "_T");
  let threshold3bDictName = selectedFrameSection
    ?.replace("_F", "_T")
    ?.replace("_3a", "_3b");
  if (selectedDoorFrame === "full") {
    if (
      selectedDoorFrameType === "laminateWrapping" ||
      selectedDoorFrameType === "veneerProfileWrappingTeak" ||
      selectedDoorFrameType === "engineeringWood"
    ) {
      if (
        selectedDoorFrameTypeOption === "38mm" ||
        selectedDoorFrameTypeOption === "45mm"
      ) {
        mesh_full_1_frame.morphTargetInfluences[frameFull_1_Dict["_38_mm"]] =
          mesh_full_1_architrave.morphTargetInfluences[
            architraveFull_1_Dict["_38_mm"]
          ] =
          mesh_full_1_Door.morphTargetInfluences[doorFull_1_Dict["_38_mm"]] =
          mesh_full_1_threshold.morphTargetInfluences[
            thresholdFull_1_Dict["_38_mm"]
          ] =
            selectedFrameSection === "38mm" ? 1 : 0;
      }
    } else if (
      selectedDoorFrameType === "laminateWrappingWallCase" ||
      selectedDoorFrameType === "veneerProfileWrappingTeakWallCase"
    ) {
      if (
        selectedDoorFrameTypeOption === "38mm" ||
        selectedDoorFrameTypeOption === "45mm"
      ) {
        mesh_full_2_architrave.morphTargetInfluences[
          architraveFull_2_Dict["_38mm"]
        ] =
          mesh_full_2_Door.morphTargetInfluences[doorFull_2_Dict["_38mm"]] =
          mesh_full_2_threshold.morphTargetInfluences[
            thresholdFull_2_Dict["_38mm"]
          ] =
            selectedFrameSection === "38mm" ? 1 : 0;
      }
    } else if (
      selectedDoorFrameType === "solidWoodJamb" ||
      selectedDoorFrameType === "solidWood"
    ) {
      if (scene.getObjectByName("3A")) {
        mesh_3a_90_60_frame.morphTargetInfluences[
          frameSectionDict[selectedFrameSection]
        ] = 1;
        mesh_3a_threshold.morphTargetInfluences[
          thresholdDict[thresholdDictName]
        ] = 1;
      }

      if (scene.getObjectByName("3B")) {
        mesh_3b_90_60_frame.morphTargetInfluences[
          frameSection3bDict[framesection3bDictName]
        ] = 1;
        mesh_3b_threshold.morphTargetInfluences[
          threshold3bDict[threshold3bDictName]
        ] = 1;
      }

      const fullDoorMesh3a =
        [
          "VE_6",
          "VE_7",
          "VL_15",
          "RP_2",
          "RP_3",
          "RP_4",
          "SC_2",
          "SC_3",
          "SC_4",
        ]?.indexOf(selectedDoorModelType) != -1
          ? DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["3A"]?.[
              selectedDoorModelType
            ]?.mesh
          : DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["3A"]?.["plain"]?.mesh;

      const fullDoorMesh3b =
        [
          "VE_6",
          "VE_7",
          "VL_15",
          "RP_2",
          "RP_3",
          "RP_4",
          "SC_2",
          "SC_3",
          "SC_4",
        ]?.indexOf(selectedDoorModelType) != -1
          ? DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["3B"]?.[
              selectedDoorModelType
            ]?.mesh
          : DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["3B"]?.["plain"]?.mesh;

      halfDoorMeshActions("frameSection", fullDoorMesh3a);
      halfDoorMeshActions("frameSection", fullDoorMesh3b);
    }
  } else if (selectedDoorFrame === "half") {
    //half
    if (scene.getObjectByName("half")) {
      mesh_half_frame.morphTargetInfluences[
        frameSectionHalfDict[selectedFrameSection]
      ] = 1;
      mesh_half_threshold.morphTargetInfluences[
        thresholdHalfDict[thresholdDictName]
      ] = 1;

      //door & lock for 3b
      if (selectedFrameSection?.includes("_115")) {
        mesh_half_architrave_back.morphTargetInfluences[
          architraveBackHalfDict["_115_A"]
        ] = 1;
      } else if (selectedFrameSection?.includes("_140")) {
        mesh_half_architrave_back.morphTargetInfluences[
          architraveBackHalfDict["_140_A"]
        ] = 1;
      } else if (selectedFrameSection?.includes("_150")) {
        mesh_half_architrave_back.morphTargetInfluences[
          architraveBackHalfDict["_150_A"]
        ] = 1;
      }
      const halfDoorMesh =
        [
          "VE_6",
          "VE_7",
          "VL_15",
          "RP_2",
          "RP_3",
          "RP_4",
          "SC_2",
          "SC_3",
          "SC_4",
        ]?.indexOf(selectedDoorModelType) != -1
          ? DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.[selectedDoorModelType]
              ?.mesh
          : DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["plain"]?.mesh;

      halfDoorMeshActions("frameSection", halfDoorMesh);
    }
  }
});

$(document).on("change", "#door-thickness", function () {
  //Door front/back
  let doorJambLoc = selectedJambLocation === "front" ? "3A" : "3B";
  //3a
  const frameSectionDict = mesh_3a_90_60_frame.morphTargetDictionary;
  const thresholdDict = mesh_3a_threshold.morphTargetDictionary;
  const doorLockDict = mesh_DoorLock.morphTargetDictionary;
  const doorDict = mesh_Door.morphTargetDictionary;
  //3b
  const frameSection3bDict = mesh_3b_90_60_frame.morphTargetDictionary;
  const threshold3bDict = mesh_3b_threshold.morphTargetDictionary;
  const doorLock3bDict = mesh_3b_DoorLock.morphTargetDictionary;
  const door3bDict = mesh_3b_Door.morphTargetDictionary;

  //half
  const frameSectionHalfDict = mesh_half_frame.morphTargetDictionary;
  const thresholdHalfDict = mesh_half_threshold.morphTargetDictionary;
  const doorLockHalfDict = mesh_half_DoorLock.morphTargetDictionary;
  const doorHalfDict = mesh_half_Door.morphTargetDictionary;

  //Full 1
  const framefull_1_fDict = mesh_full_1_frame.morphTargetDictionary;
  const thresholdfull_1_Dict = mesh_full_1_threshold.morphTargetDictionary;
  const doorLockfull_1_Dict = mesh_full_1_DoorLock.morphTargetDictionary;
  const doorfull_1_Dict = mesh_full_1_Door.morphTargetDictionary;

  //Full 1
  const architravefull_2_fDict = mesh_full_2_architrave.morphTargetDictionary;
  const thresholdfull_2_Dict = mesh_full_2_threshold.morphTargetDictionary;

  const doorfull_2_Dict = mesh_full_2_Door.morphTargetDictionary;

  //Reset
  if (selectedDoorThickness && selectedDoorThickness !== "DT_32") {
    if (selectedDoorFrame === "full") {
      if (selectedDoorFrameType === "laminateWrapping") {
        mesh_full_1_frame.morphTargetInfluences[
          framefull_1_fDict[selectedDoorThickness]
        ] = 0;

        mesh_full_1_threshold.morphTargetInfluences[
          thresholdfull_1_Dict[selectedDoorThickness]
        ] = 0;

        mesh_full_1_Door.morphTargetInfluences[
          doorfull_1_Dict[selectedDoorThickness]
        ] = 0;
      } else if (
        selectedDoorFrameType === "solidWoodJamb" ||
        selectedDoorFrameType === "solidWood" ||
        selectedDoorFrameType === "engineeringWood"
      ) {
        if (scene.getObjectByName("3A")) {
          mesh_3a_90_60_frame.morphTargetInfluences[
            frameSectionDict[selectedDoorThickness]
          ] = 0;
          mesh_3a_threshold.morphTargetInfluences[
            thresholdDict[selectedDoorThickness]
          ] = 0;
        }

        if (scene.getObjectByName("3B")) {
          mesh_3b_90_60_frame.morphTargetInfluences[
            frameSection3bDict[selectedDoorThickness]
          ] = 0;
          mesh_3b_threshold.morphTargetInfluences[
            threshold3bDict[selectedDoorThickness]
          ] = 0;
        }
      } else if (selectedDoorFrameType === "laminateWrappingWallCase") {
        mesh_full_2_architrave.morphTargetInfluences[
          architravefull_2_fDict[selectedDoorThickness]
        ] = 0;

        mesh_full_2_threshold.morphTargetInfluences[
          thresholdfull_2_Dict[selectedDoorThickness]
        ] = 0;

        mesh_full_2_Door.morphTargetInfluences[
          doorfull_2_Dict[selectedDoorThickness]
        ] = 0;
      }
    } else if (selectedDoorFrame === "half") {
      mesh_half_frame.morphTargetInfluences[
        frameSectionHalfDict[selectedDoorThickness]
      ] = 0;
      mesh_half_threshold.morphTargetInfluences[
        thresholdHalfDict[selectedDoorThickness]
      ] = 0;
    }
  }
  selectedDoorThickness = $(this).val();
  STORE_CUSTOMIZED_DATA.door_thickness["value"] = $(
    "#door-thickness option:selected"
  )
    .text()
    ?.replace("DT_", "");
  STORE_CUSTOMIZED_DATA.door_thickness["cost"] =
    COSTING?.door?.[selectedDoorDesign]?.[selectedDoorSubDesign]?.[
      selectedDoorThickness
    ]?.cost || 0;

  if (selectedDoorFrame === "full") {
    if (selectedDoorFrameType === "laminateWrapping") {
      mesh_full_1_frame.morphTargetInfluences[
        framefull_1_fDict[selectedDoorThickness]
      ] = 1;

      mesh_full_1_threshold.morphTargetInfluences[
        thresholdfull_1_Dict[selectedDoorThickness]
      ] = 1;

      mesh_full_1_Door.morphTargetInfluences[
        doorfull_1_Dict[selectedDoorThickness]
      ] = 1;
    } else if (
      selectedDoorFrameType === "solidWoodJamb" ||
      selectedDoorFrameType === "solidWood" ||
      selectedDoorFrameType === "engineeringWood"
    ) {
      if (scene.getObjectByName("3A")) {
        mesh_3a_90_60_frame.morphTargetInfluences[
          frameSectionDict[selectedDoorThickness]
        ] = 1;
        mesh_3a_threshold.morphTargetInfluences[
          thresholdDict[selectedDoorThickness]
        ] = 1;
      }

      if (scene.getObjectByName("3B")) {
        mesh_3b_90_60_frame.morphTargetInfluences[
          frameSection3bDict[selectedDoorThickness]
        ] = 1;
        mesh_3b_threshold.morphTargetInfluences[
          threshold3bDict[selectedDoorThickness]
        ] = 1;
      }

      const doorMesh3a =
        [
          "VE_6",
          "VE_7",
          "VL_15",
          "RP_2",
          "RP_3",
          "RP_4",
          "SC_2",
          "SC_3",
          "SC_4",
        ]?.indexOf(selectedDoorModelType) != -1
          ? DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["3A"]?.[
              selectedDoorModelType
            ]?.mesh
          : DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["3A"]?.["plain"]?.mesh;

      const doorMesh3b =
        [
          "VE_6",
          "VE_7",
          "VL_15",
          "RP_2",
          "RP_3",
          "RP_4",
          "SC_2",
          "SC_3",
          "SC_4",
        ]?.indexOf(selectedDoorModelType) != -1
          ? DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["3B"]?.[
              selectedDoorModelType
            ]?.mesh
          : DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["3B"]?.["plain"]?.mesh;

      halfDoorMeshActions("doorThickness", doorMesh3a);
      halfDoorMeshActions("doorThickness", doorMesh3b);
    } else if (selectedDoorFrameType === "laminateWrappingWallCase") {
      mesh_full_2_architrave.morphTargetInfluences[
        architravefull_2_fDict[selectedDoorThickness]
      ] = 1;

      mesh_full_2_threshold.morphTargetInfluences[
        thresholdfull_2_Dict[selectedDoorThickness]
      ] = 1;

      mesh_full_2_Door.morphTargetInfluences[
        doorfull_2_Dict[selectedDoorThickness]
      ] = 1;
    }
  } else if (selectedDoorFrame === "half") {
    mesh_half_frame.morphTargetInfluences[
      frameSectionHalfDict[selectedDoorThickness]
    ] = 1;

    mesh_half_threshold.morphTargetInfluences[
      thresholdHalfDict[selectedDoorThickness]
    ] = 1;

    const halfDoorMesh =
      [
        "VE_6",
        "VE_7",
        "VL_15",
        "RP_2",
        "RP_3",
        "RP_4",
        "SC_2",
        "SC_3",
        "SC_4",
      ]?.indexOf(selectedDoorModelType) != -1
        ? DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.[selectedDoorModelType]
            ?.mesh
        : DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["plain"]?.mesh;

    halfDoorMeshActions("doorThickness", halfDoorMesh);
  }
});

$(document).on(
  "change",
  "#door-frontArchitrave,#door-backArchitrave",
  function () {
    let id = $(this).attr("id");
    let opt = $(this).val();
    STORE_CUSTOMIZED_DATA.architrave[
      id === "door-frontArchitrave" ? "front" : "back"
    ] = opt;

    if (selectedDoorFrame === "full") {
      const architraveDict =
        id === "door-frontArchitrave"
          ? mesh_3a_architrave_front.morphTargetDictionary
          : mesh_3a_architrave_back.morphTargetDictionary;
      const architraveMesh =
        id === "door-frontArchitrave"
          ? mesh_3a_architrave_front
          : mesh_3a_architrave_back;

      //3b
      const architrave3bDict =
        id === "door-frontArchitrave"
          ? mesh_3b_architrave_front.morphTargetDictionary
          : mesh_3b_architrave_back.morphTargetDictionary;
      const architrave3bMesh =
        id === "door-frontArchitrave"
          ? mesh_3b_architrave_front
          : mesh_3b_architrave_back;

      architraveMesh.morphTargetInfluences[architraveDict["S60"]] =
        opt === "S60" ? 1 : 0;

      architrave3bMesh.morphTargetInfluences[architrave3bDict["S60"]] =
        opt === "S60" ? 1 : 0;
    } else if (selectedDoorFrame === "half") {
      const architraveDict =
        id === "door-frontArchitrave"
          ? mesh_half_architrave_front.morphTargetDictionary
          : "";
      const architraveMesh =
        id === "door-frontArchitrave" ? mesh_half_architrave_front : "";
      if (opt === "S60" || opt === "S40") {
        mesh_half_architrave_front.visible = true;
        mesh_half_l_architrave.visible = false;
        architraveMesh.morphTargetInfluences[architraveDict["S_60"]] =
          opt === "S60" ? 1 : 0;
      } else {
        mesh_half_architrave_front.visible = false;
        mesh_half_l_architrave.visible = true;
      }
    }
  }
);

$("#door-frameTypeOptions").on("change", function () {
  selectedDoorFrameTypeOption = $(this).val();
  STORE_CUSTOMIZED_DATA.frame["Section"] = $(
    "#door-frameTypeOptions option:selected"
  ).text();

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

  if (loadMdlItems) {
    let wallThicknessValue = $("#WallThicknessSlider").val();
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

  //Front / back architrave options
  const doorFrontArchitraveDropdown = $("#door-frontArchitrave");
  doorFrontArchitraveDropdown.empty();
  // Add default option
  doorFrontArchitraveDropdown.append(
    `<option value="" selected >Select Value</option>`
  );
  let loadFrontArchitraveMdlItems =
    MODEL_SETTINGS?.frames?.UIItems?.[selectedDoorFrame]?.frontArchitrave?.[
      selectedDoorDesign
    ]?.[selectedDoorFrameType]?.[selectedDoorFrameTypeOption]?.dropdownItems;

  if (loadFrontArchitraveMdlItems) {
    $.each(loadFrontArchitraveMdlItems, function (index, door) {
      //  THIYAGUU (updated for user not select architrave)
      doorFrontArchitraveDropdown.append(
        `<option value="${door?.itmValue}">${door?.itmName}</option>`
      );
    });
  }

  const doorBackArchitraveDropdown = $("#door-backArchitrave");
  doorBackArchitraveDropdown.empty();
  // Add default option
  doorBackArchitraveDropdown.append(
    `<option value="" selected>Select Value</option>`
  );
  let loadBackArchitraveMdlItems =
    MODEL_SETTINGS?.frames?.UIItems?.[selectedDoorFrame]?.backArchitrave?.[
      selectedDoorDesign
    ]?.[selectedDoorFrameType]?.[selectedDoorFrameTypeOption]?.dropdownItems;

  if (loadBackArchitraveMdlItems) {
    $.each(loadBackArchitraveMdlItems, function (index, door) {
      //  THIYAGUU (updated for user not select architrave)
      doorBackArchitraveDropdown.append(
        `<option value="${door?.itmValue}">${door?.itmName}</option>`
      );
    });
  }
});

$("#door-subdesign").on("change", function () {
  if (selectedDoorDesign === "veneer") {
    const unavailableForVeneer = ["DT_32", "DT_35", "DT_38"];
    $("#door-thickness").val(""); // reset selection
    $("#door-thickness option").each(function () {
      const v = $(this).val();
      if (unavailableForVeneer.includes(v)) {
        $(this).prop("disabled", true);
      } else {
        $(this).prop("disabled", false);
      }
    });
  } else {
    // Re-enable all for non-veneer (handled per sub-design below)
    $("#door-thickness option").each(function () {
      $(this).prop("disabled", false);
    });
  }
  //Door front/back
  let doorJambLoc = selectedJambLocation === "front" ? "3A" : "3B";
  selectedDoorSubDesign = $(this).val();
  STORE_CUSTOMIZED_DATA.door_design["type"] = $(
    "#door-subdesign option:selected"
  ).text();

  if (selectedDoorSubDesign === "elite") {
    selectedDoorModelType = "LE_1";
  } else if (selectedDoorSubDesign === "flute") {
    selectedDoorModelType = "LF_1";
  } else if (selectedDoorSubDesign === "plantina") {
    selectedDoorModelType = "LP_1";
  } else if (selectedDoorSubDesign === "titan") {
    selectedDoorModelType = "LT_1";
  } else if (selectedDoorSubDesign === "emporium") {
    selectedDoorModelType = "VE_1";
  } else if (selectedDoorSubDesign === "luxe") {
    selectedDoorModelType = "VL_1";
  } else if (selectedDoorSubDesign === "classic") {
    selectedDoorModelType = "SC_1";
  } else if (selectedDoorSubDesign === "RP") {
    selectedDoorModelType = "RP_1";
  }
  //Dynamic door rendering

  //Half door

  if (
    selectedDoorSubDesign === "emporium" ||
    selectedDoorSubDesign === "luxe"
  ) {
    //Doorthickness config
    const disabledDoorThickness = ["DT_32", "DT_35", "DT_38"];
    $("#door-thickness").val("");
    $("#door-thickness option").each(function () {
      const optionValue = $(this).val();

      if (disabledDoorThickness.includes(optionValue)) {
        $(this).prop("disabled", true);
      } else {
        $(this).prop("disabled", false);
      }
    });
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
  } else if (
    selectedDoorSubDesign === "RP" ||
    selectedDoorSubDesign === "classic"
  ) {
    let dynamicDoorData =
      MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.models?.[
        selectedDoorSubDesign
      ]?.[selectedDoorModelType];

    //Doorthickness config
    if (selectedDoorSubDesign === "classic") {
      const disabledDoorThickness = [
        "DT_35",
        "DT_38",
        "DT_40",
        "DT_45",
        "DT_50",
      ];
      $("#door-thickness").val("");
      $("#door-thickness option").each(function () {
        const optionValue = $(this).val();

        if (disabledDoorThickness.includes(optionValue)) {
          $(this).prop("disabled", true);
        } else {
          $(this).prop("disabled", false);
        }
      });
    } else {
      $("#door-thickness").val("");
      $("#door-thickness option").each(function () {
        const optionValue = $(this).val();
        $(this).prop("disabled", true);
      });
    }

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
        selectedDoorFrameType !== "laminateWrapping" &&
        selectedDoorFrameType !== "laminateWrappingWallCase" &&
        selectedDoorFrameType !== "veneerProfileWrappingTeak" &&
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
  } else {
    //Doorthickness config
    $("#door-thickness").val("");
    $("#door-thickness option").each(function () {
      const optionValue = $(this).val();
      $(this).prop("disabled", false);
    });
  }

  let loadMdlItems =
    MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.models?.[
      selectedDoorSubDesign
    ]?.UIItems;

  const loadShadesItems = [
    ...(MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.shades?.[
      selectedDoorSubDesign
    ]?.UIItems?.[selectedDoorModelType] || []),
  ].sort((a, b) => a.itmName.localeCompare(b.itmName));

  loadDoorModels(loadMdlItems);
  loadDoorShades(loadShadesItems);
});
