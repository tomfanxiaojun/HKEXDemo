(function() {
	'use strict';
	let $mainFilter,
	    $advancedSearchCollapse,
		$moreFilter,
		$contentFilter,
		$refineResults,
		$filterBox,
		$selectedItem,
		$cancelButton,
		$applyButton;
		init();

	function init() {
		 $mainFilter = $(".advanced-search__main-filter");
		 $advancedSearchCollapse = $mainFilter.find(".panel-heading");
		 $moreFilter = $mainFilter.find(".filter__moreFilter");
	 	 $contentFilter = $('.filteringMobile');
	 	 $refineResults = $contentFilter.find('.filter__moreFilter');
		 $filterBox = $contentFilter.find('.filter__checkboxForm');	
		 $selectedItem = $contentFilter.find('.filter__selectedItem');
		 $cancelButton = $contentFilter.find('.filter__btn-cancelFilters-js');	 
		 $applyButton = $contentFilter.find('.filter__btn-applyFilters-js');
		 CollapseClick();
		 searchResultsSortBy();
		 filterDisplay();
		 pagenationCount();
		 dateRangePosition();
		 contentFilterBehavior();
		 fitlerForLeftSide();
		 animateApplyFilter();

	}
	function AllsectionsBehavior() {
		 let $allSecCB = $mainFilter.find("#Allsections");
		  $allSecCB.change(function () {
		  	if(this.checked){
					 $("input[name='Property']").prop('checked', true)
					  .attr("disabled", true);;
				}else{
					$("input[name='Property']").prop('checked', false)
					.removeAttr("disabled");
				}
		  });
	}
	function CollapseClick() {

			$advancedSearchCollapse.click(function () {
				$mainFilter.find(".advanced-search__filter-container").removeClass("filter--hidden");
				let borderInfo = $moreFilter.css("border-bottom");
				if(borderInfo.indexOf("none") !== -1 ){
					$moreFilter.css("border-bottom","1px solid #d3d3d3");
				}else{
					$moreFilter.css("border-bottom","none");
				}

				setTimeout(() => {
					if($mainFilter.find('.advanced-search__filter-container').attr('aria-expanded') === 'false') {
						$mainFilter.find('.advanced-search__filter-container').hide();					
					}else if($mainFilter.find('.advanced-search__filter-container').attr('aria-expanded') === 'true') {
						$mainFilter.find('.advanced-search__filter-container').show();
					}
				},50);
			});
	}

	function searchResultsSortBy() {
		$('.sortOptions, .sortOptions-mobile').on('click', function(e) {
			e.preventDefault();
			let target = $(e.target);
			target.siblings().removeClass('active');
			target.addClass('active');
		});
	};

	function filterDisplay() {
		$('.popover__list-item').on('click', function(e) {
			e.preventDefault();
			let target = $(e.target);
			target.parent().siblings().removeClass('selected');
			target.parent().addClass('selected');
			// if($(window).outerWidth() > 1000) {
				let targetText = $(e.target).html();
				$('.dateFilter:visible').html(targetText).attr('title', targetText);
			// }
		});
	};

	function pageCondition(currentPageNo, totalPageNo) {
		if(currentPageNo === 1) {
			$('.previousPage').css('display', 'none');
		}else if(currentPageNo !== 1 && currentPageNo <= totalPageNo) {
			$('.previousPage').css('display', '');
		}
		if(currentPageNo === totalPageNo) {
			$('.nextPage').css('display', 'none');
		}else if(currentPageNo !== totalPageNo && currentPageNo < totalPageNo) {
			$('.nextPage').css('display', '');
		}
		if(currentPageNo > totalPageNo) {
			return;
		}
	}

	function pagenationCount() {
		let pageInput = $('.search-results__content-pagenation').find('input');
		let currentPageNo = parseInt($('.search-results__content-pagenation').find('input').val());
		let totalPageNo = parseInt($('.search-results__content-pagenation').find('.total').html());
		if(currentPageNo == 1) {
			$('.previousPage').css('display', 'none');
		}else if(currentPageNo == totalPageNo) {
			$('.nextPage').css('display', 'none');
		}
		pageInput.on('change', function(){
			currentPageNo = parseInt(pageInput.val());
			if(currentPageNo > totalPageNo || currentPageNo < 1) {
				$('.search-results__content-pagenation input').css('border','1px solid red');
				return;
			}else{
				$('.search-results__content-pagenation input').css('border','');
			}
			pageCondition(currentPageNo, totalPageNo);
		});
		$('.previousPage').on('click', function(){
			if(currentPageNo > 1 && currentPageNo <= totalPageNo) {
				currentPageNo = currentPageNo - 1;
				$('.search-results__content-pagenation').find('input').val(currentPageNo);
				pageCondition(currentPageNo, totalPageNo);
			}
		});
		$('.nextPage').on('click', function(){
			if(currentPageNo < totalPageNo) {
				currentPageNo = currentPageNo + 1;
				$('.search-results__content-pagenation').find('input').val(currentPageNo);
				pageCondition(currentPageNo, totalPageNo);
			}
		});
	}

	// content main filter base behavior on tablet
	function contentFilterBehavior() {
		$refineResults.on('click', () => {
			if($(window).outerWidth() <= 1000) {
				setTimeout(() => {
					if($filterBox.attr('aria-expanded') === 'false') {
						$filterBox.hide();
						if($selectedItem.children().length > 0) {
							$selectedItem.show();
						}						
					}
				},100);
				$refineResults.show();
			}
		});
		$cancelButton.on('click', () => {
			if($(window).outerWidth() <= 1000) {
				$filterBox.attr('aria-expanded', 'false');
				$refineResults.find('a[aria-expanded]').attr('aria-expanded', 'false');
			}
		});
		$applyButton.on('click', () => {
			if($(window).outerWidth() <= 1000) {
				$filterBox.attr('aria-expanded', 'false');
				$refineResults.find('a[aria-expanded]').attr('aria-expanded', 'false');
			}
		});
	}	

	// left side filter for desktop
	function fitlerForLeftSide() {
		if($(window).outerWidth() > 1000) {
			$contentFilter.detach().appendTo('.advanced-search__side-filter');
		}
	}

	// to left filter
	function styleForLift() {
		$filterBox.show().css('height', '').removeClass('collapsing');
		if($selectedItem.children().length === 0) {
			$filterBox.find('input:checkbox:checked').prop('checked', false);
			$filterBox.find('input:text').val('');
		}		
	}

	// to content filter
	function styleFotContent() {
		$filterBox.hide().removeClass('collapse in').addClass('collapsing');
	}

	// content main filter for tablet
	let preWidth = $(window).outerWidth();
	$(window).on('resize', function(){
		let currentWidth = $(window).outerWidth();
		if(currentWidth > 1000 && preWidth <= 1000) {
			styleForLift();
			$contentFilter.detach().appendTo('.advanced-search__side-filter');
		}else if(currentWidth <= 1000 && preWidth > 1000) {
			styleFotContent();
			$contentFilter.detach().insertBefore('.dateFiltering');
		}
		preWidth = currentWidth;
	});


	//animate filter button function in desktop
	function animateApplyFilter() {
		$contentFilter.find('input:checkbox').on('click', function(){
			if($(window).outerWidth() > 1000) {
				setTimeout(() => {
					$contentFilter.find('.forFilter').click();
					$filterBox.show().removeClass('collapsing');
				}, 100);
			}
		});
		$contentFilter.find('input:text').keypress(function(e){
			if($(window).outerWidth() > 1000) {
				if(e.keyCode === 13) {
					if($contentFilter.find('input:text').val() !== '' && $contentFilter.find('input:text').val() !== ' ') {
						setTimeout(() => {
							$contentFilter.find('.forFilter').click();
							$filterBox.show().removeClass('collapsing');
						}, 100);
					}
				}
			}
		});
	}

	// change Date range position
	function dateRangePosition() {
		$contentFilter.on('click', function() {
			changeDateRangePosition();
		});
	}
	function changeDateRangePosition() {
		setTimeout(function(){
			if($filterBox.attr('aria-expanded') === 'false' && $selectedItem.children().length > 0) {
				$('.dateFiltering').addClass('changePosition');
			} else {
				$('.dateFiltering').removeClass('changePosition');
			}
		},100);		
	}

})();
