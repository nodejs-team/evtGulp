/*
 * Created by mcake on 2016/5/24.
 */
(function($){

  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500);

    /*指定锚点跳转位置*/
    function scrollTopAni(ele,callback) {
      var sTop = $(ele).offset().top;
      $("html,body").animate({scrollTop:sTop-110},500,function () {
        callback && callback();
      });
    }
    $(".cakelink").click(function () {
      scrollTopAni("#cake");
    });



    $(".select-wrap i").each(function (i) {
      var repurchase = $(this).data("repurchase");
      var on = null;
      $(this).click(function () {
        on = $(this).hasClass('cur');
        if(!on){
          $(".select").removeClass("cur");
          $(this).addClass("cur");
          $(".pro-list").find(".buy_btn").attr("data-repurchase",1);
          $(".pro-list").find(".buy_btn").attr("data-675",repurchase);
        }else{
          $(this).removeClass("cur");
          $(".pro-list").find(".buy_btn").attr("data-repurchase","");
        }
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
  $Dialog.find(".quan-"+n).fadeIn(300).siblings().not(".closes").hide();
  /* $card.find("img").attr("src","https://act.mcake.com/fangli/2020/pc/memberDay-2yue/images/card-"+n+".png");*/

  /*$Dialog.find(".quan").fadeIn(300).siblings().not(".closes").hide();*/
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
$Dialogbg.click(function () {
  $Dialogbg.fadeOut(300);
  $Dialog.fadeOut(300);
});

window.QuanDialog = QuanDialog;

