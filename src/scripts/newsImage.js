(function($) {

    'use strict';

    const TabletAndMobileBP = 767;
    const DesktopAndTabletBP = 1000;


    let isDesktopOrTablet = function isDesktopOrTablet() {
        return window.innerWidth > DesktopAndTabletBP;
    };

    let isTablet = function isTablet() {
        return window.innerWidth > TabletAndMobileBP && window.innerWidth <= DesktopAndTabletBP;
    };

    let isMobile = function isMobile() {
        return window.innerWidth <= TabletAndMobileBP;
    }

    let setTextBoxHeightForDesktop = function setTextBoxHeightForDesktop() {
        let imageHeight = $('#news-feature__it-img').height();
        $('.news-feature__it-text').innerHeight(imageHeight);
    }
    let setTextBoxHeightForTablet = function setTextBoxHeightForTablet() {
        // the picture height fixed to fixed because picture is standard per design team

        // let imageHeight = $('#news-feature__it-img').height();
        let imageHeight = 300;
        $('.news-feature__it-text').innerHeight(imageHeight);
    }

    let setTextBoxHeightForMobile = function setTextBoxHeightForMobile() {
        let textBoxHeight = 170;
        $('.news-feature__it-text').innerHeight(textBoxHeight);
    }

    let init = function init() {
        if (!$('#news-feature__2-boxes').length) {
            return;
        }

        if (isDesktopOrTablet()) {
            setTextBoxHeightForDesktop();
        } else if (isTablet()) {
            setTextBoxHeightForTablet();
        } else if (isMobile()) {
            setTextBoxHeightForMobile();
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
