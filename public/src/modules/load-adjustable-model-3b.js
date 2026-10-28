function loadAdjustableModel3b(object, objectReload) {
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
            if (child.name === "_3b_90_60_frame") {
              child.visible = !doorOnlyStatus;
              mesh_3b_90_60_frame = child;
              const frameDict = mesh_3b_90_60_frame.morphTargetDictionary;
              mesh_3b_90_60_frame.morphTargetInfluences[frameDict["width"]] =
                wallBlendWidth;
              mesh_3b_90_60_frame.morphTargetInfluences[frameDict["height"]] =
                wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.model3b.seamlessTextureMesh.push(
                mesh_3b_90_60_frame
              );
            } else if (child.name === "_3b_door_004") {
              child.visible = false;
              mesh_3b_Door = child;
              DOOR_MODELS["full"]["door"]["3B"]["plain"]["mesh"]?.push(child);
              DOOR_MODELS["full"]["door"]["3B"]["plain"]["material"] =
                child.material.clone();
              const doorDict = mesh_3b_Door.morphTargetDictionary;
              mesh_3b_Door.morphTargetInfluences[doorDict["width"]] =
                wallBlendWidth;
              mesh_3b_Door.morphTargetInfluences[doorDict["height"]] =
                wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.model3b.doorTextureMesh.push(
                mesh_3b_Door
              );
            } else if (child.name === "_3b_jamb") {
              child.visible = !doorOnlyStatus;
              mesh_3b_jamb = child;
              const jambDict = mesh_3b_jamb.morphTargetDictionary;
              mesh_3b_jamb.morphTargetInfluences[jambDict["width"]] =
                wallBlendWidth;
              mesh_3b_jamb.morphTargetInfluences[jambDict["height"]] =
                wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.model3b.seamlessTextureMesh.push(
                mesh_3b_jamb
              );
            } else if (child.name === "_3b_threshold_") {
              child.visible = selectedDoorThreshold === "yes" ? true : false;
              mesh_3b_threshold = child;
              const thresholdDict = mesh_3b_threshold.morphTargetDictionary;
              mesh_3b_threshold.morphTargetInfluences[thresholdDict["width"]] =
                wallBlendWidth;
              mesh_3b_threshold.morphTargetInfluences[thresholdDict["height"]] =
                wallBlendHeight;
              //
              ADJUSTABLE_MODEL_SETTINGS.model3b.seamlessTextureMesh.push(
                mesh_3b_threshold
              );
            } else if (child.name === "wall_") {
              child.visible = !doorOnlyStatus;
              mesh_3b_wall = child;
              const wallDict = mesh_3b_wall.morphTargetDictionary;
              mesh_3b_wall.morphTargetInfluences[wallDict["width"]] =
                wallBlendWidth;
              mesh_3b_wall.morphTargetInfluences[wallDict["height"]] =
                wallBlendHeight;
            }
          }
        });

        gltf.scene.name = object?.modelName;
        gltf.scene.scale.set(
          object?.scale?.x,
          object?.scale?.y,
          object?.scale?.z
        );
        gltf.scene.visible = true;
        scene.add(gltf.scene);

        $loaderDiv.css("display", "none");

        //3A Architrave Front
        loader.load(
          "./models/3ab_architrave_front.glb",
          (frontArchitraveGltf) => {
            frontArchitraveGltf.scene.traverse(function (child) {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.needsUpdate = true;

                if (child.name === "_3a_b_architrave_front") {
                  child.visible = !doorOnlyStatus;
                  mesh_3b_architrave_front = child;

                  const frontArchitraveDict =
                    mesh_3b_architrave_front.morphTargetDictionary;
                  mesh_3b_architrave_front.morphTargetInfluences[
                    frontArchitraveDict["width"]
                  ] = wallBlendWidth;
                  mesh_3b_architrave_front.morphTargetInfluences[
                    frontArchitraveDict["height"]
                  ] = wallBlendHeight;
                  //
                  ADJUSTABLE_MODEL_SETTINGS.model3b.seamlessTextureMesh.push(
                    mesh_3b_architrave_front
                  );
                }
              }
            });
            frontArchitraveGltf.scene.scale.set(
              object?.scale?.x,
              object?.scale?.y,
              object?.scale?.z
            );
            frontArchitraveGltf.scene.name = "3b_front_architrave";
            frontArchitraveGltf.scene.visible = true;
            scene.add(frontArchitraveGltf.scene);
          }
        );

        //3A Architrave Back
        loader.load(
          "./models/3ab_architrave_back.glb",
          (backArchitraveGltf) => {
            backArchitraveGltf.scene.traverse(function (child) {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.needsUpdate = true;

                if (child.name === "_3a_b_architrave_back") {
                  child.visible = !doorOnlyStatus;
                  mesh_3b_architrave_back = child;

                  const backArchitraveDict =
                    mesh_3b_architrave_back.morphTargetDictionary;
                  mesh_3b_architrave_back.morphTargetInfluences[
                    backArchitraveDict["width"]
                  ] = wallBlendWidth;
                  mesh_3b_architrave_back.morphTargetInfluences[
                    backArchitraveDict["height"]
                  ] = wallBlendHeight;
                  //
                  ADJUSTABLE_MODEL_SETTINGS.model3b.seamlessTextureMesh.push(
                    mesh_3b_architrave_back
                  );
                }
              }
            });
            backArchitraveGltf.scene.scale.set(
              object?.scale?.x,
              object?.scale?.y,
              object?.scale?.z
            );
            backArchitraveGltf.scene.name = "3b_back_architrave";
            backArchitraveGltf.scene.visible = true;
            scene.add(backArchitraveGltf.scene);

            setTimeout(function () {
              halfDoorMeshVisible("");
              changeAllObjectTexture();
            }, 300);
          }
        );
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
      scene.getObjectByName("3b_front_architrave").visible = true;
      scene.getObjectByName("3b_back_architrave").visible = true;

      setTimeout(function () {
        changeAllObjectTexture();
        visibleDoorOnly(doorOnlyStatus, objectReload);
      }, 300);
    }
  }
}
