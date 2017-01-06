(function() {
	'use strict';
  let $inputText = $(".form-input-text"),
      $inputErea = $(".form-input-textarea");
      inputElementEvent($inputText,"input");
      inputElementEvent($inputErea,"textarea");

  function inputElementEvent($inputElement,inputType) {
    if($inputElement.length<=0){return;}
    $inputElement.each(function () {
      $(this).keyup(function () {
        if($(this).find(inputType).val()===""){
          $(this).find("label").removeClass("hint-label");
        }else{
          $(this).find("label").addClass("hint-label");
        }
      });
    });
  }
})();
