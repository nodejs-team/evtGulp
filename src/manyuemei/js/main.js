/**
 * Created by mcake on 2016/5/24.
 */
(function($){


  var animations= {

    mymA: function () {
      var mc = new MovieClip('mym-a_png', "mym-a_json", 'el_mym-a');
      mc.gotoAndPlay(1, -1);
      return mc;
    },
    mymB: function () {
      var mc = new MovieClip('mym-b_png', "mym-b_json", 'el_mym-b');
      mc.gotoAndPlay(1, -1);
      return mc;
    },
    mymC: function () {
      var mc = new MovieClip('mym-c_png', "mym-c_json", 'el_mym-c');
      mc.gotoAndPlay(1, -1);
      return mc;
    }
  }

  var loadComplete = function () {
    animations.mymA();
    animations.mymB();
    animations.mymC();
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