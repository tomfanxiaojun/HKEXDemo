(function () {
    'use strict';
    showTargetReport();
    reportControl();


    // show target report function for monthlyHighlight report section
    function reportControl() {
        let reports = $('#monthlyHighlight-reports').children();
        let year = $("#select-target-input-year").attr('data-value');
        let quarter = $("#select-target-input-quarter").attr('data-value');
        let targetReport = `${year}-${quarter}`;
        $(reports).each((index, e) => {
            if ($(e).attr('id') == targetReport) {
                $(e).show();
            } else {
                $(e).hide();
            }
        });
    };

    function showTargetReport() {
        $("#select-target-input").on('change', function () {
            reportControl();
        });
    };

    // render tables in monthlyhighlight page
    let init = {

        renderStaticsTable: function renderStaticsTable() {
            $(".monthlyHighlightTable table").scrollTable({
                freezeCols: 1,
                maxFreezeWidth: 0.40
            });
            $.fn.initStickyHeader();
        },

    };
    init.renderStaticsTable();
})();
