/**
 * Created by mcake on 2016/5/24.
 */
(function($){



  var loadComplete = function () {
    var swiper1 = new Swiper('.swiper1', {
      pagination: '.pagination1',
      paginationClickable: true,
      grabCursor: true,
      loop:true,
      speed:800,
      autoplay : 3000,
      autoplayDisableOnInteraction : true
    });

    var swiper2 = new Swiper('.swiper2', {
      pagination: '.pagination2',
      grabCursor: true,
      paginationClickable: true,
      loop:true,
      speed:800,
      autoplay : 3500,
      autoplayDisableOnInteraction : true
    });
    var swiper3 = new Swiper('.swiper3', {
      pagination: '.pagination3',
      grabCursor: true,
      paginationClickable: true,
      loop:true,
      speed:800,
      autoplay : 3000,
      autoplayDisableOnInteraction : true
    });

    $(".row").each(function (i) {
      var num = 1;
      $(this).find(".minus").click(function () {
        num--;
        if(num<=1){
          num = 1;
        }
        $(this).parents(".row").find(".num").html(num);
        $(this).parents(".row").find(".num").attr("data-num", num);
        $(this).parents(".row").find(".num").attr("data-num", num);
        $(this).parents(".row").find(".buy_btn").attr("data-num", num);
      });
      $(this).find(".plus").click(function () {
        num++;
        if(num>=50){
          num=50;
        }
        $(this).parents(".row").find(".num").html(num);
        $(this).parents(".row").find(".num").attr("data-num", num);
        $(this).parents(".row").find(".buy_btn").attr("data-num", num);
      });
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