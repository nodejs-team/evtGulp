/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  var loadComplete = function () {
    animates.renQuqi();
    animates.renTizi();
    animates.renBox();
    animates.renPao();
    animates.renwyao();
    animates.qiqiu();
    animates.renGuize();

    $(".more-btn").hover(function () {

      $(this).addClass('hover');
    },function () {
      $(this).removeClass('hover');
    });

  };


  var animates = {
    renQuqi: function () {
      var mc = new MovieClip('ren-quqi_png', "ren-quqi_json", 'el_ren-quqi');
      mc.gotoAndPlay(1, -1);
      return mc;
    },
    renTizi: function () {
      var mc = new MovieClip('ren-tizi_png', "ren-tizi_json", 'el_ren-tizi');
      mc.gotoAndPlay(1, -1);
      return mc;
    },
    renBox: function () {
      var mc = new MovieClip('ren-box_png', "ren-box_json", 'el_ren-box');
      mc.gotoAndPlay(1, -1);
      return mc;
    },
    renPao: function () {
      var mc = new MovieClip('ren-pao_png', "ren-pao_json", 'el_ren-pao');
      mc.gotoAndPlay(1, -1);
      return mc;
    }
    ,renwyao: function () {
      var mc = new MovieClip('ren-wyao_png', "ren-wyao_json", 'el_ren-wyao');
      mc.gotoAndPlay(1, -1);
      return mc;
    }
    ,qiqiu: function () {
      var mc = new MovieClip('qiqiu_png', "qiqiu_json", 'el_qiqiu');
      mc.gotoAndPlay(1, -1);
      return mc;
    }
    ,renGuize: function () {
      var mc = new MovieClip('ren-guize_png', "ren-guize_json", 'el_ren-guize');
      mc.gotoAndPlay(1, -1);
      return mc;
    }

  }


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