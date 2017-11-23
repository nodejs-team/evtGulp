/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  var animations={
      caomei_a:function () {
          var mc = new MovieClip('caomei-a_png', "caomei-a_json", 'el_caomei_a');
          mc.gotoAndPlay(1, -1);
          return mc;
      },
      caomei_b:function () {
          var mc = new MovieClip('caomei-b_png', "caomei-b_json", 'el_caomei_b');
          mc.gotoAndPlay(1, -1);
          return mc;
      },
      caomei_c:function () {
          var mc = new MovieClip('caomei-c_png', "caomei-c_json", 'el_caomei_c');
          mc.gotoAndPlay(1, -1);
          return mc;
      },
      samllfreak1:function () {
          var mc = new MovieClip('samllfreak1_png', "samllfreak1_json", 'samllfreak1');
          mc.gotoAndPlay(1, -1);
          return mc;
      },
      samllfreak2:function () {
          var mc = new MovieClip('samllfreak2_png', "samllfreak2_json", 'samllfreak2');
          mc.gotoAndPlay(1, -1);
          return mc;
      },
      samllfreak3:function () {
          var mc = new MovieClip('samllfreak3_png', "samllfreak3_json", 'samllfreak3');
          mc.gotoAndPlay(1, -1);
          return mc;
      },
      samllfreak4:function () {
          var mc = new MovieClip('samllfreak4_png', "samllfreak4_json", 'samllfreak4');
          mc.gotoAndPlay(1, -1);
          return mc;
      },
      samllfreak5:function () {
          var mc = new MovieClip('samllfreak5_png', "samllfreak5_json", 'samllfreak5');
          mc.gotoAndPlay(1, -1);
          return mc;
      }
  }



  var loadComplete = function () {
      animations.caomei_a();
      animations.caomei_b();
      animations.caomei_c();
      animations.samllfreak1();
      animations.samllfreak2();
      animations.samllfreak3();
      animations.samllfreak4();
      animations.samllfreak5();
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