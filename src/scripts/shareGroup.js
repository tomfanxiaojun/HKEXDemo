'use strict';

(function($) {
    'use strict';
    $('.share-group--show__icon').on('click', (e) => {
        preDef(e);
        let $showIcon = $(e.target).parent();
        $showIcon.parent().find('.share-group--items').show();
    });
    $('.share-group--items__close').on('click', (e) => {
        preDef(e);
        $(e.target).parent().parent().hide();
    });

    function preDef(evt) {
        var e = evt || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }
})(jQuery);
