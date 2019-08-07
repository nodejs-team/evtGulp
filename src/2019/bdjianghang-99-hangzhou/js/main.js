/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  /*兼容小屏调整头图内文字的高度*/
  function initBtitle(){
    var bTime = $('.b-time'),
      winWidth = $(window).width();
    bTime.css('top', 410 * (winWidth<1280? 1280 : winWidth) / 1920);
    /*topBtn.css('top',517 * (winWidth<1280? 1280 : winWidth) / 1920);*/
  }


  var loadComplete = function () {

    var len = $(".products li").length;
    $(".products li:gt(9)").hide();

    $(".more").click(function () {
      $(this).fadeOut(20);
      $(".products li:gt(9)").fadeIn(100);
    });


    initBtitle();
    window.onresize = function(){
      initBtitle();
    }


    /*购物清单*/
    $(".floater").fadeOut(10);
    $("html,body").animate({scrollTop: 0},500,function () {
      floater();
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







