(function() {
    'use strict';
    $(window).on("load", function() {
        setInfoCardHeight();
    });

    function setInfoCardHeight() {
        let $maxHeight = 0;
        $('.info-card').each((index, card) => {
            $(card).removeAttr("style");
        });
        $('.info-card').each((index, card) => {
            if ($(card).outerHeight() > $maxHeight) {
                $maxHeight = $(card).outerHeight();
            }
        });
        $('.info-card').each((index, card) => {
            $(card).css('height', $maxHeight);
        });
    }

    $('.font-sizes--small, .font-sizes--medium, .font-sizes--large').click(function(e) {
        e.preventDefault();
        setInfoCardHeight();
    });

    $(window).on('resize', () => {
        setInfoCardHeight();
    });

})();
