function visibleDoorOnly(status, objectReload) {
  let selectedDoorFrameRef = "";
  let modelConfig = "";

  if (selectedDoorFrame === "no") {
    selectedDoorFrameRef = previousSelectedDoorFrame;
  } else {
    selectedDoorFrameRef = selectedDoorFrame;
  }

  if (selectedDoorFrameRef === "full") {
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
        ["3a_front_architrave", "3a_back_architrave"].map((sceneName) => {
          let modelScene = scene.getObjectByName(sceneName);
          if (modelScene) {
            modelScene.traverse(function (child) {
              if (child.isMesh) {
                child.visible = !status;
              }
            });
          }
        });
      } else if (selectedJambLocation === "back") {
        modelConfig = ADJUSTABLE_MODEL_SETTINGS.model3b;
        ["3b_front_architrave", "3b_back_architrave"].map((sceneName) => {
          let modelScene = scene.getObjectByName(sceneName);
          if (modelScene) {
            modelScene.traverse(function (child) {
              if (child.isMesh) {
                child.visible = !status;
              }
            });
          }
        });
      }
    }
  } else if (selectedDoorFrameRef === "half") {
    modelConfig = ADJUSTABLE_MODEL_SETTINGS.modelHalf;
  }
  console.log("model config:=", modelConfig);
  if (modelConfig) {
    const keepTargets = [
      "height",
      "width",
      "thickness",
      "_3b_thickness",
      "_3a_thickness",
    ];
    let modelScene = scene.getObjectByName(modelConfig.modelName);
    if (modelScene) {
      const meshNames = modelConfig.doorTextureMesh.map((mesh) => mesh.name);
      modelScene.traverse(function (child) {
        if (child.isMesh) {
          if (objectReload) {
            if (child.morphTargetInfluences && child.morphTargetDictionary) {
              Object.entries(child.morphTargetDictionary).forEach(
                ([name, index]) => {
                  if (!keepTargets.includes(name)) {
                    child.morphTargetInfluences[index] = 0;
                  }
                }
              );
            }
          }

          if (meshNames.indexOf(child.name) === -1) {
            console.log("fast track:=", meshNames, !status, child.name);
            child.visible = !status;
          }

          if (status === false) {
            if (child.name.includes("threshold")) {
              child.visible = selectedDoorThreshold === "yes" ? true : false;
            }
          }
          //if the door frame is "no" door only present
          if (selectedDoorFrame === "no") {
            console.log("fast no:=", meshNames, !status, child.name);
            if (meshNames.indexOf(child.name) !== -1) {
              if (child.visible === false) {
                child.visible = true;
              }
            }
          }
        }
      });
    }
  }
}

