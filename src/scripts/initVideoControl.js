
(function() {
	'use strict';
   let ifHasVideo = $('.video-control').length > 0,
	     isShowreel;
	 if(!ifHasVideo){return;}
	 isShowreel = $('.video-control__showreelcontainer').length > 0,
   $.fn.initVideoControl(isShowreel);
})();
