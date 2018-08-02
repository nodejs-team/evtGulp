/**
 * Created by mcake on 2016/5/24.
 */
(function($){


  
  function scroll() {
    $(window).scroll(function () {
      var distance = $(document).scrollTop()/10;
      var height = $(".banner").height();
      var percent = distance/height*10;
      var dis=1+Math.min(1,percent);
      $(".banner").css("transform","scale("+dis+")");

    });
  }
  

  var loadComplete = function () {
    scroll();
    new BannerRedraw(".sec-banner", ['.banner-word','.banner','.banner-btn']);


    var swiper1 = new Swiper('.swiper1', {
      pagination: '.pagination1',
      grabCursor: true,
      loop:true,
      autoplay : 3000,
      effect : 'fade',
      noSwiping : true,
      noSwipingClass : 'stop-swiping',
      autoplayDisableOnInteraction : false,
      paginationClickable: true,
      onSlideChangeStart:function () {
         $(".buy").fadeOut(20);
      },
      onSlideChangeEnd: function(swiper){
          $(".buy").stop().fadeIn(200);
      }
    });

    $('.button-prev1').on('click', function(e){
      e.preventDefault()
      swiper1.swipePrev()
    });
    $('.button-next1').on('click', function(e){
      e.preventDefault()
      swiper1.swipeNext()
    });

    var swiper2 = new Swiper('.swiper2', {
      pagination: '.pagination2',
      grabCursor: true,
      loop:true,
      autoplay : 3000,
      effect : 'fade',
      noSwiping : true,
      noSwipingClass : 'stop-swiping',
      autoplayDisableOnInteraction : false,
      paginationClickable: true,
      onSlideChangeStart:function () {
        $(".buy").fadeOut(20);
      },
      onSlideChangeEnd: function(swiper){
        $(".buy").stop().fadeIn(200);
      }
    });
    
    
    $(".libox").hover(function () {
      swiper1.stopAutoplay();
      swiper2.stopAutoplay();
    },function () {
      swiper1.startAutoplay();
      swiper2.startAutoplay();
    });

    $('.button-prev2').on('click', function(e){
      e.preventDefault()
      swiper2.swipePrev()
    });
    $('.button-next2').on('click', function(e){
      e.preventDefault()
      swiper2.swipeNext()
    });


    var Tab = {
      _init:function () {
        $('.libox-title div').hover(function () {
          $(".buy").stop().fadeIn(0);
          $(this).removeClass("on").siblings().addClass('on');
          var idx = $(this).index();
          $(".li-box").eq(idx).fadeIn(0).siblings(".li-box").fadeOut(0);
          $(".moons").eq(idx).fadeIn(0).siblings(".moons").fadeOut(0);
          /*swiper1.autoplay.start();*/
          swiper1.startAutoplay();
          swiper2.startAutoplay();
        });

      }
    };

    $(".li-box-hide").hide();/*需要先进行加载，获取高度*/
    $(".moonsHide").hide();/*需要先进行加载，获取高度*/

    Tab._init();



    $(".card").hover(function () {
      $(".card-cover").fadeIn(200);
    },function () {
      $(".card-cover").fadeOut(0);
    });

    $(".cardList li").hover(function () {
      $(this).find(".duihuan-btn").addClass("on");
    },function () {
      $(this).find(".duihuan-btn").removeClass("on");
    });

    $(".zoom").hover(function () {
      $(this).addClass("on")
    },function () {
      $(this).removeClass("on")
    });

    var open = false;
    $(".guize-more").click(function () {
      if(!open){
        open = true;
        $(".card-guize").slideDown(500);
      }else {
        open = false;
        $(".card-guize").slideUp(600);
       /* $(".card-guize").fadeOut(100);*/
      }

    });
    
  };

  var loadResource = function(){
    if( typeof resData == 'object' && Array.isArray(resData.resources) && resData.resources.length > 0 ){
      startLoader(resData);
    } else {
      var resLoader = new Resource.JSONloader('res.json');
      resLoader.on("success", function (res) {
        startLoader(res);
      });
      resLoader.on("error", function () {
        console.error("资源配置加载失败...");
      });
    }

    function startLoader(data) {
      var loader = new Resource.loadGroup("preload", data);
      var spin = Resource.el('#evt_spin');

      loader.on("progress", function (loaded, total) {
        spin.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";
      });

      loader.on("complete", function () {
        Resource.el('#evt_loading').style.display = "none";
        Resource.el('#evt_container').style.display = 'block';
        correctPNG($('#evt_container').get(0));
        bindScroll('#evt_container');
        loadComplete();
      });
    }

  };

  $(function(){
    loadResource();
  });

})(jQuery);