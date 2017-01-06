(function () {
    'use strict';

    function registerEvents() {
        $('.ticker__close').on('click', hkexApp.ticker.registerClose);
    }

    let infoContent = `Hong Kong Exchange Group uses cookies to improve its website. <a href="#" title="View our cookie policy"
                    class="ticker__highlight">View our cookie policy.</a> <br>The cookies are for analytical purpose have already
                been set. For more details please see our privacy and cookie policy.`;
    let errorContent = `The notification will be gone in 5 seconds.`;
    
    let warnContent = `Typhoon Signal No. 8 is in force, market open will be delayed, all order activity will be terminated as practically as possible
                and no trade will be novated.`;
    let successContent = `The notification will be gone in 5 seconds.`;

    hkexApp.ticker.info(infoContent);
    hkexApp.ticker.warn(warnContent);
    hkexApp.ticker.error(errorContent, 3000);
    hkexApp.ticker.success(errorContent, 5000);
    registerEvents();


} ());