/**
 * Created by mcake on 2016/5/24.
 */
(function($){



  var loadComplete = function () {



    /*答题*/



    $(".qt").each(function () {
      $(this).find(".select").click(function () {
        $(this).parents(".qt").attr("data-answer",1);
        var id = $(this).parent("span").attr("data-id");
        $(this).addClass("on");
        $(this).parent("span").siblings().find(".select").removeClass("on");
        $(this).parents(".qt").attr("data-id",id);
      });
      

      $(".next").click(function () {
        var as = $(this).parent(".qt").attr("data-answer");
        if(as==1){
          $(this).parent(".qt").fadeOut(0).next().fadeIn(100);
        }

      });


    });



    /*商品组合*/

    var cakesku = $(".products li").eq(0).data("sku"); /*蛋糕*/
    var xsSku = $(".select-li li").data("sku");  /*小食*/
    var cakePrice = $(".products li").eq(0).data("price")-0; /*蛋糕*/
    var xsPrice = $(".select-li li").data("price")-0; /*小食*/

    var dis=0;
    var disXs=48;
    /*$(".buy-btn").attr("data-sku",cakesku+","+xsSku);*/
    $(".zuhe").html(cakePrice-dis+xsPrice-disXs);
    $(".zuhe-old").html(cakePrice+xsPrice);


    $(".products li").each(function () {
      $(this).find(".m-car").click(function () {
        cakesku= $(this).parents("li").attr("data-sku");
        cakePrice= $(this).parents("li").attr("data-price")-0;
        $(this).addClass("on").siblings().removeClass("on");
        $(this).parents("li").siblings().find(".m-car").removeClass("on");
        $(".buy-btn").attr("data-sku",cakesku+","+xsSku);
        $(".zuhe").html(cakePrice-dis+xsPrice-disXs);
        $(".zuhe-old").html(cakePrice+xsPrice);
      });

    });

    $(".select-li li").each(function () {
      $(this).find(".m-car").click(function () {
        xsSku= $(this).parents("li").attr("data-sku");
        xsPrice= $(this).parents("li").attr("data-price")-0;
        $(this).addClass("on").siblings().removeClass("on");
        $(this).parents("li").siblings().find(".m-car").removeClass("on");
        $(".buy-btn").attr("data-sku",cakesku+","+xsSku);
        $(".zuhe").html(cakePrice-dis+xsPrice-disXs);
        $(".zuhe-old").html(cakePrice+xsPrice);
      });

    });

    /*购物清单*/

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


/*领取优惠券*/
var $Dialogbg = $(".Dialogbg-quan"),
  $Dialog=$(".Dialog-quan"),
  $rules=$(".quan"),
  $card=$(".card"),
  $goUse=$(".go-use"),
  $closes=$(".closes");

function QuanDialog(n) {
  $Dialogbg.fadeIn(300);
  $Dialog.fadeIn(300);
  /*$Dialog.find(".quan-"+n).fadeIn(300).siblings().not(".closes").hide();*/
 /* $card.find("img").attr("src","https://act.mcake.com/fangli/2019/pc/memberDay-7yue/images/card-"+n+".png");*/

  $Dialog.find(".quan").fadeIn(300).siblings().not(".closes").hide();
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



