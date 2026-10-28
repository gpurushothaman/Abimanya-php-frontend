function changeAllObjectTexture() {
  let textureType =
    selectedDoorActiveTab === "models"
      ? selectedDoorModelType
      : selectedDoorShadeType;
  let renderSeamlessTexture =
    MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.[
      selectedDoorActiveTab
    ]?.[selectedDoorSubDesign]?.[textureType]?.seamlessTexturePath;
  let texturePath =
    MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.[
      selectedDoorActiveTab
    ]?.[selectedDoorSubDesign]?.[textureType]?.texturePath;
  let roughnessMapPath =
    MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.[
      selectedDoorActiveTab
    ]?.[selectedDoorSubDesign]?.[textureType]?.roughnessMapPath || "";
  let normalMapPath =
    MODEL_SETTINGS?.doors?.category?.[selectedDoorDesign]?.[
      selectedDoorActiveTab
    ]?.[selectedDoorSubDesign]?.[textureType]?.normalMapPath || "";

  console.log("track:=", textureType, roughnessMapPath);

  let modelConfig = "";

  if (selectedDoorFrame === "full") {
    if (
      selectedDoorFrameType === "laminateWrapping" ||
      selectedDoorFrameType === "veneerProfileWrappingTeak"
    ) {
      modelConfig = ADJUSTABLE_MODEL_SETTINGS.modelFull_1;
    }
    if (
      selectedDoorFrameType === "laminateWrappingWallCase" ||
      selectedDoorFrameType === "veneerProfileWrappingTeakWallCase"
    ) {
      modelConfig = ADJUSTABLE_MODEL_SETTINGS.modelFull_2;
    }
    if (
      selectedDoorFrameType === "solidWoodJamb" ||
      selectedDoorFrameType === "solidWood" ||
      selectedDoorFrameType === "engineeringWood"
    ) {
      if (selectedJambLocation === "front") {
        modelConfig = ADJUSTABLE_MODEL_SETTINGS.model3a;
      } else if (selectedJambLocation === "back") {
        modelConfig = ADJUSTABLE_MODEL_SETTINGS.model3b;
      }
    }
  } else if (selectedDoorFrame === "half") {
    modelConfig = ADJUSTABLE_MODEL_SETTINGS.modelHalf;
  }

  changeTexture(
    modelConfig,
    renderSeamlessTexture,
    texturePath,
    roughnessMapPath,
    normalMapPath
  );
}

