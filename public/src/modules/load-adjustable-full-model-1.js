function loadAdjustableModelFull_1(object, objectReload) {
  const model = scene.getObjectByName(object?.modelName);
  if (typeof model === "undefined") {
    $loaderDiv.css("display", "flex");
    loader.load(
      object?.modelPath,
      (gltf) => {
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material.needsUpdate = true;

            if (child.name === "_1_frame001") {
              child.visible = !doorOnlyStatus;
              mesh_full_1_frame = child;
              const framefull_1_Dict = mesh_full_1_frame.morphTargetDictionary;
              mesh_full_1_frame.morphTargetInfluences[
                framefull_1_Dict["width"]
              ] = wallBlendWidth;
              mesh_full_1_frame.morphTargetInfluences[
                framefull_1_Dict["height"]
              ] = wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelFull_1.seamlessTextureMesh.push(
                mesh_full_1_frame
              );
            } else if (child.name === "wall_001") {
              child.visible = !doorOnlyStatus;
              mesh_full_1_wall = child;
              const full_1_wallDict = mesh_full_1_wall.morphTargetDictionary;
              mesh_full_1_wall.morphTargetInfluences[full_1_wallDict["width"]] =
                wallBlendWidth;
              mesh_full_1_wall.morphTargetInfluences[
                full_1_wallDict["height"]
              ] = wallBlendHeight;
            } else if (child.name === "_1_architrave001") {
              child.visible = !doorOnlyStatus;
              mesh_full_1_architrave = child;
              const architravefull_1_Dict =
                mesh_full_1_architrave.morphTargetDictionary;
              mesh_full_1_architrave.morphTargetInfluences[
                architravefull_1_Dict["width"]
              ] = wallBlendWidth;
              mesh_full_1_architrave.morphTargetInfluences[
                architravefull_1_Dict["height"]
              ] = wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelFull_1.seamlessTextureMesh.push(
                mesh_full_1_architrave
              );
            } else if (child.name === "Mesh009") {
              mesh_full_1_DoorLock = child;
              child.visible = false;
              const doorlock_full_1_Dict =
                mesh_full_1_DoorLock.morphTargetDictionary;
              mesh_full_1_DoorLock.morphTargetInfluences[
                doorlock_full_1_Dict["width"]
              ] = wallBlendWidth;
              mesh_full_1_DoorLock.morphTargetInfluences[
                doorlock_full_1_Dict["height"]
              ] = wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelFull_1.doorTextureMesh.push(
                mesh_full_1_DoorLock
              );
              DOOR_MODELS["full"]["door"]["full1"]["plain"]["mesh"]?.push(
                child
              );
            } else if (child.name === "_1_door_") {
              mesh_full_1_Door = child;
              child.visible = false;
              const door_full_1_Dict = mesh_full_1_Door.morphTargetDictionary;
              mesh_full_1_Door.morphTargetInfluences[
                door_full_1_Dict["width"]
              ] = wallBlendWidth;
              mesh_full_1_Door.morphTargetInfluences[
                door_full_1_Dict["height"]
              ] = wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelFull_1.doorTextureMesh.push(
                mesh_full_1_Door
              );
              DOOR_MODELS["full"]["door"]["full1"]["plain"]["mesh"]?.push(
                child
              );
              DOOR_MODELS["full"]["door"]["full1"]["plain"]["material"] =
                child.material.clone();
            } else if (child.name === "_1_threshold001") {
              child.visible = selectedDoorThreshold === "yes" ? true : false;
              mesh_full_1_threshold = child;
              const thresholdfull_1_Dict =
                mesh_full_1_threshold.morphTargetDictionary;
              mesh_full_1_threshold.morphTargetInfluences[
                thresholdfull_1_Dict["width"]
              ] = wallBlendWidth;
              mesh_full_1_threshold.morphTargetInfluences[
                thresholdfull_1_Dict["height"]
              ] = wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelFull_1.seamlessTextureMesh.push(
                mesh_full_1_threshold
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
