$(window).scrollTop(0);
window.onload=function(){
	var video='<video preload="auto" poster="images/video-poster.png" loop="loop" id="video" webkit-playsinline><source type="video/mp4" src="video/video_1.mp4"></source></video>';

	var video2='<video preload="auto" poster="images/video-poster.png" loop="loop" controls="controls" id="video" webkit-playsinline><source type="video/mp4" src="video/video_1.mp4"></source></video>';

	  //判断
	var isIphone = /iPhone|iPad|iPod/i.test(navigator.userAgent);
	//alert(isIphone);
	//alert(browser.versions.webApp);
	if(isIphone){
		 animate1();
	}
	else{
		 animate2();
	}

	 function animate1(){
	 	 loadImg();
	 }

	 function animate2(){
	 	 $(".section4").find("span").width("100%")
	  	 $(".section4").find("em").hide();
	  	 $(".section4").find("b").hide();
	  	 $(".gifbox").hide();
	  	 $(".videoBox").html(video2);
	  	 loadImg();
	 }
	  
	  

    function loadImg(){
		var log = document.getElementById("speed");
		loadImgQueue(getLoadingImgs('imgContainer'), function(loaded, total, objItem){
			objItem.elm.setAttribute('src', objItem.src);
			objItem.elm.removeAttribute('data-src');
			log.innerHTML = "加载进度：" + parseInt((loaded/total)*100).toString() + "%";
			if( loaded == total ){
				//imgContainer.style.display = 'block';
				$(".loading").fadeOut(1500,function(){
					$(window).scrollTop(0);
					$(".scale").addClass("scale_image");
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
			this.sTop1 = $(".sTop1").offset().top; 
			this.sTop2 = $(".sTop2").offset().top; 
			this.sTop3 = $(".sTop3").offset().top; 
			this.showMain();
			this.bindEvent(); //事件绑定函数
		},
		
		showMain: function(){  //初始化页面
			var $radio=$(".radio"),
				$bgCover=$(".bgCover"),
				$jing=$(".jing"),
				$Quan=$(".Quan"),
				$jingBtn=$(".jing-btn"),
				self = this;
            
           
            self.addFade($(".text1 .txt"));

            $radio.click(function(){
            	$jing.html('<img src="images/jing-1.png">');
            	$Quan.find("p").text("SORRY，奇沛吊坠已被领光!");
            	$bgCover.show();
            	$Quan.show();
            });
            $jingBtn.click(function(){
            	$bgCover.hide();
            	$Quan.hide();
            });

        },
		bindEvent: function(){
			var self = this;
			var isPlaying=this._isPlaying
			$(window).scroll(function(){  //绑定滚动事件
				self.scrollFunc();
			});

			touch.on('.playBtn', 'tap', function(ev){
				if(self.n){
					$(".videoBox").html(video);
					 self.n=false;
				}
				var myVideo=document.getElementById("video");

			   if(isPlaying){
					myVideo.pause();
					$(".vPlay").hide();
					$(".vPause").show();
					isPlaying = false;
				}else{ 
					myVideo.play();
					$(".vPlay").show();
					$(".vPause").hide();
					isPlaying = true;
					setTimeout(function(){
						$(".playBtns").hide();
					},5000);
				}
			});
			

			touch.on('.playBtn', 'touchstart', function(ev){
				$(".playBtns").show();
			});
		},
		scrollFunc: function(){  //滚动时执行的函数
			var self = this;
			
			var scrollTop = $(window).scrollTop();
			
			if(scrollTop>=this.sTop2 && scrollTop<this.sTop1){
				//console.log(11)
				//$(".section2-text");
				self.addFade($(".text2 .txt"));
			}
			
			else if(scrollTop>this.sTop1 && scrollTop<=2000){
				//console.log(333)
				self.addFade($(".text3 .txt"));
				$(".diamonImg").addClass("moveLeft");
				$(".diamonIntroduct2").addClass("moveRight");
				self.addFade($(".text4 .txt"));
			}
  
        },
        addFade:function(ele){
	    	 ele.each(function(i){
	              $(this).addClass('textMove'+(i+1));
	         });
        }


  }





}
