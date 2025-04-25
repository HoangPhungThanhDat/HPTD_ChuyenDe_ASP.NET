var radioButtons = document.getElementsByName("radio-group");
var optionContents = document.getElementsByClassName("option-content");

for (var i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener("click", function() {
    for (var j = 0; j < optionContents.length; j++) {
      optionContents[j].classList.remove("active");
    }
    var contentId = this.value + "-content";
    var content = document.getElementById(contentId);
    content.classList.add("active");
  });
}
document.getElementsByClassName("option-content")[0].classList.add("active");


//chon dia chi nhan hang
var radioButtons_dcnh = document.getElementsByName("delivery_type");
var optionContents_dcnh = document.getElementsByClassName("place-content1");

for (var i = 0; i < radioButtons_dcnh.length; i++) {
  radioButtons_dcnh[i].addEventListener("click", function() {
    for (var j = 0; j < optionContents_dcnh.length; j++) {
      optionContents_dcnh[j].classList.remove("active");
    }
    var contentId_dcnh = this.value + "-content1";
    var content_dcnh = document.getElementById(contentId_dcnh);
    content_dcnh.classList.add("active");
  });
}
document.getElementsByClassName("place-content1")[0].classList.add("active");