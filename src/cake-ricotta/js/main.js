/**
 * Created by mcake on 2016/5/24.
 */
(function($){
  var animations= {
    game: function () {
      var mc = new MovieClip('game_png', "game_json", 'el_game');
      mc.gotoAndPlay(1, -1);
      return mc;
    }
  }


  var loadComplete = function () {

    var el_game = '<div id="el_game"></div>';
    setTimeout(function () {
      $(".mario").append(el_game);
      animations.game();
    },1000);

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