  async function generateQuotation() {
    try {
      // Fetch data from the updated JSON
      const response = await fetch("../model_setting.json");
      const data = await response.json();

      // Hide existing main UI
      const mainUI = document.getElementById("main-ui");
      if (mainUI) {
        mainUI.classList.add("hidden");
      }

      // Show Quotation Container
      const quoteContainer = document.getElementById("quotation-container");
      if (quoteContainer) {
        quoteContainer.classList.remove("hidden");

        // Populate Data dynamically
        populateQuotation(data);
      }
    } catch (err) {
      console.error("Error loading quotation data:", err);
      alert("Failed to load quotation data. Please check console.");
    }
  }

  function populateQuotation(data) {
    // Populate Meta Data
    document.getElementById("q-estimate-id").textContent = data.estimateId;
    document.getElementById("q-date").textContent = data.meta.date;
    document.getElementById("q-validity").textContent = data.meta.validity;
    document.getElementById("q-exec").textContent = data.meta.executive;
    document.getElementById("q-cust-name").textContent =
      data.meta.customer.name;
    document.getElementById("q-project").textContent =
      data.meta.customer.project;
    document.getElementById("q-contact").textContent =
      data.meta.customer.contact;
    document.getElementById("q-billing").textContent =
      data.meta.customer.billing;
    document.getElementById("q-shipping").textContent =
      data.meta.customer.shipping;

    // Populate Door Config (2 column layout parsing)
    const configTbody = document.getElementById("config-tbody");
    configTbody.innerHTML = "";
    const maxLen = Math.max(
      data.doorConfig.left.length,
      data.doorConfig.right.length
    );

    for (let i = 0; i < maxLen; i++) {
      const l = data.doorConfig.left[i] || { key: "", value: "" };
      const r = data.doorConfig.right[i] || { key: "", value: "" };

      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td class="config-key">${l.key}</td><td class="config-val">${l.value}</td>
            <td class="config-key">${r.key}</td><td class="config-val">${r.value}</td>
        `;
      configTbody.appendChild(tr);
    }

    // Populate Breakdown Items Table
    const itemsTbody = document.getElementById("items-tbody");
    itemsTbody.innerHTML = "";
    data.breakdown.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td style="text-align: center;">${item.id}</td>
            <td>${item.desc}</td>
            <td style="text-align: center;">${item.qty}</td>
     
            <td class="text-right">${item.amount.toLocaleString()}</td>
        `;
      itemsTbody.appendChild(tr);
    });

    // Set Subtotals and Commercial Data
    document.getElementById("subtotal-a").textContent =
      data.commercial.subtotalA.toLocaleString();

    document.getElementById("comm-sub-a").textContent =
      "₹ " + data.commercial.subtotalA.toLocaleString();
    document.getElementById("comm-trans").textContent =
      "₹ " + data.commercial.transport.toLocaleString();
    document.getElementById("comm-margin").textContent =
      "₹ " + data.commercial.marginAmt.toLocaleString();
    document.getElementById("comm-sub-b").textContent =
      "₹ " + data.commercial.subtotalB.toLocaleString();
    document.getElementById("comm-gst").textContent =
      "₹ " + data.commercial.gstAmt.toLocaleString();
    document.getElementById("comm-grand").textContent =
      "₹ " + data.commercial.grandTotal.toLocaleString();
  }
});

container = document.getElementById("container");

renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  powerPreference: "high-performance",
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.toneMapping = THREE.LinearToneMapping;


container.appendChild(renderer.domElement);

scene = new THREE.Scene();
scene.background = new THREE.Color(0xececec);

new RGBELoader().load("./test.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;

  scene.environment = texture;

  // Controls overall HDR reflection strength
  scene.environmentIntensity = 0.5;
});

scene.environmentRotation.set(0, THREE.MathUtils.degToRad(90), 0);

camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  20000
);
camera.position.set(0, 0, 5);
controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = true;
controls.enableZoom = true;
controls.enableDamping = true;
controls.target.set(0, 0, 0);
controls.update();


// ==================================================
// KEY LIGHT
// ==================================================

const keyLight = new THREE.DirectionalLight(0xffffff, 5);

keyLight.position.set(4, 7, 5);

// ==================================================
// SHADOW
// ==================================================

// keyLight.castShadow =
//   true;

// ==================================================
// SHADOW MAP
// ==================================================

keyLight.shadow.mapSize.width = 4096;

keyLight.shadow.mapSize.height = 4096;

// ==================================================
// SHADOW CAMERA
// ==================================================

keyLight.shadow.camera.near = 0.5;

keyLight.shadow.camera.far = 20;

keyLight.shadow.camera.left = -6;

keyLight.shadow.camera.right = 6;

keyLight.shadow.camera.top = 6;

keyLight.shadow.camera.bottom = -6;

// ==================================================
// SHADOW BIAS
// ==================================================

keyLight.shadow.bias = -0.00005;

keyLight.shadow.normalBias = 0.035;

// ==================================================
// SOFT SHADOW
// ==================================================

keyLight.shadow.radius = 3;

if ("blurSamples" in keyLight.shadow) {
  keyLight.shadow.blurSamples = 8;
}

scene.add(keyLight);

// ==================================================
// FRONT FILL
// ==================================================

const frontLight = new THREE.DirectionalLight(0xffffff, 1);

frontLight.position.set(-4, 4, 8);

frontLight.castShadow = false;

scene.add(frontLight);

// ==================================================
// BACK FILL
// ==================================================

const backLight = new THREE.DirectionalLight(0xffffff, 3);

backLight.position.set(4, 4, -8);

backLight.castShadow = false;

scene.add(backLight);

// ==================================================
// SIDE FILL
// ==================================================

const sideLight = new THREE.DirectionalLight(0xffffff, 1);

sideLight.position.set(-6, 4, -3);

sideLight.castShadow = false;

scene.add(sideLight);

// ==================================================
// TOP FILL
// ==================================================

const topLight = new THREE.DirectionalLight(0xffffff, 1);

topLight.position.set(0, 12, 0);

topLight.castShadow = false;

scene.add(topLight);



