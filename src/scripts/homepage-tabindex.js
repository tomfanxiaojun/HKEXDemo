/**
 * For homepage tab index 
 * @return {[type]} [description]
 */
(function() {

    'use strict';
    let menus = $(".main-menu__list").children();

    $(menus).each(function(index, e) {
        $(e).data('index', index + 1);
        $(e).keydown(function(event) {
            if (event.which == 13) { // Enter Key
                $(e).addClass('main-menu__item-active');
                let megaMenu;
                $($(e).children()).each(function(i, c) {
                    if ($(c).hasClass('mega-menu')) {
                        megaMenu= c;
                    }
                });
                $(megaMenu).show();
            }
        });
        $(e).focusin(function(event) {
            if ($(event.target).hasClass('main-menu__link')) {
                $(menus).each(function(index, el) { // each sub menu should be hidden;                  
                    if ($(el).data('index') != index) {
                        $(el).removeClass('main-menu__item-active');
                        let m = $(el).children()[1];
                        $(m).hide();
                    }
                });
            }

        });
    });



})();
