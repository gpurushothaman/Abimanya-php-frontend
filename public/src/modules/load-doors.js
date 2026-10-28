function loadDoors(
  modelPath,
  modelName,
  paramsStorePreviousSelectedDoorModelType,
  doorMesh
) {
  const model = scene.getObjectByName(modelName);
  if (typeof model === "undefined" && modelName && modelPath) {
    $loaderDiv.css("display", "flex");
    loader.load(
      modelPath,
      (gltf) => {
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            child.material.needsUpdate = true;

            if (modelName?.includes("_VE_7")) {
              if (
                child.name === "Mesh_1" ||
                child.name === "Mesh004_1" ||
                child.name === "Mesh025_1" ||
                child.name === "Mesh011_1" ||
                child.name === "Mesh001_1"
              ) {
                child.material.transparent = true;
                child.material.opacity = 0.5;
                child.material.roughness = 0.09;
                child.material.metalness = 0.9;
                child.material.envMapIntensity = 50;
              }
            }

            const meshDict = child.morphTargetDictionary;
            child.morphTargetInfluences[meshDict["width"]] = wallBlendWidth;
            child.morphTargetInfluences[meshDict["height"]] = wallBlendHeight;

            if (
              selectedDoorFrameType !== "laminateWrapping" ||
              selectedDoorFrameType !== "laminateWrappingWallCase" ||
              selectedDoorFrameType !== "veneerProfileWrappingTeak" ||
              selectedDoorFrameType !== "veneerProfileWrappingTeakWallCase"
            ) {
              child.morphTargetInfluences[meshDict["_115_D"]] = 0;
              child.morphTargetInfluences[meshDict["_140_D"]] = 0;
              child.morphTargetInfluences[meshDict["_150_D"]] = 0;
              child.morphTargetInfluences[meshDict["_160_D"]] = 0;
              child.morphTargetInfluences[meshDict["_180_D"]] = 0;
              child.morphTargetInfluences[meshDict["_220_D"]] = 0;
              child.morphTargetInfluences[meshDict["_250_D"]] = 0;

              if (selectedFrameSection?.includes("_115")) {
                child.morphTargetInfluences[meshDict["_115_D"]] = 1;
              } else if (selectedFrameSection?.includes("_140")) {
                child.morphTargetInfluences[meshDict["_140_D"]] = 1;
              } else if (selectedFrameSection?.includes("_150")) {
                child.morphTargetInfluences[meshDict["_150_D"]] = 1;
              } else if (selectedFrameSection?.includes("_160")) {
                child.morphTargetInfluences[meshDict["_160_D"]] = 1;
              } else if (selectedFrameSection?.includes("_180")) {
                child.morphTargetInfluences[meshDict["_180_D"]] = 1;
              } else if (selectedFrameSection?.includes("_220")) {
                child.morphTargetInfluences[meshDict["_220_D"]] = 1;
              } else if (selectedFrameSection?.includes("_250")) {
                child.morphTargetInfluences[meshDict["_250_D"]] = 1;
              }
            }

            //door thickness
            child.morphTargetInfluences[meshDict["DT_35"]] = 0;
            child.morphTargetInfluences[meshDict["DT_38"]] = 0;
            child.morphTargetInfluences[meshDict["DT_40"]] = 0;
            child.morphTargetInfluences[meshDict["DT_45"]] = 0;
            child.morphTargetInfluences[meshDict["DT_50"]] = 0;

            if (selectedDoorThickness !== "DT_32" && selectedDoorThickness) {
              child.morphTargetInfluences[meshDict[selectedDoorThickness]] = 1;
            }

            child.visible = false;
            doorMesh.push(child);
          }
        });

        gltf.scene.name = modelName;
        scene.add(gltf.scene);

        setTimeout(function () {
          $loaderDiv.css("display", "none");
          halfDoorMeshVisible(paramsStorePreviousSelectedDoorModelType);
        }, 300);
      },
      (xhr) => {
        const percent = ((xhr.loaded / xhr.total) * 100).toFixed(0);

        $("#progress-bar").css("width", percent + "%");
      },

      (err) => {
        console.error("Error loading model:", err);
        $loaderDiv.css("display", "none");
      }
    );
  } else {
    if (doorMesh) {
      doorMesh.forEach((mesh) => {
        if (modelName?.includes("_VE_7")) {
          if (
            mesh.name === "Mesh_1" ||
            mesh.name === "Mesh004_1" ||
            mesh.name === "Mesh025_1" ||
            mesh.name === "Mesh011_1" ||
            mesh.name === "Mesh001_1"
          ) {
            mesh.material.transparent = true;
            mesh.material.opacity = 0.5;
            mesh.material.roughness = 0.09;
            mesh.material.metalness = 0.9;
            mesh.material.envMapIntensity = 50;
          }
        }

        mesh.material.needsUpdate = true;

        //width & height
        const meshDict = mesh.morphTargetDictionary;
        mesh.morphTargetInfluences[meshDict["width"]] = wallBlendWidth;
        mesh.morphTargetInfluences[meshDict["height"]] = wallBlendHeight;

        if (
          selectedDoorFrameType !== "laminateWrapping" ||
          selectedDoorFrameType !== "laminateWrappingWallCase" ||
          selectedDoorFrameType !== "veneerProfileWrappingTeak" ||
          selectedDoorFrameType !== "veneerProfileWrappingTeakWallCase"
        ) {
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
        }

        //door thickness
        mesh.morphTargetInfluences[meshDict["DT_35"]] = 0;
        mesh.morphTargetInfluences[meshDict["DT_38"]] = 0;
        mesh.morphTargetInfluences[meshDict["DT_40"]] = 0;
        mesh.morphTargetInfluences[meshDict["DT_45"]] = 0;
        mesh.morphTargetInfluences[meshDict["DT_50"]] = 0;

        if (selectedDoorThickness !== "DT_32" && selectedDoorThickness) {
          mesh.morphTargetInfluences[meshDict[selectedDoorThickness]] = 1;
        }
      });
    }
    setTimeout(function () {
      halfDoorMeshVisible(paramsStorePreviousSelectedDoorModelType);
    }, 300);
  }
}
