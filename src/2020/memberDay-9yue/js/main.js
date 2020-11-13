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

    switch (myDay){
      case 1:
        $(".row1").find(".btn1").fadeIn(0);
        $(".row1").find(".btn2").fadeOut(0);
        break;
      case 8:
        $(".row2").find(".btn1").fadeIn(0);
        $(".row2").find(".btn2").fadeOut(0);
        break;
      case 15:
        $(".row3").find(".btn1").fadeIn(0);
        $(".row3").find(".btn2").fadeOut(0);
        break;
      case 22:
        $(".row4").find(".btn1").fadeIn(0);
        $(".row4").find(".btn2").fadeOut(0);
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



