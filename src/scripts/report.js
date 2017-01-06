(function() {
    'use strict';
    $(window).on("load",function() {
        $("#select-target-date,#select-target-quarter").on('change', function(e) {
            let reportID = $("#select-target-date").attr('data-value') + '-' + $("#select-target-quarter").attr('data-value');
            $('#reports').children().each((i, e) => {
                if ($(e).attr('id') == reportID) {
                    $(e).attr('data-target-report', true);
                } else {
                    $(e).removeAttr('data-target-report');
                }

            });

        });
        $("#select-target-etp").on('change', function(e) {
            let reportID = $(this).attr('data-value');
            $('#reports-etp').children().each((i, e) => {
                if ($(e).attr('id') == reportID) {
                    $(e).attr('data-target-report', true);
                } else {
                    $(e).removeAttr('data-target-report');
                }

            });

        });
        $("#select-target-listing-committee").on('change', function(e) {
            let reportID = $(this).attr('data-value');
            $('#reports-listing-committee').children().each((i, e) => {
                if ($(e).attr('id') == reportID) {
                    $(e).attr('data-target-report', true);
                } else {
                    $(e).removeAttr('data-target-report');
                }

            });

        });
    });
})();
