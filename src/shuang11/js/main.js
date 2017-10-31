/**
 * Created by mcake on 2016/5/24.
 */
(function($){
  function Select() {
    $(".products .pro-li").each(function(){
      var self = $(this);
      /*展开li*/
      $(this).find('.js_bshu').not(".sigle").click(function () {
        $(this).addClass("on");
        $(this).parent().find('.js_select').toggle();
        return false;
      });
      $(this).find('.dot').click(function () {
        $(this).parent().find('.js_select').toggle();
        return false;
      });

      /*添加背景*/
      $(this).find(".pro-content").not(".sigle").mouseover(function () {
        $(this).find('.js_bshu').addClass("on");
      }).mouseout(function () {
        $(this).find('.js_bshu').removeClass("on");
      });

      var num = $(".num").val();
      var price = 0;
      var totalPrice = 0;

      /*选择磅数计算价格*/
      $(this).find("li").click(function () {
        self.find('.js_bshu').removeClass("on");
        var bs=$(this).data("bsn");
        price=$(this).data("price");
        totalPrice =  num * price;
        self.find(".js_bshu").html($(this).html());
        self.find(".js_bshu").data("num",bs);
        self.find(".price").text(totalPrice);
        self.find(".price").data('price',price);
      });


      /*计算价格*/
      function count(ele) {
        price = self.find(".price").data('price');
        totalPrice = num * price;
        console.log(price);
        ele.siblings(".num").val(num);
        self.find(".price").text(totalPrice);
      }
      /*增加数量*/
      $(this).find(".plus").click(function () {
        var _self = $(this);
        if(num>=50){
          return;
        }else{
          num++;
        }
        count(_self);
      });

      /*减少数量*/
      $(this).find(".minus").click(function () {
        var _self = $(this);
        if(num<=1){
          return;
        }else{
          num--;
        }
        count(_self);
      });


      $(this).find("li").hover(function(){
        $(this).addClass("on").siblings().removeClass("on");
      });

      $(document).click( function() {
        self.find(".js_select").hide();
      });

    });

  };

  /*领取优惠券*/
  var $Dialogbg = $(".Dialogbg-rules"),
      $Dialog=$(".Dialog-rules"),
      $rules=$(".rules"),
      $succeed=$(".succeed"),
      $closes=$(".closes");

  function QuanDialog(ele) {
    $Dialogbg.fadeIn(300);
    $Dialog.fadeIn(300);

    $succeed.fadeOut(0);
    $rules.fadeIn(300);
    var str = ele.find(".txtHtml").html();
    $rules.html(str);

  }
  /*成功*/
  function QuanSucceed() {
    $Dialogbg.fadeIn(300);
    $Dialog.fadeIn(300);
    $rules.fadeOut(0);
    $succeed.fadeIn(300);
  }

 /*关闭*/
  $closes.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
    $rules.empty();
  });
  $Dialogbg.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
    $rules.empty();
  });


  window.QuanDialog = QuanDialog;
  window.QuanSucceed = QuanSucceed;


  function fTop() {
    var $fTop = $(".fTop"),
        bannerH = $(".sec-banner").height(),
        ftop = 100,
        msTop = bannerH;
    $(window).on("scroll",function () {
      var sTop = $(this).scrollTop();
      if(sTop < msTop ){
        $fTop.fadeOut(300);
      }
      if(sTop > msTop){
        $fTop.fadeIn(300);
      }
    });

    $fTop.click(function () {
      $("html,body").animate({scrollTop:msTop},1000,function () {
        $fTop.fadeOut(300);
      });

    });

  }

  var loadComplete = function () {
    Select();
    fTop();
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