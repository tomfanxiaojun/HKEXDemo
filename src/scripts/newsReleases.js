'use strict';

(function() {
    'use strict';
    let $filterContainer,
        $moreFilter,
        $applyFilter,
        $cancelFilter,
        $filterForm;

    init();

    function init() {
        $filterContainer = $('.newsRelease-filter');
        $moreFilter = $filterContainer.find('.filter__moreFilter');
        $applyFilter = $filterContainer.find('.filter__btn-applyFilters-js');
        $cancelFilter = $filterContainer.find('.filter__btn-cancelFilters-js');
        $filterForm = $filterContainer.find('.filter__checkboxForm');
        leftSideFilter();
        animateApply();
    }

    function generatorNewsSections(total) {
        let sections = [];
        for (let i = 0; i < total; i++) {
            let section = {};
            section.day = '01';
            section.month = 'AUG';
            section.type = 'Infrustructure',
            section.title = `Presentation by HKEX's Head of ETFs and Senior Vice President Brian Roberts at a media workshop about the launch of leveraged and inverse products -${i}`;
            section.brife = `Reference is made to the announcement of Hong Kong Exchanges and Clearing Limited (“HKEX”) dated 15 June 2016 in relation to the appointment of Mr Lee Kwok Keung, Roger as the Chief Executive of -${i}`;
            sections.push(section);
        }
        return sections;
    }
    $('.news-loadMore .loadMore__wrapper').on('click', () => {
        // let newsSectionTpl = $("#news-section-tpl").html();
        // let reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        // let sectionsTpl = '';
        // generatorNewsSections(4).forEach((e, i) => {
        //     sectionsTpl = sectionsTpl + newsSectionTpl.replace(reg, function(node, key) {
        //         return e[key];
        //     });
        // });
        // setTimeout(() => {
        //     $('.news-releases').append(sectionsTpl);
        //     textOverflow($('.news-releases__section--content-brife'), 3)
        // }, 2500)

    });
    textOverflow($('.news-releases__section--content-brife'), 3);

    function textOverflow($objs, lines) {
          hkexApp.utils.addEllipse($objs,3);
    }
    $(window).resize(function(event) {
        textOverflow($('.news-releases__section--content-brife'), 3);

    });

    // left side filter for desktop
    function leftSideFilter() {
        if($(window).outerWidth() > 1000) {
            $applyFilter.attr('tabindex','-1');
            $cancelFilter.attr('tabindex','-1');
            $filterForm.removeClass('collapse');
            $filterContainer.detach().appendTo('.insert-filter');
        }
    }
    let preWidth = $(window).outerWidth();
    $(window).on('resize', function(){
        let currentWidth = $(window).outerWidth();
        if(currentWidth > 1000 && preWidth <= 1000) {      
            $filterForm.show().removeClass('collapse collapsing').css('height','');
            $applyFilter.attr('tabindex','-1');
            $cancelFilter.attr('tabindex','-1');
            $filterContainer.detach().appendTo('.insert-filter');
        }else if(currentWidth <= 1000 && preWidth > 1000) {
            $applyFilter.attr('tabindex','0');
            $cancelFilter.attr('tabindex','0');
            $moreFilter.show();
            $filterForm.hide().removeClass('collapse in').addClass('collapsing collapse');
            $filterContainer.detach().insertBefore('.news-releases');
        }
        preWidth = currentWidth;
    });    

    //animate filter button function in desktop
    function animateApply() {
        $('.newsRelease-filter input:checkbox').on('click', function(){
            if($(window).outerWidth() > 1000) {
                setTimeout(() => {
                    $applyFilter.click();
                    $filterForm.show().removeClass('collapsing');
                }, 100);
            }
        });
        $('.newsRelease-filter .select-target a').on('change', function(){
            if($(window).outerWidth() > 1000) {
                setTimeout(() => {
                    $applyFilter.click();
                    $filterForm.show().removeClass('collapsing');
                }, 100);
            }
        });
    }

    //add ellipse for news board
    let ellipseH1 = $('.ellipseH1');
    let pinkContentForNews = $('.news-feature__itv-content');
    let blueContentForNews = $('.news-feature__it-content');
    let quoteContentForNews = $('.news-feature__t-text div');

    function addEllipseForNews() {
        if($(window).outerWidth() > 1000) {
            hkexApp.utils.addEllipse(ellipseH1, 2);
            if(isLargeFontSize()) {
                hkexApp.utils.addEllipse(blueContentForNews, 4);
            }else {
                hkexApp.utils.addEllipse(blueContentForNews, 5);
            }
        }else {
            hkexApp.utils.addEllipse(ellipseH1, 3);
            if(isLargeFontSize()) {
                hkexApp.utils.addEllipse(blueContentForNews, 3);
                hkexApp.utils.addEllipse(pinkContentForNews, 3);
            }else {
                hkexApp.utils.addEllipse(blueContentForNews, 4);
                hkexApp.utils.addEllipse(pinkContentForNews, 4);
            }
        }
        hkexApp.utils.addEllipse(quoteContentForNews, 7);
    }

    addEllipseForNews();

    $(window).on('resize', () => {
        addEllipseForNews();
    });
    
    function isLargeFontSize() {
        let flag = false;
        let fontSize = $.cookie('fontSize');
        if (fontSize === 'large') {
            flag = true;
        }else {
            flag = false;
        }
        return flag;
    }

    $('.font-sizes--small, .font-sizes--medium, .font-sizes--large').click(function(e) {
        e.preventDefault();
        addEllipseForNews();
    });

})();