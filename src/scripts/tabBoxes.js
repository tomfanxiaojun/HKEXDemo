(function () {
    'use strict';

    let closeRestofTabs = function getRestOfTabsBody(el) {
        let result = el.parents('.panel').siblings('.panel').find('.tab-box-a');

        result.each((index, el) => {
            let $current = $(el).attr('href');
            $($current).removeClass('in');
        });

    };

    let setStatusOfTabsHeader = function setStatusOfTabsHeader(el) {

        let result = el.parents('.panel').siblings('.panel').find('.tab-box-a');        
        result.each((index, el) => {
            $(el).attr('aria-expanded', false);
        });
        
        if(el.attr('aria-expanded') === 'true') {
            el.attr('aria-expanded', false);
        }else {
            el.attr('aria-expanded', true);
        }

    };

    let resetAllTabs = function resetAllTabs(warpper) {
        warpper.find('.tab-box-a').attr('aria-expanded', false);
        warpper.find('.contact-collapse').removeClass('in');
    };

    let handleTabClick = function handleTabClick(e) {
        e.preventDefault();
        let $target = $(e.target);
        let $header = $target.is('a') ? $target : $target.parent('a');

        let id = $header.attr('href');

        let $paneBody = $(id);
        closeRestofTabs($header);
        $paneBody.toggleClass('in');
        setStatusOfTabsHeader($header);

        $header.scrollintoview({
            complete: function() {
                let offset = $header.offset();
                offset.top -= 50;
                $('body').animate({
                    scrollTop: offset.top
                });
            }
        });

    };

    let tabletTabs = $('.contactsUs__tab-tb').find('.contact-collapse');
    let mobileTabs = $('.contactsUs__tab-mb').find('.contact-collapse');

    let insertForTabletAndMobile = function insertForTabletAndMobile(dom) {

        tabletTabs.each((index, el) => {
            let $current = $(el);
            if ($current.attr('id').indexOf(dom.id) > -1) {
                $current.append(dom.content.clone(true));
            }
        });

        mobileTabs.each((index, el) => {
            let $current = $(el);
            if ($current.attr('id').indexOf(dom.id) > -1) {
                $current.append(dom.content.clone(true));
            }
        });

    };

    let fillTableAndMobile = function fillTableAndMobile() {
        $('.contactsUs__tab-dt').find('.panel-content').each((index, el) => {
            let $current = $(el);
            insertForTabletAndMobile({ id: $current.parent().attr('id'), content: $current });
        });
    };

    $(window).on('resize', () => {
        let desktop = $('.contactsUs__tab-dt');
        let tablet = $('.contactsUs__tab-tb');
        let mobile = $('.contactsUs__tab-mb');

        if(desktop.css('display') === 'none'){
            resetAllTabs(desktop);
        }
        if(tablet.css('display') === 'none'){
            resetAllTabs(tablet);
        }
        if(mobile.css('display') === 'none'){
            resetAllTabs(mobile);
        }
    });

    let innerCollapseBehavior = function innerCollapseBehavior() {
        $('a[data-collapse = "innerCollapse"]').next('.panel-body').hide();
        $('a[data-collapse = "innerCollapse"]').on('click', (e) => {
            e.preventDefault();
            let $target = $(e.target);
            let $content = $target.next('.panel-body');
            $content.slideToggle();
        });
    };

    let registEvents = function registEvents() {
        $('.contactsUs__tab').on('click', '.tab-box-a', handleTabClick);
    };

    let init = function init() {
        registEvents();
        innerCollapseBehavior();
        fillTableAndMobile();
    };

    init();
} ());