/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  var loadComplete = function () {


      bindScroll('#evt_container');
      // $(".b-title").hide();
      // $(".b-cake").hide();
      var swiper = new Swiper('.swiper-container', {
          pagination: '.pagination',
          slidesPerView: 1,
          autoplay : 5000,
          paginationClickable: true,
          spaceBetween: 0,
          initialSlide:0,
          onInit: function(swiper){
              //alert(swiper.activeIndex);提示Swiper的当前索引
              //$(".b-title").fadeOut();
              //$(".b-title").eq(swiper.activeIndex).fadeIn(500);
          },
          onSlideChangeEnd: function(swiper){

              function remClass(ele) {
                  var elems = ele.find('[data-anim]');
                  elems.each(function(){
                      var lastClass = this.getAttribute('data-anim');
                      console.log($(this).removeClass(lastClass));
                  });
              }
              remClass($("#evt_container"));



              //console.log(elems);

              var index = swiper.activeIndex;
              if(index==0){
                  bindScroll('#evt-content-0');
              }
              if(index==1){
                  bindScroll('#evt-content-1');
              }
              if(index==2){
                  bindScroll('#evt-content-2');
              }

              /*
              var index = swiper.activeIndex;
              function css3Ani() {
                  $(".a1").removeClass("slide-right");
                  $(".a2").removeClass("slide-right");
                  $(".a3").removeClass("slide-right");
                  var index = swiper.activeIndex;
                  if(index ==0){
                      $(".a1").addClass("slide-right");
                  }
                  if(index==1){
                      $(".a2").addClass("slide-right");
                  }
                  if(index==2){
                      $(".a3").addClass("slide-right");
                  }
              }

              function jqueryAni() {
                  $(".a2").fadeOut();
                  if(index == 1){
                      $(".a2").fadeIn(500);
                  }

              }

              if(isSupportCss3){
                  //alert('支持css3');
                  css3Ani();
              }else{
                 // alert('不支持css3');
                  jqueryAni();
              }
            */


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