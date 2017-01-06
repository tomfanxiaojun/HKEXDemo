'use strict';

(function ($) {
    'use strict';

    let init = {
        registerMonthlyBulletinSelect: function registerMonthlyBulletinSelect() {
            $(".select-target-input-2").on('change', function () {
                let value = $(this).attr("data-value");
                init.renderMonthlyBulletinTable(value);
            });
        },
        hidePrintPreview: function hidePrintPreview(status) {
            $('.btn-print-preview').css('display', status ? '' : 'none');
        },
        renderTitle: function renderTitle(title) {
            if (!title) return;
            let $p = $('<p/>', { text: title })
                .addClass('monthly-bulletin__timestamp');

            $('.table__wrapper').find('.monthly-bulletin__img').prepend($p);
        },
        renderImage: function renderImage(data) {
            if (!data) return;

            let $div = $('<div/>').css({
              'margin-left':'30px',
              'margin-right': '30px',
              'margin-top': '20px',
              'margin-bottom': '0'
            }).addClass('monthly-bulletin__img');


            data.forEach((d) => {
                let $image = $('<img/>', {
                    src: d.src,
                    alt: d.alt
                });

                $image.css('margin-bottom', '20px');
                $div.append($image);
            });

            $('.table__wrapper').prepend($div);
        },

        renderAllTables: function renderAllTables() {
            let path = location.pathname.substr(1).replace(/\.html/, '').toLowerCase();
            if (path === 'monthlybulletin2') {
                $.getJSON('files/table.json').done(function (data) {
                    $.fn.tableUtils.renderTable(data.tables);
                    init.renderImage(data.images);
                    init.renderTitle(data.title);
                    init.hidePrintPreview(data.isPrintPreview);
                });
            } else if (path === 'monthlybulletin') {

                $.getJSON('files/table_with_differnt_header.json').done(function (data) {
                    $.fn.tableUtils.renderTable(data.tables, 1);
                    init.renderImage(data.images);
                    init.renderTitle(data.title);
                    init.hidePrintPreview(data.isPrintPreview);
                });
            }
        }
    };
    init.renderAllTables();
})(jQuery);
