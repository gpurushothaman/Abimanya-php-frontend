document.getElementById("quotation-download-btn").onclick = function () {
  const downloadBtn = document.getElementById("quotation-download-btn");
  const closeBtn = document.getElementById("quotation-close-btn");
  const placeOrderBtn = document.getElementById("placeorder_btn");
  // Hide buttons
  downloadBtn.style.display = "none";
  closeBtn.style.display = "none";
  placeOrderBtn.style.display = "none";
  const container = document.getElementById("quotation-container");
  // Store original values
  const oldHeight = container.style.height;
  const oldOverflow = container.style.overflow;
  // Make full content visible for PDF
  container.style.height = "auto";
  container.style.overflow = "visible";
  html2pdf()
    .set({
      margin: 0.3,
      filename: "quotation.pdf",
      image: {
        type: "jpeg",
        quality: 0.98,
      },
      html2canvas: {
        scale: 2,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
    })
    .from(container)
    .save()
    .then(() => {
      // Restore original styles
      container.style.height = oldHeight;
      container.style.overflow = oldOverflow;
      // Show buttons again
      downloadBtn.style.display = "inline-flex";
      closeBtn.style.display = "flex";
      placeOrderBtn.style.display = "inline-flex";
    });
};

document.getElementById("placeorder_btn").onclick = function () {
  takeTwoScreenshots();
};

// CAPTURE FRONT AND BACK
async function takeTwoScreenshots() {
  try {
    const canvas = renderer.domElement;

    // Check canvas dimensions
    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error("Renderer canvas width or height is zero");
    }

    // Save original camera
    const originalPosition = camera.position.clone();
    const originalQuaternion = camera.quaternion.clone();

    // FRONT VIEW
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    camera.updateMatrixWorld(true);

    renderer.render(scene, camera);

    const frontImage = canvas.toDataURL("image/png");

    const croppedFront = await cropImage(frontImage);

    // BACK VIEW
    camera.position.set(0, 0, -5);
    camera.lookAt(0, 0, 0);

    camera.updateMatrixWorld(true);

    renderer.render(scene, camera);

    const backImage = canvas.toDataURL("image/png");

    const croppedBack = await cropImage(backImage);

    // RESTORE CAMERA
    camera.position.copy(originalPosition);
    camera.quaternion.copy(originalQuaternion);

    camera.updateMatrixWorld(true);

    renderer.render(scene, camera);

    console.log("Front:", croppedFront);
    console.log("Back:", croppedBack);
  } catch (error) {
    console.error("Screenshot Error:", error);
  }
}

// CROP BLACK AREAS
function cropImage(imageDataURL) {
  return new Promise((resolve, reject) => {
    if (!imageDataURL || !imageDataURL.startsWith("data:image/png")) {
      reject(new Error("Invalid screenshot image. Check canvas dimensions."));
      return;
    }

    const img = new Image();

    img.onload = function () {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      if (!width || !height) {
        reject(new Error("Image dimensions are zero"));
        return;
      }

      const tempCanvas = document.createElement("canvas");

      tempCanvas.width = width;
      tempCanvas.height = height;

      const ctx = tempCanvas.getContext("2d");

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, width, height);

      const data = imageData.data;

      let minX = width;
      let minY = height;
      let maxX = -1;
      let maxY = -1;

      // Detect white / light background
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;

          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (r > 200 && g > 200 && b > 200) {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);

            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      // No white area found
      if (maxX === -1) {
        resolve(imageDataURL);
        return;
      }

      // Add crop padding
      const padding = 10;

      minX = Math.max(0, minX - padding);
      minY = Math.max(0, minY - padding);

      maxX = Math.min(width - 1, maxX + padding);
      maxY = Math.min(height - 1, maxY + padding);

      const cropWidth = maxX - minX + 1;
      const cropHeight = maxY - minY + 1;

      // Create final cropped image
      const croppedCanvas = document.createElement("canvas");

      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeight;

      const croppedCtx = croppedCanvas.getContext("2d");

      croppedCtx.drawImage(
        tempCanvas,
        minX,
        minY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      resolve(croppedCanvas.toDataURL("image/png"));
    };

    img.onerror = function () {
      reject(new Error("Unable to load screenshot image"));
    };

    img.src = imageDataURL;
  });
}
