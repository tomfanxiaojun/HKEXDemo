(function(module) {
    'use strict';
    let $wrapper = $('.ticker-messages');

    let closeTickerAfter = function closeTickerAfter(el, time) {
        setTimeout(() => {
            el.remove();
        }, time);
    };

    let renderTicker = function renderTicker(message, target) {
        let $template = $(target.html().replace('{content}', message));
        $wrapper.prepend($template);
    };

    let renderAndCloseTickerAfter = function renderAndCloseTickerAfter(message, target, time) {
        let $template = $(target.html().replace('{content}', message));
        $wrapper.prepend($template);
        closeTickerAfter($template, time);
    };

    let ticker = {

        info: function info(message) {
            let template = $('#tickerInfoTmpl');
            if (!template.length) return;
            renderTicker(message, template);
        },

        warn: function warn(message) {
            let template = $('#tickerWarnTmpl');
            if (!template.length) return;
            renderTicker(message, template);
        },

        error: function error(message, time) {
            let template = $('#errorTemplate');
            if (!template.length) return;
            renderAndCloseTickerAfter(message, template, time);
        },
        success: function(message, time) {
            let template = $('#tickerSucessTmpl');
            if (!template.length) return;
            renderAndCloseTickerAfter(message, template, time);
        },
        registerClose: function registerClose(e) {
            let $tickerClose = $(e.target);
            $tickerClose.parents('.ticker').remove();
        },
    };

    module.ticker = ticker;

} (window.hkexApp = window.hkexApp || {}));
