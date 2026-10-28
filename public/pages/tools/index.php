<?php require_once __DIR__ . '/../../../app/includes/cssheader.php'; ?>
<!-- 3D VIEWER -->
<div id="container"></div>

<div class="logo-top-right">
  <a href="<?= url('/dhome') ?>">
    <img src="<?= url('assets/logo/company-logo.PNG') ?>" class="logo-img" alt="Top Logo" />
  </a>

  <!-- THEME -->
  <div class="icon-toggle mt-3 active" id="switchMode">
    <i class="bi bi-sun-fill" id="themeIcon"></i>
  </div>

  <!-- DOOR -->
  <div class="icon-toggle mt-2 active" id="doorOnly" checked>
    <i class="bi bi-door-closed-fill" id="doorOnlyIcon"></i>
  </div>
</div>

<!-- BOTTOM RIGHT LOGO -->
<div class="logo-bottom-right">
  <img src="<?= url('assets/logo/power_by.png') ?>" class="logo-img" alt="Bottom Logo" />
</div>

<div id="loader" style="
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      ">
  <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem"></div>
  <div class="progress w-50">
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="progress-bar" style="width: 0%"></div>
  </div>
</div>

<div class="floating-ui">
  <!-- SPEC ICON (Floating) -->
  <div class="spec-icon" data-bs-toggle="offcanvas" data-bs-target="#specPanel">
    <i class="bi bi-list"></i>
  </div>
</div>

<button class="up-arrow" data-bs-target="#specPanel" data-bs-toggle="offcanvas">
  ⬆
</button>

