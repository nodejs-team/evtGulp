/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  var animations= {
    window: function () {
      var mc = new MovieClip('window_png', "window_json", 'el_window');
      mc.gotoAndPlay(1, -1);
      /*"duration":6 = 0.3*20*/
      return mc;
    }
  };

  var audioPlay = function () {
    var audio = document.getElementById('audio');
      audio.play();
      var on = true;

      if(!audio.paused){
        on=false;
        $(".music-btn").removeClass("on");
      }else{
        on=true;
        $(".music-btn").addClass("on");
      }

      $(".music-btn").click(function () {
        if(on){
          on=false;
          audio.play();
          $(this).removeClass("on");
        }else {
          on=true;
          audio.pause();
          $(this).addClass("on");
        }
      });

  }

  window.audioPlay = audioPlay;

  var loadComplete = function () {

    animations.window();
    var swiper2 = new Swiper('.swiper2', {
      pagination: '.pagination2',
      grabCursor: true,
      loop:true,
      autoplay : 3000,
      autoplayDisableOnInteraction : false,
      paginationClickable: true
    });


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
/*阻止页面内容被选中*/
document.body.onselectstart = function () {
  return false;
};

