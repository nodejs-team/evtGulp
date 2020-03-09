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






