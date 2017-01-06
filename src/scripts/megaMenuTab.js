(function registerMegaMenuTab() {

    "use strict";

    let hideAllOpenedMegaMenus = function hideAllOpenedMegaMenus($target) {
        $target.parent().siblings().children('.mega-menu').css('display', 'none');
    };

    let handleEvent = function handleEvent(e) {

        if (e.keyCode !== 13) {
            return;
        }

        let $target = $(e.target);
        let $megaMenu = $target.siblings('.mega-menu');

        let isValidMegaMenuItem = $target.hasClass('main-menu__link') && $megaMenu.length === 1;

        if (!isValidMegaMenuItem) {
            return;
        }

        if ($megaMenu.css('display') === 'block') {
            $megaMenu.css('display', 'none');
            return;
        }

        hideAllOpenedMegaMenus($target);
        $megaMenu.css('display', 'block');

    };
    $('body')
        .on('keyup', handleEvent);


} ());
