(function () {

    'use strict';

    // start: fixed top-nav
    let scrollPosition;
    let lastScrollPosition = 0;
    let headerHeight = $('header').height();
    let errMessageHeight = 0;
    let navHeight = $('nav').height();
    const TABLET_BP = 1000;

    const $mobilevMenu = $('.topbar__mobile-menu');

    //for scroll
    let skickyMenuIsVisible = false;

    $(window).scroll(function (event) {
        if (window.innerWidth > TABLET_BP) {
            scrollPosition = $(this).scrollTop();
            hasScrolled();
        }
    });

    function hasScrolled() {

        if (scrollPosition > lastScrollPosition) {
            // Scroll Down
            hideStickyMenu();
        } else {
            // Scroll Up
            if($('.ticker-messages').length > 0) {
                errMessageHeight = $('.ticker-messages').height();
            }
            
            if (scrollPosition < headerHeight + errMessageHeight) {
                hideStickyMenu();
                return;
            }
            if (scrollPosition + $(window).height() < $(document).height()) {
                if (!skickyMenuIsVisible) {
                    showStickyMenu();
                }


            }
        }

        lastScrollPosition = scrollPosition;
    }
    // end: fixed top-nav
    function hideStickyMenu() {
        skickyMenuIsVisible = false;
        $('nav.main-menu').removeClass('sticky-menu');
        $('header.topbar').removeClass('nav-placeholder');
        $('li.sticky-menu__logo').addClass('sticky-menu__non-fixed');
        $('li.sticky-menu__search').addClass('sticky-menu__non-fixed');
        $('div.sticky-menu__search-container').hide();
        $('ul.main-menu__list.level1').css('margin-left', '');
    }

    function showStickyMenu() {
        skickyMenuIsVisible = true;
        $('nav.main-menu').addClass('sticky-menu');
        /*if (window.innerWidth > TABLET_BP) {
            $('nav.main-menu').css('height', '0');
            $('nav.main-menu').animate({
               height: 60
            }, 300, function () { });
        }*/

        $('header.topbar').addClass('nav-placeholder');
        $('li.sticky-menu__logo').removeClass('sticky-menu__non-fixed');
        $('li.sticky-menu__search').removeClass('sticky-menu__non-fixed');
        $('ul.main-menu__list.level1').css('margin-left', 0);
    }
    // start: show search field in sticky menu
    function showSearchStickyMenu() {
        $('.sticky-menu__search-icon').click(function () {
            $('div.main-menu__wrapper').addClass('sticky-menu__parent-relative');
            $('.sticky-menu__search-container').fadeIn();
        });
    }
    // end: show search field in sticky menu
    // start: hide search field in sticky menu
    function hideSearchStickyMenu() {
        $('.sticky-menu__search-cancel').click(function () {
            $('.sticky-menu__search-box').val('');
            $('.sticky-menu__search-container').fadeOut();
            setTimeout(function(){
                $('div.main-menu__wrapper').removeClass('sticky-menu__parent-relative');
            },400);
        });
    }
    // end: hide search field in sticky menu

    $(window).on('resize',(event)=>{
       if($(window).outerWidth() <= 1000){
            hideStickyMenu();
            $('nav.main-menu').css('height', '0');
       }else {
           $('nav.main-menu').css('height', '100%');
       }
    });

    function toggleMenu() {
        $mobilevMenu.on('click', function () {
            $('body').addClass('show-menu');
        });

    }

    function registerMobileMenu() {
        function clear() {
            let $curr = $('.main-menu ul > li.current');
            let $parent = $curr.closest('li:parent');
            $curr.siblings().find('li:not(.sticky-menu__non-fixed)').slideDown();
            $parent.siblings().find('li:not(.sticky-menu__non-fixed)').slideDown();
            $curr.removeClass('current').find('ul').slideUp();
        }

        $('.main-menu ul.level1 > li').on('click', function (e) {
            if($(e.target).is('a')) return;

            let $this = $(this);

            if ($this.hasClass('current')) {
                clear();
            } else if ($this.siblings().hasClass('current')) {
                $this.siblings('.current').find('.mega-menu').find('ul.level2').slideUp();
                $this.siblings('.current').removeClass('current');
                $this.addClass('current').find('.mega-menu .level2').slideDown();

            } else if (!$this.hasClass('current') && window.innerWidth < TABLET_BP && $this.children().length > 1) {
                $this.addClass('current').find('.mega-menu .level2').slideDown();
            }
        });


        $('.main-menu .main-menu__list ul:not(.level1) > li').on('click', function (e) {
            if($(e.target).is('a')) return;
            
            e.stopPropagation();
            let $this = $(this);

            if ($this.hasClass('current')) {
                $(this).toggleClass('current');
                $(this).find('ul').eq(0).slideToggle();
            } else if ($this.siblings().hasClass('current')) {

                $this.siblings('.current').removeClass('current').find('> ul').slideUp();
                $this.addClass('current').find('ul').eq(0).slideDown();

            } else if ($this.parent('ul.level2').siblings().find('li.current').length > 0) {
                $this.parent('ul.level2').siblings().find('li.current').removeClass('current').find('ul').slideUp();
                $this.addClass('current').find('ul').eq(0).slideDown();

            } else if (!$this.hasClass('current') && window.innerWidth < TABLET_BP && $this.children().length > 1) {
                // $this.parents('.current').siblings('li').slideUp();
                $this.addClass('current').find('ul').eq(0).slideDown();
            }

        });
    }

    function renderMobilePopover() {

        $('.m-topbar__about-link').after($('.topbar__about-popover').clone());
        $('.m-topbar__related-sites-link').after($('.topbar__related-sites-popover').clone());

    }

    function removeOverlay() {
        let $overlay = $('.overlay');
        $overlay.on('click', function () {
            $('body').removeClass('show-menu');
             $('.fixed-freeze-tb').trigger('menuCloseEvent');            
        });
    }

    function init() {
        removeOverlay();
        toggleMenu();
        registerMobileMenu();
        showSearchStickyMenu();
        hideSearchStickyMenu();
        renderMobilePopover();
    }
    init();
})();
