/**
 * Created by mcake on 2016/5/24.
 */
(function($){



  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500);

    /*指定锚点跳转位置*/
    function scrollTopAni(ele,callback) {
      var sTop = $(ele).offset().top-80;
      $("html,body").animate({scrollTop:sTop},500,function () {
        callback && callback();
      });
    }

    $(".goubuy").click(function () {
      scrollTopAni("#goubuy");
    });

    function wordsShow(ele){
      var i=-1;
      var len=ele.children("img").length;
      function wordsAnimate(){   //设置走光动画
        i++;
        if(i<len){
          setTimeout(function(){
            ele.children("img").eq(i).fadeIn(500).siblings().fadeOut(500);
            wordsAnimate(); //内部回调
          },1500);
        }

      }
      wordsAnimate();  //执行一次动画,否则其他动画不隐藏
    }
    wordsShow($("#mcakeId"));//立刻执行一次
    setInterval(function(){wordsShow($("#mcakeId"))},6000);/*循环执行*/

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






