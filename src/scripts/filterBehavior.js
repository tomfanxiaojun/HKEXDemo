/*Control the behavior of filter*/
const FILTER_KEY_PRODUCTS = '.products-filter';
const FILTER_KEY_CIRCULARS = '.circulars-filter';
const FILTER_KEY_ADVANCED_SEARCH_TOP = '.advanced-search__main-filter';
const FILTER_KEY_ADVANCED_SEARCH_MIDDLE = '.filteringMobile';
const FILTER_KEY_NEWS_RELEASE = '.newsRelease-filter';
const FILTER_KEY_CALENDAR = '.agenda__filter';

(function($) {
    'use strict';
  let filterInit = function filterInit(filterKey){
    let _this = this;
    let filterApplied = false;//flag to show whether filter is applied
    let colon = ' : ';

    let applyButtonIdentifier,
    cancelButtonIdentifier,
    moreFilterFloatDown,
    stretchFilter,
    filterLevel1Identifier,
    filterLevel2Identifier,
    filterDisabled;

    let $sectionContainer,
    $filterForm,
    $moreFilter,
    $moreFilterText,
    $btnGroup,
    $applyButton,
    $cancelButton,
    $selectedItemContainer,
    $checkbox,
    $checkboxLabel,
    $dropbox,
    $dropboxItems,
    $inputFilter,
    $filterLevel1;

    let initFilter = function initFilter($mainContainer){
      applyButtonIdentifier = '.filter__btn-applyFilters-js';
      cancelButtonIdentifier = '.filter__btn-cancelFilters-js';
      moreFilterFloatDown = 'filter__moreFilter--float-down';
      stretchFilter = 'filter__selectedItem--stretched';
      filterDisabled = 'filter-disabled';
      filterLevel1Identifier = '.filter__level-1-js';
      filterLevel2Identifier = '.filter__level-2-js';

      $filterForm = $mainContainer.find('.filter__checkboxForm');
      $moreFilter = $mainContainer.find('.filter__moreFilter');
      $moreFilterText = $mainContainer.find('.filter__moreFilterText');
      $btnGroup = $mainContainer.find('.filter__buttonGroup');
      $applyButton = $mainContainer.find(applyButtonIdentifier);
      $cancelButton = $mainContainer.find(cancelButtonIdentifier);
      $selectedItemContainer = $mainContainer.find('.filter__selectedItem');

      //checkbox filter
      $checkbox = $mainContainer.find('input:checkbox');
      $checkboxLabel = $mainContainer.find('.filter__checkBox__tab-js');
      //dropbox filter
      $dropbox = $mainContainer.find('.filter__dropdown-js .select-target a');
      $dropboxItems = $mainContainer.find('.filter__dropdown-js .select-items');
      //input filter
      $inputFilter = $mainContainer.find('.advanced-search__input--js');

      //for multiple level(2 levels for now), get level1 filter
      $filterLevel1 = $mainContainer.find(filterLevel1Identifier);

      $sectionContainer = initContainer();
    };
    // regist elements
    let registerDropboxFilter = function registerDropboxFilter($dom){
      let defaultValue = $dom.attr('data-value');
      let _this = $(this);
      function resetToDefault(){
        $dom.attr('data-value',defaultValue).text(defaultValue);
        $dom.parent().siblings('.select-items').children().each((index, e) => {
            if (e.innerText == defaultValue) {
                $(e).attr('data-target', 'true');
            } else {
                $(e).attr('data-target', 'false');
            }
        });
      };
      function setValue(newValue){
        $dom.attr('data-value',newValue).text(newValue);
      };
      function isChosen(){
        return $dom.attr('data-value') !== defaultValue;
      };
      function getIdentifier(){
        return $dom[0].name;
      };
      $dom.on('change',filterClickEvent);
      return $.extend($dom,{resetToDefault,setValue,isChosen,getIdentifier});
    };
    let registerInputFilter = function registerInputFilter($dom){
      function resetToDefault(){
          setValue(null);
      };
      function setValue(newValue){
        $dom.val(newValue);
        if(!newValue) {
          $dom.parent().find("label").removeClass('hint-label');
        }
      };
      function isChosen(){
        return $dom.val().trim().length>0;
      }

      function getIdentifier(){
        return $dom[0].name+colon+$dom.attr('data-value');
      };

      $dom.on('input',filterClickEvent);

      return $.extend($dom,{resetToDefault,setValue,isChosen,getIdentifier});
    };
    let registerCheckboxFilter = function registerCheckboxFilter($dom){
      function resetToDefault(){
        setValue(false);
      };
      function setValue(newValue){
        $dom.prop('checked',newValue?true:false);
      };
      function isChosen(){
        return $dom.prop('checked');
      }
      function getIdentifier(){
        return $dom.attr('data-value');
      };
      $dom.on('change',filterClickEvent);
      return $.extend($dom,{resetToDefault,setValue,isChosen,getIdentifier});
    };
    let registerEvent = function registerEvent(){
      $moreFilterText.on('click',()=> {
          hideMoreFilter();
          $filterForm.show();
          if(filterApplied) {
            hideSelectedItem();
          }
      });

      $cancelButton.on('click',cancelFilterClickEvent);

      $btnGroup.on('keyup',applyButtonIdentifier,$.keyboardEnterEvent);
      $btnGroup.on('keyup',cancelButtonIdentifier,$.keyboardEnterEvent);
    };

    let initContainer = function initContainer(){
      let domContainer = [];

      $dropbox.each(id=>{
        domContainer.push(registerDropboxFilter($($dropbox[id])));
      });
      $inputFilter.each(id=>{
        domContainer.push(registerInputFilter($($inputFilter[id])));
      });
      $checkbox.each(id=>{
        domContainer.push(registerCheckboxFilter($($checkbox[id])));
      });

      let getDOMElements = function(){
        return domContainer;
      };
      let resetContainer = function resetContainer(){
        domContainer.forEach(($dom)=>$dom.resetToDefault());
      };
      let updateOneInContainer = function updateOneInContainer(key,value){
        domContainer.forEach(($dom)=>{
          if($dom.getIdentifier() === key){
              if(value){
                $dom.setValue(value);
              } else {
                $dom.resetToDefault();
              }
          }
        });
      };
      let isFilterChosen = function isFilterChosen() {
        for(let i = 0; i< domContainer.length; i++){
          if(domContainer[i].isChosen()){
            return true;
          }
        }
        return false;
      };
      return $.extend($sectionContainer,{getDOMElements,resetContainer,updateOneInContainer,isFilterChosen});
    };

    let hideMoreFilter = function hideMoreFilter() {
      $moreFilter.hide();
    };
    let showMoreFilter = function showMoreFilter() {
      $moreFilter.show();
    };

    let setMoreFilterStyle = function setMoreFilterStyle() {
      $moreFilter.addClass(moreFilterFloatDown);
      $selectedItemContainer.addClass(stretchFilter);
    };
    let resetMoreFilterStyle = function resetMoreFilterStyle() {
      $moreFilter.removeClass(moreFilterFloatDown);
      hideSelectedItem();
    };

    let hideFilterForm = function hideFilterForm() {
        $filterForm.addClass('collapsing')
        .hide()
        .removeClass('collapse in')
        .attr('aria-expanded', false);
    };
    let showFilterForm = function showFilterForm() {
      $filterForm.removeClass('collapse in')
      .show()
      .addClass('collapsing')
      .attr('aria-expanded', true);
    };

    let resetFilter = function resetFilter() {
      disableApplyFilterButton();
      showMoreFilter();
      $sectionContainer.resetContainer();
      filterApplied = false;
    };

    let resetOriginFilter = function resetOriginFilter(){
      showSelectedItemTag();
      showMoreFilter();
      $sectionContainer.resetContainer();
      let $selectedItems = $selectedItemContainer.children();
      $selectedItems.each((id)=>{
        $sectionContainer.updateOneInContainer(getSelectedItemKey($selectedItems[id]),getSelectedItemValue($selectedItems[id]));
      });

      enableApplyFilterButton();
    };

    let eleExist = function eleExist($obj){
      return $obj.length>0;
    };

    let getSelectedItemValue = function getSelectedItemValue(ele){
      return ele.innerText.substring(ele.innerText.indexOf(':')+1).trim();
    };
    let getSelectedItemKey = function getSelectedItemKey(ele){
      return $(ele).attr('data-key');
    };

    let enableApplyFilterButton = function enableApplyFilterButton() {
      if($applyButton.hasClass('btn-disable')) {
        $applyButton.removeClass('btn-disable')
        .addClass('btn-blue')
        .on('click',applyFilterClickEvent);
        setMoreFilterStyle();
      }
    };
    let disableApplyFilterButton = function disableApplyFilterButton() {
      $applyButton.removeClass('btn-blue')
      .addClass('btn-disable')
      .unbind();
      resetMoreFilterStyle();
    };

    //selected item (cross box)
    let createSelectedItemAccordingToChosenFilters = function createSelectedItemAccordingToChosenFilters(){
      $sectionContainer.getDOMElements().forEach(($dom)=>{
        if($dom.isChosen()){
          createSelectedItem($dom);
        }
      });
    };
    let createSelectedItem = function createSelectedItem($ele) {
      let tabName = $ele.attr('name')?$ele.attr('name').split('_').join(' '):'';
      let tabValue = $ele.attr('data-value')||$ele.val();
      if(tabName && tabValue) {
        let selectedTagName = "<a class='btn-white btn-cross filter__selectedItem__button filter-selectedItem--js' id='cd-cancelSelected' tabindex='0'></a>";
        let $selectedTag = $(selectedTagName).text(tabName+colon+tabValue);
        $selectedTag.attr('data-key',$ele.getIdentifier());
        $selectedTag.on('click',selectedItemClickEvent).on('keyup',$.keyboardEnterEvent);
        $selectedItemContainer.append($selectedTag);
      }
    };
    let showSelectedItemTag = function showSelectedItemTag() {
      $selectedItemContainer.show();
    };
    let hideSelectedItem = function hideSelectedItem() {
      $selectedItemContainer.hide();
    };
    let removeSelectedItem = function removeSelectedItem(ele) {
      ele.parentElement.removeChild(ele);
    };
    let hasSelectedItem = function hasSelectedItem() {
      return $selectedItemContainer.children().length > 0 ? true : false;
    };
    let resetAllSelectedItem = function resetAllSelectedItem() {
      if(hasSelectedItem()) {
        $selectedItemContainer.children().each((index,ele)=>{
            removeSelectedItem(ele);
        });
      }
    };
    /********click event for elements***********/
    let selectedItemClickEvent = function selectedItemClickEvent(e) {
      $sectionContainer.updateOneInContainer(getSelectedItemKey(e.target),'');
      removeSelectedItem(e.target);
      if(!hasSelectedItem()) {
        resetFilter();
      }
    };

    let applyFilterClickEvent = function applyFilterClickEvent(){
      hideFilterForm();
      showMoreFilter();
      showSelectedItemTag();
      resetAllSelectedItem();
      createSelectedItemAccordingToChosenFilters();
      changeAdvanceSearchStyle();
      filterApplied = true;
    };

    let cancelFilterClickEvent = function cancelFilterClickEvent(){
      showFilterForm();
      $filterForm.hide();
      changeAdvanceSearchStyle();
      if(filterApplied) {
        resetOriginFilter();
      } else {
        resetFilter();
      }
    };

    let filterClickEvent = function filterClickEvent(){
        if($sectionContainer.isFilterChosen()) {
          enableApplyFilterButton();
        } else {
          disableApplyFilterButton();
        }
    };
    //for calendar page, if level1 filter is unchecked, all sublevel filter will be disabled
    let level1CheckboxClickEvent = function level1CheckboxClickEvent(e) {
      let $level1Doms = $(e.target);
      let $level2Doms = $level1Doms.parent().parent().find(filterLevel2Identifier);
      if(!$level1Doms.prop('checked')){
        $level2Doms.addClass(filterDisabled);
      } else {
        $level2Doms.removeClass(filterDisabled);
      }
    };
    let registerCheckboxLevel1 = function registerCheckboxLevel1(){
      $filterLevel1.on('click',level1CheckboxClickEvent);
    };

    ////only for advancedSearch page
    let changeAdvanceSearchStyle = function changeAdvanceSearchStyle() {
      let $mainFilter = $(".advanced-search__main-filter");
      if($mainFilter.length<=0){
        return;
      }

      let $moreFilter = $mainFilter.find(".filter__moreFilter");
      let borderInfo = $moreFilter.css("border-bottom");
      if(borderInfo.indexOf("none") !== -1 ){
        $moreFilter.css("border-bottom","1px solid #d3d3d3");
        $moreFilter.find("a").attr("aria-expanded","false");
      }else{
        $moreFilter.css("border-bottom","none");
        $moreFilter.find("a").attr("aria-expanded","true");
      }
    };
    ////end:only for advancedSearch page
    let executeFilter = function executeFilter(){
      if(!_this.length){
        return;
      }
      initFilter(_this);

      //if we need to change behavior for diff filter, write new registerEvent by yourself
      // and use key to judge which funtion to execute
      if(FILTER_KEY_CALENDAR === filterKey){
        registerEvent();
        registerCheckboxLevel1();
      } else {
        registerEvent();
      }
    };

    return executeFilter();
};

    $.fn.extend({ filterInit: filterInit });

    $(FILTER_KEY_PRODUCTS).filterInit(FILTER_KEY_PRODUCTS);
    $(FILTER_KEY_CIRCULARS).filterInit(FILTER_KEY_CIRCULARS);
    $(FILTER_KEY_ADVANCED_SEARCH_TOP).filterInit(FILTER_KEY_ADVANCED_SEARCH_TOP);
    $(FILTER_KEY_ADVANCED_SEARCH_MIDDLE).filterInit(FILTER_KEY_ADVANCED_SEARCH_MIDDLE);
    $(FILTER_KEY_NEWS_RELEASE).filterInit(FILTER_KEY_NEWS_RELEASE);
    $(FILTER_KEY_CALENDAR).filterInit(FILTER_KEY_CALENDAR);
})(jQuery);
