(function() {
    'use strict';

    function setPanelBodePadding() {
        $('.etp-overview .panel').each((i, e) => {
            if ($(e).find('.etp-overview-data-list__date').css('display') != 'block') {
                let dateSpanWidth = $(e).find('.etp-overview-data-list__date').outerWidth();
                $(e).find('.panel-body').css('padding-left', dateSpanWidth);

            } else {
                $(e).find('.panel-body').css('padding-left', 0);
            }

        });
    }

    $('.etp-overview .panel').on('fontSizeChange', setPanelBodePadding);
    setPanelBodePadding();
    $(window).resize(function(event) {
        setPanelBodePadding();
    });

})();
