(function ($) {

    'use strict';

    let config = null;
    let renderHeader = function renderHeader(data) {
        let $thead = $('<thead/>', {});

        for (let row in data) {
            if (!data.hasOwnProperty(row)) continue;

            let $row = $('<tr/>', {});

            data[row].forEach(col => {
                let $th = $('<th/>', {
                    text: col.text,
                    rowspan: col.rowspan,
                    colspan: col.colspan,
                    class: (col.colspan) ? 'sorter-false' : ''
                });
                $th.css('text-align', isNumberCol(col.isNumField) ? 'right' : 'left');

                $row.append($th);
            });
            $thead.append($row);
        }
        return $thead;
    };

    let renderFooter = function renderFooter(data) {

        let $div = $('<div/>', {class: 'table-footer'});
        for (let row in data) {
            if (!data.hasOwnProperty(row)) continue;

            data[row].forEach(col => {
                let $p = $('<p/>', {
                    text: col.text,
                });

                $div.append($p);
            });

        }
        return $div;
    };

    let isNumberCol = function isNumber(data) {
        if(typeof data === 'boolean') {
            return data;
        }

        // default behavior is to align right;
        return true;
    };


    let renderBody = function renderBody(data) {
        let $tbody = $('<tbody/>', {});

        for (let row in data) {
            if (!data.hasOwnProperty(row)) continue;

            let $row = $('<tr/>', {});
            data[row].forEach(col => {
                let $td = $('<td/>', {
                    text: col.text,
                    rowspan: col.rowspan,
                    colspan: col.colspan,
                    board: col.board,
                    shareType: col.shareType
                });

                $td.css('text-align', isNumberCol(col.isNumField) ? 'right' : 'left');
                $td.css('background-color', col.isShaded ? '#dfe9ed': '');

                $row.append($td);
            });
            $tbody.append($row);
        }
        return $tbody;

    };

    let hasKey = function hasKey(obj, name) {
        let keys = Object.keys(obj);
        return keys.find(k => k.toString() === name.toString());
    };

    let formatData = function formatData(data) {
        let formattedData = {};

        data.forEach(r => {
            let key = r.row;

            if (!hasKey(formattedData, key)) {
                formattedData[key] = [];
            }
            formattedData[key].push(r);
        });
        return formattedData;
    };

    let generateTable = function generateTable(data, args, callback) {
        let config = {
            headCount: 1,
            scrollable: false
        };
        $.extend(config, args);
        let $table = $('<table/>', {
            class: 'table table-sort table-style'
        });

        if(config.className) {
            $table.addClass(className);
        }

        if (config.scrollable) {
            $table.addClass('fixed-freeze-tb');
        }
        if (config.headCount > 1) {
            $table.addClass('hasSubHeading');
        }
        let headData, bodyData, footerData;

        data.header && (headData = formatData(data.header));
        data.body && (bodyData = formatData(data.body));
        data.footer && (footerData = formatData(data.footer));

        let $thead = renderHeader(headData);
        let $tfoot = renderFooter(footerData);
        let $tbody = renderBody(bodyData);

        $table.append($thead);
        $table.append($tbody);
        // $table.after($tfoot);



        $(this).append($table);
        $(this).after($tfoot);


        if (callback && typeof callback === "function") callback();
    };

    $.fn.extend({ generateTable: generateTable });
} (jQuery));
