/**
 * Created by mcake on 2016/5/24.
 */
(function($){



  var loadComplete = function () {

    /*蛋糕折扣*/
    $(".product li").each(function () {
      var self = this;
      $(this).find('.btns').click(function () {
        SelectShow(self,[0,0,0,0],1,true,0,0);
        $(".go-car").fadeOut(0);
        $(".go-buy").fadeIn(0);
        if(!isSupportCss3){
          $(".s-bangshu li,.go-car,.go-buy").addClass('ie8');
        }
      });
      $(this).find('.cart').click(function () {
        SelectShow(self,[0,0,0,0],1,true,0,0);
        $(".go-car").fadeIn(0);
        $(".go-buy").fadeOut(0);
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

    floater();
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


function floater(){
  var height = $(".sec-2").offset().top;
  var secheight = $(".sec-2").outerHeight();
  var fHeight = 177;
  var fTop = 100;
  var fRight = 10;
  var floater = $('#floater');
  var floaterPosition = 'absolute';
  var winWidth = $(window).width();
  var absRight = winWidth<1280 ? (1280-winWidth+fRight) : fRight;

  $(window).on("scroll", function(){
    var sTop = $(this).scrollTop();

    if(floaterPosition === 'fixed' &&  sTop <= height ){
      floater.css({position: "absolute"});
      floaterPosition = 'absolute';
    }

    if(floaterPosition === 'absolute' &&  sTop > height && sTop <= height+secheight-600){
      floater.css({position: "fixed"});
      floaterPosition = 'fixed';
    }

    if(floaterPosition === 'fixed' && sTop > height+secheight-600){
      floater.css({position: "absolute"});
      floaterPosition = 'absolute';

    }
  });


};

