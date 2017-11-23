/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  var Gifs={
      girl_a:function(){
        var mc = new MovieClip('girl-a_png', "girl-a_json", 'el_girl-a');
        mc.gotoAndPlay(1, -1);
        return mc;
      },
      girl_c:function(){
          var mc = new MovieClip('girl-c_png', "girl-c_json", 'el_girl-c');
          mc.gotoAndPlay(1, -1);
          return mc;
      }
  }

  var loadComplete = function () {
      Gifs.girl_a();

      Gifs.girl_c();

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