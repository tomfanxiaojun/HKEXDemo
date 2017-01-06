(function () {
    'use strict';


    $(window).on("load", function () {


        $("#slider").responsiveSlides({
            auto: true,
            pager: true,
            nav: true,
            speed: 1000,
            pause: true,
            namespace: "slider__slides"

        });

        $('#index-type-tabs a:eq(0)').tab('show');
        var activeIndex = 1;
        var tabShowCount = 4;
        var showIdsRange = [];
        var childs = $('#index-type-tabs').children();
        var childLen = childs.length;
        var minId = 0;
        var maxId = 0;
        var ids = [];
        var lastShowIdIndex = 0;
        var firstShowIdIndex = 0;
        // init show range
        function initRange() {
            $(childs).each(function (index, e) {
                var id = $(e).data('id');
                if (minId == 0) {
                    minId = id;
                    maxId = minId;
                }
                minId = minId > id ? id : minId;
                maxId = maxId > id ? maxId : id;
                ids.push(id);
            });
            ids.sort(function (a, b) {
                return a - b;
            });
            ids.forEach(function (e, index) {
                if (index >= firstShowIdIndex && showIdsRange.length < tabShowCount) {
                    showIdsRange.push(e);
                    lastShowIdIndex = index;
                }
            });
        }
        initRange();

        function showRange() {
            $(childs).each(function (index, li) {
                if (showIdsRange.indexOf($(li).data('id')) > -1) {
                    $(li).show();
                } else {
                    $(li).hide();
                }
            });
        }
        //showRange();

        function initBtStatus(btType) {
            if (showIdsRange.indexOf(maxId) > -1) {
                disableBt('up');
                if (btType == 'up') {
                    return;
                }
            } else {
                enableBt('up');
            }
            if (showIdsRange.indexOf(minId) > -1) {
                disableBt('down');
                if (btType == 'down') {
                    return;
                }
            } else {
                enableBt('down');
            }
        }
        initBtStatus('up');
        initBtStatus('down');
        // down and down bts handler
        function upAndDownHandler(btType) {
            if (showIdsRange.indexOf(maxId) > -1) {
                disableBt('up');
                if (btType == 'up') {
                    return;
                }
            }
            if (showIdsRange.indexOf(minId) > -1) {
                disableBt('down');
                if (btType == 'down') {
                    return;
                }
            }
            if (btType == 'up') {
                showIdsRange.shift();
                ++firstShowIdIndex;
                showIdsRange.push(ids[++lastShowIdIndex]);
                if (lastShowIdIndex == ids.length - 1) {
                    disableBt('up');
                } else {
                    enableBt('down');
                }
            } else if (btType = 'down') {
                showIdsRange.pop();
                --lastShowIdIndex;
                showIdsRange.unshift(ids[--firstShowIdIndex]);
                if (firstShowIdIndex == 0) {
                    disableBt('down');
                } else {
                    enableBt('up');
                }
            }
            showRange();

        }
        $('#market-overview__up-bt').on('click', function (e) {
            upAndDownHandler('up');
        });
        $('#market-overview__down-bt').on('click', function (e) {
            upAndDownHandler('down');
        });
        // init the  bt to disable
        //disableBt('down');

        function disableBt(btName) {
            $('#market-overview__' + btName + '-bt')
                    .removeClass('market-overview__bt-enable')
                    .removeClass('market-overview__' + btName + '-bt')
                    .addClass('market-overview__bt-disable')
                    .addClass('market-overview__' + btName + '-bt-disable');
        }
        disableBt('left');
        // init the bt to enable
        function enableBt(btName) {
            $('#market-overview__' + btName + '-bt')
                    .removeClass('market-overview__bt-disable')
                    .removeClass('market-overview__' + btName + '-bt-disable')
                    .addClass('market-overview__bt-enable')
                    .addClass('market-overview__' + btName + '-bt');
        }
        enableBt('right');

        $('#market-overview__left-bt').on('click', function (e) {
            if (activeIndex == 0) {
                disableBt('left');
                return;
            }
            enableBt('right');
            if (activeIndex < childLen) {
                activeIndex--;
                if (activeIndex == 0) {
                    disableBt('left');
                }
                var childs = $('#index-type-tabs').children();
                $(childs).each(function (index, li) {
                    if (index == activeIndex) { // show
                        $(li).show();

                    } else {
                        // hiden
                        $(li).hide();
                    }
                });
                enableBt('down');
            }
        });
        $('#market-overview__right-bt').on('click', function (e) {
            if (activeIndex == childLen - 1) {
                disableBt('right');
                return;
            }
            enableBt('left');
            if (activeIndex < childLen) {
                activeIndex++;
                if (activeIndex == childLen - 1) {
                    disableBt('right');
                }
                var childs = $('#index-type-tabs').children();
                $(childs).each(function (index, li) {
                    if (index == activeIndex) { // show
                        $(li).show();
                    } else {
                        // hiden
                        $(li).hide();
                    }
                });
                enableBt('down');
            }
        });
        hkexApp.utils.setEqualHeights(".wl-caseStudies__column__title");
        hkexApp.utils.setEqualHeights(".wl-feature__column");
        hkexApp.utils.setSliderNav();
    });
    $(window).on("resize", function () {

        $(".wl-feature__column").css('height', 'auto');
        hkexApp.utils.setEqualHeights(".wl-feature__column");
        hkexApp.utils.setSliderNav();


    });
})();
