'use strict';

(function ($) {
    'use strict';

    let init = {
        renderAllTables: function renderAllTables() {
            let path = location.pathname.substr(1).replace(/\.html/, '');
            if (path.toLowerCase() === 'chinadimension') {
                $.getJSON('files/chinaDimension.json').done(function (data) {
                  let mainBoardData = data.tables[0];
                  $.fn.tableUtils.renderTable(data.tables[0]);
                });
            }
        }
    };
    init.renderAllTables();
})(jQuery);
