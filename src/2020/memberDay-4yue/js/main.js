/**
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
      bannerHeight = $(window).height()-120-250;   /*屏幕高度-头部浮动高度-底部预留高度*/
      if(bannerHeight <= 440){
        bannerHeight= 440;  /*小屏幕下能看到日历*/
      }
      return bannerHeight;
    }
    $(".sec-banner").css('height',bannerFun());
    /*缩放窗口*/
    $(window).resize(function() {
      bannerFun();
      $(".sec-banner").css('height',bannerHeight);
    });

    /*日期判断，更换日历*/
    var vDate = new Date();
    var myDate = vDate.getFullYear() + '-' + (vDate.getMonth() + 1) + '-' + vDate.getDate(); /*解决安卓浏览器时间显示问题*/
    var myDay = vDate.getDate();
    switch (myDay){
      case 3:
        $(".calendar img").attr("src","https://act.mcake.com/fangli/2020/pc/memberDay-3yue/images/calendar-1.png");
        break;
      case 10:
        $(".calendar img").attr("src","https://act.mcake.com/fangli/2020/pc/memberDay-3yue/images/calendar-2.png");
        break;
      case 17:
        $(".calendar img").attr("src","https://act.mcake.com/fangli/2020/pc/memberDay-3yue/images/calendar-3.png");
        break;
      case 24:
        $(".calendar img").attr("src","https://act.mcake.com/fangli/2020/pc/memberDay-3yue/images/calendar-4.png");
        break;
      case 31:
        $(".calendar img").attr("src","https://act.mcake.com/fangli/2020/pc/memberDay-3yue/images/calendar-5.png");
        break;
    }

    var swiper1 = new Swiper('.swiper1', {
      grabCursor: true,
      loop:true,
      autoplay : 3000,
      autoplayDisableOnInteraction : true
    });

    /*调查*/
    $(".qt").each(function () {
      $(this).find(".select").click(function () {
        $(this).parents(".qt").attr("data-answer",1);
        var id = $(this).parent("span").attr("data-id");
        $(this).addClass("on");
        $(this).parent("span").siblings().find(".select").removeClass("on");
        $(this).parents(".qt").attr("data-id",id);
      });


      $(".next").click(function () {
        var as = $(this).parent(".qt").attr("data-answer");
        if(as==1){
          $(this).parent(".qt").fadeOut(0).next().fadeIn(100);
        }

      });


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




