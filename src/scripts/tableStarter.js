'use strict';

(function ($) {
    'use strict';

    let init = {

        renderTable: function renderTable(tables) {
                let $freezeContainer = $('.fixed-freeze-tb-container');

                tables.forEach((val, index) => {
                    let $container = $freezeContainer.clone();
                    $container.find('.table-container')
                        .prop('id', `tbl__${index}`)
                        .html('');
                    $container.find(`#tbl__${index}`).renderTable(tables[index], { scrollable: true });
                    $('.table__wrapper').append($container);

                    $container.find(`#tbl__${index} table`).scrollTable({
                        freezeCols: 1,
                        maxFreezeWidth: 0.33
                    });
                    $(".table-sort").tablesorter();
                });

                $freezeContainer.remove();
        },

        registerMonthlyBulletinSelect: function registerMonthlyBulletinSelect() {
            $(".select-target-input-2").on('change', function () {
                let value = $(this).attr("data-value");
                init.renderMonthlyBulletinTable(value);
            });
        },

        renderAllTables: function renderAllTables() {
            let path = location.pathname.substr(1).replace(/\.html/, '');
            if (path === 'monthlybulletin2') {
                $.fn.getMonthlyBulletinData('files/table.json').done(function (data) {
                    init.renderTable(data.tables);
                });
            }
        }
    };
    init.renderAllTables();
})(jQuery);
