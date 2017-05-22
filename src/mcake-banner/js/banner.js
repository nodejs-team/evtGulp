/**
 * Created by mcake on 2016/5/24.
 */
(function ($) {
  var loadComplete = function () {

    var animations = {
      chezi:function () {
        $(".chezi").each(function(i, el){   /*循环播放会创建多个节点*/
          var mc = new MovieClip('chezi_png', "chezi_json", el);
          mc.gotoAndPlay(1, -1);
          return mc;
          /*"duration":4  0.2*20 */
        });
      },
      baozi: function () {

        $(".baozi").each(function(i, el){
          var mc = new MovieClip('baozi_png', "baozi_json", el);
          mc.gotoAndPlay(1, -1);
          return mc;
        });
      },
      longmogu: function () {
        $(".long-mogu").each(function(i, el){
          var mc = new MovieClip('long-mogu_png', "long-mogu_json", el);
          mc.gotoAndPlay(1, -1);
          return mc;
        });

      }
    };


    if( !isSupportCss3 ){
      $(document.body).addClass("oldie");
    }

    var slidesLen = $(".banner-slides").find('.swiper-slide').length;
    if (1 == slidesLen) {
      $(".swiper-slide").addClass('stop-swiping');
      $(".arrow,.pagination").hide();
      bannerSwiperSingle();
    } else {
      bannerSwiper();
      animations.chezi();
      animations.baozi();
      animations.longmogu();
    }
    $(".float-container").fadeOut();
    floater();
  };



  var loadResource = function () {
    if (typeof resData == 'object' && Array.isArray(resData.resources) && resData.resources.length > 0) {
      startLoader(resData);
    } else {
      var resLoader = new Resource.JSONloader('resBanner.json');
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
        bindScroll($('#floater'));
        loadComplete();
      });
    }

  };

  $(function () {
    loadResource();
  });


  function bannerSwiperSingle() {
    var swiperSingle = new Swiper('.swiper-container', {
      pagination: '.pagination',
      slidesPerView: 1,
      autoplay: false,
      noSwiping: true,
      noSwipingClass: 'stop-swiping',
      onInit: function (swiper) {
        bindScroll($('.slides-first'));
      }
    });

    if (!isSupportCss3) {
      setTimeout(function () {
        bindScroll($('.slides-first'));
      }, 0);
    }
  }

  function bannerSwiper() {
    var swiper = new Swiper('.swiper-container', {
      pagination: '.pagination',
      slidesPerView: 1,
      loop: true,
      autoplay: 5000,
      autoplayDisableOninteraction:false,
      paginationClickable: true,
      spaceBetween: 0,
      initialSlide: 0,
      noSwiping: true,
      noSwipingClass: 'stop-swiping',
      onInit: function (swiper) {
        if (isSupportCss3) {
          bindScroll($('.slides-first'));
          $(".swiper-slide:last").addClass('on');
        }

      },
      onSlideChangeStart: function () {
        if ($(swiper.activeSlide()).hasClass("on")) {

        } else {
          bindScroll($(swiper.activeSlide()));
        }
      },
      onSlideChangeEnd: function (swiper) {
        $(swiper.activeSlide()).addClass('on');

      }
    });
    if (!isSupportCss3) {
      setTimeout(function () {
        bindScroll($('.slides-first'));
        $('.slides-first').addClass('on');
      }, 0);
    }

    $('.arrow-left').on('click', function (e) {
      e.preventDefault()
      swiper.swipePrev();
    });
    $('.arrow-right').on('click', function (e) {
      e.preventDefault()
      swiper.swipeNext();
    });

    $(".swiper-container").mouseover(function (e) {
      swiper.stopAutoplay();
    }).mouseout(function (e) {
      swiper.startAutoplay();
    });


  }


  function floater(){
    var height = $("#evt_container").outerHeight();
    var fHeight = 177;
    var fTop = 100;
    var fRight = 10;
    var floater = $('#floater');
    var floaterPosition = 'fixed';
    var winWidth = $(window).width();
    var absRight = winWidth<1280 ? (1280-winWidth+fRight) : fRight;
    $(window).on("scroll", function(){
      var sTop = $(this).scrollTop();
      if(floaterPosition === 'fixed' &&  sTop > height - fHeight -10 ){
        floater.css({position: "absolute", top: height - fHeight, right: absRight});
        floaterPosition = 'absolute';
        $(".floatImg").unbind('mouseover');
        $(".floatImg").unbind('mouseout');
        $(".float-container").stop().fadeOut(200);
      }
      if(floaterPosition === 'absolute' && sTop<height-fHeight -10){
        floater.css({position: "fixed", top: fTop, right:fRight});
        floaterPosition = 'fixed';
        $(".floatImg").bind({
          "mouseover": fadeIn,
          "mouseout":fadeOut
        });
      }
    });



    $(".floatImg").bind({
      "mouseover": fadeIn,
      "mouseout":fadeOut
    });

    function  fadeIn() {
      $(".float-container").stop().fadeIn(200);
    }
    function  fadeOut() {
      $(".float-container").stop().fadeOut(200);
    }


  };

})(jQuery);