function adjustWallHeightWidthConfig() {
  if (scene.getObjectByName("3A")) {
    //3A Frame
    const frame3ADict = mesh_3a_90_60_frame.morphTargetDictionary;
    mesh_3a_90_60_frame.morphTargetInfluences[frame3ADict["width"]] =
      wallBlendWidth;
    mesh_3a_90_60_frame.morphTargetInfluences[frame3ADict["height"]] =
      wallBlendHeight;

    //3A Architrave front / back
    const frontArchitrave3ADict =
      mesh_3a_architrave_front.morphTargetDictionary;
    mesh_3a_architrave_front.morphTargetInfluences[
      frontArchitrave3ADict["width"]
    ] = wallBlendWidth;
    mesh_3a_architrave_front.morphTargetInfluences[
      frontArchitrave3ADict["height"]
    ] = wallBlendHeight;

    const backArchitrave3ADict = mesh_3a_architrave_back.morphTargetDictionary;
    mesh_3a_architrave_back.morphTargetInfluences[
      backArchitrave3ADict["width"]
    ] = wallBlendWidth;
    mesh_3a_architrave_back.morphTargetInfluences[
      backArchitrave3ADict["height"]
    ] = wallBlendHeight;

    //3A Jamb
    const jamb3ADict = mesh_3a_jamb.morphTargetDictionary;
    mesh_3a_jamb.morphTargetInfluences[jamb3ADict["width"]] = wallBlendWidth;
    mesh_3a_jamb.morphTargetInfluences[jamb3ADict["height"]] = wallBlendHeight;

    //3A Threshold
    const threshold3ADict = mesh_3a_threshold.morphTargetDictionary;
    mesh_3a_threshold.morphTargetInfluences[threshold3ADict["width"]] =
      wallBlendWidth;

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
        ? DOOR_MODELS?.["full"]?.["door"]?.["3A"]?.[selectedDoorModelType]?.mesh
        : DOOR_MODELS?.["full"]?.["door"]?.["3A"]?.["plain"]?.mesh;

    halfDoorMeshActions("heightWidth", doorMesh3a);
  }

  //3B
  if (scene.getObjectByName("3B")) {
    //3B Frame
    const frame3BDict = mesh_3b_90_60_frame.morphTargetDictionary;
    mesh_3b_90_60_frame.morphTargetInfluences[frame3BDict["width"]] =
      wallBlendWidth;
    mesh_3b_90_60_frame.morphTargetInfluences[frame3BDict["height"]] =
      wallBlendHeight;

    //3B Architrave front / back
    const frontArchitrave3BDict =
      mesh_3b_architrave_front.morphTargetDictionary;
    mesh_3b_architrave_front.morphTargetInfluences[
      frontArchitrave3BDict["width"]
    ] = wallBlendWidth;
    mesh_3b_architrave_front.morphTargetInfluences[
      frontArchitrave3BDict["height"]
    ] = wallBlendHeight;

    const backArchitrave3BDict = mesh_3b_architrave_back.morphTargetDictionary;
    mesh_3b_architrave_back.morphTargetInfluences[
      backArchitrave3BDict["width"]
    ] = wallBlendWidth;
    mesh_3b_architrave_back.morphTargetInfluences[
      backArchitrave3BDict["height"]
    ] = wallBlendHeight;

    //3B Jamb
    const jamb3BDict = mesh_3b_jamb.morphTargetDictionary;
    mesh_3b_jamb.morphTargetInfluences[jamb3BDict["width"]] = wallBlendWidth;
    mesh_3b_jamb.morphTargetInfluences[jamb3BDict["height"]] = wallBlendHeight;

    //3B Threshold
    const threshold3BDict = mesh_3b_threshold.morphTargetDictionary;
    mesh_3b_threshold.morphTargetInfluences[threshold3BDict["width"]] =
      wallBlendWidth;

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
        ? DOOR_MODELS?.["full"]?.["door"]?.["3B"]?.[selectedDoorModelType]?.mesh
        : DOOR_MODELS?.["full"]?.["door"]?.["3B"]?.["plain"]?.mesh;

    halfDoorMeshActions("heightWidth", doorMesh3b);
  }

  //half
  if (scene.getObjectByName("half")) {
    const frameHalfDict = mesh_half_frame.morphTargetDictionary;
    mesh_half_frame.morphTargetInfluences[frameHalfDict["width"]] =
      wallBlendWidth;
    mesh_half_frame.morphTargetInfluences[frameHalfDict["height"]] =
      wallBlendHeight;

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
        ? DOOR_MODELS?.["half"]?.["door"]?.[selectedDoorModelType]?.mesh
        : DOOR_MODELS?.["half"]?.["door"]?.["plain"]?.mesh;

    halfDoorMeshActions("heightWidth", halfDoorMesh);

    const thresholdHalfDict = mesh_half_threshold.morphTargetDictionary;
    mesh_half_threshold.morphTargetInfluences[thresholdHalfDict["width"]] =
      wallBlendWidth;

    const architraveFrontHalfDict =
      mesh_half_architrave_front.morphTargetDictionary;
    mesh_half_architrave_front.morphTargetInfluences[
      architraveFrontHalfDict["width"]
    ] = wallBlendWidth;
    mesh_half_architrave_front.morphTargetInfluences[
      architraveFrontHalfDict["height"]
    ] = wallBlendHeight;

    const architraveBackHalfDict =
      mesh_half_architrave_back.morphTargetDictionary;
    mesh_half_architrave_back.morphTargetInfluences[
      architraveBackHalfDict["width"]
    ] = wallBlendWidth;
    mesh_half_architrave_back.morphTargetInfluences[
      architraveBackHalfDict["height"]
    ] = wallBlendHeight;

    const larchitravefrontHalfDict =
      mesh_half_l_architrave.morphTargetDictionary;
    mesh_half_l_architrave.morphTargetInfluences[
      larchitravefrontHalfDict["width"]
    ] = wallBlendWidth;
    mesh_half_l_architrave.morphTargetInfluences[
      larchitravefrontHalfDict["height"]
    ] = wallBlendHeight;
  }

  //Full_1

  if (scene.getObjectByName("full_1")) {
    const framefull_1_Dict = mesh_full_1_frame.morphTargetDictionary;
    mesh_full_1_frame.morphTargetInfluences[framefull_1_Dict["width"]] =
      wallBlendWidth;
    mesh_full_1_frame.morphTargetInfluences[framefull_1_Dict["height"]] =
      wallBlendHeight;

    const thresholdfull_1_Dict = mesh_full_1_threshold.morphTargetDictionary;
    mesh_full_1_threshold.morphTargetInfluences[thresholdfull_1_Dict["width"]] =
      wallBlendWidth;

    const architraveFull_1_Dict = mesh_full_1_architrave.morphTargetDictionary;
    mesh_full_1_architrave.morphTargetInfluences[
      architraveFull_1_Dict["width"]
    ] = wallBlendWidth;
    mesh_full_1_architrave.morphTargetInfluences[
      architraveFull_1_Dict["height"]
    ] = wallBlendHeight;

    const full1DoorMesh =
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
        ? DOOR_MODELS?.["full"]?.["door"]?.["full1"]?.[selectedDoorModelType]
            ?.mesh
        : DOOR_MODELS?.["full"]?.["door"]?.["full1"]?.["plain"]?.mesh;

    halfDoorMeshActions("heightWidth", full1DoorMesh);
  }

  //Full 2
  if (scene.getObjectByName("full_2")) {
    const thresholdfull_2_Dict = mesh_full_2_threshold.morphTargetDictionary;
    mesh_full_2_threshold.morphTargetInfluences[thresholdfull_2_Dict["width"]] =
      wallBlendWidth;

    const architraveFull_2_Dict = mesh_full_2_architrave.morphTargetDictionary;
    mesh_full_2_architrave.morphTargetInfluences[
      architraveFull_2_Dict["width"]
    ] = wallBlendWidth;
    mesh_full_2_architrave.morphTargetInfluences[
      architraveFull_2_Dict["height"]
    ] = wallBlendHeight;

    const full2DoorMesh =
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
        ? DOOR_MODELS?.["full"]?.["door"]?.["full2"]?.[selectedDoorModelType]
            ?.mesh
        : DOOR_MODELS?.["full"]?.["door"]?.["full2"]?.["plain"]?.mesh;

    halfDoorMeshActions("heightWidth", full2DoorMesh);
  }
}

