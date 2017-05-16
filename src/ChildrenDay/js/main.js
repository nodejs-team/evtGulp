/**
 * Created by mcake on 2016/5/24.
 */
(function($){
  var animations={
    baozi:function () {
      var mc = new MovieClip('baozi_png', "baozi_json", 'el_baozi');
      mc.gotoAndPlay(1, -1);
      return mc;
    }
    ,che:function () {
      var mc = new MovieClip('che_png', "che_json", 'el_che');
      mc.gotoAndPlay(1, -1);
      return mc;
    }
    ,long_mogu:function () {
      var mc = new MovieClip('long-mogu_png', "long-mogu_json", 'long_mogu');
      mc.gotoAndPlay(1, -1);
      return mc;
    }
    ,caomei_b:function () {
      var mc = new MovieClip('caomei-b_png', "caomei-b_json", 'caomei_b');
      mc.gotoAndPlay(1, -1);
      return mc;
    }
    ,caomei:function () {
      var mc = new MovieClip('caomei_png', "caomei_json", 'caomei');
      mc.gotoAndPlay(1, -1);
      return mc;
    }
    ,mogu:function () {
      var mc = new MovieClip('mogu_png', "mogu_json", 'mogu');
      mc.gotoAndPlay(1, -1);
      return mc;
    }
    ,diqiu:function () {
      var mc = new MovieClip('diqiu_png', "diqiu_json", 'diqiu');
      mc.gotoAndPlay(1, -1);
      return mc;
    }
    ,tuer:function () {
      var mc = new MovieClip('tuer_png', "tuer_json", 'tuer');
      mc.gotoAndPlay(1, -1);
      return mc;
    }

  };

  function swiperFn() {
    if (!isSupportCss3) {
      setTimeout(function () {
        bindScroll($('#slides-0'));
      }, 0);
    }
    function remove_Class(ele) {
      var elems = ele.find('[data-anim]');
      elems.each(function(){
        var lastClass = this.getAttribute('data-anim');
        $(this).removeClass(lastClass);
        // console.log(111);
      });
    }
    var swiper = new Swiper('.swiper-container', {
      mode: 'vertical',
      slidesPerView: 1,
      spaceBetween: 30,
      mousewheelControl: true,
      onInit: function(swiper){
        bindScroll('#slides-0');
      },
      onSlideChangeEnd: function (swiper) {
        remove_Class($("#evt_container"));
        var index = swiper.activeIndex;
        bindScroll('#slides-'+index);
      }
    });
  }


  var loadComplete = function () {
    swiperFn();
    animations.baozi();
    animations.che();
    animations.long_mogu();
    animations.caomei_b();
    animations.caomei();
    animations.mogu();
    animations.diqiu();
    animations.tuer();
    $("#plax_scene").parallax();
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
        //bindScroll($('#evt_container'));
        loadComplete();
      });
    }

  };

  $(function(){
    loadResource();
  });

})(jQuery);