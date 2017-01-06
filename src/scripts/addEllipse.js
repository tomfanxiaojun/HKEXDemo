(function($) {
  'use strict';
  let $listPanelItems;
  function addOrRemoveListPanel() {
    $listPanelItems = $(".circulars").find(".list-panel__item").find("a");
      hkexApp.utils.addEllipse($listPanelItems,2);
  }

  $('.news-section .tabs-for-sidebar li').on('click',(e)=>{
    addOrRemoveListPanel();
  });

  addOrRemoveListPanel();
  $(window).resize(function(event){
    addOrRemoveListPanel();
  });

}(jQuery));