$("#jamb-location").on("change", function () {
  selectedJambLocation = $(this).val();
  resetDoorForChangedFrames(selectedDoorFrame);
  STORE_CUSTOMIZED_DATA.jamb["location"] = $(
    "#jamb-location option:selected"
  ).text();

  let modelConfig =
    selectedJambLocation === "front"
      ? ADJUSTABLE_MODEL_SETTINGS.model3a
      : ADJUSTABLE_MODEL_SETTINGS.model3b;
  if (selectedJambLocation === "front") {
    if (scene.getObjectByName("3B")) {
      scene.getObjectByName("3B").visible = false;
      scene.getObjectByName("3b_front_architrave").visible = false;
      scene.getObjectByName("3b_back_architrave").visible = false;
    }

    loadAdjustableModel3a(modelConfig, false);
  } else if (selectedJambLocation === "back") {
    if (scene.getObjectByName("3A")) {
      scene.getObjectByName("3A").visible = false;
      scene.getObjectByName("3a_front_architrave").visible = false;
      scene.getObjectByName("3a_back_architrave").visible = false;
    }
    if (scene.getObjectByName("3B")) {
      scene.getObjectByName("3B").visible = true;
      scene.getObjectByName("3b_front_architrave").visible = true;
      scene.getObjectByName("3b_back_architrave").visible = true;
    }
    loadAdjustableModel3b(modelConfig, false);
  }
});
