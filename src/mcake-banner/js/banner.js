/**
 * Created by mcake on 2016/5/24.
 */
(function($){


  var loadComplete = function () {
      var animations= {
          caomei_a: function () {
              var mc = new MovieClip('banner-caomei-a_png', "banner-caomei-a_json", 'el_caomei_a');
              mc.gotoAndPlay(1, -1);
              return mc;
          },
          caomei_b: function () {
              var mc = new MovieClip('caomei-b_png', "caomei-b_json", 'el_caomei_b');
              mc.gotoAndPlay(1, -1);
              return mc;
          }
      }

      var slidesLen = $(".banner-slides").find('.swiper-slide').length;
      if(1 == slidesLen){
          $("#slides-0").addClass('stop-swiping');
          $(".arrow,.pagination").hide();
          bannerSwiperSingle();
      }else{
          bannerSwiper();
           animations.caomei_a();
           animations.caomei_b();
      }
      //console.log(slidesLen);
      //bannerSwiper();
      floater();
  };

  var loadResource = function(){
    if( typeof resData == 'object' && Array.isArray(resData.resources) && resData.resources.length > 0 ){
      startLoader(resData);
    } else {
      var resLoader = new Resource.JSONloader('resBanner.json');
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
       //bindScroll('#evt_container');
        loadComplete();
      });
    }

  };

  $(function(){
    loadResource();
  });

    function remove_Class(ele) {
        var elems = ele.find('[data-anim]');
        elems.each(function(){
            var lastClass = this.getAttribute('data-anim');
            $(this).removeClass(lastClass);
            //console.log();
        });
    }
    
    function bannerSwiperSingle() {
        var swiperSingle = new Swiper('.swiper-container', {
            pagination: '.pagination',
            slidesPerView: 1,
            autoplay: false,
            noSwiping: true,
            noSwipingClass: 'stop-swiping'
        })
    }

    function bannerSwiper() {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.pagination',
            slidesPerView: 1,
            autoplay : 5000,
            paginationClickable: true,
            spaceBetween: 0,
            initialSlide:0,
            noSwiping : true,
            noSwipingClass : 'stop-swiping',
            onInit: function(swiper){
                bindScroll('#slides-0');
            },
            onSlideChangeEnd: function(swiper){
                remove_Class($("#evt_container"));
                var index = swiper.activeIndex;
                bindScroll('#slides-'+index);
            }
        });

        $('.arrow-left').on('click', function(e){
            e.preventDefault()
            swiper.swipePrev();
        });
        $('.arrow-right').on('click', function(e){
            e.preventDefault()
            swiper.swipeNext();
        });
    }


    function  floater() {
        ;(function(){
            var height = $("#evt_container").outerHeight();
            var fHeight = 167;
            var fTop = 110;
            var fRight = 10;
            var minH = 65;
            var floater = $('#floater');
            var floaterPosition = 'fixed';
            var winWidth = $(window).width();
            var absRight = winWidth<1280 ? (1280-winWidth+fRight) : fRight;
            $(window).on("scroll", function(){
                var sTop = $(this).scrollTop();
                if(floaterPosition === 'fixed' &&  sTop > height - fHeight - minH ){
                    floater.css({position: "absolute", top: height - fHeight- minH, right: absRight});
                    floaterPosition = 'absolute';
                }
                if(floaterPosition === 'absolute' && sTop<height-fHeight - minH){
                    floater.css({position: "fixed", top: fTop, right:fRight});
                    floaterPosition = 'fixed';
                }
            });
        })();
    }

})(jQuery);