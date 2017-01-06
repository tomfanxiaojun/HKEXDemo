/*(function() {
    'use strict';
    $(window).on("load",function() {
        $('.list-menu__mobile-title-icon-open').on('click', function(e) {
            $(this).hide();
            $('.list-menu__mobile-title-icon-close')
                .css('display', 'block');
            $('.list-menu__wrapper').show();
            let menuItems=$('.list-menu__wrapper').children();
            let height=0;
            $(menuItems).each((index,e)=>{
                height+=$(e)[0].offsetHeight;
            });
            $(".list-menu__wrapper").animate({
                height: height+'px',                 
            }, 300, 'linear', function() {


            });

        });
        $('.list-menu__mobile-title-icon-close').on('click', function(e) {
            $(this).hide();
            $('.list-menu__mobile-title-icon-open').show();
         
            $('.list-menu__wrapper').animate({
                height: '0px',                 
            }, 300, 'linear', function() {
               $('.list-menu__wrapper').hide();

            })
        });
    });
})();
*/