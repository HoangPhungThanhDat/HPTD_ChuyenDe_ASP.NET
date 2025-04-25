var openDialogBtn = document.getElementById("open-dialog-btn-description");
var dialog = document.querySelector(".dialog2");
var closeDialogBtn = document.getElementById("close-dialog-btn");
var body = document.querySelector("body");

// Mở hộp thoại khi click vào nút
openDialogBtn.addEventListener("click", function() {
  dialog.style.display = "block";
  body.classList.add("dialog-open");
});

// Đóng hộp thoại khi click vào nút đóng
closeDialogBtn.addEventListener("click", function() {
  dialog.style.display = "none";
  body.classList.remove("dialog-open");
});

// Đóng hộp thoại khi click ra ngoài
document.addEventListener("click", function(event) {
  if (!dialog.contains(event.target) && event.target !== openDialogBtn) {
    dialog.style.display = "none";
    body.classList.remove("dialog-open");
  }
});


var openDialogBtn2 = document.getElementById("open-dialog-btn-specifications");
var dialog2 = document.querySelector(".dialog-specification");
var closeDialogBtn2 = document.getElementById("close-dialog-btn-specification");
var body2 = document.querySelector("body");

// Mở hộp thoại khi click vào nút
openDialogBtn2.addEventListener("click", function() {
  dialog2.style.display = "block";
  body2.classList.add("dialog-open");
});

// Đóng hộp thoại khi click vào nút đóng
closeDialogBtn2.addEventListener("click", function() {
  dialog2.style.display = "none";
  body2.classList.remove("dialog-open");
});

// Đóng hộp thoại khi click ra ngoài
document.addEventListener("click", function(event) {
  if (!dialog2.contains(event.target) && event.target !== openDialogBtn2) {
    dialog2.style.display = "none";
    body2.classList.remove("dialog-open");
  }
});

//Frequently asked questions
var methodBox = document.querySelector(".frequently-asked-questions");
var methodBtn = methodBox.querySelector(".fad-show-ans");
var methodText = methodBox.querySelector(".faq-answer");

methodBtn.addEventListener("click", function() {
  if (methodText.style.display === "none") {
    methodText.style.display = "block";
  } else {
    methodText.style.display = "none";
  }
});

//xóa lịch sử sản phẩm đã xem
function hideDiv() {
  var div = document.getElementById("products-viewed");
  div.style.display = "none";
}

//cuon trang
window.onscroll = function() {
  var div = document.getElementById("productAnchor_horizonalNav");
  if (window.scrollY > 800) {
      div.style.display = "block";
  } else {
      div.style.display = "none";
  }
}

//so sanh san pham
var openDialogBtnCompare = document.getElementById("open-dialog-btn-comparation");
var dialogCompare = document.querySelector(".stickcompare");
var closeDialogBtnCompare = document.getElementById("clearall");
var bodyCompare = document.querySelector("body");

// Mở hộp thoại khi click vào nút
openDialogBtnCompare.addEventListener("click", function() {
  dialogCompare.style.display = "block";
  bodyCompare.classList.add("dialog-open");
});

// Đóng hộp thoại khi click vào nút đóng
closeDialogBtnCompare.addEventListener("click", function() {
  dialogCompare.style.display = "none";
  bodyCompare.classList.remove("dialog-open");
});
