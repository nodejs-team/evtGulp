/**
 * Created by mcake on 2016/5/24.
 */
(function($){



  var loadComplete = function () {


    var swiper1 = new Swiper('.swiper1', {
      pagination: '.pagination1',
      grabCursor: true,
      loop:true,
      autoplay : 3000,
      autoplayDisableOnInteraction : false,
      paginationClickable: true
    });

    var swiper2 = new Swiper('.swiper2', {
      pagination: '.pagination2',
      grabCursor: true,
      loop:true,
      autoplay : 3000,
      autoplayDisableOnInteraction : false,
      paginationClickable: true
    });

    /*换购*/
    $('.huangous').each(function () {
      var a = false;
      $(this).click(function () {
        if(a){
          $(this).find(".icon").addClass("on");
          a = false;
        }else{
          $(this).find(".icon").removeClass("on");
          a = true;
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


/*抽奖弹窗*/
(function () {
  var $Dialogbg = $(".Dialogbg-tip"),
    $Dialog=$(".Dialog-tip"),
    $rules=$(".tip"),
    $goUse=$(".go-wait"),
    $closesx=$(".closesx");

  function QuanDialog(n,arr) {
    $Dialogbg.fadeIn(300);
    $Dialog.fadeIn(300);
    $(".tip-wrap").fadeOut(0);
    if(n<0){ /*未中奖*/
      $(".tip-2").fadeIn(20);
    }else{

      $(".tip-1").fadeIn(20);
      $Dialog.find(".jp-name").html(arr[n].name);
      $Dialog.find(".jp").css({"background":"url('https://act.mcake.com/fangli/2018/pc/christmas/images/jiang-"+(n+1)+".png') center","background-size":"cover"});
    }

  }

  /*关闭*/
  $closesx.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
  });

  $goUse.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
  });
  window.QuanDialog = QuanDialog;
})();