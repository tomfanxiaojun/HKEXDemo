'use strict';

(function($) {
    'use strict';

    $.fn.tableUtils = {
        enableSorting: function enableSorting() {
            $(".table-sort").tablesorter();
        },
        renderTable: function renderTable(tables, freezeColCount) {
            let $freezeContainer = $('.fixed-freeze-tb-container');
            let isArray = tables instanceof Array;
            !isArray && (tables = [tables]);

            tables.forEach((val, index) => {
                let $container = $freezeContainer.clone();
                $container.find('.table-container')
                    .prop('id', `tbl__${index}`)
                    .html('');
                $container.find(`#tbl__${index}`).generateTable(tables[index], { scrollable: true });
                $('.table__wrapper').append($container);
                if (index == 0) {
                    $container.find(`#tbl__${index} table`).scrollTable({
                        freezeCols: freezeColCount || 1,
                        maxFreezeWidth: 0.33,
                        minFreezeWidth: 0.30,
                        tableWidth:800
                    });
                } else {
                    $container.find(`#tbl__${index} table`).scrollTable({
                        freezeCols: freezeColCount || 1,
                        maxFreezeWidth: 0.33
                    });
                }


                $(".table-sort").tablesorter();
            });
            $freezeContainer.remove();
            $.fn.initStickyHeader();

        },
        generateTable: function generateTable(data, args, callback) {
            return $.fn.generateTable(data, args, callback);
        }
    };

})(jQuery);
