//Load model
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./source/draco/");
loader.setDRACOLoader(dracoLoader);

loadAdjustableModel3a(ADJUSTABLE_MODEL_SETTINGS.model3a);
