(function() {
    'use strict';
    let dropdownListDefaultHeight = 300;

    function setWidth() {
        let groups = $('.select-group');
        $(groups).each((index, e) => {
            let width = $(e).attr('data-width');
            if (width) {
                $(e).css('width', width);
            }
        });
    }
    setWidth();
    addScrollBar();
    setDropdownlistHeight();

    function setZIndex() {
        $('.select-group').each((i, e) => {
            if ($(e).attr('data-z-index')) {
                $(e).find('.select-items').css('z-index', $(e).attr('data-z-index'))
                $(e).find('.select-items__scroll--container').css('z-index', (+$(e).attr('data-z-index'))+1)
            }
        })

    }
    setZIndex();

    function addScrollBar() {
        let group = $('.select-group ');
        let height = group.find('.select-items').attr('data-height');
        group.append(`<div class="select-items__scroll--container">
                              <div class="select-items__scroll--container-bar">
                              </div>
                         </div>`);
    }

    function setDropdownlistHeight() {
        $('.select-group ').each((i, g) => {
            let group = $(g);
            let height = group.find('.select-items').attr('data-height');
            height = height ? height : dropdownListDefaultHeight;
            group.find('.select-items').css('max-height', height + 'px');
            let targetHeight = group.find('.select-target').outerHeight();
            group.find('.select-items__scroll--container').css('top', targetHeight).css('height', 0);
        });
    }

    function closeDropDownList() {
        let group;
        if (this == undefined || this == window) {
            group = $('.select-group');
        } else {
            group = $(this).parent();
        }
        group.each((i, g) => {
            let targetInput = $(g).find('.select-target a');
            let expanded = targetInput.attr('data-expend') == 'true' ? true : false;
            if (expanded) {
                let ismouseup = $(g).find('.select-items__scroll--container-bar').attr('data-mouseup') == 'true' ? true : false;
                if (!ismouseup) {
                    $(g).find('.select-items').children().each((j, item) => {
                        $(item).hide();
                    });
                    targetInput.attr("data-expend", false);
                    targetInput.focus();
                    $(g).find('.select-items__scroll--container').hide();
                    $(g).find('.select-items__scroll--container-bar').css('top', 0 + 'px');
                } else {
                    $(g).find('.select-items__scroll--container-bar').attr('data-mouseup', 'false');
                }

            }

        });
    }

    function targetItemClick(target) {
        let item = target;
        let scrollContainer = $(item).parent().parent().find('.select-items__scroll--container');
        scrollContainer.hide();
        scrollContainer.find('.select-items__scroll--container-bar').css('top', 0 + 'px');
        let targetInput = $(item).parent().parent().find('.select-target a');
        let targetText = $(item).text();
        $(targetInput).text(targetText);
        let selectItems = $(item).parent();
        $(targetInput).attr('data-value', $(item).attr('data-value'));
        $(selectItems).children().each((index, e) => {
            if (e == item[0]) {
                $(e).attr('data-target', 'true');
            } else {
                $(e).attr('data-target', 'false');
            }
            $(e).hide();
        });
        $(targetInput).attr("data-expend", false);
        $(targetInput).trigger('change');
        setDropdownlistHeight();
    }

    function openDropDownList(target) {
        let group = $(this).parent();
        let targetInput = $(this).children();
        let expanded = $(targetInput).attr('data-expend') == 'true' ? true : false;
        let selectItems = group.find('.select-items');
        if (expanded) {
            $(selectItems).children().each((index, e) => {
                $(e).hide();
            });
            $(targetInput).attr("data-expend", false);
            group.find('.select-items__scroll--container').hide();
        } else {
            group.find('.select-items__scroll--container').show();
            let itemsHeight = 0;
            $(selectItems).children().each((index, e) => {
                $(e).show();
                itemsHeight = itemsHeight + $(e).outerHeight();
            });
            $(targetInput).attr("data-expend", true);
            let height = group.find('.select-items').attr('data-height');
            let targetHeight = group.find('.select-target').outerHeight();
            height = height ? height : dropdownListDefaultHeight;
            if (height <= itemsHeight) {
                group.find('.select-items__scroll--container').css('height', height);
            } else {
                height = itemsHeight;
                group.find('.select-items__scroll--container').css('height', height).hide();
            }

        }


    }
    registerEvents();
    $('body').on('touchstart', (event) => {
        if (!hkexApp.utils.isPc()) {
            bodyClick(event);
        }
    });

    function bodyClick(event) {
        let target = $(event.target);
        if (target.hasClass('select-items__scroll--container-bar')) {
            console.log('scroll bar ');
            return;
        }
        let isSelect = $(target).attr('data-select') == 'true' ? true : false;;
        if (isSelect) {
            target = $(target).parent();
        }
        if (!$(target).hasClass('select-target')) {
            closeDropDownList();
            return;
        } else {
            event.preventDefault();
            registerEvents();
            $(target).trigger('click');

        }
    }
    $(window).on('click', (event, from) => {
        if (hkexApp.utils.isPc()) {
            bodyClick(event);
        }

    });

    function registerEvents() {
        $(".select-target").each((i, e) => {
            let events = $._data($(e)[0], "events") || {};
            events.keypress || $(e).on('keypress', function(event) {
                if (event.keyCode && event.keyCode != 13) {
                    return;
                }
                preDef(event);
                openDropDownList.call(this);
            });
            events.click || $(e).on('click', function(event) {
                preDef(event);
                event.stopPropagation();
                if (event.keyCode && event.keyCode != 13) {
                    return;
                }
                openDropDownList.call(this);
                $(".select-target").each((i, t) => {
                    if (t != e) {
                        closeDropDownList.call($(t));
                    }
                });

            });
        });

        $(".select-items .select-item").on('click keypress ', function(event) {
            if (event.type == 'click' || (event.keyCode && event.keyCode == 13)) {
                event.preventDefault();
            }
            if (event.keyCode && event.keyCode != 13) {
                return;
            }
            stopBubble(event);
            targetItemClick($(this));
        });

        $(".select-items").on('touchstart mousedown', function(e) {
            let targetItem = $(e.target);
            if (targetItem.tagName = 'A') {
                targetItem = targetItem.parent();
            }
            stopBubble(e);
            let that = $(this);
            let group = that.parent();
            let $doc = $('body');
            let beginTop;
            let isDragg = true;
            beginTop = e.pageY || e.originalEvent.targetTouches[0].pageY;
            let beginScrollValue = group.find('.select-items').scrollTop();
            let bar = group.find('.select-items__scroll--container-bar');
            let rate = getScrollRate.call(bar);
            group.attr('data-move', false);
            $doc.bind("touchmove  mousemove", (e) => {
                group.attr('data-move', true);
                let groupTop;
                let isUp = true;
                let currentPageTop;
                currentPageTop = e.pageY || e.originalEvent.targetTouches[0].pageY;
                groupTop = beginTop - currentPageTop;
                group.find('.select-items').scrollTop(beginScrollValue + groupTop);
                //scroll bar postion
                let groupScrollValue = group.find('.select-items').scrollTop();
                bar.css('top', groupScrollValue / rate);
            });
            $doc.bind("touchend  mouseup", function(e) {
                isDragg = false;
                let isMove = group.attr('data-move') == 'true' ? true : false;
                if (!isMove) {
                    targetItem.trigger('click');
                }
                $doc.unbind('touchmove  mousemove touchend mouseup');
            });
            return false;

        });
        // $('body').on('touchstart', (event) => {
        //     console.log('body touchstart');
        //     let target = $(event.target);
        //     let targetParent = $($(event.target).parent());
        //     if (targetParent.hasClass('select-item')) {
        //         event.preventDefault();
        //         targetItemClick(targetParent);
        //     } else {
        //         let isSelect = $(target).attr('data-select') == 'true' ? true : false;
        //         if (!isSelect && !$(target).hasClass('select-item')) {
        //             closeDropDownList();
        //         }
        //     }

        // })

        $(".select-items__scroll--container-bar").on('touchstart mousedown', function(e) {
            let that = this;
            let $doc = $('body');
            let beginTop;
            let isTrigger = e.isTrigger;
            let isDragg = true;
            if (isTrigger) {
                beginTop = e.target.getBoundingClientRect().top;
            } else {
                beginTop = e.pageY || e.originalEvent.targetTouches[0].pageY;
            }
            let tValue = $(this).css('top') == 'auto' ? '0' : $(this).css('top');
            let lastTop = Math.floor(tValue.replace('px', ''));
            let rate = getScrollRate.call(that);
            $doc.bind("touchmove  mousemove", (e) => {
                $(".select-items__scroll--container-bar").each((index, item) => {
                    if (item == that) {
                        $(item).attr('data-mouseup', true);
                    } else {
                        $(item).attr('data-mouseup', false);
                    }
                });

                let barTop;
                let currentPageTop;
                currentPageTop = e.pageY || e.originalEvent.targetTouches[0].pageY;
                if (isTrigger) { // for trigger event.
                    //barTop = beginTop + (currentPageTop - this.tableBeginX);
                } else {
                    barTop = currentPageTop - beginTop;
                }
                barTop = Math.floor(barTop);
                let topValue = +(barTop + lastTop);
                topValue = topValue < 0 ? 0 : topValue;
                let barHeight = $(this).height();
                let barContainerHeight = $(this).parent().height();
                if (topValue + barHeight > barContainerHeight) {
                    topValue = barContainerHeight - barHeight;
                }
                $(that).css('top', topValue);
                $(that).parent().parent().find('.select-items').scrollTop(topValue * rate);

            });
            $doc.bind("touchend  mouseup", function(e) {
                isDragg = false;
                $doc.unbind('touchmove  mousemove');

            });
            return false;

        });


    }

    function getScrollRate() {
        let rate;
        let scrollBarHeight = $(this).outerHeight();
        let scrollContainerHeight = $(this).parent().outerHeight();
        let scrollHeight = scrollContainerHeight - scrollBarHeight;
        let dropdownHeight = 0;
        $(this).parent().parent().find('.select-item').each(function(i, e) {
            dropdownHeight = dropdownHeight + $(e).outerHeight();
        });
        let dropdownHideHeight = dropdownHeight - scrollContainerHeight;
        rate = dropdownHideHeight / (scrollContainerHeight - scrollBarHeight);
        return rate;


    }

    function stopBubble(evt) {
        var e = evt || window.event;
        if (e.cancelBubble) {
            e.cancelBubble = true;
        } else {
            e.stopPropagation();
        }
    }

    function preDef(evt) {
        var e = evt || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }

})();
