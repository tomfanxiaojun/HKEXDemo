(function($) {
    'use strict';
    $.extend({
      keyboardEnterEvent : function keyboardEnterEvent(e){
        if(e.keyCode !== 13){
          return;
        }
        let $target = $(e.target);
        $target.trigger('click');
      }
    });

    $('.filter__checkBox__tab-js').on('keyup',$.keyboardEnterEvent);
    $('.filter__radio__tab-js').on('keyup',$.keyboardEnterEvent);

})(jQuery);
