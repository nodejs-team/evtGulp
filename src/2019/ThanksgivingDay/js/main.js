/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  /*计算banner整平的高度*/
  function bannerWidth() {
    var winW = $(window).width();
    //winW=winW/1920;
    return winW;
  }
  function bannerHeight() {
    var winH = $(window).height();
    //winH=winH<'800' ? '800':winH;
    return winH;
  }

  /*banner整屏幕自适应*/
  function resetFun() {
    var slideH= bannerHeight();
    $(".swiper1").height(slideH-100);
    //console.log(slideW,slideH,percent);

  }



  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500,function () {});
    /*计算*/
    resetFun();

    $(window).resize(function() {
      resetFun();/*改变屏幕大小*/
    });






    /*蛋糕*/
    var swiper1 = new Swiper('.swiper1', {
      grabCursor: true,
      loop:false,
      autoplay : false,
      mode: 'vertical',
      mousewheelControl : true,
      autoplayDisableOnInteraction : true,
      onSlideChangeEnd: function(swiper){
        $(".zeng").removeClass("slideup");
        $(".zeng").eq(swiper.activeLoopIndex).addClass("slideup");

      }

    });

    var swiper2 = new Swiper('.swiper2', {
      grabCursor: true,
      loop:false,
      autoplay : false,
      mode: 'vertical',
      mousewheelControl : true,
      autoplayDisableOnInteraction : true,
      onSlideChangeStart: function(swiper){
        swiper1.swipeTo(swiper.activeLoopIndex);
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

/*抽奖弹窗*/
(function () {
  var $Dialogbg = $(".Dialogbg-tip"),
    $Dialog=$(".Dialog-tip"),
    $rules=$(".tip"),
    $goUse=$(".go-wait"),
    $closesx=$(".closesx");

  function QuanDialog(n,arr) {
    $Dialogbg.fadeIn(300);
    $Dialog.fadeIn(300);
    /*$Dialog.find(".jp-leve").html(arr[n].leve);*/
    $Dialog.find(".jp-name").html(arr[n].name);
    $Dialog.find(".tip1").html(arr[n].tip1);
    $Dialog.find(".tip2").html(arr[n].tip2);
    /*$Dialog.find(".jp-price").html(arr[n].price);*/
    $Dialog.find(".jp").css({"background":"url('https://act.mcake.com/fangli/2019/pc/ThanksgivingDay/images/jiang-"+(n+1)+"-on.png') center","background-size":"cover"});
  }

  /*关闭*/
  $closesx.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
  });

  $goUse.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
  });
  window.QuanDialog = QuanDialog;
})();


