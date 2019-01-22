/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  var recording = function () {
    var $elIco = $('#js_ioc');
    var $elGif = $('#js_gif');

    if($elGif.is(":hidden")) {
      $elIco.hide();
      $('.recording-hd').find('em').hide();
      $elGif.show();
    } else {
      $elIco.show();
      $('.recording-hd').find('em').show();
      $elGif.hide();
    }
  };

  var audioPlay = function () {
    var post_id = '10853';
    var audio;
    var timer = null;
    $(function(){
      audio = document.getElementById('audio');

      //播放录音
      $(".recording").click(function(){
        var $elIco = $('#js_ioc');
        var $elGif = $('#js_gif');

        if (audio.paused){
          audio.play();
          /*countdown(230);*/
          $elIco.hide();
          $elGif.show();

        }else{
          $elIco.show();
          $elGif.hide();
          audio.pause();
          audio.currentTime = 0.0;
          clearInterval(timer);
          //$("#countdown_id").html('240s');
        }
        $(".recording-hd em").hide();
      });
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


  function checkVideo()
  {
    if(!!document.createElement('video').canPlayType)
    {
      var vidTest=document.createElement("video");
      oggTest=vidTest.canPlayType('video/ogg; codecs="theora, vorbis"');
      if (!oggTest)
      {
        h264Test=vidTest.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
        if (!h264Test)
        {
          document.getElementById("checkVideoResult").innerHTML="抱歉你的浏览器不支持HTML5 video标签！."
          $(".videoImg").fadeIn(20);
        }
        else
        {
          if (h264Test=="probably")
          {
            document.getElementById("checkVideoResult").innerHTML="非常棒！你的浏览器支持HTML5 video标签！";
          }
          else
          {
            document.getElementById("checkVideoResult").innerHTML="Meh. Some support.";

          }
        }
      }
      else
      {
        if (oggTest=="probably")
        {
          document.getElementById("checkVideoResult").innerHTML="非常棒！你的浏览器支持HTML5 video标签！";
        }
        else
        {
          document.getElementById("checkVideoResult").innerHTML="Meh. Some support.";
        }
      }
    }
    else
    {
      document.getElementById("checkVideoResult").innerHTML="Sorry. No video support."
      $(".videoImg").fadeIn(20);
    }
  }

  var loadComplete = function () {


    $('#js_recording').bind('click',function(e){;
      recording();
    })
    audioPlay();
    checkVideo();
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
