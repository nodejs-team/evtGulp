/**
 * Created by mcake on 2016/5/24.
 */
(function($){



  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500);


      if(!isSupportCss3){
          $(".swipe-cake").html('<img src="https://act.mcake.com/fangli/2020/pc/38jie/images/cake-img.png" width="100%" alt="">');
      }else{
        var swiper1 = new Swiper('.swiper1', {
          pagination: '.pagination1',
          grabCursor: true,
          loop:true,
          autoplay : 3000,
          autoplayDisableOnInteraction : false,
          paginationClickable: true
        });

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



/*指定锚点跳转位置*/
function scrollTopAni(ele,callback) {
  var sTop = $(ele).offset().top+70;
  $("html,body").animate({scrollTop:sTop-110},500,function () {
    callback && callback();
  });
}
window.scrollTopAni = scrollTopAni;
