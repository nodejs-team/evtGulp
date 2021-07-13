/**
 * Created by mcake on 2016/5/24.
 */
(function($){


  var audioPlay = function () {
    var audio;
    var timer = null;
    var timers = null;
    var time = 0;
    $(function(){
      audio = document.getElementById('audio');
      var $elIco = $('#js_ioc');
      var $elGif = $('#js_gif');
      //播放录音
      $(".recording").click(function(){
        time = 0;

        if (audio.paused){
          audio.play();
          /*countdown(230);*/
          $elIco.hide();
          $elGif.show();
          timers = setInterval(func, 1000);
        }else{
          $elIco.show();
          $elGif.hide();
          audio.pause();
          audio.currentTime = 0.0;
          clearInterval(timers);
          //$("#countdown_id").html('240s');
        }
        $(".recording-hd em").hide();
      });

      function func(){
        time +=1;
        if(time >= 76){
          audio.pause();
          $elIco.show();
          $elGif.hide();
          clearInterval(timers);
        }
      }
    });


    function countdown(time){

      timer = setInterval(function(){
        if(time - 1 >= 0){
          time = time - 1;
          $("#countdown_id").html(time + 's');
        }else{
          $("#countdown_id").html('240s');
          var $elIco = $('#js_ioc');
          var $elGif = $('#js_gif');
          $elIco.show();
          $elGif.hide();
          audio.pause();
          audio.currentTime = 0.0;
          clearInterval(timer);
        }
      }, 1000);
    }
  }




  var loadComplete = function () {

    audioPlay();


    /*购物清单*/
    $("html,body").animate({scrollTop: 0},500,function () {
      $(".floater").fadeIn(100);
    });

    var cakeSku = $(".roseCake").data("sku");
    var sku=0;
    var newSku=[cakeSku];
    $('.huangou').each(function () {
      $(this).click(function () {
        sku = $(this).find(".icon").data("sku");
        if($(this).find(".icon").hasClass("on")){
          $(this).find(".icon").removeClass("on");
          var index = newSku.indexOf(sku);
          newSku.splice(index, 1);/*删除*/
        }else{
          newSku.push(sku);  /*追加*/
          $(this).find(".icon").addClass("on");
        }
        $(this).parents(".xiaoshi").next().attr("data-sku",newSku);
      });
      $(this).parents(".xiaoshi").next().attr("data-sku",newSku);
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






