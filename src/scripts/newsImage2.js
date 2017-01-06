'use strict';

(function($) {
    'use strict';

    const DesktopAndTabletBP = 1000;
    const TabletAndMobileBP = 767;

    let isDesktop = function isDesktop() {
        return window.innerWidth > DesktopAndTabletBP;
    };

    let isTablet = function isTablet() {
        return window.innerWidth > TabletAndMobileBP && window.innerWidth <= DesktopAndTabletBP;
    };
    let isMobile = function isMobile() {
        return window.innerWidth <= TabletAndMobileBP;
    }



    let setHeightForDestop = function setHeightForDestop() {
        $('#news-feature__i-img').height('auto');
        $('#news-feature__itv-img').height('auto');
        let thirdImageHeight = parseInt($('#news-feature__i-img').height());
        let firstImageHeight = parseInt($('#news-feature__itv-img').height());
        $('#news-feature__i-img').height(thirdImageHeight);
        $('#news-feature__itv-img').height(firstImageHeight);
        $('.news-feature__t-wrapper').innerHeight(thirdImageHeight);
        let firstTextHeight = thirdImageHeight - firstImageHeight;
        $('#news-feature__itv-text').innerHeight(firstTextHeight);
    }

    let setHeightForTablet = function setHeightForTablet() {

        // the picture height fixed to fixed because picture is standard per design team

        //let thirdImageHeight = $('#news-feature__i-img').height();
        let thirdImageHeight = 330;
        // let firstImageHeight = $('#news-feature__itv-img').height();
        let firstImageHeight = 300;
        $('#news-feature__itv-img').innerHeight(firstImageHeight);
        $('.news-feature__t-wrapper').innerHeight(thirdImageHeight);
        let firstTextHeight = firstImageHeight;
        $('#news-feature__itv-text').innerHeight(firstTextHeight);
    }
    let setHeightForMobile = function setHeightForMobile() {
        $('#news-feature__itv-img').innerHeight('auto');
        let firstTextHeight = 170;
        $('#news-feature__itv-text').innerHeight(firstTextHeight);
        let secondImageWidth = $('#news-feature__i-img').height();
        $('.news-feature__t-wrapper').innerHeight(secondImageWidth);

    }

    let init = function init() {
        if (!$('#news-feature__3-boxes').length) {
            return;
        }
        if (isDesktop()) {
            setHeightForDestop();
        } else if (isTablet()) {
            setHeightForTablet();
        } else if (isMobile()) {
            setHeightForMobile();
        }
    }

    $(window).on('resize', () => {
        setTimeout(init, 1000);
    });

    $(window).bind("load", function() {
        // when page loaded, call function
        init()
    });
})(jQuery);
