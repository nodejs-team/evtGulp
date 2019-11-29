/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  /*计算banner整平的高度*/
  function bannerHeight() {
    var winH = $(window).height();
    winH=winH<'800' ? '800':winH;
    return winH;
  }

  /*banner整屏幕自适应*/
  function banner() {
    var bannerH= bannerHeight();
    $(".sec-banner").height(bannerH-100);

  }

  var animations= {
    nangua: function () {
      var mc = new MovieClip('nangua_png', "nangua_json", 'el_nangua');
      mc.gotoAndPlay(1, -1);
      /*"duration":6 = 0.3*20*/
      return mc;
    }
  };

  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500,function () {});
    /*头屏计算*/
    banner();
    animations.nangua();
    $(window).resize(function() {
      banner();/*改变屏幕大小*/
    });

    /*按钮变色*/
    $(".buy li,.go-buy,.swiper-button-next,.swiper-button-prev").hover(function () {
      $(this).addClass("on");
    },function () {
      $(this).removeClass("on");
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

