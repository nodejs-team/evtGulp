/**
 * Created by mcake on 2016/5/24.
 */
(function($){

    function setRunningMc() {
       var mc = new MovieClip('running_png', "running_json", 'running', 'el_running');
       mc.gotoAndPlay(1, -1);
       return mc;
    }

  function setJuanlMc() {
    var mc = new MovieClip('juanl-hint_png', "juanl-hint_json", 'juanl-hint', 'juanl_arrow');
    mc.gotoAndPlay(1, -1);
    return mc;
  }

  function setWindowMc() {
    var mc = new MovieClip('window_png', "window_json", 'window', 'el_window');
    mc.gotoAndPlay(1, -1);
    return mc;
  }

  function setDovaMc() {
    var mc = new MovieClip('dove_png', "dove_json", 'dova', 'el_dova');
    mc.gotoAndPlay(1, -1);
    return mc;
  }

  function setGridFlyMc() {
    var mc = new MovieClip('gridFly_png', 'gridFly_json', 'fly', 'el_fly');
    mc.gotoAndPlay(1, -1);
    return mc;
  }

  function setHeartMc() {
    var mc = new MovieClip('tp-heart_png', 'tp-heart_json', 'heart', 'el_heart');
    mc.gotoAndPlay(1, -1);
    return mc;
  }
    
    function initJuanl() {
      var isOpen = false;
      $("#juanl").on("click", function () {
        var $this = $(this);
        $this.toggleClass("open");
        if( isSupportCss3 ) {
          $this.find(".juanl-body").height(isOpen ? 53 : 233);
        } else {
          $this.find(".juanl-body").animate({
            height: isOpen ? 53 : 233
          }, 300, 'easeOutCubic');
        }
        isOpen = !isOpen;
        juanlMc.stop().clear();
      });
    }

    var juanlMc;

    var loadComplete = function () {
      setHeartMc();
      setRunningMc();
      initJuanl();
      juanlMc = setJuanlMc();
      setWindowMc();
      setDovaMc();
      setGridFlyMc();
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