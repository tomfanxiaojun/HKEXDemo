/* refer to "http://joshreed.github.io/jQuery-ScrollTabs/index.html#examples"
*  arrow button width, scroll duration, scroll distance can be change in 'defaultOptions' section
*/
(function($) {
	'use strict';

  $.fn.scrollTabs = function(opts){
    var initialize = function(state){
      opts = $.extend({}, $.fn.scrollTabs.defaultOptions, opts);

      if($(this).prop('tagName').toLowerCase() === 'ul'){
        this.itemTag = 'li';
      }
      
      if($(this).css('position') === null || $(this).css('position') === 'static'){
        $(this).css('position','relative');
      }
      
      $(this.itemTag, this).last().addClass('scroll_tab_last');
      $(this.itemTag, this).first().addClass('scroll_tab_first tab_selected');
      
      $(this).html("<div class='scroll_tab_left_button'><img class='scroll_arrow_left' src='images/left-arrow.svg' alt='left arrow'></div><div class='scroll_tab_inner'>"+$(this).html()+"</div><div class='scroll_tab_right_button'><img class='scroll_arrow_right' src='images/right-arrow.svg' alt='right arrow'></div>");
         
      var _this = this;
      
      $('.scroll_tab_inner', this).css({
        'margin': '0px',
        'overflow': 'hidden',
        'white-space': 'nowrap',
        '-ms-text-overflow': 'clip',
        'text-overflow': 'clip',
        'position': 'absolute',
        'top': '0px',
        'left': '0px',
        'right': '0px'
      });
      
      // start: set initial arrow button position
      $('.scroll_tab_left_button', this).css({
        'position': 'absolute',
        'left': '0px',
        'top': '0px',
        'width': opts.left_arrow_size + 'px',
        'cursor': 'pointer'
      });
      
      $('.scroll_tab_right_button', this).css({
        'position': 'absolute',
        'right': '0px',
        'top': '0px',
        'width': opts.right_arrow_size + 'px',
        'cursor': 'pointer'
      });
      // end: set initial arrow button position
    
      // start: show and hide arrow button
      var size_checking = function(){
        var panel_width = Math.round($('.scroll_tab_inner', _this).outerWidth());
        
        if($('.scroll_tab_inner', _this)[0].scrollWidth > panel_width){
          $('.scroll_tab_right_button',_this).show();
          $('.scroll_tab_left_button',_this).show();
          
          if($('.scroll_tab_inner', _this)[0].scrollWidth - panel_width == $('.scroll_tab_inner', _this).scrollLeft()){
            $('.scroll_tab_right_button', _this).hide();
          } else {
            $('.scroll_tab_right_button', _this).show();
          }
          if ($('.scroll_tab_inner', _this).scrollLeft() == 0) {
            $('.scroll_tab_left_button', _this).hide();
          } else {
            $('.scroll_tab_left_button', _this).show();
          }
        } else {
          $('.scroll_tab_right_button',_this).hide();
          $('.scroll_tab_left_button',_this).hide();
        }
      };
      
      size_checking();
      
      state.delay_timer = setInterval(function(){
        size_checking();
      }, 500);
      // end: show and hide arrow button

      // start: deal with press behaviour
      var press_and_hold_timeout;
      
      $('.scroll_tab_right_button', this).mousedown(function(e){
        e.stopPropagation();
        var scrollRightFunc = function(){
          var left = $('.scroll_tab_inner', _this).scrollLeft(); 
          $('.scroll_tab_inner', _this).animate({scrollLeft: (left + opts.scroll_distance) + 'px'}, opts.scroll_duration);
        };
        scrollRightFunc();
        
        press_and_hold_timeout = setInterval(function(){
          scrollRightFunc();
        }, opts.scroll_duration);
      }).bind("mouseup mouseleave", function(){
        clearInterval(press_and_hold_timeout);
      });
      
      $('.scroll_tab_left_button', this).mousedown(function(e){
        e.stopPropagation();
        var scrollLeftFunc = function(){
          var left = $('.scroll_tab_inner', _this).scrollLeft();
          $('.scroll_tab_inner', _this).animate({scrollLeft: (left - opts.scroll_distance) + 'px'}, opts.scroll_duration);
        };
        scrollLeftFunc();
        
        press_and_hold_timeout = setInterval(function(){
          scrollLeftFunc();
        }, opts.scroll_duration);
      }).bind("mouseup mouseleave", function(){
        clearInterval(press_and_hold_timeout);
      });
      // end: deal with press behaviour

      // start: tab switch
      $('.scroll_tab_inner > '+this.itemTag, this)
      .click(function(e){
        e.stopPropagation();
        e.preventDefault();
        let preTarget, target;
        preTarget = '#' + $('.tab_selected',_this).attr('data-value');
        $(preTarget).hide();
        $('.tab_selected',_this).removeClass('tab_selected');
        target = '#' + $(this).attr('data-value');
        $(target).show();
        $(this).addClass('tab_selected');
        
        scroll_selected_into_view.call(_this, state);        
      });
      // end: tab switch

      // start: swipe
      var touchstartX;
      $('.scroll_tab_inner', this).on('touchstart', function(e){
        e.stopPropagation();
        touchstartX = e.originalEvent.touches[0].clientX;
      });
      $('.scroll_tab_inner', this).on('touchend', function(e){
        e.stopPropagation();
        var touchendX = e.originalEvent.changedTouches[0].clientX;
        if(touchendX > touchstartX && (touchendX-touchstartX > 40)) {
	        var left = $('.scroll_tab_inner', _this).scrollLeft();
	        $('.scroll_tab_inner', _this).animate({scrollLeft: (left - opts.scroll_distance) + 'px'}, opts.scroll_duration);        	
        } else if(touchendX < touchstartX && (touchstartX - touchendX > 40)) {
	        var left = $('.scroll_tab_inner', _this).scrollLeft();
	        $('.scroll_tab_inner', _this).animate({scrollLeft: (left + opts.scroll_distance) + 'px'}, opts.scroll_duration);
        }
      });
      // end: swipe

      // start: tabindex
      $('.scroll_tabs_content div:visible').find('input,textarea,select,button,a').attr('tabindex','-1');
      $('.scroll_tabs_container li').unbind('keyup').on('keyup', function(e){
        if(e.keyCode === 13) {
          if($(e.target).attr('data-flag') === undefined) {
            let tabContent = '#' + $(e.target).parent().attr('data-value');
            if($(tabContent).find('input,textarea,select,button,a').length > 0) {
              $(tabContent).find('input,textarea,select,button,a').removeAttr('tabindex');
              $(e.target).parent().nextAll().children('a').attr('tabindex','-1');
              $(e.target).attr('data-flag', 'true');
              contentTab(tabContent);
            }      
          }else if($(e.target).attr('data-flag') === 'true') {
            $(e.target).parent().nextAll().children('a').removeAttr('tabindex');
            $(e.target).removeAttr('data-flag');
          }
        }
      });
      var contentTab = function(tabContent) {
        $(tabContent).find('input,textarea,select,button,a').filter(':visible:last').unbind('keydown').on('keydown', function(e){
          if(e.keyCode === 13) {
            $(tabContent).find('input,textarea,select,button,a').filter(':visible:last').unbind('keydown');
            setTimeout(() => {
              contentTab(tabContent);
            },100);
            return;
          }
          let currentLi = $('.scroll_tabs_container').find("li[data-value='" + tabContent.substr(1) + "']");
          if(e.keyCode === 9 && !e.shiftKey && currentLi.next().length > 0) {
            currentLi.nextAll().children('a').removeAttr('tabindex');
            currentLi.children('a').removeAttr('data-flag');
            e.preventDefault();
            $(tabContent).find('input,textarea,select,button,a').attr('tabindex', '-1');
            $(tabContent).click();
            currentLi.next().children('a').focus();
          }
        });
      };
      // end: tabindex

    };
    
    // start: "slide" it into view if not fully visible
    var scroll_selected_into_view = function(state){
      var _this = this;
      
      var selected_item = $('.tab_selected', _this);

      var left = $('.scroll_tab_inner', _this).scrollLeft();
      var scroll_width = $('.scroll_tab_inner', _this).width();
      if(selected_item && typeof(selected_item) !== 'undefined' && selected_item.position() && typeof(selected_item.position()) !== 'undefined'){
        if(selected_item.position().left < opts.left_arrow_size){
          $('.scroll_tab_inner', _this).animate({scrollLeft: (left + selected_item.position().left - opts.left_arrow_size) + 'px'}, opts.scroll_duration);
        } else if ((selected_item.position().left + selected_item.outerWidth() + opts.right_arrow_size) > scroll_width){
          $('.scroll_tab_inner', _this).animate({scrollLeft: (left + ((selected_item.position().left + selected_item.outerWidth() + opts.right_arrow_size) - scroll_width)) + 'px'}, opts.scroll_duration);
        }
      }
    };
    // end: "slide" it into view if not fully visible
    
    var ret = [];    
    this.each(function(){      
      var state = {};
      initialize.call(this, state);
      var context_obj = this;
      
      ret.push({
        scrollSelectedIntoView:function(){
          scroll_selected_into_view.call(context_obj, state);
        }
      });
    });
    
    if(this.length == 1){
      return ret[0];
    } else {
      return ret;
    }
  };
  
  $.fn.scrollTabs.defaultOptions = {
    scroll_distance: 300,
    scroll_duration: 300,
    left_arrow_size: 35,
    right_arrow_size: 35,
  };

  $('.scroll_tabs').scrollTabs();
  $(window).on('load',() => {
    $('.scroll_tabs').css('display','block');
  });

})(jQuery);
