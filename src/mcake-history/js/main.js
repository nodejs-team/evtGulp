/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  var loadComplete = function () {
    var container = new Element({
      className: "swiper-container"
    });

    var page = new Page({
      className: "swiper-wrapper"
    });

    var swiper;

    page.on("addToPage", function () {
      swiper = new Swiper(container.el, {
        speed: 1500,
        mousewheelControl: true
      });
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
      var spin = Resource.el('#evt_spin');

      loader.on("progress", function (loaded, total) {
        spin.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";
      });

      loader.on("complete", function () {
        Resource.el('#evt_loading').style.display = "none";
        Resource.el('#root').style.display = 'block';
        loadComplete();
      });
    }

  };

  $(function(){
    loadResource();
  });

})(jQuery);