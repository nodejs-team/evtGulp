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

  var swiperFn={
    remove_Class:function (ele) {
      var elems = ele.find('[data-anim]');
      elems.each(function(){
        var lastClass = this.getAttribute('data-anim');
        $(this).removeClass(lastClass);
        // console.log(111);
      });
    },
    swiperFn1:function () {
      if (!isSupportCss3) {
        setTimeout(function () {
          bindScroll($('#slides-0'));
        }, 0);
      }
      //$(".evt-content").css('marginTop','-100px');
      var swiper = new Swiper('.swiper-container', {
        mode: 'vertical',
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheelControl: true,
        onInit: function(swiper){
          bindScroll('#slides-0');
          $("html,body").animate({scrollTop:'50px'},500);
        },
        onSlideChangeEnd: function (swiper) {
          swiperFn.remove_Class($("#evt_container"));
          var index = swiper.activeIndex;
          bindScroll('#slides-'+index);
          $("html,body").animate({scrollTop:'50px'},500);
        }
      });
    },
    swiperFn2:function () {
      if (!isSupportCss3) {
        setTimeout(function () {
          bindScroll($('#slides-0'));
        }, 0);
      }
      var swiper = new Swiper('.swiper-container', {
        mode: 'vertical',
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheelControl: true,
        onInit: function(swiper){
          bindScroll('#slides-0');
          $("html,body").animate({scrollTop:'0'},500);
        },
        onSlideChangeEnd: function (swiper) {
          swiperFn.remove_Class($("#evt_container"));
          var index = swiper.activeIndex;
          bindScroll('#slides-'+index);
          $("html,body").animate({scrollTop:'0'},500);
        }
      });
    }
  };

  function createResponsiveStyle() {
    var style = document.createElement("style");
    style.type = "text/css";
    document.head.appendChild(style);

    return {
      setStyle: function (text) {
        style.innerHTML = "";
        if( style.styleSheet ){
          style.styleSheet.cssText = text;
        } else {
          style.innerHTML = text;
        }
      },
      getRespStyle: function(){
        var ratio = Math.max(0.65, Math.min(1, window.innerHeight/960));
        return ".evt-content{" +
            "position:absolute;height:800px;left:50%;top:50%;" +
            "-webkit-transform:translate(-50%,-50%) scale("+ratio+");" +
            "transform:translate(-50%,-50%) scale("+ratio+");" +
            "-webkit-transform-origin:50% 50%;" +
            "transform-origin:50% 50%;" +
          "}";
      }
    }
  }

  var loadComplete = function () {

    var winH=document.body.scrollHeight;

    if( !isSupportCss3 ){
      $(document.body).addClass("oldie");
    } else {
      var respStyle = createResponsiveStyle();
      respStyle.setStyle(respStyle.getRespStyle());
      $(window).resize(function () {
        respStyle.setStyle(respStyle.getRespStyle());
      });
    }

    if(winH<900){
      //$(".bj-container").height('900px');
      swiperFn.swiperFn1();
    }else{
      swiperFn.swiperFn2();
    }



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