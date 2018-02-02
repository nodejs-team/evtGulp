/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  function initNum() {


    $(".swiper-container  .pro-li").each(function () {
      var self = $(this);
      var ponds = $(this).attr('data-pond');
      var ids = $(this).attr('data-postID');
      var pondsInit= 0;
      var idsInit= 0;
      pondsInit = ponds.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
      idsInit = ids.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")})



      /*初始化*/
      $(this).find(".num").html(pondsInit[0]);
      $(this).find(".postID").val(idsInit[0]);

      var num = 0;
      var len = pondsInit.length;
      //var currentItem = items[0];
      /*数量减少*/
      $(this).find('.num-minus').click(function () {
        --num;
        if(num <= 0){
          num=0;
          // ix = currentItem.ix = currentItem.ponds.length-1;
        }
        self.find(".num").html(pondsInit[num]);
        self.find(".postID").val(idsInit[num]);

      });

      /*数量增加*/

      $(this).find('.num-add').click(function () {
        ++num;
        if(num >= len){
          num = len-1;
        }
        self.find(".num").html(pondsInit[num]);
        self.find(".postID").val(idsInit[num]);

      });



    });
  }


  var loadComplete = function () {

    var snow = new SnowFall();
    var swiper1 = new Swiper('.swiper1', {
      grabCursor: true,
      slidesPerView:3,
      autoplay : 3000,
      loop:true,
      paginationClickable: true
    });

    $(".swiper-cake").hover(function () {
      swiper1.stopAutoplay();
    },function () {
      swiper1.startAutoplay();
    });

    $('.arrow-left').on('click', function(e){
      e.preventDefault()
      swiper1.swipePrev()
    })
    $('.arrow-right').on('click', function(e){
      e.preventDefault()
      swiper1.swipeNext()
    })

    initNum();

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