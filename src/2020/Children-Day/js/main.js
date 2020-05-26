/**
 * Created by mcake on 2016/5/24.
 */
(function($){



  var loadComplete = function () {

    /*蛋糕折扣*/
    $(".productLi").each(function () {
      var self = this;
      $(this).find('.btns').click(function () {
        SelectShow(self,[20,20,20,20],1,true,0,0);
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

    $(".sec").hover(function () {
      $(this).find(".zp-1").addClass("a-wobble");
      $(this).find(".zp-3").addClass("b-wobble");
    },function () {
      $(this).find(".zp-1").removeClass("a-wobble");
      $(this).find(".zp-3").removeClass("b-wobble");
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