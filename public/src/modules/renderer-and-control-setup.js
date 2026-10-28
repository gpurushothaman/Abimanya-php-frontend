  function resizeRenderer() {
    const container = document.getElementById("container");

    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const specPanel = document.getElementById("specPanel");

  specPanel.addEventListener("shown.bs.offcanvas", function () {
    document.body.classList.add("panel-open");

    setTimeout(() => {
      resizeRenderer(); // 👈 KEY
    }, 300);
  });

  specPanel.addEventListener("hidden.bs.offcanvas", function () {
    document.body.classList.remove("panel-open");

    setTimeout(() => {
      resizeRenderer(); // 👈 KEY
    }, 300);
  });
  //Door location
  $("#door-locations").on("change", function () {
    STORE_CUSTOMIZED_DATA.door_location["location"] = $(this).val();
  });

  //Theme mode
  $("#switchMode").on("click", function () {
    if (switchMode) {
      scene.background = new THREE.Color(0x454545);
    } else {
      scene.background = new THREE.Color(0xececec);
    }
    switchMode = !switchMode;
  });

  //Door only mode
  $("#doorOnly").on("click", function () {
    doorOnlyStatus = !doorOnlyStatus;
    visibleDoorOnly(doorOnlyStatus, false);
  });

  //3A model functions
  $("#WallHeightSlider").on("input", function () {
    const value = parseFloat($(this).val());
    $("#wallHeightValue").text(value);
    let blend = (value - wallHeightMin) / (wallHeightMax - wallHeightMin);

    wallBlendHeight = Math.max(0, Math.min(1, blend));
    if (scene.getObjectByName("3A")) {
      //3A
      const wallDict = mesh_wall.morphTargetDictionary;
      mesh_wall.morphTargetInfluences[wallDict["height"]] = wallBlendHeight;
    }
    if (scene.getObjectByName("3B")) {
      //3B
      const wall3bDict = mesh_3b_wall.morphTargetDictionary;
      mesh_3b_wall.morphTargetInfluences[wall3bDict["height"]] =
        wallBlendHeight;
    }

    if (scene.getObjectByName("full_1")) {
      const wallfull_1_Dict = mesh_full_1_wall.morphTargetDictionary;
      mesh_full_1_wall.morphTargetInfluences[wallfull_1_Dict["height"]] =
        wallBlendHeight;
    }
    if (scene.getObjectByName("full_2")) {
      const wallfull_2_Dict = mesh_full_2_wall.morphTargetDictionary;
      mesh_full_2_wall.morphTargetInfluences[wallfull_2_Dict["height"]] =
        wallBlendHeight;
    }

    adjustWallHeightWidthConfig();
  });

  $("#WallWidthSlider").on("input", function () {
    const value = parseFloat($(this).val());
    $("#wallWidthValue").text(value);
    let blend = (value - wallWidthMin) / (wallWidthMax - wallWidthMin);

    wallBlendWidth = Math.max(0, Math.min(1, blend));
    if (scene.getObjectByName("3A")) {
      //3A
      const wallDict = mesh_wall.morphTargetDictionary;
      mesh_wall.morphTargetInfluences[wallDict["width"]] = wallBlendWidth;
    }
    if (scene.getObjectByName("3B")) {
      //3B
      const wall3bDict = mesh_3b_wall.morphTargetDictionary;
      mesh_3b_wall.morphTargetInfluences[wall3bDict["width"]] = wallBlendWidth;
    }
    if (scene.getObjectByName("full_1")) {
      const wallfull_1_Dict = mesh_full_1_wall.morphTargetDictionary;
      mesh_full_1_wall.morphTargetInfluences[wallfull_1_Dict["width"]] =
        wallBlendWidth;
    }
    if (scene.getObjectByName("full_2")) {
      const wallfull_2_Dict = mesh_full_2_wall.morphTargetDictionary;
      mesh_full_2_wall.morphTargetInfluences[wallfull_2_Dict["width"]] =
        wallBlendWidth;
    }
    adjustWallHeightWidthConfig();
  });

  $("#WallThicknessSlider").on("input", function () {
    adjustWallThicknessConfig($(this).val());
    changeWallThicknessFrameSectionReset();
  });

  $("#WallHeightText").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault();
      this.value = this.value.replace(/[^0-9]/g, "");
      let val = parseInt(this.value, 10);

      if (!isNaN(val) && val >= 1800 && val <= 2400) {
        const value = parseFloat($("#WallHeightText").val());
        $("#WallHeightSlider").val(value);
        $("#wallHeightValue").text(value);
        let blend = (value - wallHeightMin) / (wallHeightMax - wallHeightMin);

        wallBlendHeight = Math.max(0, Math.min(1, blend));
        if (scene.getObjectByName("3A")) {
          //3A
          const wallDict = mesh_wall.morphTargetDictionary;
          mesh_wall.morphTargetInfluences[wallDict["height"]] = wallBlendHeight;
        }
        if (scene.getObjectByName("3B")) {
          //3B
          const wall3bDict = mesh_3b_wall.morphTargetDictionary;
          mesh_3b_wall.morphTargetInfluences[wall3bDict["height"]] =
            wallBlendHeight;
        }
        if (scene.getObjectByName("full_1")) {
          const wallfull_1_Dict = mesh_full_1_wall.morphTargetDictionary;
          mesh_full_1_wall.morphTargetInfluences[wallfull_1_Dict["height"]] =
            wallBlendHeight;
        }
        if (scene.getObjectByName("full_2")) {
          const wallfull_2_Dict = mesh_full_2_wall.morphTargetDictionary;
          mesh_full_2_wall.morphTargetInfluences[wallfull_2_Dict["height"]] =
            wallBlendHeight;
        }

        adjustWallHeightWidthConfig();
      }
    }
  });

  $("#WallHeightBtn").on("click", function () {
    const value = parseFloat($("#WallHeightText").val());
    $("#WallHeightSlider").val(value);
    $("#wallHeightValue").text(value);
    let blend = (value - wallHeightMin) / (wallHeightMax - wallHeightMin);

    wallBlendHeight = Math.max(0, Math.min(1, blend));
    if (scene.getObjectByName("3A")) {
      //3A
      const wallDict = mesh_wall.morphTargetDictionary;
      mesh_wall.morphTargetInfluences[wallDict["height"]] = wallBlendHeight;
    }
    if (scene.getObjectByName("3B")) {
      //3B
      const wall3bDict = mesh_3b_wall.morphTargetDictionary;
      mesh_3b_wall.morphTargetInfluences[wall3bDict["height"]] =
        wallBlendHeight;
    }
    if (scene.getObjectByName("full_1")) {
      const wallfull_1_Dict = mesh_full_1_wall.morphTargetDictionary;
      mesh_full_1_wall.morphTargetInfluences[wallfull_1_Dict["height"]] =
        wallBlendHeight;
    }
    if (scene.getObjectByName("full_2")) {
      const wallfull_2_Dict = mesh_full_2_wall.morphTargetDictionary;
      mesh_full_2_wall.morphTargetInfluences[wallfull_2_Dict["height"]] =
        wallBlendHeight;
    }

    adjustWallHeightWidthConfig();
  });

  $("#WallWidthText").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault();
      this.value = this.value.replace(/[^0-9]/g, "");
      let val = parseInt(this.value, 10);

      if (!isNaN(val) && val >= 600 && val <= 1200) {
        const value = parseFloat($("#WallWidthText").val());
        $("#WallWidthSlider").val(value);
        $("#wallWidthValue").text(value);
        let blend = (value - wallWidthMin) / (wallWidthMax - wallWidthMin);

        wallBlendWidth = Math.max(0, Math.min(1, blend));
        if (scene.getObjectByName("3A")) {
          //3A
          const wallDict = mesh_wall.morphTargetDictionary;
          mesh_wall.morphTargetInfluences[wallDict["width"]] = wallBlendWidth;
        }
        if (scene.getObjectByName("3B")) {
          //3B
          const wall3bDict = mesh_3b_wall.morphTargetDictionary;
          mesh_3b_wall.morphTargetInfluences[wall3bDict["width"]] =
            wallBlendWidth;
        }
        if (scene.getObjectByName("full_1")) {
          const wallfull_1_Dict = mesh_full_1_wall.morphTargetDictionary;
          mesh_full_1_wall.morphTargetInfluences[wallfull_1_Dict["width"]] =
            wallBlendWidth;
        }
        if (scene.getObjectByName("full_2")) {
          const wallfull_2_Dict = mesh_full_2_wall.morphTargetDictionary;
          mesh_full_2_wall.morphTargetInfluences[wallfull_2_Dict["width"]] =
            wallBlendWidth;
        }

        adjustWallHeightWidthConfig();
      }
    }
  });

  $("#WallWidthBtn").on("click", function () {
    const value = parseFloat($("#WallWidthText").val());
    $("#WallWidthSlider").val(value);
    $("#wallWidthValue").text(value);
    let blend = (value - wallWidthMin) / (wallWidthMax - wallWidthMin);

    wallBlendWidth = Math.max(0, Math.min(1, blend));
    if (scene.getObjectByName("3A")) {
      //3A
      const wallDict = mesh_wall.morphTargetDictionary;
      mesh_wall.morphTargetInfluences[wallDict["width"]] = wallBlendWidth;
    }
    if (scene.getObjectByName("3B")) {
      //3B
      const wall3bDict = mesh_3b_wall.morphTargetDictionary;
      mesh_3b_wall.morphTargetInfluences[wall3bDict["width"]] = wallBlendWidth;
    }
    if (scene.getObjectByName("full_1")) {
      const wallfull_1_Dict = mesh_full_1_wall.morphTargetDictionary;
      mesh_full_1_wall.morphTargetInfluences[wallfull_1_Dict["width"]] =
        wallBlendWidth;
    }
    if (scene.getObjectByName("full_2")) {
      const wallfull_2_Dict = mesh_full_2_wall.morphTargetDictionary;
      mesh_full_2_wall.morphTargetInfluences[wallfull_2_Dict["width"]] =
        wallBlendWidth;
    }

    adjustWallHeightWidthConfig();
  });

  $("#WallThicknessText").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault();
      this.value = this.value.replace(/[^0-9]/g, "");
      let val = parseInt(this.value, 10);

      if (!isNaN(val) && val >= 140 && val <= 260) {
        const value = parseFloat($("#WallThicknessText").val());
        $("#WallThicknessSlider").val(value);
        $("#wallThicknessValue").text(value);
        adjustWallThicknessConfig(value);

        changeWallThicknessFrameSectionReset();
      }
    }
  });

  $("#WallThicknessBtn").on("click", function () {
    const value = parseFloat($("#WallThicknessText").val());
    $("#WallThicknessSlider").val(value);
    $("#wallThicknessValue").text(value);
    adjustWallThicknessConfig(value);

    changeWallThicknessFrameSectionReset();
  });

