function populateQuotation(data) {
  // Populate Meta Data
  document.getElementById("q-estimate-id").textContent = data.estimateId;
  let d = new Date();
  let dateStr =
    d.getDate() +
    "-" +
    d.toLocaleString("default", { month: "short" }) +
    "-" +
    d.getFullYear();
  document.getElementById("q-date").textContent = dateStr;

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
    <td class="config-key">${l.key}</td>
    <td class="config-val"
        style="${l.value === "Select Value" || !l.value ? "color:red;" : ""}">
      ${l.value}
    </td>

    <td class="config-key">${r.key}</td>
    <td class="config-val"
        style="${r.value === "Select Value" || !r.value ? "color:red;" : ""}">
      ${r.value}
    </td>
  `;

    configTbody.appendChild(tr);
  }

  // Populate Breakdown Items Table
  const itemsTbody = document.getElementById("items-tbody");
  itemsTbody.innerHTML = "";
  data.breakdown.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td style="text-align: center;">${item.id}</td>
            <td>${item.desc}</td>
            <td style="text-align: center;">
                <span class="editable item-qty" contenteditable="true" data-index="${index}">${
      item.qty
    }</span>
            </td>
           
            <td class="text-right item-amount">${item.amount.toLocaleString()}</td>
        `;
    itemsTbody.appendChild(tr);
  });

  // Attach live calculation listeners if not bound
  if (!itemsTbody.hasAttribute("data-bound")) {
    itemsTbody.addEventListener("input", function (e) {
      if (
        e.target.classList.contains("item-qty") ||
        e.target.classList.contains("item-rate")
      ) {
        recalculateTotals();
      }
    });
    itemsTbody.setAttribute("data-bound", "true");
  }

  // Set Subtotals and Commercial Data
  updateCommercialTotals(data.commercial);
}

function recalculateTotals() {
  let subtotalA = 0;
  document.querySelectorAll("#items-tbody tr").forEach((tr) => {
    let qty = parseFloat(tr.querySelector(".item-qty").textContent) || 0;
    let rate = parseFloat(tr.querySelector(".item-rate").textContent) || 0;
    let amount = qty * rate;
    tr.querySelector(".item-amount").textContent = amount.toLocaleString(
      undefined,
      { minimumFractionDigits: 0, maximumFractionDigits: 2 }
    );
    subtotalA += amount;
  });

  let transportStr = document
    .getElementById("comm-trans")
    .textContent.replace(/[^0-9.-]+/g, "");
  let transport = parseFloat(transportStr) || 0;

  let marginPerc = 10;
  let marginAmt = Math.round(subtotalA * (marginPerc / 100));
  let subtotalB = subtotalA + transport + marginAmt;
  let gstPerc = 18;
  let gstAmt = Math.round(subtotalB * (gstPerc / 100));
  let grandTotal = subtotalB + gstAmt;

  updateCommercialTotals(
    { subtotalA, transport, marginAmt, subtotalB, gstAmt, grandTotal },
    false
  );
}

function updateCommercialTotals(comm, overwriteTransport = true) {
  document.getElementById("subtotal-a").textContent =
    comm.subtotalA.toLocaleString(undefined, { minimumFractionDigits: 2 });
  document.getElementById("comm-sub-a").textContent =
    "₹ " +
    comm.subtotalA.toLocaleString(undefined, { minimumFractionDigits: 2 });

  let transEl = document.getElementById("comm-trans");
  if (!transEl.classList.contains("editable")) {
    transEl.classList.add("editable");
    transEl.setAttribute("contenteditable", "true");
    if (!transEl.hasAttribute("data-bound")) {
      transEl.addEventListener("input", recalculateTotals);
      transEl.setAttribute("data-bound", "true");
    }
  }

  if (overwriteTransport && document.activeElement !== transEl) {
    transEl.textContent = "₹ " + comm.transport.toLocaleString();
  }

  document.getElementById("comm-margin").textContent =
    "₹ " +
    comm.marginAmt.toLocaleString(undefined, { minimumFractionDigits: 2 });
  document.getElementById("comm-sub-b").textContent =
    "₹ " +
    comm.subtotalB.toLocaleString(undefined, { minimumFractionDigits: 2 });
  document.getElementById("comm-gst").textContent =
    "₹ " + comm.gstAmt.toLocaleString(undefined, { minimumFractionDigits: 2 });
  document.getElementById("comm-grand").textContent =
    "₹ " +
    comm.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

