(function() {
    'use strict';
    window.onload = function() {
        $('.textInput').each(
            function(i, el) {
                if (el.placeholder != undefined) {
                    document.getElementById('placeholder').innerHTML = el.placeholder;
                }
            });
    };
    $('.textInput').click(function() {
        $(".placeholder").hide();
    });
})();