<div class="offcanvas offcanvas-start spec-panel" id="specPanel" data-bs-backdrop="false">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">Customize Options</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
  </div>

  <div class="offcanvas-body">
    <div class="card-body">
      <div class="accordion scroll-body" id="accordionList">
        <!-- Category 1 -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              Door Options
            </button>
          </h2>

          <div id="collapseOne" class="accordion-collapse collapse show">
            <div class="accordion-body scroll-body">
              <div class="accordion" id="DoorOptions">
                <!-- Category 1 -->
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#DoorlocationCollapse">
                      Locations
                    </button>
                  </h2>

                  <div id="DoorlocationCollapse" class="accordion-collapse collapse">
                    <div class="accordion-body">
                      <div class="mb-3">
                        <select class="form-select custom-input" id="door-locations">
                          <option selected>Select door location</option>
                          <option value="Main Entrance Door">
                            Main Entrance Door
                          </option>
                          <option value="Balcony Door">Balcony Door</option>
                          <option value="Bedroom Door">Bedroom Door</option>
                          <option value="Bathroom Door">
                            Bathroom Door
                          </option>
                          <option value="Kitchen Door">Kitchen Door</option>
                          <option value="Living Room Door">
                            Living Room Door
                          </option>
                          <option value="Pooja Room Door">
                            Pooja Room Door
                          </option>
                          <option value="Study Office Door">
                            Study Office Door
                          </option>
                          <option value="Store Room Door">
                            Store Room Door
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Category 2 -->
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#DoorDesignCollapse">
                      Designs
                    </button>
                  </h2>

                  <div id="DoorDesignCollapse" class="accordion-collapse collapse">
                    <div class="accordion-body scroll-body">
                      <div class="mb-3">
                        <!-- <ul class="tree list-unstyled" id="doorTree"></ul> -->
                        <label for="door-design" class="form-label">
                          Designs:
                        </label>
                        <select class="form-select custom-input" id="door-design">
                          <option selected disabled>
                            Select door design
                          </option>
                          <option value="laminate" selected>
                            Laminate
                          </option>
                          <option value="veneer">Veneer</option>
                          <option value="royalPaint">Royal Paint</option>
                          <option value="skinClassic">Skin</option>
                        </select>

                        <label for="door-subdesign" class="form-label">
                          Sub Designs:
                        </label>
                        <select class="form-select custom-input" id="door-subdesign"></select>

                        <label for="door-models" class="form-label">
                          Models:
                        </label>
                        <select class="form-select custom-input" id="door-models"></select>

                        <label for="door-shades" class="form-label">
                          Shades:
                        </label>
                        <select class="form-select custom-input" id="door-shades"></select>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Category 5 -->
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#DoorframeCollapse">
                      Frames
                    </button>
                  </h2>

                  <div id="DoorframeCollapse" class="accordion-collapse collapse">
                    <div class="accordion-body">
                      <div class="mb-3">
                        <label for="door-frames" class="form-label">
                          Frame:
                        </label>
                        <select class="form-select custom-input" id="door-frames">
                          <option selected>Select Frame</option>
                          <option value="full">No</option>
                          <option value="half">Half</option>
                          <option value="full" selected>Full</option>
                        </select>

                        <div id="frame-customize-option">
                          <div id="wallOptions">
                            <label for="door-wall" class="form-label">
                              wall:
                            </label>

                            <div class="mb-3">
                              <label for="wallHeightSlider" class="form-label">
                                Height:
                                <span id="wallHeightValue">1800 </span>mm
                              </label>

                              <input type="range" class="form-range" min="1800" max="2400" value="1800" id="WallHeightSlider" />

                              <div class="input-group">
                                <input type="text" class="form-control" placeholder="" value="" id="WallHeightText" />
                                <button class="btn btn-primary" type="button" id="WallHeightBtn" disabled>
                                  ➜
                                </button>
                              </div>
                              ( 1800 mm to 2400 mm )
                            </div>

                            <div class="mb-3">
                              <label for="wallWidthSlider" class="form-label">
                                Width:
                                <span id="wallWidthValue">600 </span>mm
                              </label>

                              <input type="range" class="form-range" min="600" max="1200" value="600" id="WallWidthSlider" />

                              <div class="input-group">
                                <input type="text" class="form-control" placeholder="" value="" id="WallWidthText" />
                                <button class="btn btn-primary" type="button" id="WallWidthBtn" disabled>
                                  ➜
                                </button>
                              </div>
                              ( 600 mm to 1200 mm )
                            </div>

                            <div class="mb-3" id="WallThicknessDiv">
                              <label for="wallThicknessSlider" class="form-label">
                                Thickness:
                                <span id="wallThicknessValue">140 </span>mm
                              </label>

                              <input type="range" class="form-range" min="140" max="260" value="140" id="WallThicknessSlider" />

                              <div class="input-group">
                                <input type="text" class="form-control" placeholder="" value="" id="WallThicknessText" />
                                <button class="btn btn-primary" type="button" id="WallThicknessBtn" disabled>
                                  ➜
                                </button>
                              </div>
                              ( 140 mm to 260 mm )
                            </div>
                          </div>

                          <label for="door-frameType" class="form-label">
                            Frame Type:
                          </label>
                          <select class="form-select custom-input mb-3" id="door-frameType"></select>

                          <select class="form-select custom-input" id="door-frameTypeOptions"></select>

                          <label for="door-frameSection" class="form-label">
                            Frame Section:
                          </label>
                          <select class="form-select custom-input mb-3" id="door-frameSection"></select>

                          <label for="door-withframe" class="form-label">
                            Doors With Frame:
                          </label>
                          <select class="form-select custom-input mb-3" id="door-withframe">
                            <option selected>Select Option</option>
                            <option value="edgeBanding">
                              Edge Banding
                            </option>
                            <option value="woodLipping">
                              Wood Lipping
                            </option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Category 6 -->
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#DoorThresholdCollapse">
                      Threshold
                    </button>
                  </h2>

                  <div id="DoorThresholdCollapse" class="accordion-collapse collapse">
                    <div class="accordion-body">
                      <div class="mb-3">
                        <select class="form-select custom-input" id="door-threshold">
                          <option selected>Select Threshold</option>
                          <option value="yes">Yes</option>
                          <option value="no" selected>No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Category 7 -->
                <div class="accordion-item" id="door-orientation-accordion">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#DoorOrentationCollapse">
                      Orientation
                    </button>
                  </h2>

                  <div id="DoorOrentationCollapse" class="accordion-collapse collapse">
                    <div class="accordion-body">
                      <div class="mb-3">
                        <select class="form-select custom-input" id="door-orientation">
                          <option selected>Select Orientation</option>
                          <option value="lhs">LHS</option>
                          <option value="rhs" selected>RHS</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Category 8 -->
                <!-- <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#DoorThicknessCollapse"
                        >
                          Thickness
                        </button>
                      </h2>

                      <div
                        id="DoorThicknessCollapse"
                        class="accordion-collapse collapse"
                      >
                        <div class="accordion-body">
                          <div class="mb-3">
                            <label for="doorThicknessSlider" class="form-label">
                              Adjust Thickness:
                              <span id="doorThicknessValue">50</span>
                            </label>

                            <input
                              type="range"
                              class="form-range"
                              min="0"
                              max="100"
                              value="50"
                              id="doorThicknessSlider"
                            />
                          </div>
                        </div>
                      </div>
                    </div> -->
              </div>
            </div>
          </div>
        </div>

        <!-- Category 3 -->
        <div class="accordion-item" id="jamboptions">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
              Jamb Options
            </button>
          </h2>

          <div id="collapse3" class="accordion-collapse collapse">
            <div class="accordion-body scroll-body">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#jambLocationCollapse">
                    Location
                  </button>
                </h2>

                <div id="jambLocationCollapse" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <div class="mb-3">
                      <select class="form-select custom-input" id="jamb-location">
                        <option selected>Select Location</option>
                        <option value="front" selected>Front</option>
                        <option value="back">Back</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Category 4 -->
        <div class="accordion-item" id="architraveoptions">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4">
              Architrave Options
            </button>
          </h2>

          <div id="collapse4" class="accordion-collapse collapse">
            <div class="accordion-body scroll-body">
              <!-- Category 3 -->
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#architraveFrontBackCollapse">
                    Adjust Size ( Front / Back )
                  </button>
                </h2>

                <div id="architraveFrontBackCollapse" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <div class="mb-3">
                      <label for="door-frontArchitrave" class="form-label">
                        Front:
                      </label>
                      <select class="form-select custom-input mb-3" id="door-frontArchitrave"></select>

                      <label for="door-backArchitrave" class="form-label">
                        Back:
                      </label>
                      <select class="form-select custom-input mb-3" id="door-backArchitrave"></select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Category 3 -->
        <!-- <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#DoorOrentationCollapse"
                >
                  Orientation Options
                </button>
              </h2>

              <div
                id="DoorOrentationCollapse"
                class="accordion-collapse collapse"
              >
                <div class="accordion-body scroll-body">
                  <div class="accordion-item">
                    <div
                      id="DoorOrentationCollapse"
                      class="accordion-collapse collapse"
                    >
                      <div class="accordion-body">
                        <div class="mb-3">
                          <select
                            class="form-select custom-input"
                            id="door-orientation"
                          >
                            <option selected>Select Orientation</option>
                            <option value="1">LHS</option>
                            <option value="2">RHS</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->

        <!-- Category 3 -->
        <div class="accordion-item" id="doorThicknessOptions">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#thicknessCollapse">
              Thickness Options
            </button>
          </h2>

          <div id="thicknessCollapse" class="accordion-collapse collapse">
            <div class="accordion-body scroll-body">
              <!-- Category 2 -->
              <div class="accordion-item">
                <div id="thicknessCollapse" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <div class="mb-3">
                      <label for="doorThicknessSlider" class="form-label">
                        Adjust Thickness:
                      </label>
                      <select class="form-select custom-input" id="door-thickness">
                        <option selected value="">
                          Select Door Thickness
                        </option>
                        <option value="DT_32" selected>32</option>
                        <option value="DT_35">35</option>
                        <option value="DT_38">38</option>
                        <option value="DT_40">40</option>
                        <option value="DT_45">45</option>
                        <option value="DT_50">50</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <button type="button" class="btn btn-success" id="submitdata">
    Submit
  </button>
