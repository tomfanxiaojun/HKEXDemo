+ function($) {
    'use strict';
      $.fn.extend({ initVideoControl: initVideoControl });
			let userAgent = navigator.userAgent,
			    fullScreenForOthers=false,
			    isShowreel = false,
    			loading = false,
	   	    isIE = false,
			    isEdge = false,
			    isIE9 = false,
			    isChrome = false,
			    isIphone = false,
			    isIpad = false,
			 		isIE11 = false,
			    isIE10 = false,
			    isAndroid = false,
          isFirstLoad = true,
          firstLoadErrorCount = 0,
					volForVolumeDiv,
					progressForProDiv,
					playButtonlist,
					videoContainerList,
					seekBarList,
					muteBuList,
					fullScreenBuList,
					fullScreenPlayBuList,
				  volumebarList,
					currentVideo;

				function initVideoControl(isShowReel){
					playButtonlist = $(".video-control__play-pause-button");
					videoContainerList=$(".video-control");
					seekBarList=$(".video-control__progressbar-seekbar");
					muteBuList=$('.video-control__mute-button');
					fullScreenBuList=$('.video-control__fullscreen-button');
					fullScreenPlayBuList=$('.video-control__fullscreen-play-pause-button');
					volumebarList=$('.video-control__volumebar-seekbar');
					 browserDetect();
					 addEventForVolumeBar();
					 addEventForPlayButton();
					 addEventForVideoContrainer();
					 addEventForProgreeSeekBar();
					 addEventForMuteButton();
					 addEventForKeyBoardEvent();
					 addEventForFullScreenButton();
					 isShowreel = isShowReel;
			  }


				function browserDetect(){

					var trident = userAgent.indexOf('Trident/');
					if (trident > 0) {
						// IE 11 => return version number
					isIE11 = userAgent.indexOf("rv:11.0")>0;
					}
					isIE10 = userAgent.indexOf("MSIE 10.0")>0;
					isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !(userAgent.indexOf("Opera") > -1);
					isEdge = userAgent.indexOf('Edge/')>0;
					isIE9 = userAgent.indexOf("MSIE 9.0")>0;
					isChrome = userAgent.indexOf("Chrome") > -1;
			    isAndroid = hkexApp.utils.isAndroidMobile(); //android
					isIphone = userAgent.indexOf("iPhone") > 0;
					isIpad = userAgent.indexOf("iPad") > 0;
				}

				function detectIE() {

			   // Test values; Uncomment to check result …

			   // IE 10
			   // userAgent = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

			   // IE 11
			   // userAgent = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

			   // Edge 12 (Spartan)
			   // userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

			   // Edge 13
			   // userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

			   var msie = userAgent.indexOf('MSIE ');
			   if (msie > 0) {
			     // IE 10 or older => return version number
			     return parseInt(userAgent.substring(msie + 5, userAgent.indexOf('.', msie)), 10);
			   }

			   var trident = userAgent.indexOf('Trident/');
			   if (trident > 0) {
			     // IE 11 => return version number
			     var rv = userAgent.indexOf('rv:');
			     return parseInt(userAgent.substring(rv + 3, userAgent.indexOf('.', rv)), 10);
			   }

			   var edge = userAgent.indexOf('Edge/');
			   if (edge > 0) {
			     // Edge (IE 12+) => return version number
			     return parseInt(userAgent.substring(edge + 5, userAgent.indexOf('.', edge)), 10);
			   }

			   // other browser
			   return false;
			  }
		    function addEventForVolumeBar(){
					for(let i=0;i<volumebarList.length;i++){
						let videoControl = $(volumebarList[i]).parents(".video-control");
						let video = getElementFromParentNode(videoControl,"video-control__embed-video");
			      let volumeDiv = getElementFromParentNode(videoControl,"video-control__volumediv");
						let volumeInner = getElementFromParentNode(videoControl,"video-control__volumediv-innerbar");
						if(isShowreel){
							if(isIE9||isEdge){
								volumebarList[i].style.display = "none";
								volumeDiv.style.display = "block";
							}
							if(detectIE()){
								$(volumebarList[i].parentNode).addClass("video-control__volumebar-ie");
							}

						}

						$(volumeDiv).on('click', function(e) {
			        var w = $(this).width(),
			            x = e.offsetX;
			        volForVolumeDiv = (x / w).toFixed(1);

			        video.volume = volForVolumeDiv;
			        $(volumeInner).css('width', (volForVolumeDiv*100) + '%');
			    });
						volumebarList[i].addEventListener("change", () => {
							video.volume = volumebarList[i].value;
						});
					}
				}


		    function addEventForPlayButton(){
		      addEventForPlayButtonAtFullScreen();
					addEventForCenterPlayButton();
				}
				function addEventForCenterPlayButton(){
					if(playButtonlist.length <= 0){return;}
					for(let i=0;i<playButtonlist.length;i++){
						let videoControl = $(playButtonlist[i]).parents(".video-control");
						let videoControlContainer = getElementFromParentNode(videoControl,"video-control__barcontainer");
						let fullScreenPlayButton = getElementFromParentNode(videoControl,"video-control__fullscreen-play-pause-button");
						if(isIphone){
							//playButtonlist[i].style.display="none";
						}
						let video = getElementFromParentNode(videoControl,"video-control__embed-video");
						playButtonlist[i].addEventListener("mouseover",() => {
							if(isIphone || isIpad || isAndroid){return;}
							 playButtonlist[i].style.opacity="0.6";
						});

						playButtonlist[i].addEventListener("mouseout",() => {
							if(isIphone || isIpad || isAndroid){return;}
								playButtonlist[i].style.opacity="0.8";
						});
						playButtonlist[i].addEventListener("click", () => {
								// if(isIphone){return;}
								if(isIpad){
									videoControlContainer.style.display="block";
								}
								if(isAndroid&&video.webkitRequestFullscreen){
									video.webkitRequestFullscreen();
								}

								videoPlayPauseWhileChangeElementDispay(video,playButtonlist[i],fullScreenPlayButton);
						});
					}
				}
		    function addEventForPlayButtonAtFullScreen(){
					for(let i=0;i<fullScreenPlayBuList.length;i++){
						let videoControl =$(fullScreenPlayBuList[i]).parents(".video-control");
			      let video = getElementFromParentNode(videoControl,"video-control__embed-video");
						let playButton = getElementFromParentNode(videoControl,"video-control__play-pause-button");
						fullScreenPlayBuList[i].addEventListener("click", () => {
								videoPlayPauseWhileChangeElementDispay(video,playButton,fullScreenPlayBuList[i]);

						});
					}
				}


				function addEventForVideo(video,fullScreenPlayButton,playButton,videoControlContainer){

				    let videoControl = $(video).parents(".video-control");
						let progressBar = getElementFromParentNode(videoControl,"video-control__progressbar");
						let seekbar = getElementFromParentNode(videoControl,"video-control__progressbar-seekbar");
						let playButtonBackgroundImg;

	         video.addEventListener('pause',() => {
						changePlayButtonPicture(video,playButton,fullScreenPlayButton);
						if(isIphone){return;}
						playButton.style.display = "block";
						if(isAndroid){return;}
						videoControlContainer.style.display = "block";

					 });

					  video.addEventListener('play',() => {
							playButton.style.display = "none";
              isFirstLoad = false;
						});
	         video.addEventListener('loadstart',() =>{
	          // video.currentTime=0;
					 });
	         if(isIE9){
						 $(video).attr("preload","none");
					 }
						video.addEventListener("click", () => {
							 if(loading){return;}
	                if(isIphone){return;}
									videoPlayPauseWhileChangeElementDispay(video,playButton,fullScreenPlayButton);

						});
						video.addEventListener('ended', () => {
	            video.currentTime=0;
							video.pause();
							video.load();
							let poster = video.getAttribute("poster");
							video.setAttribute('poster',poster);

							playButton.style.display="block";
							playButton.style.backgroundImage ="url('images/videocontrol/play.png')";
							fullScreenPlayButton.style.backgroundImage ="url('../images/videocontrol/playfullscreen.png')";
              fullScreenPlayButton.style.backgroundSize = "90%";
							videoControlContainer.style.display="none";
								videoControlContainer.style.display="block";
							if(isIphone){
								playButton.style.display="none";
							}
						});


						video.addEventListener('error', (e) => {
              if(isFirstLoad){
                if(firstLoadErrorCount>0){
                  return;
                }
                firstLoadErrorCount++;
              }
							switch (e.target.error.code) {
					     case e.target.error.MEDIA_ERR_ABORTED:
					       alert('You aborted the video playback.');
					       break;
					     case e.target.error.MEDIA_ERR_NETWORK:
					       alert('A network error caused the video download to fail.');
					       break;
					     case e.target.error.MEDIA_ERR_DECODE:
					       alert('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
					       break;
					     case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
					       alert('The video not be loaded, either because the server or network failed or because the format is not supported.');
					       break;
					     default:
					       alert('An unknown error occurred.');
					       break;
					   }
						});

							video.addEventListener('waiting', () => {
								if(isIE9||isEdge){
									return;
								}
								  loading = true;
									if(fullScreenForOthers){
										playButton.style.zIndex = "2147483647";
									}

									playButton.style.backgroundImage="url('../images/videocontrol/video_loading.gif')";
								  $(playButton).attr("disabled","true");
							});


							video.addEventListener('canplay', () => {
								if(isIE9){
									return;
								}
								loading = false;
								playButton.style.zIndex = "auto";

                changePlayButtonPicture(video,playButton,fullScreenPlayButton);
							  playButton.removeAttribute("disabled");
							});

			         if(detectIE()||isChrome){
								 video.addEventListener('progress', () => {
									 if(video.currentTime===0){return;}
									 if(isChrome&&video.paused===true){return;}
									 var bufferedEnd = video.buffered.end(video.buffered.length - 1);
								   var duration =  video.duration;

									 if(((bufferedEnd/duration*100)-seekbar.value)<0){
										  loading = true;
										  playButtonBackgroundImg = playButton.style.backgroundImage;
										 	playButton.style.backgroundImage="url('../images/videocontrol/video_loading.gif')";
											$(playButton).attr("disabled","true");
											if(fullScreenForOthers){
												playButton.style.zIndex = "2147483648";
											}
									 }else{
										 loading = false;
										 playButton.style.zIndex = "auto";

                     changePlayButtonPicture(video,playButton,fullScreenPlayButton);
										 playButton.removeAttribute("disabled");
					 					}


									 });
							 }

			  }
				function addEventForVideoContrainer(){
					for(let i=0;i<videoContainerList.length;i++){
						let videoControl = videoContainerList[i];
						let playButton = getElementFromParentNode(videoControl,"video-control__play-pause-button");
						let video = getElementFromParentNode(videoControl,"video-control__embed-video");
						let videoControlContainer = getElementFromParentNode(videoControl,"video-control__barcontainer");
						let fullScreenPlayButton= getElementFromParentNode(videoControl,"video-control__fullscreen-play-pause-button");
						if(isIphone){
							video.controls="true";
							videoControlContainer.style.display = "none";
						}
						if(isAndroid&&isShowreel){
							videoControlContainer.style.display = "none";
						}

					 addEventForVideo(video,fullScreenPlayButton,playButton,videoControlContainer);

						videoContainerList[i].addEventListener("mouseover",() => {
							if(isIphone || isIpad || isAndroid){return;}
							if (video.paused != true){
							 playButton.style.display="block";
							 videoControlContainer.style.display="block";
							}
						});
						videoContainerList[i].addEventListener("mouseout",() => {
							if(isIphone || isIpad || isAndroid){return;}
							 if (video.paused != true){
								playButton.style.display="none";
								videoControlContainer.style.display="none";
							}
						});
					}
				}


		    function addEventForProgreeDiv(progressSeekDiv,video,proDivInnerBar){
				 $(progressSeekDiv).on('click', function(e) {
						var w = $(this).width(),
								x = e.offsetX;
						progressForProDiv = (x / w).toFixed(3);

						var duration = video.duration;
						video.currentTime = (duration * progressForProDiv).toFixed(0);

						$(proDivInnerBar).css('width',progressForProDiv + '%');
				 });
			  }
		  	function addEventForProgreeSeekBar(){
					for(let i=0;i<seekBarList.length;i++){
	 				 let videoControl = $(seekBarList[i]).parents(".video-control");
	 				 let video = getElementFromParentNode(videoControl,"video-control__embed-video");
	 				 let timeBar = getElementFromParentNode(videoControl,"video-control__progressbar-time");
	 				 let progressSeekDiv = getElementFromParentNode(videoControl,"video-control__progressbar-seekdiv");
	 				 let totalTimeSpan = getElementFromParentNode(videoControl,"video-control__timebar-totaltime");
	 		     let currentTimeSpan = getElementFromParentNode(videoControl,"video-control__timebar-currenttime");
	 		     let proDivInnerBar = getElementFromParentNode(videoControl,"video-control__progressbar-seekdivInnerbar");


	 				 if(userAgent.indexOf("Firefox") > -1){
	 		 			seekBarList[i].style.top="17px";
	 		 		}
	 				if(isIE10||isIE11){
	 				  seekBarList[i].style.top="7px";
	 			  }

	 				if(isEdge){

	 					timeBar.style.display = "none";
	 					seekBarList[i].style.display="none";
	 					progressSeekDiv.style.display="block";
	 					progressSeekDiv.style.top="24px";
	 		      addEventForProgreeDiv(progressSeekDiv,video,proDivInnerBar);
	 				}
	 				if (userAgent.indexOf("MSIE 9.0")>0){
	 					seekBarList[i].style.display="none";
	 					progressSeekDiv.style.display="block";
	 		      addEventForProgreeDiv(progressSeekDiv,video,proDivInnerBar);
	 				}

	 				 seekBarList[i].addEventListener("change", () => {
	 					 var bufferedEnd = video.buffered.end(video.buffered.length - 1);
	 					 var duration =  video.duration;
	 					 var time = video.duration * (seekBarList[i].value / 100);
	 							video.currentTime = time;
	 				 if (((userAgent.indexOf("Safari") > -1)&&!(userAgent.indexOf("Chrome") > -1))&&!isEdge){
	 					timeBar.style.width=seekBarList[i].value+"%";
	 				   }
	 			   });

	 		    	totalTimeSpan.innerHTML = formatTime(parseInt(video.duration/60))+":"+formatTime(parseInt(video.duration%60));
	 		    	currentTimeSpan.innerHTML = "00"+":"+ "00"+"/";
	 				 video.addEventListener("timeupdate", function() {
	 				 currentTimeSpan.innerHTML = formatTime(parseInt(video.currentTime/60))+":"+ formatTime(parseInt(video.currentTime%60))+"/";
	 				 totalTimeSpan.innerHTML = formatTime(parseInt(video.duration/60))+":"+formatTime(parseInt(video.duration%60));

	 				 var value = (100 / video.duration) * video.currentTime;
	 				 seekBarList[i].value = value;
	 		     if (((userAgent.indexOf("Chrome") > -1)||(userAgent.indexOf("Safari") > -1))&&!isEdge){
	 					 timeBar.style.width=value+"%";
	 				 }
	 				 if(userAgent.indexOf("MSIE 9.0")>0||isEdge){
	 					 proDivInnerBar.style.width=value+"%";
	 				 }
	 				});
	 			 }
			  }

			 	function addEventForMuteButton(){
					for(let i=0;i<muteBuList.length;i++){
	 				 let videoControl = $(muteBuList[i]).parents(".video-control");
	 				 let video = getElementFromParentNode(videoControl,"video-control__embed-video");
	 				 if(isIpad){
	 					 muteBuList[i].style.display="none";
	 				 }
	 				 muteBuList[i].addEventListener("click", () =>{
	 					 if (video.muted == false) {
	 			 			video.muted = true;
	 						muteBuList[i].style.backgroundImage = "url('../images/videocontrol/mutefullscreen.png')";
	 			 		} else {
	 			 			video.muted = false;
	 						muteBuList[i].style.backgroundImage = "url('../images/videocontrol/soundFulScreen.png')";
	 			 		}
	 				 });
	 			 }
				}

        function addEventForKeyBoardEvent(){
					$(document).keyup(function(event){
						if (event.keyCode === 27) {
							if(userAgent.indexOf("Chrome") > -1){return;}
							if(isIE9||isIE10||userAgent.indexOf("Firefox")>-1){
								let videoControl = $(currentVideo).parents(".video-control");
								let controlBarContainer = getElementFromParentNode(videoControl,"video-control__barcontainer");
								let progressBar = getElementFromParentNode(videoControl,"video-control__progressbar");
								let fullScreeButton = getElementFromParentNode(videoControl,"video-control__fullscreen-button");
								let progressSeekBar = getElementFromParentNode(videoControl,"video-control__progressbar-seekbar");
								let timeseekBar = getElementFromParentNode(videoControl,"video-control__progressbar-time");
								let fullScreenPlayButton = getElementFromParentNode(videoControl,"video-control__fullscreen-play-pause-button");
								let muteButton = getElementFromParentNode(videoControl,"video-control__mute-button");
								let volumebar = getElementFromParentNode(videoControl,"video-control__volumebar");
								let timeShowBar = getElementFromParentNode(videoControl,"video-control__timebar");
								let progressSeekDiv = getElementFromParentNode(videoControl,"video-control__progressbar-seekdiv");
								let volumediv = getElementFromParentNode(videoControl,"video-control__volumediv");
								let playButton = getElementFromParentNode(videoControl,"video-control__play-pause-button");


								recoverTheScreenForOhters(currentVideo);
								recoverTheControlBar(controlBarContainer,playButton,progressBar,progressSeekBar,timeseekBar,progressSeekDiv,fullScreenPlayButton, muteButton, volumebar,timeShowBar,fullScreeButton,volumediv);
								if(isShowreel){
									currentVideo.pause();
									recoverFullScreenForShowReel(currentVideo,playButton,progressBar,progressSeekBar,timeseekBar,progressSeekDiv,fullScreenPlayButton, muteButton, volumebar,timeShowBar,fullScreeButton,volumediv);
								}
							}
						}
					});
				}

        function addEventForFullScreenButton(){
					for(let i=0;i<fullScreenBuList.length;i++){
						 let videoControl = $(fullScreenBuList[i]).parents(".video-control");
						 let video = getElementFromParentNode(videoControl,"video-control__embed-video");
						 let controlBarContainer = getElementFromParentNode(videoControl,"video-control__barcontainer");
						 let progressBar = getElementFromParentNode(videoControl,"video-control__progressbar");
						 let progressSeekBar = getElementFromParentNode(videoControl,"video-control__progressbar-seekbar");
						 let timeseekBar = getElementFromParentNode(videoControl,"video-control__progressbar-time");
						 let fullScreenPlayButton = getElementFromParentNode(videoControl,"video-control__fullscreen-play-pause-button");
						 let muteButton = getElementFromParentNode(videoControl,"video-control__mute-button");
						 let volumebar = getElementFromParentNode(videoControl,"video-control__volumebar");
						 let timeShowBar = getElementFromParentNode(videoControl,"video-control__timebar");
						 let fullScreeButton = fullScreenBuList[i];
						 let progressSeekDiv = getElementFromParentNode(videoControl,"video-control__progressbar-seekdiv");
						 let volumediv = getElementFromParentNode(videoControl,"video-control__volumediv");
						 let playButton = getElementFromParentNode(videoControl,"video-control__play-pause-button");

						 if(isIpad){
							 fullScreeButton.style.width="12px";
						 }

						 fullScreenBuList[i].addEventListener("click", () =>{
							if ((!document.fullscreenElement)&& (!fullScreenForOthers) && (!document.webkitFullscreenElement) && (!document.msFullscreenElement)){
								 if (video.requestFullscreen) {
									 video.requestFullscreen();
									 }else if (video.msRequestFullscreen) {
										 video.msRequestFullscreen(); // IE
									 }else if (video.webkitRequestFullscreen) {
									 video.webkitRequestFullscreen(); // Chrome and Safari
									 } else{
										 if(isIpad){
											 video.webkitEnterFullscreen();
										 }else {
											 if(isShowreel){
													requestFullScreenForShowReel(video,playButton,progressBar,progressSeekBar,timeseekBar,progressSeekDiv,fullScreenPlayButton, muteButton, volumebar,timeShowBar,fullScreeButton,volumediv);
											 }
											 requestfullSCreenForOthers(video);
											 justifyTheControlBar(controlBarContainer,playButton,progressBar,progressSeekBar,timeseekBar,progressSeekDiv,fullScreenPlayButton, muteButton, volumebar,timeShowBar,fullScreenBuList[i],volumediv,video);

										 }
									 }
							 }
							 else {
								 if (document.cancelFullScreen) {
									 document.cancelFullScreen();
									 recoverTheControlBar(controlBarContainer,playButton,progressBar,progressSeekBar,timeseekBar,progressSeekDiv,fullScreenPlayButton, muteButton, volumebar,timeShowBar,fullScreenBuList[i],volumediv);
								 }else if (document.msExitFullscreen) {
										 document.msExitFullscreen();
								 }else if (document.webkitCancelFullScreen) {
									 document.webkitCancelFullScreen();
									 recoverTheControlBar(controlBarContainer,playButton,progressBar,progressSeekBar,timeseekBar,progressSeekDiv,fullScreenPlayButton, muteButton, volumebar,timeShowBar,fullScreenBuList[i],volumediv);
								 }else {
										 recoverTheScreenForOhters(currentVideo);
										 recoverTheControlBar(controlBarContainer,playButton,progressBar,progressSeekBar,timeseekBar,progressSeekDiv,fullScreenPlayButton, muteButton, volumebar,timeShowBar,fullScreeButton,volumediv);
										 if(isShowreel){
											 recoverFullScreenForShowReel(video,playButton,progressBar,progressSeekBar,timeseekBar,progressSeekDiv,fullScreenPlayButton, muteButton, volumebar,timeShowBar,fullScreeButton,volumediv);
										 }

									 }
							 }

						 });

						}
				}



//////////////////////full screen functions///////////////////
		  function recoverTheScreenForOhters(video){

				 video.parentNode.style.width = "100%";
				 video.parentNode.style.height = "auto";
	       $(video).removeClass("video-control__embed-video-fs");
				 document.body.style.overflow = 'auto';
				 fullScreenForOthers=false;
		  }


	  	function requestfullSCreenForOthers(video){

				video.parentNode.style.width = window.screen.width + "px" ;
				video.parentNode.style.height = window.screen.height + "px" ;

	     $(video).addClass("video-control__embed-video-fs");
				document.body.style.overflow = 'hidden';
				fullScreenForOthers=true;
		  }

		function requestFullScreenForShowReel(video,playButton,progressBar,progressSeekBar,timeseekBar,progressSeekDiv,fullScreenPlayButton, muteButton, volumebar,timeShowBar,fullScreeButton,volumediv){
			$(playButton).removeClass("video-control__showreel-middle-button");
			$(progressBar).removeClass("video-control__showreel-progressbar");
			$(timeseekBar).removeClass("video-control__showreel-progressbar-time");

			$(fullScreenPlayButton).removeClass("video-control__showreel-play-pause-button");
			$(muteButton).removeClass("video-control__showreel-mute-button");
			$(volumebar).removeClass("video-control__showreel-volumebar");
			$(timeShowBar).removeClass("video-control__showreel-timebar");
			$(fullScreeButton).removeClass("video-control__showreel-fullscreen-button");
			$(volumediv).removeClass("video-control__showreel-volumediv");

			let modalDialog = $(video).parents(".modal-dialog")[0];
			let header = getElementFromParentNode(modalDialog,"modal-header");
      $(modalDialog).addClass("modal-dialog-fs");

			modalDialog.parentNode.style.width =  window.screen.width + "px" ;
			modalDialog.parentNode.style.height = window.screen.height + "px" ;

			video.style.width =  "100%" ;
			header.style.display = "none";

		}

		function recoverFullScreenForShowReel(video,playButton,progressBar,progressSeekBar,timeseekBar,progressSeekDiv,fullScreenPlayButton, muteButton, volumebar,timeShowBar,fullScreeButton,volumediv){
			$(playButton).addClass("video-control__showreel-middle-button");
			$(progressBar).addClass("video-control__showreel-progressbar");
			$(timeseekBar).addClass("video-control__showreel-progressbar-time");

			$(fullScreenPlayButton).addClass("video-control__showreel-play-pause-button");
			$(muteButton).addClass("video-control__showreel-mute-button");
			$(volumebar).addClass("video-control__showreel-volumebar");
			$(timeShowBar).addClass("video-control__showreel-timebar");
			$(fullScreeButton).addClass("video-control__showreel-fullscreen-button");
			$(volumediv).addClass("video-control__showreel-volumediv");


			let modalDialog = $(video).parents(".modal-dialog")[0];
			let header = getElementFromParentNode(modalDialog,"modal-header");
			$(modalDialog).removeClass("modal-dialog-fs");
			modalDialog.parentNode.style.width = "auto" ;
			modalDialog.parentNode.style.height = "auto" ;

			video.style.width =  "80%" ;
			header.style.display = "block";

		}
		function recoverTheControlBar(controlBarContainer,playButton,progressBar,progressSeekBar,timeseekBar,progressSeekDiv,fullScreenPlayButton, muteButton, volumebar,timeShowBar,fullScreeButton,volumediv){
        $(controlBarContainer).removeClass("video-control__barcontainer-fs");
			  $(playButton).removeClass("video-control__play-pause-button-fs");

			  $(progressBar).removeClass("video-control__progressbar-fs");
				progressSeekBar.style.top="25px";
			  $(timeseekBar).addClass("video-control__progressbar-time-fs");
        $(progressSeekDiv).removeClass("video-control__progressbar-seekdiv-fs");
			  $(fullScreenPlayButton).removeClass("video-control__fullscreen-play-pause-button-fs");
				$(muteButton).removeClass("video-control__mute-button-fs");
        $(volumebar).removeClass("video-control__volumebar-fs");
				$(volumediv).removeClass("video-control__volumebar-fs-ie19");
			  $(timeShowBar).removeClass("video-control__timebar-fs");
        $(fullScreeButton).removeClass("video-control__fullscreen-button-fs");
				if(detectIE()){
					progressSeekBar.style.top="7px";
				}
				if(userAgent.indexOf("Firefox") > -1){
				 progressSeekBar.style.top="17px";
			 }
			 if(userAgent.indexOf("MSIE 9.0")>0){
				 //volumediv.style.display="none";
				 $(volumediv).removeClass("video-control__volumediv-fs");
			   controlBarContainer.style.background="transparent";
				 controlBarContainer.style.opacity="1";
			}
			if(isIE10){
		    $(volumebar).removeClass("video-control__volumebar-fs-ie10");
			}
		}


		function justifyTheControlBar(controlBarContainer,playButton,progressBar,progressSeekBar,timeseekBar,progressSeekDiv,fullScreenPlayButton, muteButton, volumebar,timeShowBar,fullScreeButton,volumediv,video){
		  currentVideo=video;
			$(controlBarContainer).addClass("video-control__barcontainer-fs");
      $(playButton).addClass("video-control__play-pause-button-fs");
			$(progressBar).addClass("video-control__progressbar-fs");
			$(progressSeekDiv).addClass("video-control__progressbar-seekdiv-fs");

			progressSeekBar.style.top="0";
      $(timeseekBar).addClass("video-control__progressbar-time-fs");
			$(fullScreenPlayButton).addClass("video-control__fullscreen-play-pause-button-fs");
			$(muteButton).addClass("video-control__mute-button-fs");

			$(volumebar).addClass("video-control__volumebar-fs");

		  if(isIE9){
				progressBar.style.bottom="0";
				$(volumebar).removeClass("video-control__volumebar-fs");
				$(volumediv).addClass("video-control__volumediv-fs");
				controlBarContainer.style.background="black";
				controlBarContainer.style.opacity="0.7";
			}
			if(isIE10){
			$(volumebar).addClass("video-control__volumebar-fs-ie10");
			}
			if(isIpad){
		  	$(volumebar).removeClass("video-control__volumebar-fs");
				controlBarContainer.style.zIndex="auto";
			}

			$(timeShowBar).addClass("video-control__timebar-fs");
      $(fullScreeButton).addClass("video-control__fullscreen-button-fs");

		}

////////// private function ///////////////

		function toggleControls(video) {
			if (video.hasAttribute("controls")) {
				 video.removeAttribute("controls");
			} else {
				 video.setAttribute("controls","controls");
			}
		}

		function formatTime(intVal){
			if(isNaN(intVal)){return "00";}
			if(intVal<10){
				return "0"+intVal;
			}
			else{
				return intVal;
			}
		}


		function changePlayButtonPicture(video,playButton,fullScreenPlayButton){
			if(video.paused){
				playButton.style.backgroundImage = "url('images/videocontrol/play.png')";
				fullScreenPlayButton.style.backgroundImage = "url('../images/videocontrol/playfullscreen.png')";
        fullScreenPlayButton.style.backgroundSize = "90%";
			}	else{
					playButton.style.backgroundImage = "url('../images/videocontrol/pause.png')";
					fullScreenPlayButton.style.backgroundImage = "url('../images/videocontrol/pausefullscreen.png')";
          fullScreenPlayButton.style.backgroundSize = "90%";

				}
		}

		function videoPlayPauseWhileChangeElementDispay(video,playButton,fullScreenPlayButton){
			if (video.paused == true) {
				video.play();
				if(isAndroid&&video.webkitRequestFullscreen){
					video.webkitRequestFullscreen();
				}
				playButton.style.backgroundImage = "url('../images/videocontrol/pause.png')";
				fullScreenPlayButton.style.backgroundImage = "url('../images/videocontrol/pausefullscreen.png')";
        fullScreenPlayButton.style.backgroundSize = "90%";

			} else {
				video.pause();
				playButton.style.backgroundImage = "url('images/videocontrol/play.png')";
				fullScreenPlayButton.style.backgroundImage = "url('../images/videocontrol/playfullscreen.png')";
        fullScreenPlayButton.style.backgroundSize = "90%";
			}
		}

		function getElementFromParentNode(parentNode, className){
				let element;
				className = '.'+className;
		    element = $(parentNode).find(className)[0];
				return element;
		}

}(jQuery);
