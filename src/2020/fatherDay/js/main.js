/**
 * Created by mcake on 2016/5/24.
 */
(function($){



  var loadComplete = function () {

    /*加换购*/
    $('.price .huangou').each(function () {
      var cakePrice = $(this).parents(".row").find(".price").data("price");
      var hgPrice = $(this).parents(".row").find(".hg").data("price");
      $(this).parents(".row").find(".buy_btn").attr("data-price",cakePrice);

      var a = true;
      if(a){
        $(this).parents(".row").find(".buy_btn").attr("data-price",cakePrice+hgPrice);
      }else {
        $(this).parents(".row").find(".buy_btn").attr("data-price",cakePrice);
      }


      $(this).click(function () {
        if(!a){
          $(this).find(".icon").addClass("on");
          $(this).parents(".row").find(".buy_btn").attr("data-price",cakePrice+hgPrice);
          $(this).parents(".row").find(".buy_btn").attr("data-repurchase",1);

          a = !a;
        }else{
          $(this).find(".icon").removeClass("on");
          $(this).parents(".row").find(".buy_btn").attr("data-price",cakePrice);
          $(this).parents(".row").find(".buy_btn").attr("data-repurchase",0);
          a = !a;
        }
      });
    });



    var swiper1 = new Swiper('.swiper1', {
      /*  pagination: '.pagination1',*/
      paginationClickable: true,
      grabCursor: true,
      loop:true,
      speed:800,
      autoplay : 3000,
      autoplayDisableOnInteraction : true
    });

    var swiper2 = new Swiper('.swiper2', {
      /*pagination: '.pagination2',*/
      grabCursor: true,
      paginationClickable: true,
      loop:true,
      speed:800,
      autoplay : 3000,
      autoplayDisableOnInteraction : true
    });

    var swiper3 = new Swiper('.swiper3', {
      /*pagination: '.pagination2',*/
      grabCursor: true,
      paginationClickable: true,
      loop:true,
      speed:800,
      autoplay : 3000,
      autoplayDisableOnInteraction : true
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