(function () {
    'use strict';

    // render tables for margin table in equityIndex
    let init = {

        renderStaticsTable: function renderStaticsTable() {
            $(".marginTable table").scrollTable({
                freezeCols: 2,
                maxFreezeWidth: 0.33
            });
            $.fn.initStickyHeader();
        },

    };
    init.renderStaticsTable();
})();
