(function() {

    'use strict';
    function showNavPopover(e) {

        let target  = $(e.target);

        if (target.attr('data-toggle') !== 'nav-popover' && target.parent().attr('data-toggle') !== 'nav-popover') {
            $('.popover').hide();
            return;        
        } else {
            // This is to prevent hash in url after clicking link
            e.preventDefault();
        }


        let $this = target;

        if (target.parent().attr('data-toggle') === 'nav-popover') {
            $this  = target.parent();
        }
        
        let $childPopover = $this.children('.popover');
        
        if ($childPopover.length <= 0) {
            if($this.parent('.right-panel-sections-label').siblings('.popover').length > 0) {
                $childPopover = $this.parent('.right-panel-sections-label').siblings('.popover');
            }else if($this.next('.popover').length > 0) {
                $childPopover = $this.next('.popover');
            }
        }

        if ($childPopover.is(':visible')) {
            $childPopover.toggle();
            return;
        }

        $('.popover').hide();
        $childPopover.toggle();
    }

    function registerEvents() {
        $('body').on('click', showNavPopover);
    }   

    registerEvents();

    $(window).on('resize',(event)=>{
       if($(window).width()>1000){
        $('.mobile-search').hide(); 
        // $(".mobile-search__container")
        // .css('height','0px')
        // .css('line-height','0px');
       }
    });
    $('.topbar__mobile-search').on('click', () => {
        $('.mobile-search').fadeIn();
    });
    $('.mobile-search__close').on('click', (event) => {
        $('.mobile-search__input').val('');
        $('.mobile-search').fadeOut();
    });
}());
