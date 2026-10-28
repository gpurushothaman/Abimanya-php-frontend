function initDoorTypes(items, category) {
  let html = "";

  $.each(items, function (index, item) {
    html += `
          <li class="list-group-item list-group-item-action ${
            item?.active ? "active" : ""
          }"
              data-modelType="${item.modelType}" data-modelCategory="${
      item.modelCategory
    }">
              
              <div class="d-flex align-items-center">
                  <img src="${item.img}" width="50" class="me-2">
                  <span>${item.modelViewName}</span>
              </div>

          </li>
      `;
  });
  $(`#${category}`).html(html);
}

$(document).on("click", ".texture-card", function () {
  $(".texture-card").removeClass("active");
  $(this).addClass("active");
});

$(".list-group").on("click", ".list-group-item", function () {
  //Add active to clicked item
  const list = $(this).closest(".list-group");
  list.find(".list-group-item").not(this).removeClass("active");
  $(this).toggleClass("active");

  otherModelType = $(this).attr("data-modelType");
  otherModelCategory = $(this).attr("data-modelCategory");
});

$(document).on("click", ".texture-card", function () {
  $(".texture-card").removeClass("active");
  $(this).addClass("active");
});

$("#downloadPDF").click(function () {
  const element = document.getElementById("pdfContent");

  const options = {
    margin: 0.5,
    filename: "door-report.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
    },
  };

  html2pdf().set(options).from(element).save();
});

// ADDED: Logic to handle Submit & Generate Quotation Design

document.addEventListener("DOMContentLoaded", () => {
  // REPLACED: Find your existing submit button
  const submitBtn = document.getElementById("submitBtn");

  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();
      generateQuotation();
    });
  }
});
