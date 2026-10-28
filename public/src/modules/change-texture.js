function changeTexture(
  model,
  seamlessTexturePath,
  texturePath,
  roughnessMapPath,
  normalMapPath
) {
  if (scene.getObjectByName(model?.modelName)) {
    //Door front/back
    let doorJambLoc = selectedJambLocation === "front" ? "3A" : "3B";
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(seamlessTexturePath, function (texture) {
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;

      if (texture && texture.image) {
        model.seamlessTextureMesh.forEach((mesh) => {
          mesh.material.map = texture;
          mesh.material.needsUpdate = true;
        });
      }
    });

    textureLoader.load(texturePath, function (texture) {
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;

      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;

      //reset material
      const excludedModels = [
        "LF_1",
        // "LF_3",
        // "LF_4",
        //"LF_5",
        "LF_6",
        //"LF_7",
        // "LF_9",
        "LF_11",
        "LF_12",
        "LP_4",
        "LT_1",
        "LT_2",
        "LT_3",
        "LT_4",
        "LT_5",
        "LT_6",
        // "VE_1",
        "VE_2",
        // "VE_3",
        "VE_10",
      ];
      if (!excludedModels.includes(selectedDoorModelType)) {
        model.doorTextureMesh.forEach((mesh) => {
          if (selectedDoorFrame === "half") {
            mesh.material =
              DOOR_MODELS[selectedDoorFrame]["door"]["plain"][
                "material"
              ].clone();
          } else {
            mesh.material =
              DOOR_MODELS[selectedDoorFrame]["door"][
                model?.materialRefModelName
              ]["plain"]["material"].clone();
          }
          console.log("material:=", mesh.material);
          if (mesh.material?.specularColor) {
            mesh.material.specularColor.set(0xffffff);
          }
          if (selectedDoorDesign === "laminate") {
            if (mesh.material?.specularIntensity) {
              mesh.material.specularIntensity = 0.5;
            }
            // console.log("laminate roughness:=","models/doors/laminate/common/maps/frame_roughness.jpeg")
            // if(selectedDoorModelType === "LF_5" || selectedDoorModelType === "LF_7")
            // {
            mesh.material.roughnessMap = new THREE.TextureLoader().load(
              "models/doors/laminate/common/maps/frame_roughness.jpg",
              () => {
                mesh.material.needsUpdate = true;
              }
            );
            // }
          } else if (selectedDoorDesign === "veneer") {
            mesh.material.roughnessMap = new THREE.TextureLoader().load(
              "models/doors/veneer/common/maps/door_frame_roughness.jpeg",
              () => {
                mesh.material.needsUpdate = true;
              }
            );
          }
        });

        //Jamb / architrave / frame / threshold
        model.seamlessTextureMesh.forEach((mesh) => {
          console.log("frame:=", mesh.material);
          if (mesh.material?.specularColor) {
            mesh.material.specularColor.set(0xffffff);
          }

          if (selectedDoorDesign === "laminate") {
            if (mesh.material?.specularIntensity) {
              mesh.material.specularIntensity = 0.5;
            }
            console.log("laminate seamless:=", mesh.name);
            mesh.material.roughnessMap = new THREE.TextureLoader().load(
              "models/doors/laminate/common/maps/frame_roughness.jpg",
              () => {
                mesh.material.needsUpdate = true;
              }
            );
          } else if (selectedDoorDesign === "veneer") {
            mesh.material.roughnessMap = new THREE.TextureLoader().load(
              "models/doors/veneer/common/maps/door_frame_roughness.jpeg",
              () => {
                mesh.material.needsUpdate = true;
              }
            );
          }
        });
      }

      //Below work applicable for ( laminate - flute only ) normal map applying
      if (
        selectedDoorDesign === "laminate" &&
        selectedDoorSubDesign === "flute"
      ) {
        //Jamb / architrave / frame / threshold
        model.seamlessTextureMesh.forEach((mesh) => {
          if (mesh.material?.specularColor) {
            mesh.material.specularColor.set(0xffffff);
          }
          if (mesh.material?.specularIntensity) {
            mesh.material.specularIntensity = 0.5;
          }
          mesh.material.normalMap = new THREE.TextureLoader().load(
            "models/doors/laminate/common/maps/frame_normalmap.jpeg",
            () => {
              mesh.material.needsUpdate = true;
            }
          );
        });
      } else {
        model.seamlessTextureMesh.forEach((mesh) => {
          mesh.material.normalMap = null;
          mesh.material.needsUpdate = true;
        });
      }

      if (texture && texture.image) {
        model.doorTextureMesh.forEach((mesh) => {
          mesh.material.map = texture;
          mesh.material.needsUpdate = true;
        });

        //Half door
        let halfDoorMesh =
          DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.[selectedDoorModelType]
            ?.mesh || "";
        //Full door (3a)
        let fullDoorMesh =
          DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.[doorJambLoc]?.[
            selectedDoorModelType
          ]?.mesh || "";

        //Full door (full1 / full2)
        if (selectedDoorFrame === "full") {
          if (
            selectedDoorFrameType === "laminateWrapping" ||
            selectedDoorFrameType === "veneerProfileWrappingTeak"
          ) {
            fullDoorMesh =
              DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["full1"]?.[
                selectedDoorModelType
              ]?.mesh || "";
          }
          if (
            selectedDoorFrameType === "laminateWrappingWallCase" ||
            selectedDoorFrameType === "veneerProfileWrappingTeakWallCase"
          ) {
            fullDoorMesh =
              DOOR_MODELS?.[selectedDoorFrame]?.["door"]?.["full2"]?.[
                selectedDoorModelType
              ]?.mesh || "";
          }
        }

        const models = [
          "LF_1",
          "LF_3",
          "LF_4",
          "LF_5",
          "LF_6",
          "LF_7",
          "LF_9",
          "LF_11",
          "LF_12",
          "LP_4",
          "LT_1",
          "LT_2",
          "LT_3",
          "LT_4",
          "LT_5",
          "LT_6",
          "VE_1",
          "VE_2",
          "VE_3",
          "VE_10",
        ];
        if (models.includes(selectedDoorModelType)) {
          if (roughnessMapPath) {
            textureLoader.load(roughnessMapPath, (roughnessMap) => {
              roughnessMap.flipY = false;
              roughnessMap.colorSpace = THREE.NoColorSpace;

              model.doorTextureMesh.forEach((mesh) => {
                const material = new THREE.MeshPhysicalMaterial({
                  color: 0xffffff,
                  map: mesh.material.map,
                  //roughness: 1.0,
                  roughnessMap: roughnessMap,
                  //metalness: 0.2,
                  //clearcoat: 1,
                  //clearcoatRoughness: 0,
                  envMapIntensity: 50,
                });

                mesh.material = material;
              });
            });
          }

          if (normalMapPath) {
            textureLoader.load(normalMapPath, function (normalTexture) {
              normalTexture.flipY = false;
              normalTexture.colorSpace = THREE.NoColorSpace;

              //Below work applicable for ( laminate - flute - LF6 - half ) normal map scale raised
              if (
                selectedDoorDesign === "laminate" &&
                selectedDoorSubDesign === "flute" &&
                (selectedDoorModelType === "LF_6" ||
                  selectedDoorModelType === "LF_9") &&
                (selectedDoorFrame === "half" ||
                  (selectedDoorFrame === "full" &&
                    (selectedDoorFrameType === "laminateWrapping" ||
                      selectedDoorFrameType === "laminateWrappingWallCase")))
              ) {
                model.doorTextureMesh.forEach((mesh) => {
                  mesh.material.map = texture;
                  mesh.material.normalMap = normalTexture;
                  mesh.material.normalScale.set(-4, -4);
                  mesh.material.needsUpdate = true;
                });
              } else {
                model.doorTextureMesh.forEach((mesh) => {
                  mesh.material.map = texture;
                  mesh.material.normalMap = normalTexture;
                  mesh.material.normalScale.set(1, 1);
                  mesh.material.needsUpdate = true;
                });
              }
            });
          } else {
            model.doorTextureMesh.forEach((mesh) => {
              mesh.material.normalMap = null;
            });
          }
        }

        if (halfDoorMesh) {
          halfDoorMesh.forEach((mesh) => {
            mesh.material.map = texture;
            mesh.material.needsUpdate = true;
          });
        }
        if (fullDoorMesh && selectedDoorModelType !== "LF_11") {
          fullDoorMesh.forEach((mesh) => {
            mesh.material.map = texture;
            mesh.material.needsUpdate = true;
          });
        }
      }
    });
  }
}