</div>

<!-- THIYAGUU  some alter for download,place order,close tag -->

<div id="quotation-overlay" class="quotation-overlay hidden">
  <div id="quotation-container" class="quotation-container">
    <div class="quotation-header">
      <div class="company-logo">
        <img src="<?= url('/assets/logo/company-logo.PNG') ?>" alt="Abhimanya Doors" height="45" onerror="this.src='https://via.placeholder.com/150x45?text=Logo'" />
      </div>
      <div class="quotation-title">
        <h2>ESTIMATE / QUOTATION</h2>
      </div>
      <div class="quotation-actions">
        <div class="est-badge" id="q-estimate-id">EST-2026-001</div>
        <button id="quotation-download-btn" class="quotation-download-btn no-print">
          ⬇ Download
        </button>
        <button id="placeorder_btn" class="placeorder-btn no-print">
          Place Order
        </button>
        <button id="quotation-close-btn" class="quotation-close-btn no-print">
          ✖
        </button>
      </div>
    </div>

    <div class="quotation-body">
      <div class="meta-grid">
        <div class="meta-col">
          <div>
            <span class="meta-label"><i class="bi bi-calendar"></i> Date:</span>
            <span class="meta-value editable" contenteditable="true" id="q-date">07-May-2026</span>
          </div>
          <div>
            <span class="meta-label"><i class="bi bi-clock"></i> Quote Validity:</span>
            <span class="meta-value editable" contenteditable="true" id="q-validity">30 Days</span>
          </div>
          <div>
            <span class="meta-label"><i class="bi bi-person"></i> Sales Exec:</span>
            <span class="meta-value editable" contenteditable="true" id="q-exec">Arun Kumar</span>
          </div>
        </div>
        <div class="meta-col">
          <div>
            <span class="meta-label"><i class="bi bi-person-fill"></i> Customer Name:</span>
            <span class="meta-value editable" contenteditable="true" id="q-cust-name">Mr. Ramesh Kumar</span>
          </div>
          <div>
            <span class="meta-label"><i class="bi bi-building"></i> Project Name:</span>
            <span class="meta-value editable" contenteditable="true" id="q-project">Lake View Apartments</span>
          </div>
          <div>
            <span class="meta-label"><i class="bi bi-telephone"></i> Contact Number:</span>
            <span class="meta-value editable" contenteditable="true" id="q-contact">+91 99999 99999</span>
          </div>
        </div>
        <div class="meta-col">
          <div>
            <span class="meta-label"><i class="bi bi-geo-alt"></i> Billing Address:</span>
            <span class="meta-value editable" contenteditable="true" id="q-billing">Chennai, Tamil Nadu - 600001</span>
          </div>
          <br />
          <div>
            <span class="meta-label"><i class="bi bi-truck"></i> Shipping Address:</span>
            <span class="meta-value editable" contenteditable="true" id="q-shipping">Chennai, Tamil Nadu - 600001</span>
          </div>
        </div>
      </div>

      <div class="section-title">DOOR CONFIGURATION DETAILS</div>
      <table class="items-table config-table">
        <tbody id="config-tbody">
          <!-- Dynamically injected via JS -->
        </tbody>
      </table>

      <div class="table-layout-wrapper">
        <div class="items-section">
          <div class="section-title">ITEM-WISE COST BREAKDOWN</div>
          <table class="items-table">
            <thead>
              <tr>
                <th style="width: 60px; text-align: center">Sl No</th>
                <th>Item Description</th>
                <th style="text-align: center">SFT/RFT</th>
                <!-- <th style="text-align: center">Unit</th>
                    <th class="text-right">Rate (₹)</th> -->
                <th class="text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody id="items-tbody">
              <!-- Dynamically injected via JS -->
            </tbody>
            <tbody>
              <tr class="subtotal-row">
                <td colspan="3" class="text-right">SUBTOTAL (A)</td>
                <td class="text-right" style="color: #024f4a">
                  ₹ <span id="subtotal-a"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="commercial-section">
          <div class="section-title">COMMERCIAL SUMMARY</div>
          <table class="commercial-table">
            <tbody>
              <tr>
                <td>Subtotal (A)</td>
                <td class="text-right" id="comm-sub-a"></td>
              </tr>
              <tr>
                <td>Transport Charges</td>
                <td class="text-right" id="comm-trans"></td>
              </tr>
              <tr>
                <td>Dealer Margin (10%)</td>
                <td class="text-right" id="comm-margin"></td>
              </tr>
              <tr class="subtotal-row">
                <td>Sub Total (B)</td>
                <td class="text-right" id="comm-sub-b"></td>
              </tr>
              <tr>
                <td>GST @ 18%</td>
                <td class="text-right" id="comm-gst"></td>
              </tr>
              <tr class="total-row">
                <td>GRAND TOTAL (B + GST)</td>
                <td class="text-right" id="comm-grand"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="section-title">TERMS & CONDITIONS</div>
      <div class="terms-section">
        <div class="terms-grid">
          <ul class="list-unstyled">
            <li>
              <i class="bi bi-check-circle terms-icon"></i>
              <strong>Quotation Validity:</strong> Valid for 30 days from
              the date of issue.
            </li>
            <li>
              <i class="bi bi-check-circle terms-icon"></i>
              <strong>Payment Terms:</strong> 50% advance along with PO.
              Balance 50% prior to dispatch.
            </li>
            <li>
              <i class="bi bi-check-circle terms-icon"></i>
              <strong>Delivery & Execution:</strong> As per approved
              drawings, BOQ and site readiness.
            </li>
            <li>
              <i class="bi bi-check-circle terms-icon"></i>
              <strong>Scope of Work:</strong> Limited to BOQ. Transport /
              unloading / shifting / installation under client scope unless
              agreed.
            </li>
          </ul>
          <ul class="list-unstyled">
            <li>
              <i class="bi bi-check-circle terms-icon"></i>
              <strong>Natural Material Variation:</strong> Shade / grain
              variation is natural.
            </li>
            <li>
              <i class="bi bi-check-circle terms-icon"></i>
              <strong>Drawings & Job Sheet:</strong> Production after
              approval. Changes after approval are chargeable.
            </li>
            <li>
              <i class="bi bi-check-circle terms-icon"></i>
              <strong>Measurement Tolerance:</strong> ±10 mm allowed.
            </li>
            <li>
              <i class="bi bi-check-circle terms-icon"></i>
              <strong>Delays & Force Majeure:</strong> Company not liable.
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-signatures">
        <div>
          <div class="sig-title">CUSTOMER APPROVAL</div>
          <div class="sig-box">Name:</div>
          <div class="sig-box">Signature:</div>
          <div class="sig-box">Date:</div>
        </div>
        <div>
          <div class="sig-title">AUTHORIZED SIGNATURE</div>
          <div class="sig-box">Name:</div>
          <div class="sig-box">Signature:</div>
          <div class="sig-box">Date:</div>
        </div>
        <div>
          <div class="sig-title">NOTES</div>
          <ul style="padding-left: 15px; color: #555; font-size: 11px">
            <li>Prices are inclusive of material & standard finishing.</li>
            <li>Transportation and taxes as mentioned.</li>
            <li>
              Delivery timeline: 15 - 25 working days from date of approval.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<script type="module" src="<?= main('build.js') ?>"></script>
<?php require_once __DIR__ . '/../../../app/includes/footer.php'; ?>