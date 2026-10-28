function resetDoorForChangedFrames(currentDoorFrame) {
  //Door front/back
  let doorJambLoc = selectedJambLocation === "front" ? "3A" : "3B";

  //Reset - previous door
  for (const [name, data] of Object.entries(DOOR_MODELS?.["full"]?.door)) {
    if (
      name === "3A" ||
      name === "3B" ||
      name === "full1" ||
      name === "full2"
    ) {
      for (const [fullMDLName, fullMDLData] of Object.entries(
        DOOR_MODELS?.["full"]?.door?.[name]
      )) {
        if (fullMDLData?.mesh) {
          for (const meshVal of fullMDLData?.mesh) {
            meshVal.visible = false;
          }
        }
      }
    }
  }
  for (const [name, data] of Object.entries(DOOR_MODELS?.["half"]?.door)) {
    if (data?.mesh) {
      for (const meshVal of data?.mesh) {
        meshVal.visible = false;
      }
    }
  }

  //Load - current door
  let dynamicDoorData =
    MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.models?.[
      selectedDoorSubDesign
    ]?.[selectedDoorModelType];
  if (currentDoorFrame === "half") {
    loadDoors(
      dynamicDoorData?.halfModelPath,
      dynamicDoorData?.halfModelName,
      storePreviousSelectedDoorModelType,
      DOOR_MODELS?.[currentDoorFrame]?.["door"]?.[selectedDoorModelType]?.mesh
    );
  } else if (currentDoorFrame === "full") {
    if (selectedDoorFrameType === "veneerProfileWrappingTeak") {
      loadDoors(
        dynamicDoorData?.full1ModelPath,
        dynamicDoorData?.full1ModelName,
        storePreviousSelectedDoorModelType,
        DOOR_MODELS?.[currentDoorFrame]?.["door"]?.["full1"]?.[
          selectedDoorModelType
        ]?.mesh
      );
    } else if (selectedDoorFrameType === "veneerProfileWrappingTeakWallCase") {
      loadDoors(
        dynamicDoorData?.full2ModelPath,
        dynamicDoorData?.full2ModelName,
        storePreviousSelectedDoorModelType,
        DOOR_MODELS?.[currentDoorFrame]?.["door"]?.["full2"]?.[
          selectedDoorModelType
        ]?.mesh
      );
    } else if (
      selectedDoorFrameType === "solidWoodJamb" ||
      selectedDoorFrameType === "solidWood" ||
      selectedDoorFrameType === "engineeringWood"
    ) {
      loadDoors(
        selectedJambLocation === "front"
          ? dynamicDoorData?.full3AModelPath
          : dynamicDoorData?.full3BModelPath,
        selectedJambLocation === "front"
          ? dynamicDoorData?.full3AModelName
          : dynamicDoorData?.full3BModelName,
        storePreviousSelectedDoorModelType,
        DOOR_MODELS?.[currentDoorFrame]?.["door"]?.[doorJambLoc]?.[
          selectedDoorModelType
        ]?.mesh
      );
    } else {
      loadDoors(
        "",
        "",
        storePreviousSelectedDoorModelType,
        DOOR_MODELS?.[currentDoorFrame]?.["door"]?.[doorJambLoc]?.[
          selectedDoorModelType
        ]?.mesh
      );

      console.log(
        "bug:=",
        DOOR_MODELS?.[currentDoorFrame]?.["door"]?.[doorJambLoc]?.[
          selectedDoorModelType
        ]?.mesh
      );
    }
  }
}
