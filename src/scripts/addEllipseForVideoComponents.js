(function () {
    'use strict';

    let videoDescription = $('.video-img-thumbnail p');

    var applyEllipse = function applyEllipse() {
         hkexApp.utils.addEllipse(videoDescription, 4);
    };

    $(window).on('resize', () => {
        applyEllipse();
    });
    
    applyEllipse();

})();