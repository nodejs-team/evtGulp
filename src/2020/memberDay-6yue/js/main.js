/*
 * Created by mcake on 2016/5/24.
 */
(function($){

  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500);



    /*调查*/
    $(".qt").each(function () {
      $(this).find(".options span").click(function () {
        $(this).parents(".qt").attr("data-answer",1);
        $(this).find(".select").addClass("on");
        $(this).siblings().find(".select").removeClass("on");
      });

      $(".other").click(function () {
        $(this).parents(".qt").attr("data-answer",2);
        $(".other-in").focus();
      });
    });


    $(".pct-survey span").hover(function () {
      $(this).find(".shake").addClass("a-shake");
    },function () {
      $(this).find(".shake").removeClass("a-shake");
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



