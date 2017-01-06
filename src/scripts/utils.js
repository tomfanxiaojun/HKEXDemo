(function (module) {
    'use strict';

    var DesktopAndTabletBP = 1000;
    var TabletAndMobileBP = 767;

    module.utils = {
        isTablet: function isTablet() {
            return window.innerWidth > TabletAndMobileBP && window.innerWidth <= DesktopAndTabletBP;
        },
        isDesktop: function isDesktop() {
            return window.innerWidth > DesktopAndTabletBP;
        },
        isPc: function isPc() {
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                return false;
            } else {
                return true;
            }
        },

        isAndroidMobile: function isAndroidMobile() {
            let isandroid = navigator.userAgent.indexOf('Android') > 0 || navigator.userAgent.indexOf('Adr') > 0;
            let windowWidth = $(window).width();
            if (isandroid && windowWidth < 767) {
                return true;
            }
            return false;
        },

        addEllipse: function addEllipse($listItems, lineNum) {
            let isOversized = false;
            if ($listItems.length < 0) {
                return;
            }
            this.setEllipseElement($listItems);
            $listItems.parent().css("height", "auto");
            $listItems.each(function () {
                let $item = $(this);
                let height = $item.height();
                let outerHeight = $item.outerHeight();
                let outerSpace = 0;
                let verticalMargin = parseInt($item.css('margin-top'));
                let lineHeight = parseInt($item.css('line-height'));
                let topPosition = lineHeight * (lineNum - 1) + "px";
                outerSpace = outerHeight - height + verticalMargin;
                if (height > (lineHeight * lineNum) + 4) {
                    $item.find("span").css({
                        "display": "block",
                        "top": topPosition,
                        "height": lineHeight
                    });
                    $item.parent().css("height", lineHeight * lineNum + outerSpace + "px");
                    if ($item.hasClass("circulars-for-pdf")) {
                        $item.removeClass("circulars-for-pdf");
                        $item.find("span").addClass("circular-ellipse");
                    }
                    isOversized = true;
                } else {
                    $item.find("span").css("display", "none");
                    if ($item.find("span").hasClass("circular-ellipse")) {
                        $item.addClass("circulars-for-pdf");
                        $item.find("span").removeClass("circular-ellipse");
                    }
                    isOversized = false;
                }

            });
        },

        setEllipseElement: function setEllipseElement($listItems) {

            if ($listItems.parent().hasClass("add-ellipse")) {
                return;
            }
            $listItems.wrap("<div class='add-ellipse'></div>");
            $listItems.prepend("<span>...</span>");
        },

        getOs: function getOs() {
            var OsObject = "";
            if (navigator.userAgent.indexOf("MSIE") > 0) {
                return "MSIE";
            }
            if (navigator.userAgent.indexOf("Firefox") > 0) {
                return "Firefox";
            }
            if (navigator.userAgent.indexOf("Safari") > 0) {
                return "Safari";
            }
            if (navigator.userAgent.indexOf("Camino") > 0) {
                return "Camino";
            }
            if (navigator.userAgent.indexOf("Gecko/") > 0) {
                return "Gecko";
            }
        },

        setEqualHeights: function setEqualHeights(cName) {
            var largest = 0;
            $(cName).each(function (i) {
                var findHeight = $(this).innerHeight();
                if (findHeight >= largest) {
                    largest = findHeight;
                }
            });
            $(cName).css({ "height": largest + "px" });
        },
        
        setSliderNav: function setSliderNav(){
            if ($(".slider__caption") && window.innerWidth <= 767) {
                $('.slider__slides_tabs').css('bottom', $(".slider__slides1_on .slider__caption").height() + 'px');
            }else{
                $('.slider__slides_tabs').removeAttr('style');
                
            }
        }

    };
} (window.hkexApp = window.hkexApp || {}));
