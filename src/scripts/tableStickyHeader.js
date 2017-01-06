+function($) {
  'use strict';
  $.fn.extend({ initStickyHeader: initStickyHeader });
  let $stickyHeaderTableList,
      currentTableIndex = 0,
      previousTableIndex = 0,
      position = 0;


  function initStickyHeader(){
    $stickyHeaderTableList = $('.sticky-header-table');
    if($stickyHeaderTableList.length<=0){
      return;
    }
   lanchTheCurrentTable();
   changeHeaderStickyStatusWhileScrowing();
  }


//detect which table is in the window, and make it the current table
  function lanchTheCurrentTable(){
     let tableTopPostionList = [],
         tablebottomPosition = [],
         windowHeight = $(window).height(),
         windowScrowed = $(window).scrollTop();
     $stickyHeaderTableList.each(function(){
       tableTopPostionList.push($(this).offset().top);
       tablebottomPosition.push($(this).offset().top + $(this).outerHeight());
     });
     for(let i = 0; i < $stickyHeaderTableList.length; i++){
        let isOutOftheTable = windowScrowed > tablebottomPosition[i] -windowHeight;
       if(windowScrowed >= tableTopPostionList[i]){
         currentTableIndex = i;
         if(isOutOftheTable){
           currentTableIndex++;
         }
       }
     }
     $($stickyHeaderTableList[currentTableIndex]).addClass("sticky-header-table__current-table");
  }

  function changeCurrentTable(){
    if(currentTableIndex !== previousTableIndex){
      $($stickyHeaderTableList[currentTableIndex]).addClass("sticky-header-table__current-table");
      $($stickyHeaderTableList[previousTableIndex]).removeClass("sticky-header-table__current-table");
    }
  }


  function changeHeaderTopPosition($tableHeader,$Scroller,ScrollTopPosition,isEnableStiky){
    let leftFixedTH = $tableHeader.find('.is-fix-col')[0];
    $tableHeader.find('th,td').each(function(){
      if(isEnableStiky){
       $(this).addClass("sticky");
       $(this).css('top',(ScrollTopPosition+'px'));
       $(leftFixedTH).css('z-index','20');
     }else{
       $(this).removeClass("sticky");
       $(this).css('top','0');
       $(leftFixedTH).css('z-index','10');
     }

    });
    $Scroller.css('top',(ScrollTopPosition+'px'));
  }

  function changeHeaderStickyStatusWhileScrowing(){
    $(window).scroll(function(){
      setTimeout(scrollingFn,250);
    });
  }
  function scrollingFn(){
    let $currentTable = $('.sticky-header-table__current-table');
    if($currentTable.length<=0){return;}
    let $currentSTableHeader = $currentTable.find('thead'),
        $currentTableScroll = $currentTable.find('.fixed-freeze-tb--scroller-container'),
        $currentScrollButtons = $currentTable.find('.fixed-freeze-tb--scroll-bts'),
        tableTopPostion = $currentTable.offset().top,
        tableHeight = $currentSTableHeader.outerHeight()+$currentTable.find('tbody').outerHeight(),
        windowHeight = $(window).height(),
        windowScrowed = $(this).scrollTop(),
        isScrowUp = windowScrowed < position,
        isScrollIntoTable = windowScrowed >= tableTopPostion,
        isScrowToTheBottom = windowScrowed > tableTopPostion + tableHeight -windowHeight;

          if(isScrollIntoTable){

            $currentSTableHeader.addClass("sticky");
            $currentTableScroll.addClass("sticky");
            $currentScrollButtons.addClass("stickyScrollBtns");
            let tableScrollerTopPostion = windowScrowed - tableTopPostion;
            let tableHeaderHeight = $currentSTableHeader.outerHeight();

            changeHeaderTopPosition($currentSTableHeader,$currentTableScroll,tableScrollerTopPostion,true);


            if(isScrowToTheBottom){
              $currentSTableHeader.removeClass("sticky");
              $currentTableScroll.removeClass("sticky");
              $currentScrollButtons.removeClass("stickyScrollBtns");

              changeHeaderTopPosition($currentSTableHeader,$currentTableScroll,0,false);
              previousTableIndex = currentTableIndex;
              if(currentTableIndex !==  ($stickyHeaderTableList.length - 1)){
                currentTableIndex++;
              }
              changeCurrentTable();

            }
          }else if(isScrowUp){
            $currentSTableHeader.removeClass("sticky");
            $currentTableScroll.removeClass("sticky");
            $currentScrollButtons.removeClass("stickyScrollBtns");
            changeHeaderTopPosition($currentSTableHeader,$currentTableScroll,0,false);
            previousTableIndex = currentTableIndex;
          if(currentTableIndex === previousTableIndex && currentTableIndex > 0){
            currentTableIndex--;
          }
          if(previousTableIndex > 0){
            changeCurrentTable();
          }
        }
        position = windowScrowed;
  }
}(jQuery);
