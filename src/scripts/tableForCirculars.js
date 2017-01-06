'use strict';

(function($) {
    'use strict';
    $(document).ready(function() {
        $('.circulars-table-1').scrollTable({
            freezeCols: 1,
            maxFreezeWidth: 0.4,
            minFreezeWidth: 0.20,
            tableWidth: 661
        });
        $('.circulars-table-1').find('.freeze-col-context').each((i, e) => {
            //$(e).css('height', $(e).parent().outerHeight());
            $(e).height($(e).parent().outerHeight())
        });
        $(".circulars-table-1").tablesorter({
            headers: {
                0: { sorter: "shortDate", dateFormat: "ddmmyyyy" },
                1: { sorter: false }
            },
            textExtraction: {
                2: function(node, table, cellIndex) {
                    return $(node).find(":not(span[class*='tag'])").text(); }
            }
        });
    });
})(jQuery);
