/**
 * Created by mcake on 2016/5/24.
 */
(function($){



  var loadComplete = function () {
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




(function () {
  /*投票提示*/
  var $Dialogbg = $(".Dialogbg-quan"),
    $Dialog=$(".Dialog-quan"),
    $rules=$(".quan"),
    $goUse=$(".go-use"),
    $closes=$(".closes");

  function QuanDialog(n,arr) {
    $Dialogbg.fadeIn(300);
    $Dialog.delay(500).addClass("show").fadeIn();
    //console.log(arr[1]["data-pond"]);

    $(".sec-cake").data("pond",arr[n-1]["data-pond"]);
    $(".sec-cake").data("weight",arr[n-1]["data-weight"]);
    $(".sec-cake").data("price",arr[n-1]["data-price"]);
    $(".sec-cake").data("time",arr[n-1]["data-time"]);
    $(".sec-cake").data("postid",arr[n-1]["data-postid"]);
    $(".sec-cake").data("tips",arr[n-1]["data-tips"]);
    $(".sec-cake").data("sku",arr[n-1]["data-sku"]);
    $(".sec-cake").data("method",arr[n-1]["data-method"]);
    $(".sec-cake").data("pid",arr[n-1]["data-pid"]);
    $(".sec-cake").data("ptype",arr[n-1]["data-ptype"]);
    $(".sec-cake").data("channel",arr[n-1]["data-channel"]);

    $Dialog.find(".jieqian").attr("src","https://act.mcake.com/fangli/2019/pc/newyear-chouqian/images/jieqian-"+n+".png");
    $(".sec-cake .cake").attr("class","cake cake-"+n);
    $(".buy-btn").fadeIn();
  }

  /*关闭*/
  $closes.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.delay(500).removeClass("show");
    $(".cake-cover").delay(500).fadeOut(500);
  });

  $goUse.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.delay(500).removeClass("show");
    $(".cake-cover").delay(500).fadeOut(500);
  });
  window.QuanDialog = QuanDialog;
})();


