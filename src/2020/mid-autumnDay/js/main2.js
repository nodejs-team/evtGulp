/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  var loadComplete = function () {


    $("html,body").animate({scrollTop: 0},500);

    /*蛋糕折扣*/
    $(".prolistLi").each(function () {
      var self = this;
      $(this).find('.goubtn').click(function () {
        $(".go-car").hide(0).siblings().show(0);
        SelectShow(self,[0,0,0,0],1,true,1,0);
        if(!isSupportCss3){
          $(".s-bangshu li,.go-car,.go-buy").addClass('ie8');
        }
      });
    });

    $(".go-car").click(function () {
      SelectHide();
    });
    $(".go-buy").click(function () {
      SelectHide();
    });
    $(".s-closes").click(function () {
      SelectHide();
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






