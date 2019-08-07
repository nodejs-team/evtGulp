/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  /*兼容小屏调整头图内文字的高度*/
  function initBtitle(){
    var btitle = $('.b-t'),
      bTime = $('.b-time'),
      winWidth = $(window).width();
    btitle.css('top', 158 * (winWidth<1280? 1280 : winWidth) / 1920);
    bTime.css('top', 258 * (winWidth<1280? 1280 : winWidth) / 1920);
    /*topBtn.css('top',517 * (winWidth<1280? 1280 : winWidth) / 1920);*/
  }

  var loadComplete = function () {

    initBtitle();
    window.onresize = function(){
      initBtitle();
    }

    $("html,body").animate({scrollTop: 0},500);

    
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






