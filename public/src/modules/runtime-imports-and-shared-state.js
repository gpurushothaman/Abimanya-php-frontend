//Import section
import * as THREE from "three";
import { OrbitControls } from "./source/OrbitControls.js";
import { GLTFLoader } from "./source/GLTFLoader.js";
import { DRACOLoader } from "./source/DRACOLoader.js";
import { RGBELoader } from "./source/RGBELoader.js";
import MODEL_SETTINGS from "./main/model_settings.js";

//variables
let container, renderer, scene, camera, controls;
const $loaderDiv = $("#loader");
let doorOnlyStatus = true;
let switchMode = true;
let selectedDoorDesign = "laminate";
let selectedDoorSubDesign = "elite";
let selectedDoorModelType = "LE_1";
let storePreviousSelectedDoorModelType = "";
let selectedDoorShadeType = "LE_1_european_walnut";
let selectedDoorActiveTab = "models";

let selectedDoorFrame = "full";
let previousSelectedDoorFrame = "full";
let selectedDoorFrameType = "solidWoodJamb";
let selectedDoorFrameTypeOption = "";
let selectedDoorThreshold = "no";

let otherModelType = "";
let otherModelCategory = "";

//3A Model
let mesh_3a_90_60_frame = "";
let mesh_3a_architrave_back = "";
let mesh_3a_architrave_front = "";
let mesh_DoorLock = "";
let mesh_Door = "";
let mesh_3a_jamb = "";
let mesh_3a_threshold = "";
let mesh_wall = "";

//3B Model
let mesh_3b_90_60_frame = "";
let mesh_3b_architrave_back = "";
let mesh_3b_architrave_front = "";
let mesh_3b_DoorLock = "";
let mesh_3b_Door = "";
let mesh_3b_jamb = "";
let mesh_3b_threshold = "";
let mesh_3b_wall = "";

//Half Model
let mesh_half_frame = "";
let mesh_half_architrave_back = "";
let mesh_half_architrave_front = "";
let mesh_half_DoorLock = "";
let mesh_half_Door = "";
let mesh_half_l_architrave = "";
let mesh_half_threshold = "";

//Full -> 1 model
let mesh_full_1_frame = "";
let mesh_full_1_architrave = "";
let mesh_full_1_DoorLock = "";
let mesh_full_1_Door = "";
let mesh_full_1_wall = "";
let mesh_full_1_threshold = "";

//Full -> 2 model
let mesh_full_2_architrave = "";
let mesh_full_2_DoorLock = "";
let mesh_full_2_Door = "";
let mesh_full_2_wall = "";
let mesh_full_2_threshold = "";

//3A model - declarartion
//Min & Max value
let wallHeightMin = 1800,
  wallHeightMax = 2400,
  wallWidthMin = 600,
  wallWidthMax = 1200,
  wallThicknessMin = 140,
  wallThicknessMax = 260;

//Store blend value
let blend = (850 - wallWidthMin) / (wallWidthMax - wallWidthMin);
let blendHeightVal = (2100 - wallHeightMin) / (wallHeightMax - wallHeightMin);
let wallBlendHeight = Math.max(0, Math.min(1, blendHeightVal)),
  wallBlendWidth = Math.max(0, Math.min(1, blend)),
  wallBlendThickness = 0;
let selectedFrameSection = "";
let selectedDoorThickness = "";
let selectedJambLocation = "front";
