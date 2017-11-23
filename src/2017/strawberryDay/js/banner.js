/**
 * Created by mcake on 2016/5/24.
 */
(function($){
    var animations= {
        caomei_a: function () {
            var mc = new MovieClip('banner-caomei-a_png', "banner-caomei-a_json", 'el_caomei_a');
            mc.gotoAndPlay(1, -1);
            return mc;
        },
        caomei_b: function () {
            var mc = new MovieClip('caomei-b_png', "caomei-b_json", 'el_caomei_b');
            mc.gotoAndPlay(1, -1);
            return mc;
        }
    }

  var loadComplete = function () {
      animations.caomei_a();
      animations.caomei_b();
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