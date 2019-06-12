/**
 * Created by mcake on 2016/5/24.
 */
(function($){



  var loadComplete = function () {

    /*商品价格计算*/

    new Price('.js_price2',{
      add:'.add',
      reduce:'.reduce'
    },[0,0,0,0],1);

    $(".pro-list li").each(function () {
      var self = $(this);
      var num = self.find(".num_n").text()-0;

      $(this).find(".m_left").click(function () {
        if(num>1){
          num--;
        }else{
          num=1;
        }
        self.find(".num_n").text(num);
      });
      $(this).find(".m_right").click(function () {
        if(num<50){
          num++;
        }else{
          num=50;
        }
        self.find(".num_n").text(num);
      });
    });




      $(".floater").fadeOut(10);
    $("html,body").animate({scrollTop: 0},500,function () {
      floater();
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
    $Dialog.find(".jp-leve").html(arr[n].leve);
    $Dialog.find(".jp-name").html(arr[n].name);
    $Dialog.find(".jp-price").html(arr[n].price);
    $Dialog.find(".txt").html(arr[n].txt);
    $Dialog.find(".jp").css({"background":"url('https://act.mcake.com/fangli/2019/pc/38jie/images/jiang-"+(n+1)+".png') center","background-size":"cover"});
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




