/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  function selectBs() {
    var price = 0;
    $(".prolist li").each(function () {
      var self = $(this);
      $(this).find('.selectBs li').click(function () {
        price = $(this).data("price");
        self.find(".price").html(price);
      });

    });

  }

  var loadComplete = function () {

    var swiper1 = new Swiper('.swiper1', {
      grabCursor: true,
      autoplay : 3000,
      speed:300,
      loop:true,
      autoplayDisableOnInteraction : true,
      paginationClickable: true,
      onSlideChangeEnd: function(swiper){
        $(".fd-active li").eq(swiper.activeLoopIndex).addClass("on").siblings().removeClass("on");
      }
    });

    $(".swiper1").hover(function () {
      swiper1.stopAutoplay();
    },function () {
      swiper1.startAutoplay();
    });

    $(".fd-active li").hover(function () {
      swiper1.stopAutoplay();
      var idx = $(this).index();
      $(this).addClass("on").siblings().removeClass("on");
      swiper1.swipeTo(idx, 1000, true);
    });

    $('.arrow-left').click(function(){
      swiper1.swipePrev();
      swiper1.startAutoplay();
    })
    $('.arrow-right').click(function(){
      swiper1.swipeNext();
      swiper1.startAutoplay();
    })



    $(".buys span").hover(function () {
      $(this).addClass("on").siblings().removeClass("on");
    });
    $(".selectBs li").click(function () {
      $(this).addClass("on").siblings('li').removeClass("on");
    });
    selectBs();
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