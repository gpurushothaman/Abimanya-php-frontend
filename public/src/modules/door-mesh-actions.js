function halfDoorMeshActions(actionName, selectedMesh) {
  if (actionName === "heightWidth") {
    selectedMesh.forEach((mesh) => {
      const meshDict = mesh.morphTargetDictionary;
      mesh.morphTargetInfluences[meshDict["width"]] = wallBlendWidth;
      mesh.morphTargetInfluences[meshDict["height"]] = wallBlendHeight;
    });
  } else if (actionName === "doorThickness") {
    console.log("track door thick:=", selectedMesh);
    selectedMesh.forEach((mesh) => {
      const meshDict = mesh.morphTargetDictionary;
      //door thickness
      mesh.morphTargetInfluences[meshDict["DT_35"]] = 0;
      mesh.morphTargetInfluences[meshDict["DT_38"]] = 0;
      mesh.morphTargetInfluences[meshDict["DT_40"]] = 0;
      mesh.morphTargetInfluences[meshDict["DT_45"]] = 0;
      mesh.morphTargetInfluences[meshDict["DT_50"]] = 0;

      if (selectedDoorThickness !== "DT_32") {
        mesh.morphTargetInfluences[meshDict[selectedDoorThickness]] = 1;
      }
    });
  } else if (actionName === "frameSection") {
    selectedMesh.forEach((mesh) => {
      const meshDict = mesh.morphTargetDictionary;
      //door & lock for halfdoor
      mesh.morphTargetInfluences[meshDict["_115_D"]] = 0;
      mesh.morphTargetInfluences[meshDict["_140_D"]] = 0;
      mesh.morphTargetInfluences[meshDict["_150_D"]] = 0;
      mesh.morphTargetInfluences[meshDict["_160_D"]] = 0;
      mesh.morphTargetInfluences[meshDict["_180_D"]] = 0;
      mesh.morphTargetInfluences[meshDict["_220_D"]] = 0;
      mesh.morphTargetInfluences[meshDict["_250_D"]] = 0;

      if (selectedFrameSection?.includes("_115")) {
        mesh.morphTargetInfluences[meshDict["_115_D"]] = 1;
      } else if (selectedFrameSection?.includes("_140")) {
        mesh.morphTargetInfluences[meshDict["_140_D"]] = 1;
      } else if (selectedFrameSection?.includes("_150")) {
        mesh.morphTargetInfluences[meshDict["_150_D"]] = 1;
      } else if (selectedFrameSection?.includes("_160")) {
        mesh.morphTargetInfluences[meshDict["_160_D"]] = 1;
      } else if (selectedFrameSection?.includes("_180")) {
        mesh.morphTargetInfluences[meshDict["_180_D"]] = 1;
      } else if (selectedFrameSection?.includes("_220")) {
        mesh.morphTargetInfluences[meshDict["_220_D"]] = 1;
      } else if (selectedFrameSection?.includes("_250")) {
        mesh.morphTargetInfluences[meshDict["_250_D"]] = 1;
      }
    });
  }
}

