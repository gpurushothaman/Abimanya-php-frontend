(async function () {
  const modulesPath = "./src/modules/";

  const order = [
    "runtime-imports-and-shared-state.js",
     "door-model-registry.js",
     "adjustable-model-settings.js",
     "frame-rates.js",
     "costing-configuration.js",
     "quotation-calculations.js",
     "quotation-event-bindings.js",
     "quotation-generation.js",
     "quotation-view-and-totals.js",
     "scene-and-ui-bootstrap.js",
    "renderer-and-control-setup.js",
    "frame-thickness-controls.js",
    "wall-thickness-configuration.js",
    "wall-dimension-configuration.js",
    "door-material-and-option-controls.js",
    "door-model-selectors.js",
    "door-shade-selectors.js",
    "door-type-initialization.js",
    "inline-quotation-handlers.js",
    "model-loading-entry.js",
    "load-adjustable-model-3a.js",
    "load-adjustable-model-3b.js",
    "load-adjustable-half-model.js",
    "load-adjustable-full-model-1.js",
    "load-adjustable-full-model-2.js",
    "reset-door-frame.js",
    "load-doors.js",
    "half-door-visibility.js",
    "door-mesh-actions.js",
    "texture-manager.js",
    "change-texture.js",
    "door-only-visibility.js",
    "quotation-navigation.js",
    "quotation-download.js",
    "viewport-resize.js",
    "animation-loop.js"
  ];

  try {
    console.log("Loading JavaScript modules...");

    // Fetch modules in parallel.
    const responses = await Promise.all(
      order.map(async (file) => {
        const response = await fetch(modulesPath + file);

        if (!response.ok) {
          throw new Error(
            `Failed to load ${file}: HTTP ${response.status}`
          );
        }

        return {
          file,
          code: await response.text()
        };
      })
    );

    // Combine in the original order.
    const combinedCode = responses
      .map(({ file, code }) =>
        `\n// ===== ${file} =====\n${code}\n`
      )
      .join("\n");

    console.log(
      `Combined ${responses.length} JavaScript modules.`
    );

    // Execute the combined classic JavaScript.
    const script = document.createElement("script");
    script.type = "module";

    script.textContent = combinedCode;

    document.body.appendChild(script);

    console.log("Combined JavaScript executed.");

  } catch (error) {
    console.error("Runtime combination failed:", error);
  }
})();
