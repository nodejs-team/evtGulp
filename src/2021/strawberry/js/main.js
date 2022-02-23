/*
 * Created by mcake on 2016/5/24.
 */
(function($){

  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500);

    /*根据日期判断进度条*/
    var vDate = new Date();
    var myDate = '';
    if((vDate.getMonth() + 1)<10){
      if(vDate.getDate()<10){
        myDate = vDate.getFullYear() + '-' +'0'+ (vDate.getMonth() + 1) + '-' +'0'+  vDate.getDate();
      }else {
        myDate = vDate.getFullYear() + '-' +'0'+  (vDate.getMonth() + 1) + '-' + vDate.getDate();
      }

    }else{
      if(vDate.getDate()<10){
        myDate = vDate.getFullYear() + '-' + (vDate.getMonth() + 1) + '-' +'0'+  vDate.getDate();
      }else {
        myDate = vDate.getFullYear() + '-' + (vDate.getMonth() + 1) + '-' + vDate.getDate();
      }
    }



    /* console.log('您的当前时间：',myDate);*/

    if(myDate<'2021-04-06'){
      $(".progress span").width("7%");
      $(".progress i").css("left","7%");

    }else if(myDate>='2021-04-06' && myDate<'2021-04-13') {
      $(".progress span").width("25%");
      $(".progress i").css("left","25%");
    }else if(myDate>='2021-04-13' && myDate<'2021-04-20') {
      $(".progress span").width("46%");
      $(".progress i").css("left","46%");
    }else if(myDate>='2021-04-20' && myDate<'2021-04-27') {
      $(".progress span").width("68%");
      $(".progress i").css("left","68%");
    }else if(myDate>='2021-04-27') {
      $(".progress span").width("90%");
      $(".progress i").css("left","90%");
   }


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
  /* $card.find("img").attr("src","https://act.mcake.com/fangli/2019/pc/memberDay-7yue/images/card-"+n+".png");*/

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


window.QuanDialog = QuanDialog;

