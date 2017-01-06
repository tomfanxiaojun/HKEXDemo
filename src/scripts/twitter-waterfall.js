(function(){

    let DESKTOP_BP = 1000;
    let TABLET_BP = 767;
    let twitters = $('.twitter-section__tweets .item');
    let container = $('.twitter-section__tweets .carousel-inner');
    let twitterWrapper = $('.twitter-section__tweets');

    function waterfall(type) {
        let oneLineNumber = type;
        let positionArray = [];
        let leftDistance = 0;
        let topDistance = 0;

        twitters.each((index, item) => {
            let itemHeight = $(item).outerHeight(true);
            let itemWidth = $(item).outerWidth(true);

            if(index < oneLineNumber) {
                $(item).css({'top': '0', 'left': leftDistance + 'px'});
                let itemObj = {top: itemHeight, left: leftDistance};
                positionArray.push(itemObj);
                leftDistance += itemWidth;
            }else {
                let minTopObj = positionArray[0];
                let minIndex = 0;
                for(let i = 1; i < positionArray.length; i++) {
                    if(positionArray[i].top < minTopObj.top) {
                        minTopObj = positionArray[i];
                        minIndex = i;
                    }
                }
                $(item).css({'top': minTopObj.top + 'px', 'left': minTopObj.left + 'px'});
                positionArray[minIndex].top += itemHeight; 
            }
        });

        let maxHeight = Math.max.apply(Math, positionArray.map(function(itemObj){return itemObj.top;}));
        let containerWidth = twitters.outerWidth(true) * oneLineNumber;
        container.css({
            'height': maxHeight + 'px',
            'width': containerWidth + 'px'
        });
    }

    let preWidth = $(window).outerWidth();
    $(window).on('resize', function(){
        let currentWidth = $(window).outerWidth();
        if(currentWidth > DESKTOP_BP) {
            waterfallCall();
        }else if(currentWidth <= DESKTOP_BP && preWidth > DESKTOP_BP) {
            waterfall(2);
        }else if(currentWidth > TABLET_BP && preWidth <= TABLET_BP && currentWidth <= DESKTOP_BP) {
            waterfall(2);
        }else if(currentWidth <= TABLET_BP && preWidth > TABLET_BP && preWidth <= DESKTOP_BP) {
            twitters.each((index, item) => {
                $(item).removeAttr('style');
            });
            container.removeAttr('style');
        }
        preWidth = currentWidth;
    });     

    function waterfallCall() {
        if($(window).outerWidth() > TABLET_BP) {
            let cols = parseInt(twitterWrapper.outerWidth()/twitters.outerWidth(true));
            waterfall(cols);
        }
    }

    $('.font-sizes--small, .font-sizes--medium, .font-sizes--large').click(function(e) {
        e.preventDefault();
        waterfallCall();
    });

    $(window).on('load', () => {
        waterfallCall();
    });

})();