(function() {
    'use strict';

    let html = document.getElementsByTagName('html')[0];
    //let fountSizeChangeEvent = new CustomEvent('fontSizeChange');
    let fountSizeChangeEvent=document.createEvent('Event');
    fountSizeChangeEvent.initEvent("fontSizeChange", true, false);
    $('.font-sizes--small').click(function(e) {
        e.preventDefault();
        html.style.fontSize = "10px";
       changeFontSizeStyle('font-sizes--small');
       $('body').removeClass('fontsize-large');
       $('body').addClass('fontsize-small');
       $.cookie('fontSize', 'small');
       $('.fixed-freeze-tb').trigger('fontSizeChange');
       $('.etp-overview .panel').trigger('fontSizeChange');
        addOrRemoveEllipse();
        // setLeftMenuTitleHT();
        setHTForCards();
        hkexApp.utils.setSliderNav();
    });
    $('.font-sizes--medium').click(function(e) {
        e.preventDefault();
        html.style.fontSize = "16px";
        changeFontSizeStyle('font-sizes--medium');
        $('body').removeClass('fontsize-large');
        $('body').removeClass('fontsize-small');
        $.cookie('fontSize', 'medium');
       $('.fixed-freeze-tb').trigger('fontSizeChange');
       $('.etp-overview .panel').trigger('fontSizeChange');
         addOrRemoveEllipse();
        // setLeftMenuTitleHT();
        setHTForCards();
        hkexApp.utils.setSliderNav();
    });
    $('.font-sizes--large').click(function(e) {
        e.preventDefault();
        html.style.fontSize = "20px";
        changeFontSizeStyle('font-sizes--large');
        $('body').removeClass('fontsize-small');
        $('body').addClass('fontsize-large');
        $.cookie('fontSize', 'large');
       $('.fixed-freeze-tb').trigger('fontSizeChange');
       $('.etp-overview .panel').trigger('fontSizeChange');
         addOrRemoveEllipse();
         // setLeftMenuTitleHT();
         setHTForCards();
         hkexApp.utils.setSliderNav();


    });

    function addOrRemoveEllipse() {
      let $listPanelItems = $(".circulars").find(".list-panel__item").find("a");
      let $newItems = $('.news-releases__section--content-brife');
      let $videoDescription = $('.video-img-thumbnail p');

      hkexApp.utils.addEllipse($videoDescription,4);
      hkexApp.utils.addEllipse($listPanelItems,2);
      hkexApp.utils.addEllipse($newItems,3);
    }
    function changeFontSizeStyle(target) {
        let fontSizeArr = $('.font-size-options').children().slice(1);
        $(fontSizeArr).each(function(index, e) {
            if ($(e).hasClass(target)) {
                $(e).addClass('font-sizes--active');
            } else {
                $(e).removeClass('font-sizes--active');
            }
        });
    }

    function setHTForCards(){
        $(".wl-feature__column").css('height', 'auto');
        hkexApp.utils.setEqualHeights(".wl-feature__column");
    }

    function setLeftMenuTitleHT(){
        var height = $('#menuTitle').outerHeight();
        $('.nav-icon').css('height', height + 'px');
    }

    function initializeFontSize() {
        if (!$.cookie('fontSize')) {
            return;
        }
        let fontSize = $.cookie('fontSize');
        if (fontSize === 'small') {
            $('.font-sizes--small').click();
        } else if (fontSize === 'medium') {
            $('.font-sizes--medium').click();
        } else if (fontSize === 'large') {
            $('.font-sizes--large').click();
        }
    }

    initializeFontSize();

})();
