(function() {
    'use strict';
    $(window).on("load",function() {
        $('.collapse').collapse('hide');
        $("a[data-file-type]").on('click',(event)=>{
        	event.stopPropagation();
        });
    });
    
})();
