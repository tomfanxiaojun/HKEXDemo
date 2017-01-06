(function() {
    'use strict';
    $('.top-menu .nav-icon').on('click', function() {
        let activeMenu = $('.top-menu__items').find('.active');
        $('.top-menu__items li').removeClass('showChildren');
        if (activeMenu.hasClass('hasChildren')) {

            if ($(this).hasClass('nav-icon-toggle')) {

                $('.top-menu__items').css('display') != 'none' ? $('.top-menu__items').slideToggle(500) : '';
                $('.left-menu__wrapper').css('display') != 'none' ? $('.left-menu__wrapper').slideToggle(500) : '';
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
                $('.left-menu__wrapper').slideToggle(500);
            }
        } else {
            $('.top-menu__items').slideToggle(500);
            if ($(this).hasClass('nav-icon-toggle')) {
                $(this).removeClass('nav-icon-toggle');
                $('.icon-nav').show();
                $('.nav-close').hide();
                $('.top-menu__wrapper ul li').show();
                // $('.top-menu__title h2').html($('.banner__pageheading').html());
                $('.left-menu__wrapper').hide();
            } else {
                // $('.top-menu__title h2').html($('.banner__pageheading').html());
                $(this).addClass('nav-icon-toggle');
                $('.icon-nav').hide();
                $('.nav-close').show();

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
    $('.top-menu__wrapper  .hasChildren').on('click', function(e) {
        if ($(e.target).parent().hasClass('top-menu__items')) {
            let currentPage = window.location.pathname.replace('\/', '').toUpperCase();
            let href = $(e.target).find('a').attr('href') && $(e.target).find('a').attr('href').toUpperCase();

            if (window.innerWidth <= 1000) {
                if (currentPage == href) {
                    let $el = $(e.target);
                    if ($el.hasClass('leftside-menu_item') || $el.hasClass('leftside-menu-text') || $el.hasClass('menutitle') || $el.hasClass('back')) {
                        return;
                    }
                    e.preventDefault();
                    $('.top-menu__items').slideToggle(500);
                    $('.left-menu__wrapper ').slideToggle(500);
                } else {
                    let $target = $(e.target);
                    if ($target.hasClass('hasChildren')) {
                        //$('.top-menu__items').slideToggle(500);
                        $('.top-menu__items li').hide();
                        $target.show().addClass('showChildren'); //.removeClass('hasChildren').addClass('showChildren')//.css('padding','0px');
                        $target.find('.left-menu__wrapper').show();
                        $target.find('.left-menu__wrapper .left-menu__level1 li').show();
                        $target.find('.left-menu__wrapper .left-menu__level1').css('position', 'relative').css('right', '-100%');
                        $target.find('.left-menu__wrapper .left-menu__level1').animate({ right: 0 }, 300);

                    }

                }
            }
        }

    });


    $('.top-menu__items li').on('click', function() {
        if (window.innerWidth <= 1000 && !$(this).hasClass('hasChildren')) {
            window.location.href = $(this).children('a').attr('href');
        }
    });

    function stopBubble(evt) {
        var e = evt || window.event;
        if (e.cancelBubble) {
            e.cancelBubble = true;
        } else {
            e.stopPropagation();
        }
    }
    $(window).resize(function() {

        if (window.innerWidth <= 1000) {
            // $('.top-menu__wrapper').css('display','none');
        } else {
            // $('.top-menu__wrapper').css('display','block');
            $('.top-menu__items .left-menu__wrapper').hide();
            $('.top-menu__wrapper .top-menu__items').children().show();

        }
    });
})();
