/**
 * Created by mcake on 2016/5/24.
 */
(function($){



  var loadComplete = function () {

    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      slidesPerGroup:1,
      loop: false,
      freeModeMomentum:true,
      spaceBetween : 20,
      initialSlide: 0,
      autoplay: false  /*5000*/

    });

    $('.arrow-left').on('click', function (e) {
      e.preventDefault();
      swiper.swipePrev();
    });
    $('.arrow-right').on('click', function (e) {
      e.preventDefault();
      swiper.swipeNext();
    });


    /*投票*/
    $(".cakes .swiper-slide").each(function () {
      $(this).find(".item").click(function () {
        $(this).find(".xin").toggleClass("on");
      });
    });





    $("html,body").animate({scrollTop: 0},500);


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


(function () {
  /*投票提示*/
  var $Dialogbg = $(".Dialogbg-quan"),
    $Dialog=$(".Dialog-quan"),
    $rules=$(".quan"),
    $goUse=$(".go-use"),
    $closes=$(".closes");

  function QuanDialog(n) {
    $Dialogbg.fadeIn(300);
    $Dialog.fadeIn(300);
    $Dialog.find(".quan-"+n).fadeIn(300).siblings().not(".closes").hide();
  }

  /*关闭*/
  $closes.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
  });

  $goUse.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
  });
  window.QuanDialog = QuanDialog;
})();



