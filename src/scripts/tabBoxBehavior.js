(function() {
    
    'use static';

    // start: tabindex
    let tabBoxTabindex = function() {
        
        $('.contactsUs__tab a.tab-box-a').unbind('keyup').on('keyup', function(e){
            if(e.keyCode === 13) {
                setTimeout(() => {
                    if($(e.target).attr('aria-expanded') === 'true') {
                        if($("div[class^='panel__'][class$='-holder']").find('input,textarea,select,button,a').length > 0) {
                            $(e.target).parents('.contact-panel').nextAll().find('a.tab-box-a').attr('tabindex','-1');
                            let currentHeader = $(e.target).attr('href');
                            contentTab(currentHeader);
                        }
                    }else if($(e.target).attr('aria-expanded') === 'false') {
                        $(e.target).parents('.contact-panel').nextAll().find('a.tab-box-a').removeAttr('tabindex');
                    }
                },100);
            }
        });
        let contentTab = function(currentHeader) {
            let lastTabableElement = $("div[class^='panel__'][class$='-holder']").find('input,textarea,select,button,a').filter(':visible:last');
            lastTabableElement.unbind('keydown').on('keydown', function(e){
                if(e.keyCode === 13) {
                    lastTabableElement.unbind('keydown');
                    setTimeout(() => {
                        contentTab(currentHeader);
                    },100);
                    return;
                }
                let currentHead = $('.contactsUs__tab').find("a[href='" + currentHeader + "']");
                let nextHead = currentHead.parents('.contact-panel').nextAll().find('a.tab-box-a');
                if(e.keyCode === 9 && !e.shiftKey && nextHead.length > 0) {
                    nextHead.removeAttr('tabindex');
                    e.preventDefault();
                    $("div[class^='panel__'][class$='-holder']").click();
                    nextHead[0].focus();
                }
            });
        };
    };
    // end: tabindex
    tabBoxTabindex();
})();