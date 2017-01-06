(function () {

    'use strict';

    // start: sticky header on mobile and tablet
    let scrollPosition;
    let lastScrollPosition = 0;
    let headerHeight = $('header').height();
    const TABLET_BP = 1000;

    //for scroll
    let stickyHeaderIsVisable = false;

    $(window).scroll(function (event) {
        if($(window).width() <= TABLET_BP) {
            scrollPosition = $(this).scrollTop();
            hasScrolled();
        }
    });

    function hasScrolled() {
        if (scrollPosition > lastScrollPosition) {
            // Scroll Down
            hideStickyHeader();
        } else {
            // Scroll Up
            if (scrollPosition === 0) {
                hideStickyHeader();
                return;
            }
            if (scrollPosition > 0 && scrollPosition + $(window).height() < $(document).height()) {
                if (!stickyHeaderIsVisable) {
                    showStickyHeader();
                }


            }
        }
        lastScrollPosition = scrollPosition;
    }

    // end: sticky header on mobile and tablet
    function hideStickyHeader() {
        stickyHeaderIsVisable = false;
        $('.topbar').removeClass('topbar-sticky');
        $('.main-menu').removeClass('main-menu-sticky');
        $('body').css('margin-top', '');
    }

    function showStickyHeader() {
        stickyHeaderIsVisable = true;
        $('.topbar').addClass('topbar-sticky');
        $('.main-menu').addClass('main-menu-sticky');
        $('body').css('margin-top', headerHeight + 'px');
    }

    $(window).on('resize', function(){
        if($(window).width() > TABLET_BP){
            hideStickyHeader();
        }
    });

})();
