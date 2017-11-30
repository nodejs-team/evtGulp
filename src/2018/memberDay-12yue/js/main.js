/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  function selectBangshu() {
    var bsn =0,
        price = 0,
        totalPrice=0,
        discount = 0.8;
    $(".prolist li").each(function () {
      var self = $(this);
      $(this).find(".js_bshu").click(function () {
          self.siblings().find('.js_select').slideUp(100);
          self.find('.js_select').stop().slideToggle(200);
          return false;
      });
      $(this).find(".js_select dd").click(function () {
        $(this).addClass('on').siblings().removeClass("on");
         bsn = $(this).data("bsn");
         price = $(this).data("price");
         totalPrice = (price * discount);

         self.find('.js_bshu em').html(bsn);
         self.find('.js_bshu').data("num",bsn);

         self.find('.pro-price').html(totalPrice);


      });

      /*初始化*/
      price= $(this).find('.js_select dd.on').data('price');
      totalPrice = (price * discount);
      $(this).find(".pro-price").html(totalPrice);

    });

    $(document).click(function () {
      $(".js_select").slideUp(100);
    });



  }

  var loadComplete = function () {

    selectBangshu();
    $(".price-select li").click(function () {
      $(this).addClass('on').siblings().removeClass("on");
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