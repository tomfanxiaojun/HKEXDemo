(function() {
    'use strict';
    $("#tablink li a").click(function() {
        $("#tablink li").removeClass('selected');
        $(this).parent().addClass('selected');
    });
})();
