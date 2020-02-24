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
      bannerHeight = $(window).height()-120-200;   /*屏幕高度-头部浮动高度-底部预留高度*/
      console.log($(window).height());
      if(bannerHeight <= 510){
        bannerHeight= 510;
      }
      console.log(bannerHeight);
      return bannerHeight;
    }
    bannerFun();
    $(".sec-banner").css('height',bannerHeight);
    /*缩放窗口*/
    $(window).resize(function() {
      bannerFun();
      $(".sec-banner").css('height',bannerHeight);
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






