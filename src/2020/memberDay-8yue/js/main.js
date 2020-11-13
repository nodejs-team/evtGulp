/*
 * Created by mcake on 2016/5/24.
 */
(function($){

  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500);

    /*日期判断，更换日历*/
    var vDate = new Date();
    var myDate = vDate.getFullYear() + '-' + (vDate.getMonth() + 1) + '-' + vDate.getDate(); /*解决安卓浏览器时间显示问题*/
    var myDay = vDate.getDate(); /*vDate.getDate()*/
    $(".xiaoshiBox li").find(".noStartbox").fadeIn(0);
    $(".xiaoshiBox li").find(".btn-hg").fadeOut(0);
    $(".xiaoshiBox li").find(".noStart").fadeIn(0);
    switch (myDay){
      case 4:
        $(".xiaoshiBox li").eq(0).find(".noStartbox").fadeOut(0);
        $(".xiaoshiBox li").eq(0).find(".btn-hg").fadeIn(0);
        $(".xiaoshiBox li").eq(0).find(".noStart").fadeOut(0);
        break;
      case 11:
        $(".xiaoshiBox li").eq(1).find(".noStartbox").fadeOut(0);
        $(".xiaoshiBox li").eq(1).find(".btn-hg").fadeIn(0);
        $(".xiaoshiBox li").eq(1).find(".noStart").fadeOut(0);
        break;
      case 18:
        $(".xiaoshiBox li").eq(2).find(".noStartbox").fadeOut(0);
        $(".xiaoshiBox li").eq(2).find(".btn-hg").fadeIn(0);
        $(".xiaoshiBox li").eq(2).find(".noStart").fadeOut(0);
        break;
      case 25:
        $(".xiaoshiBox li").eq(3).find(".noStartbox").fadeOut(0);
        $(".xiaoshiBox li").eq(3).find(".btn-hg").fadeIn(0);
        $(".xiaoshiBox li").eq(3).find(".noStart").fadeOut(0);
        break;
    }

    if(myDay>=4 && myDay<11){
      $(".xiaoshiBox li:lt(1)").find(".time").text("已结束");
    }else if(myDay>=11 && myDay<18){
      $(".xiaoshiBox li:lt(2)").find(".time").text("已结束");
    }else if(myDay>=18 && myDay<25){
      $(".xiaoshiBox li:lt(3)").find(".time").text("已结束");
    }if(myDay>=25){
      $(".xiaoshiBox li").find(".time").text("已结束");
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



