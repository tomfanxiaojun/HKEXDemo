/*-- Changing FAQ page search text box place holder for phone only
     Only for mobile, screen width 768px
--*/
var screenSize_mobile = "768";

(function() {
    'use strict';
    $(window).on("load",function() {

        function changePlaceHolder(selector, palceholderText) {
            $(selector).attr("placeholder", palceholderText);
        }

        function setPlaceHolder() {
            if (window.innerWidth < screenSize_mobile) {
                changePlaceHolder("#searchTextFAQ", "Question, Keyword, Topic");
            } else {
                changePlaceHolder("#searchTextFAQ", "Enter a question, keyword, or topic");
            }
        }

        // ie9 placeholder
        let isIE9 = navigator.userAgent.indexOf("MSIE 9.0") > 0;
        if (isIE9) {
            document.getElementById("mega-menu-one__search-input").style.paddingLeft = "30px";
        }

        setPlaceHolder();
        $(window).resize(function() {
            setPlaceHolder();
        });
    });
})();
