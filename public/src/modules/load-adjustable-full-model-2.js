function loadAdjustableModelFull_2(object, objectReload) {
  const model = scene.getObjectByName(object?.modelName);
  if (typeof model === "undefined") {
    $loaderDiv.css("display", "flex");
    loader.load(
      object?.modelPath,
      (gltf) => {
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            console.log("child names:=", child.name);
            child.castShadow = true;
            child.receiveShadow = true;
            child.material.needsUpdate = true;

            if (child.name === "Mesh002") {
              mesh_full_2_DoorLock = child;
              child.visible = false;
              const doorlockfull_2_Dict =
                mesh_full_2_DoorLock.morphTargetDictionary;
              mesh_full_2_DoorLock.morphTargetInfluences[
                doorlockfull_2_Dict["width"]
              ] = wallBlendWidth;
              mesh_full_2_DoorLock.morphTargetInfluences[
                doorlockfull_2_Dict["height"]
              ] = wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelFull_2.doorTextureMesh.push(
                mesh_full_2_DoorLock
              );
              DOOR_MODELS["full"]["door"]["full2"]["plain"]["mesh"]?.push(
                child
              );
            } else if (child.name === "_2_door_") {
              mesh_full_2_Door = child;
              child.visible = false;
              const full_2_doorDict = mesh_full_2_Door.morphTargetDictionary;
              mesh_full_2_Door.morphTargetInfluences[full_2_doorDict["width"]] =
                wallBlendWidth;
              mesh_full_2_Door.morphTargetInfluences[
                full_2_doorDict["height"]
              ] = wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelFull_2.doorTextureMesh.push(
                mesh_full_2_Door
              );
              DOOR_MODELS["full"]["door"]["full2"]["plain"]["mesh"]?.push(
                child
              );
              DOOR_MODELS["full"]["door"]["full2"]["plain"]["material"] =
                child.material.clone();
            } else if (child.name === "_2_threshold") {
              child.visible = selectedDoorThreshold === "yes" ? true : false;
              mesh_full_2_threshold = child;
              const thresholdfull_2_Dict =
                mesh_full_2_threshold.morphTargetDictionary;
              mesh_full_2_threshold.morphTargetInfluences[
                thresholdfull_2_Dict["width"]
              ] = wallBlendWidth;
              mesh_full_2_threshold.morphTargetInfluences[
                thresholdfull_2_Dict["height"]
              ] = wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelFull_2.seamlessTextureMesh.push(
                mesh_full_2_threshold
              );
            } else if (child.name === "Mesh") {
              child.visible = !doorOnlyStatus;
              mesh_full_2_wall = child;
              const wall_full_2_Dict = mesh_full_2_wall.morphTargetDictionary;
              mesh_full_2_wall.morphTargetInfluences[
                wall_full_2_Dict["width"]
              ] = wallBlendWidth;
              mesh_full_2_wall.morphTargetInfluences[
                wall_full_2_Dict["height"]
              ] = wallBlendHeight;
              //
            } else if (child.name === "Mesh_1") {
              child.visible = !doorOnlyStatus;
              mesh_full_2_architrave = child;
              const architrave_full_2_Dict =
                mesh_full_2_architrave.morphTargetDictionary;
              mesh_full_2_architrave.morphTargetInfluences[
                architrave_full_2_Dict["width"]
              ] = wallBlendWidth;
              mesh_full_2_architrave.morphTargetInfluences[
                architrave_full_2_Dict["height"]
              ] = wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelFull_2.seamlessTextureMesh.push(
                mesh_full_2_architrave
              );
            }
          }
        });

        gltf.scene.name = object?.modelName;
        gltf.scene.scale.set(
          object?.scale?.x,
          object?.scale?.y,
          object?.scale?.z
        );

        scene.add(gltf.scene);

        setTimeout(function () {
          $loaderDiv.css("display", "none");
          halfDoorMeshVisible("");
          changeAllObjectTexture();
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
    if (typeof model !== "undefined") {
      model.visible = true;
      setTimeout(function () {
        changeAllObjectTexture();
        visibleDoorOnly(doorOnlyStatus, objectReload);
      }, 300);
    }
  }
}
