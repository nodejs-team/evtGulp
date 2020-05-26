/*
 * Created by mcake on 2016/5/24.
 */
(function($){

  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500);
    /*sec-banner适配小屏幕
     * 头部的高度为窗口的高度-导航的高度-底部剩余的高度（可无）：$(window).height()-120-250
     * 设置最小高度bannerHeight <= 440；
     *设置屏幕缩放$(window).resize();
     * */
    var bannerHeight;
    function bannerFun() {
      bannerHeight = $(window).height();   /*屏幕高度-头部浮动高度-底部预留高度*/
      if(bannerHeight <= 580){
        bannerHeight= 580;  /*小屏幕下能看到日历*/
      }
      /*console.log(bannerHeight);*/
      return bannerHeight;
    }
    $(".sec-banner").css('height',bannerFun());
    /*缩放窗口*/
    $(window).resize(function() {
      bannerFun();
      $(".sec-banner").css('height',bannerHeight);
    });

    /*兼容ie8,respondjs对线上环境不起效*/
    var bannerWidth =0;
    if(!isSupportCss3){
      bannerWidth = $(window).width();
      if(bannerWidth<=1600){
        $(".swipe-cake-price,.swipe-cake").css('width','717px');
        $(".swipe-cake").css('height','360px');
        $(".sec-star").css('margin-top','-200px');
      }
    }



    /*var swiper1 = new Swiper('.swiper1', {
      grabCursor: true,
      loop:true,
      autoplay : 3000,
      autoplayDisableOnInteraction : true,
      pagination: '.pagination1'
    });*/

    /*调查*/
    $(".qt").each(function () {
      $(this).find(".options span").click(function () {
        $(this).parents(".qt").attr("data-answer",1);
        $(this).find(".select").addClass("on");
        $(this).siblings().find(".select").removeClass("on");
      });

      $(".other").click(function () {
        $(this).parents(".qt").attr("data-answer",2);
        $(".other-in").focus();
      });
    });


    $(".pct-survey span").hover(function () {
      $(this).find(".shake").addClass("a-shake");
    },function () {
      $(this).find(".shake").removeClass("a-shake");
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
/*阻止页面内容被选中*/
document.body.onselectstart = function () {
  return false;
};


/*领取优惠券*/
var $Dialogbg = $(".Dialogbg-quan"),
  $Dialog=$(".Dialog-quan"),
  $rules=$(".quan"),
  $card=$(".card"),
  $goUse=$(".go-use"),
  $closes=$(".closes");

function QuanDialog(n) {
  $Dialogbg.fadeIn(300);
  $Dialog.fadeIn(300);
  /*$Dialog.find(".quan-"+n).fadeIn(300).siblings().not(".closes").hide();*/
  /* $card.find("img").attr("src","https://act.mcake.com/fangli/2019/pc/memberDay-7yue/images/card-"+n+".png");*/

  $Dialog.find(".quan").fadeIn(300).siblings().not(".closes").hide();
}

/*关闭*/
$closes.click(function () {
  $Dialogbg.fadeOut(300);
  $Dialog.fadeOut(300);
});

$goUse.click(function () {
  $Dialogbg.fadeOut(300);
  $Dialog.fadeOut(300);
});


window.QuanDialog = QuanDialog;




