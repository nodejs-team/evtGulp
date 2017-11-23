/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  function  floater() {
      ;(function(){
          var height = $("#evt_container").outerHeight();
          var fHeight = 167;
          var fTop = 110;
          var fRight = 10;
          var floater = $('#floater');
          var floaterPosition = 'fixed';
          var winWidth = $(window).width();
          var absRight = winWidth<1280 ? (1280-winWidth+fRight) : fRight;
          $(window).on("scroll", function(){
              var sTop = $(this).scrollTop();
              if(floaterPosition === 'fixed' &&  sTop > height - fHeight -10 ){
                  floater.css({position: "absolute", top: height - fHeight, right: absRight});
                  floaterPosition = 'absolute';
              }
              if(floaterPosition === 'absolute' && sTop<height-fHeight -10){
                  floater.css({position: "fixed", top: fTop, right:fRight});
                  floaterPosition = 'fixed';
              }
          });
      })();
  }

  var loadComplete = function () {
      floater();
  };

  var loadResource = function(){
    if( typeof resData == 'object' && Array.isArray(resData.resources) && resData.resources.length > 0 ){
      startLoader(resData);
    } else {
      var resLoader = new Resource.JSONloader('resBanner.json');
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