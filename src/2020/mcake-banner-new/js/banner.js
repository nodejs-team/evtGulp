/**
 * Created by mcake on 2020/2/12.
 * 只要图片轮播，兼容小屏幕
 */
(function ($) {

  /*-----------banner适配小屏幕 end-------------*/

  var loadComplete = function () {
    /*动态设置swiper的高度*/
    function setSwiperH(){
        var winWidth = $(window).width()<1280 ? 1280: $(window).width();
        var swiperH = winWidth* 550/1920;
        if(swiperH <= 350){
            swiperH = 350;
        }else if(swiperH >= 550){
            swiperH = 550;
        }
        $(".swiper-container").height(swiperH);

          /*console.log(swiperH);*/
   }
      setSwiperH();
    $(window).on("scroll", function(){
        setSwiperH();
    });




    if( !isSupportCss3 ){
      $(document.body).addClass("oldie");
    }

    /*判断是否只有一个slide*/
    var slidesLen = $(".banner-slides").find('.swiper-slide').length;
    if (1 == slidesLen) { /*只有一个slide*/
      $(".swiper-slide").addClass('stop-swiping');
      $(".arrow,.pagination").hide();
      bannerSwiperSingle();
    } else {   /*有多个个slide*/
      bannerSwiper();
    }

    /*--调用浮动窗口--*/
    $(".float-container").fadeOut();
    floater();
    icon2();
    /*--调用浮动窗口 end--*/

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
       /* loadComplete();*/

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
      autoplay: 5000,  /*5000*/
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


        /*会员日2页面里有两个一次动画，需要在当前swiper-slide时，才进行加载*/
        if($(swiper.activeSlide()).hasClass("slides-memberDay2")){
          memerbDay2();
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

 /*-----------浮动窗口-------------*/
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

  function icon(){
    var height = $("#evt_container").outerHeight();
    var fHeight = $("#icon").height();
    var fTop = 100;
    var fRight = 40;
    var floater = $('#icon');
    var floaterPosition = 'fixed';
    var winWidth = $(window).width();
    var absRight = winWidth<1280 ? (1280-winWidth+fRight) : fRight;
    $(window).on("scroll", function(){
      var sTop = $(this).scrollTop();
      if(floaterPosition === 'fixed' &&  sTop > height - fHeight -10 ){
        floater.css({position: "absolute", top: height - fHeight, right: absRight});
        floaterPosition = 'absolute';
      }
      if(floaterPosition === 'absolute' && sTop<height-fHeight -10){
        floater.css({position: "fixed", top: fTop, right:fRight});
        floaterPosition = 'fixed';

      }
    });
  };

  function icon2(){
    var height = $("#evt_container").outerHeight();
    var fHeight = $("#icon").height();
    var fTop = 110;
    var fRight = 40;
    var floater = $('#icon');
    var floaterPosition = 'fixed';
    var winWidth = $(window).width();
    var absRight = winWidth<1400 ? (1400-winWidth+fRight) : fRight;

   var dLeft = $(".delivery span").offset().left+120;

    floater.css({ left: dLeft});

    $(window).resize(function() {
      dLeft = $(".delivery span").offset().left+120;
      floater.css({ left: dLeft});
    });

    $(window).on("scroll", function(){

      var sTop = $(this).scrollTop();
      if(floaterPosition === 'fixed' &&  sTop > height - fHeight -10 ){
        floater.css({position: "absolute", top: height - fHeight, left: dLeft});
        floaterPosition = 'absolute';
      }
      if(floaterPosition === 'absolute' && sTop<height-fHeight -10){
        floater.css({position: "fixed", top: fTop, dLeft: dLeft});
        floaterPosition = 'fixed';

      }
    });
  };
  /*-----------浮动窗口 end -------------*/




})(jQuery);