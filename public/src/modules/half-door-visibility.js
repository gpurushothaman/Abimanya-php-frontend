function halfDoorMeshVisible(paramsStorePreviousSelectedDoorModelType) {
  //Door front/back
  let doorJambLoc = selectedJambLocation === "front" ? "3A" : "3B";
  //Reset
  if (paramsStorePreviousSelectedDoorModelType) {
    let storePreviousSelectedDoorModelTypeMesh = "";

    if (selectedDoorFrame === "half") {
      storePreviousSelectedDoorModelTypeMesh =
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
        ]?.indexOf(paramsStorePreviousSelectedDoorModelType) != -1
          ? DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.[
              paramsStorePreviousSelectedDoorModelType
            ]?.mesh
          : DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["plain"]?.mesh;
    } else if (selectedDoorFrame === "full") {
      let doorFrameTyp =
        selectedDoorFrameType === "laminateWrapping" ||
        selectedDoorFrameType === "veneerProfileWrappingTeak"
          ? "full1"
          : selectedDoorFrameType === "laminateWrappingWallCase" ||
            selectedDoorFrameType === "veneerProfileWrappingTeakWallCase"
          ? "full2"
          : doorJambLoc;
      storePreviousSelectedDoorModelTypeMesh =
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
        ]?.indexOf(paramsStorePreviousSelectedDoorModelType) != -1
          ? DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.[doorFrameTyp]?.[
              paramsStorePreviousSelectedDoorModelType
            ]?.mesh
          : DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.[doorFrameTyp]?.[
              "plain"
            ]?.mesh;
    }
    if (storePreviousSelectedDoorModelTypeMesh) {
      storePreviousSelectedDoorModelTypeMesh.forEach((mesh) => {
        mesh.visible = false;
      });
    }
  }

  let doorMesh = "";
  if (selectedDoorFrame === "half") {
    doorMesh =
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
  } else if (selectedDoorFrame === "full") {
    let doorFrameTyp =
      selectedDoorFrameType === "laminateWrapping" ||
      selectedDoorFrameType === "veneerProfileWrappingTeak"
        ? "full1"
        : selectedDoorFrameType === "laminateWrappingWallCase" ||
          selectedDoorFrameType === "veneerProfileWrappingTeakWallCase"
        ? "full2"
        : doorJambLoc;
    doorMesh =
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
        ? DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.[doorFrameTyp]?.[
            selectedDoorModelType
          ]?.mesh
        : DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.[doorFrameTyp]?.["plain"]
            ?.mesh;
  }

  if (doorMesh) {
    console.log("en:=", doorMesh, DOOR_MODELS);
    doorMesh.forEach((mesh) => {
      mesh.visible = true;
      let parent = mesh.parent;
      while (parent) {
        parent.visible = true;
        parent = parent.parent;
      }
    });
  }
  storePreviousSelectedDoorModelType = selectedDoorModelType;
}

