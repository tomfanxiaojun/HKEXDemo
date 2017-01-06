+ function($) {
    'use strict';

    function ScrollTable(element, options) {
        this.$freezeTable = $(element);
        this.options = $.extend({}, ScrollTable.DEFAULTS, options);
        this.$scrollContainer = undefined;
        this.$scrollBar = undefined;
        this.$freezeTableContainer = undefined;
        this.$tbContainer = undefined;
        this.$btsContainer = undefined;
        this.$leftArrowBt = undefined;
        this.$rightArrowBt = undefined;
        this.tableBeginX = 0;
        this.windowWidth = $(window).width();
        this.isExpend = false;
        this.isShowScroll = false;
        this.defaultsFreezeColsWidth = [];
        this.init();
    }
    ScrollTable.VERSION = '1.0.0';

    ScrollTable.DEFAULTS = {
        head: true,
        foot: false,
        left: 0,
        right: 0,
        'z-index': 10,
        freezeCols: 1,
        freezeWidth: 180,
        maxFreezeWidth: 0.33,
        minFreezeWidth: 0.20,
        tableWidth: 'auto'
    };

    ScrollTable.prototype.init = function() {

        initElement.call(this);

        freezeTable.call(this);

        setUpFreezeColsZIndex.call(this);

        registerScrollbarEvent.call(this);

        registerWindowResize.call(this);

        registerScrollBtEvent.call(this);

        setFreezeWidth.call(this);

        isShowScrollBarAndFixedBorder.call(this);

        calScrollContainerWidth.call(this);

        calBarWidth.call(this);

        isShowSrrowBt.call(this);

        setLeftArrowBtPostion.call(this);
    };

    function initElement() {
        this.$freezeTable.css('width', this.options.tableWidth);
        this.$freezeTableContainer = this.$freezeTable.parent().parent();
        this.$scrollContainer = this.$freezeTableContainer.find('.fixed-freeze-tb--scroll-bar');
        this.$scrollBar = this.$freezeTableContainer.find('.fixed-freeze-tb--bar');
        this.$tbContainer = this.$freezeTableContainer.find('.fixed-freeze-tb-parent');
        this.$leftArrowBt = this.$freezeTableContainer.find('.fixed-freeze-tb--scroll-bts-left');
        this.$rightArrowBt = this.$freezeTableContainer.find('.fixed-freeze-tb--scroll-bts-right');
        this.$btsContainer = this.$freezeTableContainer.find('.fixed-freeze-tb--scroll-bts');
        this.options.scrollbarDefaultWidth = this.$scrollBar.width();
    }

    function setLeftArrowBtPostion() {
        this.$leftArrowBt.css('left', calScrollContainerLeft.call(this));
        // set top value;
        let tbContainerHeight = this.$tbContainer.height();
        let tbodyHeight = this.$freezeTable.find('tbody').height();
        let theadHeight = this.$freezeTable.find('thead').height();
        let tableHeight = this.$freezeTable.height();
        let windowHeight = $(window).height();
        let $arrowBts = this.$leftArrowBt.parent();
        if (tbContainerHeight > windowHeight) {
            $arrowBts.css('top', (windowHeight - theadHeight) / 2 + theadHeight);
        } else {
            $arrowBts.css('top', tbodyHeight / 2 + theadHeight);
        }
    }

    function isShowScrollBarAndFixedBorder() {
        let tbContainerWidth = this.$tbContainer.width();
        let tbWidth = this.$freezeTable.width();
        let $theWholeContainer = this.$freezeTableContainer.find('.fixed-freeze-tb--scroller-container');
        let $theFixBorder = this.$freezeTableContainer.find(".freeze-col-context");

        if (tbContainerWidth >= tbWidth) {
            this.isShowScroll = false;
            $theWholeContainer.hide();
            this.$leftArrowBt.hide();
            this.$rightArrowBt.hide();
            $theFixBorder.removeClass('fix-border');
        } else {
            this.isShowScroll = true;
            $theWholeContainer.show();
            this.$leftArrowBt.show();
            this.$rightArrowBt.show();
            $theFixBorder.addClass('fix-border');
        }
    }

    function isShowSrrowBt() {
        if (!hkexApp.utils.isPc()) {
            this.$freezeTableContainer.find('.fixed-freeze-tb--scroll-bts').hide();
        }
    }

    function freezeTable() {
        this.$freezeTable.tableHeadFixer({
            "head": false,
            "left": this.options.freezeCols
        });
    }

    function getScrollBarWidth() {
        let scrollBarLeft = calScrollContainerLeft.call(this);
        let containerWidth = this.$freezeTableContainer.width();
        let scrollBarWidth = containerWidth - scrollBarLeft;
        return scrollBarWidth;
    }

    function calScrollContainerWidth() {
        let scrollBarLeft = calScrollContainerLeft.call(this);
        let containerWidth = this.$freezeTableContainer.width();
        let scrollBarWidth = containerWidth - scrollBarLeft;
        let tableWidth = this.$freezeTable.width();
        var tableHideWidht = tableWidth - containerWidth;
        this.$scrollContainer.css('width', scrollBarWidth);
        this.$btsContainer.css('width', containerWidth);
        this.$scrollBar.css('left', 0);
        this.$tbContainer.scrollLeft(0);
    }

    function calScrollContainerLeft() {
        let scrollBarLeft = 0;
        let freezeCols = this.$freezeTable.find('thead .is-fix-col');
        for (let i = 0; i < freezeCols.length; i++) {
            scrollBarLeft = scrollBarLeft + freezeCols[i].clientWidth;
        }
        return scrollBarLeft;
    }

    function setUpFreezeColsZIndex() {
        let freezeCols = this.$freezeTable.find('.is-fix-col');
        $(freezeCols).each((i, e) => {
            $(e).css('z-index', this.options['z-index']);
        });
    }

    function getScrollRate() {
        let rate;
        let scrollBarWidth = getScrollBarWidth.call(this);
        let tableWidth = this.$freezeTable.width();
        let containerWidth = this.$freezeTableContainer.width();
        var tableHideWidth = tableWidth - containerWidth;
        rate = tableHideWidth / (scrollBarWidth - this.$scrollBar.width());
        return rate;
    }

    function calBarWidth() {
        let tableWidth = this.$freezeTable.width();
        let containerWidth = this.$freezeTableContainer.width();
        let tableHideWidth = tableWidth - containerWidth;
        let scrollBarContainerWidth = this.$scrollContainer.width();
        let scrollBarLeft = calScrollContainerLeft.call(this);
        if (tableHideWidth < (scrollBarContainerWidth - scrollBarLeft)) {
            this.$scrollBar.css('width', scrollBarContainerWidth - tableHideWidth);
        } else { // default width
            this.$scrollBar.css('width', this.options.scrollbarDefaultWidth);
        }
    }


    function registerScrollBtEvent() {
        let that = this;
        let leftInterval;
        let rate = getScrollRate.call(this);

        let stepWidth = 1;
        let duration = 8;
        $(window).resize(function(event) {
            if (that.$scrollBar.length > 0) {
                let barLeft = that.$scrollBar.position().left;
                barLeft = getBarLeftValue.call(that, barLeft);
                setTablePosition.call(that, barLeft);
            }

        });
        this.$leftArrowBt.on('mouseover', (e) => {
            let barLeft = that.$scrollBar.position().left;
            barLeft = barLeft - stepWidth;
            barLeft = getBarLeftValue.call(this, barLeft);
            setTablePosition.call(this, barLeft);
            leftInterval = setInterval(() => {
                barLeft = barLeft - stepWidth;
                barLeft = getBarLeftValue.call(this, barLeft);
                setTablePosition.call(this, barLeft);
            }, duration);
        }).on('mouseleave', (e) => {
            clearInterval(leftInterval);
        });
        let rightInterval;
        this.$rightArrowBt.on('mouseover', (e) => {
            let barLeft = that.$scrollBar.position().left;
            barLeft = barLeft + stepWidth;
            barLeft = getBarLeftValue.call(this, barLeft);
            setTablePosition.call(this, barLeft);
            rightInterval = setInterval(() => {
                barLeft = barLeft + stepWidth;
                barLeft = getBarLeftValue.call(this, barLeft);
                setTablePosition.call(this, barLeft);
            }, duration);
        }).on('mouseleave', (e) => {
            clearInterval(rightInterval);
        });
    }

    function getBarLeftValue(barLeft) {
        if (barLeft > 0) {
            let img = this.$leftArrowBt.find('img');
            img.attr('src', img.attr('data-active-img'));
        } else {
            let img = this.$leftArrowBt.find('img');
            img.attr('src', img.attr('data-inactive-img'));
            barLeft = 0;
        }
        let barWidth = this.$scrollBar.width();
        let scrollBarWidth = getScrollBarWidth.call(this);
        if (barLeft > scrollBarWidth - barWidth) {
            barLeft = scrollBarWidth - barWidth;
            let img = this.$rightArrowBt.find('img');
            img.attr('src', img.attr('data-inactive-img'));
        } else {
            let img = this.$rightArrowBt.find('img');
            img.attr('src', img.attr('data-active-img'));
        }
        return barLeft;
    }

    function setTablePosition(barLeft) {
        this.$scrollBar.css('left', barLeft);
        let rate = getScrollRate.call(this);
        this.$tbContainer.scrollLeft(parseFloat(barLeft) * rate);
    }

    function reCalFreezeColumnsHeight() {
        this.$freezeTable.find('.is-fix-col').each(function(i, e){
           $(e).find('.freeze-col-context').css('height', $(e).innerHeight());         
            // let height=$(e).innerHeight();
            // $(e).find('.freeze-col-context').height(height+'px');
        });
    }

    function registerScrollbarEvent() {
        this.$freezeTable.on("menuCloseEvent fontSizeChange", (e) => {
            setFreezeWidth.call(this);

            isShowScrollBarAndFixedBorder.call(this);

            calScrollContainerWidth.call(this);
            calBarWidth.call(this);

            setLeftArrowBtPostion.call(this);
            let barLeft = this.$scrollBar.position().left;
            barLeft = getBarLeftValue.call(this, barLeft);
            setTablePosition.call(this, barLeft);
            setLeftArrowBtPostion.call(this);
            reCalFreezeColumnsHeight.call(this);

        });
        this.$freezeTable.on('touchstart', (e) => {
            if (!isScrollTarget.call(this, e.target)) {
                return;
            }
            this.tableBeginX = e.originalEvent.targetTouches[0].pageX;
            this.$scrollBar.trigger("touchstart");
        });

        this.$scrollBar.on("touchstart mousedown", (e) => {
            if (!isScrollTarget.call(this, e.target)) {
                return;
            }
            let $doc = $(document);
            let isDragg = true;
            let beginX;
            let isTrigger = e.isTrigger;
            if (isTrigger) {
                beginX = e.target.getBoundingClientRect().left;
            } else {
                beginX = e.pageX || e.originalEvent.targetTouches[0].pageX;
            }
            let beginLeft = parseFloat(this.$scrollBar.position().left);
            $doc.bind("touchmove  mousemove.slimscroll", (e) => {

                let barLeft;
                let currentPageX;
                currentPageX = e.pageX || e.originalEvent.targetTouches[0].pageX;
                if (isTrigger) { // for trigger event.
                    barLeft = beginLeft + (this.tableBeginX - currentPageX);
                } else {
                    if (beginX > e.pageX) { //left
                        barLeft = beginLeft + (currentPageX - beginX);
                    } else { //right
                        barLeft = (currentPageX - beginX) + beginLeft;
                    }
                }
                
                barLeft = getBarLeftValue.call(this, barLeft);

                setTablePosition.call(this, barLeft);

            });

            $doc.bind("touchend  mouseup.slimscroll", function(e) {
                isDragg = false;
                $doc.unbind('touchmove  mousemove.slimscroll');
            });
            return false;
        });
    }

    function isScrollTarget(target) {
        let bodyTd = $(this.$freezeTable.find('tbody tr'));
        if (bodyTd.find(target).length > 0 && !$(target).hasClass('is-fix-col')) {
            return true;
        } else if (target == this.$scrollBar[0]) {
            return true;
        } else {
            return false;
        }
    }

    function getFreezeDefaultWidth() {
        let defaultsTotalWidth = 0;
        $(this.$freezeTable.find('thead .is-fix-col')).each((index, e) => {
            this.defaultsFreezeColsWidth.push($(e).outerWidth());
            defaultsTotalWidth = +$(e).outerWidth();
        });
        return defaultsTotalWidth;
    }

    function setFreezeWidth() {
        let containerWidth = this.$freezeTableContainer.width();
        let maxFreezeWidth = containerWidth * this.options.maxFreezeWidth;
        let minFreezeWidth = containerWidth * this.options.minFreezeWidth;
        let scrollBarLeft = calScrollContainerLeft.call(this);
        let defaultsTotalWidth = getFreezeDefaultWidth.call(this);
        isShowScrollBarAndFixedBorder.call(this);
        if (scrollBarLeft < minFreezeWidth) {
            let minEachFreezeWidth = Math.floor(minFreezeWidth / this.options.freezeCols);
            $(this.$freezeTable.find('.is-fix-col')).each((index, e) => {
                let c = $(e).find('.freeze-col-context');
                c.css('width', minEachFreezeWidth).css('height', $(e).outerHeight());
                $(e).css('width', minEachFreezeWidth);
            });
        } else {
            if (this.isExpend) {
                if (maxFreezeWidth > defaultsTotalWidth) {

                    let maxEachFreezeWidth = Math.floor(maxFreezeWidth / this.options.freezeCols);
                    $(this.$freezeTable.find('.is-fix-col')).each((index, e) => {
                        let c = $(e).find('.freeze-col-context');
                        if (scrollBarLeft < minFreezeWidth) {
                            let minEachFreezeWidth = Math.floor(minFreezeWidth / this.options.freezeCols);
                            c.css('width', minEachFreezeWidth).css('height', $(e).outerHeight());
                            $(e).css('width', minEachFreezeWidth);
                        }
                        // else {
                        //     console.log('min:'+Math.floor(this.defaultsFreezeColsWidth[0]));
                        //     c.css('width', Math.floor(this.defaultsFreezeColsWidth[0]))
                        //     $(e).css('width', Math.floor(this.defaultsFreezeColsWidth[0]))
                        // }

                    });
                } else {

                    let maxEachFreezeWidth = Math.floor(maxFreezeWidth / this.options.freezeCols);
                    $(this.$freezeTable.find('.is-fix-col')).each((index, e) => {
                        let c = $(e).find('.freeze-col-context');
                        c.css('width', maxEachFreezeWidth).css('height', $(e).outerHeight());
                        $(e).css('width', maxEachFreezeWidth);
                    });
                }

            } else {
                if (this.isShowScroll) {
                    if (scrollBarLeft > maxFreezeWidth) {
                        let maxEachFreezeWidth = Math.floor(maxFreezeWidth / this.options.freezeCols);
                        $(this.$freezeTable.find('.is-fix-col ')).each((index, e) => {
                            let c = $(e).find('.freeze-col-context');
                            c.css('width', maxEachFreezeWidth).css('height', $(e).outerHeight());
                            $(e).css('width', maxEachFreezeWidth);
                        });
                    }
                }else{

                }


            }
        }
    }

    function registerWindowResize() {
        let that = this;
        $(window).resize(function(event) {
            if ($(this).width() > that.windowWidth) {
                that.isExpend = true;
            } else {
                that.isExpend = false;
            }
            that.windowWidth = $(this).width();
            setFreezeWidth.call(that);
            isShowScrollBarAndFixedBorder.call(that);

            calScrollContainerWidth.call(that);
            calBarWidth.call(that);

            setLeftArrowBtPostion.call(that);
            reCalFreezeColumnsHeight.call(that);
        });
    }

    function Plugin(option) {
        return this.each(function() {
            let $this = $(this);
            let options = typeof option == 'object' && option;
            new ScrollTable(this, options);
        });
    }
    let old = $.fn.scrollTable;

    $.fn.scrollTable = Plugin;
    $.fn.scrollTable.Constructor = ScrollTable;
    $.fn.scrollTable.noConflict = function() {
        $.fn.scrollTable = old;
        return this;
    };

}(jQuery);
