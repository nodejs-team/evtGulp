/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  var isSupportTransition = (function(){
    var rootStyle = document.documentElement.style;
    var keys = ["transition", "WebkitTranstion", "MozTranstion", "msTranstion", "OTransition"];
    for(var i=0; i<keys.length; i++){
      if( keys[i] in rootStyle ){
        return true;
      }
    }
    return false;
  })();

  var isIE8 = /msie 8.0/i.test(navigator.userAgent);

  isIE8 && (document.documentElement.className += " IE8");

  function getWindowWidth(){
    return window.innerWidth || document.documentElement.clientWidth;
  }

  var loadComplete = function () {
    var container = new Element({
      className: "swiper-container"
    });

    var page = new Page({
      className: "swiper-wrapper"
    });

    var swiper;
    var slideIndex = 0;
    var slideLength = page.children.length;

    page.on("addToPage", function () {
      swiper = new Swiper(container.el, {
        speed: 1800,
        mousewheelControl: true,
        parallax: true,
        keyboardControl: true
      });

      if( !isSupportTransition ){
        swiper.slidePrev = function () {
          if( --slideIndex < 0 ) {
            slideIndex = 0;
          }
          if( isIE8 ) {
            TweenMax.to(page.el, 1, {left: -slideIndex * getWindowWidth()})
          } else {
            TweenMax.to(page.el, 1, {x: -slideIndex * getWindowWidth()})
          }
        };

        swiper.slideNext = function () {
          if( ++slideIndex > slideLength - 1 ){
            slideIndex = slideLength - 1;
          }
          if( isIE8 ) {
            TweenMax.to(page.el, 1, {left: -slideIndex * getWindowWidth()})
          } else {
            TweenMax.to(page.el, 1, {x: -slideIndex * getWindowWidth()})
          }
        }
      }

    });

    page.on("leftClick", function(){
       swiper.slidePrev();
    });

    page.on("rightClick", function(){
      swiper.slideNext();
    });

    container.addChild(page).renderTo(document.getElementById("root"));
  };

  var loadResource = function(){
    if( typeof resData === 'object' && Array.isArray(resData.resources) && resData.resources.length > 0 ){
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
      var spin = Resource.el('#scene_spin');
      var progress = Resource.el("#scene_progress");
      var ptext = Resource.el(".progress-text")[0];
      var pline = Resource.el(".progress-line")[0];

      var startLoadTime = +new Date;

      loader.on("progress", function (loaded, total) {
        spin.innerHTML = Math.floor(loaded/total*100) + "";
        progress.style.transform = "translate3d("+ ((loaded/total*100)-100) +"%,0,0)";
        progress.style.transitionDuration = ".2s";
      });

      loader.on("complete", function () {
        var timeout = 1000;
        var loadTime = +new Date - startLoadTime;
        if( loadTime < 300 ){
          progress.style.transitionDuration = "1s";
          timeout = 1500;
        }
        setTimeout(function(){
          pline.style.transform = "translate3d(100%,0,0)";
          ptext.style.transform = "translate3d(100%,0,0)";
          spin.style.transform = "translate3d(100%,0,0)";

          setTimeout(function(){
            document.body.removeChild(Resource.el('#scene_loading'));
            Resource.el('#root').style.display = 'block';
            loadComplete();
          }, 400);
        }, timeout);
      });
    }

  };

  $(function(){
    loadResource();
  });

})(jQuery);