/**
 * Created by mcake on 2016/5/24.
 */
(function($){


  var ani = {
    hoverOpen:function () {
      $(".box-in").stop().animate({'left':'273px'},2000);
      $(".box-out").stop().animate({'left':'-229px'},2000);
    },
    hoverClose:function () {
      $(".box-in").stop().animate({'left':'20px'},800);
      $(".box-out").stop().animate({'left':'20px'},800);
    }
  }


  var loadComplete = function () {
    
    $(".box").hover(function () {
      ani.hoverOpen();
    },function () {
      ani.hoverClose();
    });

    var num = $(".num").val();
    $(".add").click(function () {
      if(num>=50){
        return;
      }else{
        num++;
      }
      $(".num").val(num);
    });


    $(".reduce").click(function () {
      if(num<=1){
        return;
      }else{
        num--;
      }
      $(".num").val(num);
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