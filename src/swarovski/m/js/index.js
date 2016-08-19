$(window).scrollTop(0);
window.onload=function(){
	var video='<video preload="auto" poster="images/video-poster.png" loop="loop" id="video" webkit-playsinline playsinline><source type="video/mp4" src="video/video_1.mp4"></source></video>';

	loadImg();

    function loadImg(){
		var log = document.getElementById("speed");
		loadImgQueue(getLoadingImgs('imgContainer'), function(loaded, total, objItem){
			objItem.elm.setAttribute('src', objItem.src);
			objItem.elm.removeAttribute('data-src');
			log.innerHTML = parseInt((loaded/total)*100).toString() + "%";
			if( loaded == total ){
				$(".scale").addClass("scale_image");
				//imgContainer.style.display = 'block';
				$(".loading").fadeOut(1000,function(){
					$(window).scrollTop(0);
					swarovski.init();
				});
			}		 
		});

   }
	//动画
	var swarovski = {
		init: function(){
			this._scrollTop = 0;
			this.n=true;
			this._isPlaying = false;
			this.sTop1 = $(".text3").offset().top;
			this.sTop2 = $(".text2").offset().top;
			this.sTop3 = $(".text4").offset().top;
			this.arrow = $('.arrow');
			//this.sTop3 = $(".sTop3").offset().top;
			this.showMain();
			this.bindEvent(); //事件绑定函数
		},
		
		showMain: function(){  //初始化页面
			/*var $radio=$(".radio"),
				$bgCover=$(".bgCover"),
				$jing=$(".jing"),
				$Quan=$(".Quan"),
				$jingBtn=$(".jing-btn"),
				self = this;*/
            
           
            this.addFade($(".text1 .txt"));

           /* $radio.click(function(){
            	$jing.html('<img src="images/jing-1.png">');
            	$Quan.find("p").text("SORRY，奇沛吊坠已被领光!");
            	$bgCover.show();
            	$Quan.show();
            });
            $jingBtn.click(function(){
            	$bgCover.hide();
            	$Quan.hide();
            });*/

        },
		_getClient: function(){
			var dc = document.documentElement,
				db = document.body,
				clientW = dc.clientWidth || db.clientWidth,
				clientH = dc.clientHeight || db.clientHeight;

			return {
				scrollTop: window.pageYOffset || dc.scrollTop || db.scrollTop,
				width: clientW,
				height: clientH
			};
		},
		bindEvent: function(){
			var self = this;
			var isPlaying=this._isPlaying;
			var myVideo;
			var timeout;

			this._initClient = this._getClient();

			$(window).on("scroll", function(){  //绑定滚动事件
				self.scrollFunc();
			});

			touch.on('.playBtn', 'tap', function(ev){
				if(self.n){
					$(".videoBox").html(video);
					myVideo = document.getElementById("video");
					self.n=false;
				}

			   if(isPlaying){
					myVideo.pause();
					$(".vPlay").show();
					$(".vPause").hide();
					isPlaying = false;
				}else{
					myVideo.play();
					$(".vPlay").hide();
					$(".vPause").show();
					isPlaying = true;
				}

				if( timeout ) clearTimeout(timeout);

				timeout = setTimeout(function(){
					$(".playBtns").hide();
				}, 1000);

			});

			touch.on('.playBtn', 'touchstart', function(ev){
				$(".playBtns").show();
			});
		},
		scrollFunc: function(){  //滚动时执行的函数
			var self = this;
			var scrollTop = self._getClient().scrollTop;

			if( scrollTop + self._initClient.height > this.sTop2 + self._initClient.scrollTop ){
				self.addFade($(".text2 .txt"));
			}

			if( scrollTop + self._initClient.height > this.sTop1 + self._initClient.scrollTop ){
				self.addFade($(".text3 .txt"));
				$(".diamonImg").addClass("moveLeft");
				$(".diamonIntroduct2").addClass("moveRight");
			}

			if( scrollTop + self._initClient.height > this.sTop3 + self._initClient.scrollTop ){
				self.addFade($(".text4 .txt"));
			}

			if( scrollTop > self._initClient.height/8 ){
				self.arrow.addClass('fadeHide');
			}
  
        },
        addFade:function(ele){
	    	 ele.each(function(i){
	              $(this).addClass('textMove'+(i+1));
	         });
        }


  }





}
