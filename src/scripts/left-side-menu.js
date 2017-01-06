(function() {

    'use strict';
    $('.leftside-menu__item, .leftside-menu_item').on('click', function(e) {
        e.stopPropagation();
        var $this = $(this);
        var $alink = $(this).children('a');
        if (window.innerWidth > 1000) {
            window.location.href = $alink.attr('href');
        } else {
            clickSubMenuOnTabletAndMobile($this, $alink);
        }
    });
    var clickSubMenuOnTabletAndMobile = function($this, $alink) {
        if ($this.hasClass('hasChildren') || $this.hasClass('showChildren')) {
            if (!$this.children('ul').is(':visible')) {
                $('.left-menu__level1 li').hide();
                $this.show();
                $this.find('.left-menu__level2').show();
                $this.find('.left-menu__level2 li').show();
                $this.find('.left-menu__level2').css('right', '-100%');
                $this.find('.left-menu__level2').animate({ right: 0 }, 300);
                $this.addClass('show-left-menu__level2');
            }
        } else if ($alink.attr('href')) {
            window.location.href = $alink.attr('href');
        }
    };


    $('.left-menu .nav-icon').on('click', function() {
        let $activeLeftMenu = $('.left-menu__wrapper').find('.active').parent();
        let $this = $activeLeftMenu.parent();
        if ($activeLeftMenu.hasClass('left-menu__level2') && !$(this).hasClass('nav-icon-toggle')) {
            $('.left-menu__wrapper').slideToggle(500);
            $('.left-menu__level1 li').hide();
            $this.show();
            $this.find('.left-menu__level2').show();
            $this.find('.left-menu__level2 li').show();
            $this.find('.left-menu__level2').css('right', '-100%');
            $this.find('.left-menu__level2').animate({ right: 0 }, 300);
            $this.addClass('show-left-menu__level2');
        } else {
            $('.left-menu__wrapper').slideToggle(500);
        }
        if ($(this).hasClass('nav-icon-toggle')) {
            $(this).removeClass('nav-icon-toggle');
            $('.icon-nav').show();
            $('.nav-close').hide();
            $('.left-menu__item').show();
            $('.left-menu__level2').hide();
            setTitle();
        } else {
            $('.left-menu__title h2').html($('#menuTitle').attr('title'));
            $(this).addClass('nav-icon-toggle');
            $('.icon-nav').hide();
            $('.nav-close').show();
            setContainerHeight();
        }
    });

    $('.left-menu__wrapper .hasChildren, .left-menu__wrapper .showChildren, .left-menu__item ').on('click', function(e) {
        let $el = $(e.target);
        if ($el.hasClass('left-menu__link') == true && window.innerWidth < 1000) {
            if ($(this).hasClass('hasChildren')) {
                let subMenu = $el.parent().find('.left-menu__level2').children().not('.back,.menutitle').first().find('a');
                if (subMenu.attr('href') != 'javascript:void(0)' && subMenu.attr('href') != '#') {
                    window.location.href = '/' + subMenu.attr('href');
                }

            }
        } else {
            if (window.innerWidth <= 1000) {
                if ($el.attr('href')) {
                    window.parent.location.replace($el.attr('href'));
                } else {
                    clickSubMenuOnTabletAndMobile($el, $el.children('a'));

                }
            } else {
                if ($(this).hasClass('hasChildren')) {
                    if ($el.hasClass('left-menu__link')) { // need to active the first sub menu.
                        let subMenu = $el.parent().find('.left-menu__level2').children().not('.back,.menutitle').first().find('a');
                        if (subMenu.attr('href') == 'javascript:void(0)') {
                            $el.parent().find('.left-menu__level2').children().not('.back,.menutitle').first().trigger('click');
                            $('.left-menu__level2').slideUp("slow");
                            $(".showChildren").removeClass('showChildren').addClass('hasChildren');
                            $(this).children('.left-menu__level2').slideDown("slow");
                            $(this).removeClass('hasChildren').addClass('showChildren');
                        } else {
                            $el.parent().find('.left-menu__level2').children().not('.back,.menutitle').first().trigger('click');
                        }

                    } else {
                        $('.left-menu__level2').slideUp("slow");
                        $(".showChildren").removeClass('showChildren').addClass('hasChildren');
                        $(this).children('.left-menu__level2').slideDown("slow");
                        $(this).removeClass('hasChildren').addClass('showChildren');
                    }

                } else {
                    if ($(this).find('.left-menu__level2').length > 0) {
                        $('.left-menu__level2').slideUp("slow");
                        $(this).removeClass('showChildren').addClass('hasChildren');
                    }

                }
            }
        }

    });

    $('.back ').on('click', function(e) {
        if (window.innerWidth <= 1000) {
            $('.left-menu__item').removeClass('show-left-menu__level2');
            if ($(this).find('.leftside-menu__level2-back').length > 0) {
                $(this).parents('.left-menu__level2').animate({ right: '-100%' }, 300, function() {
                    $(this).hide();
                    $('.left-menu__item').show();
                });
            }
            if ($(this).find('.leftside-menu__level1-back').length > 0) {
                $(this).parents('.left-menu__wrapper').find('a').css('position', 'relative');
                $(this).parents('.left-menu__wrapper').find('a').animate({ right: '-100%' }, 300, function() {
                    $(this).parents('.left-menu__wrapper').hide();
                    $(this).parents('.left-menu__wrapper').find('a').css('right', '0');

                });
                $('.top-menu__items li').removeClass('showChildren').show();
                $('.top-menu__items li').find('a').css('position', 'relative').css('right', '-100%');
                $('.top-menu__items li').find('a').animate({ right: 0 }, 300);
                $('.top-menu__items').show().find('.left-menu__wrapper').hide();

            }
        }
    });
    var setTitle = function() {
        var selector = $('.left-menu__title h2');
        var content = $('#menuTitle').attr('title');
        var level_2_menu = $('.left-menu__level2 li.active a');


        if (window.innerWidth <= 1000) {
            $('#menuTitle').text($('#menuTitle').attr('data-mobile-title'));
        } else {
            $('#menuTitle').text($('#menuTitle').attr('data-pc-title'));
        }
        selector.html(content);
        setContainerHeight();
    };

    var setContainerHeight = function() {
        var height = $('#menuTitle').outerHeight();
        $('.nav-icon').css('height', height + 'px');
    };

    var setBanner = function() {
        if (window.innerWidth <= 1000) {
            if ($('.top-menu__wrapper').length == 0) {
                $('.banner').css('display', 'none');
            }
        } else {
            $('.banner').css('display', 'block');
        }
    };

    setTitle();
    setBanner();
    $(window).resize(function() {
        setTitle();
        setBanner();

        if ($('.left-menu__level2') && window.innerWidth <= 1000 && hkexApp.utils.isPc()) {            
            $('.left-menu__wrapper').css('display', 'none');
            $('.left-menu__title .nav-icon .icon-nav').css('display', 'block');
            $('.left-menu__title .nav-icon .nav-close').css('display', 'none');
            $('.left-menu__level2').css('display', 'none');
            $('.left-menu__title .nav-icon').removeClass('nav-icon-toggle');
            $('.left-menu__item').removeClass('show-left-menu__level2')
        } else {
            if( hkexApp.utils.isPc()){
                $('.left-menu__wrapper').css('display', 'block');
                $('.showChildren .left-menu__level2').css('display', 'block');
                $('.left-menu__title .nav-icon .icon-nav').css('display', 'none');
                $('.left-menu__title .nav-icon .nav-close').css('display', 'block');
                $('.left-menu__title .nav-icon').addClass('nav-icon-toggle'); 
            }
           
          
        }
    });

})();
