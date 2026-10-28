function loadAdjustableModelHalf(object, objectReload) {
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

            console.log("half:=", child.name);

            if (child.name === "_half_90_60_frame") {
              child.visible = !doorOnlyStatus;
              mesh_half_frame = child;
              const frameHalfDict = mesh_half_frame.morphTargetDictionary;
              mesh_half_frame.morphTargetInfluences[frameHalfDict["width"]] =
                wallBlendWidth;
              mesh_half_frame.morphTargetInfluences[frameHalfDict["height"]] =
                wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelHalf.seamlessTextureMesh.push(
                mesh_half_frame
              );
            } else if (child.name === "_half_architrave_front") {
              child.visible = !doorOnlyStatus;
              mesh_half_architrave_front = child;
              const architravefronthalfDict =
                mesh_half_architrave_front.morphTargetDictionary;
              mesh_half_architrave_front.morphTargetInfluences[
                architravefronthalfDict["width"]
              ] = wallBlendWidth;
              mesh_half_architrave_front.morphTargetInfluences[
                architravefronthalfDict["height"]
              ] = wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelHalf.seamlessTextureMesh.push(
                mesh_half_architrave_front
              );
            } else if (child.name === "_half_architrave_back") {
              child.visible = !doorOnlyStatus;
              mesh_half_architrave_back = child;
              const architravebackhalfDict =
                mesh_half_architrave_back.morphTargetDictionary;
              mesh_half_architrave_back.morphTargetInfluences[
                architravebackhalfDict["width"]
              ] = wallBlendWidth;
              mesh_half_architrave_back.morphTargetInfluences[
                architravebackhalfDict["height"]
              ] = wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelHalf.seamlessTextureMesh.push(
                mesh_half_architrave_back
              );
            } else if (child.name === "Mesh005") {
              mesh_half_DoorLock = child;
              const doorlockHalfDict = mesh_half_DoorLock.morphTargetDictionary;
              mesh_half_DoorLock.morphTargetInfluences[
                doorlockHalfDict["width"]
              ] = wallBlendWidth;
              mesh_half_DoorLock.morphTargetInfluences[
                doorlockHalfDict["height"]
              ] = wallBlendHeight;

              child.visible = false;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelHalf.doorTextureMesh.push(
                mesh_half_DoorLock
              );
              DOOR_MODELS["half"]["door"]["plain"]["mesh"]?.push(child);
            } else if (child.name === "_half_door_") {
              mesh_half_Door = child;

              const doorHalfDict = mesh_half_Door.morphTargetDictionary;
              mesh_half_Door.morphTargetInfluences[doorHalfDict["width"]] =
                wallBlendWidth;
              mesh_half_Door.morphTargetInfluences[doorHalfDict["height"]] =
                wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelHalf.doorTextureMesh.push(
                mesh_half_Door
              );
              child.visible = false;
              DOOR_MODELS["half"]["door"]["plain"]["mesh"]?.push(child);
              DOOR_MODELS["half"]["door"]["plain"]["material"] =
                child.material.clone();
            } else if (child.name === "_half_L_architrave") {
              child.visible = !doorOnlyStatus;
              mesh_half_l_architrave = child;
              const larchitravefronthalfDict =
                mesh_half_l_architrave.morphTargetDictionary;
              mesh_half_l_architrave.morphTargetInfluences[
                larchitravefronthalfDict["width"]
              ] = wallBlendWidth;
              mesh_half_l_architrave.morphTargetInfluences[
                larchitravefronthalfDict["height"]
              ] = wallBlendHeight;
              child.visible = false;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelHalf.seamlessTextureMesh.push(
                mesh_half_l_architrave
              );
            } else if (child.name === "_half_threshold") {
              child.visible = selectedDoorThreshold === "yes" ? true : false;
              mesh_half_threshold = child;
              const thresholdHalfDict =
                mesh_half_threshold.morphTargetDictionary;
              mesh_half_threshold.morphTargetInfluences[
                thresholdHalfDict["width"]
              ] = wallBlendWidth;
              mesh_half_threshold.morphTargetInfluences[
                thresholdHalfDict["height"]
              ] = wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.modelHalf.seamlessTextureMesh.push(
                mesh_half_threshold
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
          halfDoorMeshVisible("");
          changeAllObjectTexture();
          $loaderDiv.css("display", "none");
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
