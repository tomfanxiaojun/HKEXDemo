(function() {
    'use strict';
    let forTopStockTab = function() {
        if(hkexApp.utils.isDesktop()) {
            $('.top5-stocks .popover').detach().insertAfter('.top5-stocks a[data-toggle]');
        }else{
            $('.top5-stocks .popover').detach().insertAfter('.top5-stocks .right-panel-sections-label');
        }
    };

    $(window).on('resize', () => {
        forTopStockTab();
    });

    forTopStockTab();

})();