  function adjustWallThicknessConfig(tvalue) {
    const value = parseFloat(tvalue);
    $("#wallThicknessValue").text(value);
    let blend =
      (value - wallThicknessMin) / (wallThicknessMax - wallThicknessMin);
    wallBlendThickness = Math.max(0, Math.min(1, blend));

    if (scene.getObjectByName("3A")) {
      const wallDict = mesh_wall.morphTargetDictionary;
      mesh_wall.morphTargetInfluences[wallDict["_3a_thickness"]] =
        wallBlendThickness;

      //3A front architrave position change depends on increase the wall tickness
      const position = mesh_wall.geometry.attributes.position;
      const morphPositions = mesh_wall.geometry.morphAttributes.position;
      const influences = mesh_wall.morphTargetInfluences;
      const box = new THREE.Box3();
      const vertex = new THREE.Vector3();
      for (let i = 0; i < position.count; i++) {
        // base position
        vertex.fromBufferAttribute(position, i);
        // apply morph targets
        for (let j = 0; j < morphPositions.length; j++) {
          const influence = influences[j];
          if (influence === 0) continue;
          const morph = new THREE.Vector3().fromBufferAttribute(
            morphPositions[j],
            i
          );
          vertex.addScaledVector(morph, influence);
        }
        // transform to world space
        vertex.applyMatrix4(mesh_wall.matrixWorld);
        // 0.06973516484590823 -> first get the frame boundingbox  min z value

        // expand bounding box
        box.expandByPoint(vertex);
      }
      mesh_3a_architrave_front.position.z = box.max.z - 0.07027325675295999;

      //3A Jamb
      const jamb3ADict = mesh_3a_jamb.morphTargetDictionary;
      mesh_3a_jamb.morphTargetInfluences[jamb3ADict["thickness"]] =
        wallBlendThickness;
    }
    if (scene.getObjectByName("3B")) {
      const wall3bDict = mesh_3b_wall.morphTargetDictionary;
      mesh_3b_wall.morphTargetInfluences[wall3bDict["_3b_thickness"]] =
        wallBlendThickness;

      //3B front architrave position change depends on increase the wall tickness
      const position = mesh_3b_wall.geometry.attributes.position;
      const morphPositions = mesh_3b_wall.geometry.morphAttributes.position;
      const influences = mesh_3b_wall.morphTargetInfluences;
      const box = new THREE.Box3();
      const vertex = new THREE.Vector3();
      for (let i = 0; i < position.count; i++) {
        // base position
        vertex.fromBufferAttribute(position, i);
        // apply morph targets
        for (let j = 0; j < morphPositions.length; j++) {
          const influence = influences[j];
          if (influence === 0) continue;
          const morph = new THREE.Vector3().fromBufferAttribute(
            morphPositions[j],
            i
          );
          vertex.addScaledVector(morph, influence);
        }
        // transform to world space
        vertex.applyMatrix4(mesh_3b_wall.matrixWorld);
        // 0.06973516484590823 -> first get the frame boundingbox  min z value

        // expand bounding box
        box.expandByPoint(vertex);
      }

      mesh_3b_architrave_back.position.z =
        -(box.max.z - box.min.z) + 0.07032836990124984 * 2;

      //3B Jamb
      const jamb3BDict = mesh_3b_jamb.morphTargetDictionary;
      mesh_3b_jamb.morphTargetInfluences[jamb3BDict["thickness"]] =
        wallBlendThickness;
    }
    if (scene.getObjectByName("full_1")) {
      const wallfull_1_Dict = mesh_full_1_wall.morphTargetDictionary;
      mesh_full_1_wall.morphTargetInfluences[wallfull_1_Dict["_3b_thickness"]] =
        wallBlendThickness;

      const architravefull_1_Dict =
        mesh_full_1_architrave.morphTargetDictionary;
      mesh_full_1_architrave.morphTargetInfluences[
        architravefull_1_Dict["thickness"]
      ] = wallBlendThickness;

      const framefull_1_Dict = mesh_full_1_frame.morphTargetDictionary;
      mesh_full_1_frame.morphTargetInfluences[framefull_1_Dict["thickness"]] =
        wallBlendThickness;

      const thresholdfull_1_Dict = mesh_full_1_threshold.morphTargetDictionary;
      mesh_full_1_threshold.morphTargetInfluences[
        thresholdfull_1_Dict["thickness"]
      ] = wallBlendThickness;
    }
  }

