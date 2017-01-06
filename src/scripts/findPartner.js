(function () {
    'use strict';

    // render tables in monthlyhighlight page
    let init = {

        renderStaticsTable: function renderStaticsTable() {
            $(".findParter__Table table").scrollTable({
                freezeCols: 1,
                maxFreezeWidth: 0.50,
                minFreezeWidth: 0.29
            });
            $.fn.initStickyHeader();
        },

    };
    init.renderStaticsTable();
    
})();