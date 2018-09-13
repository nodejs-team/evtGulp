/**
 * Created by mcake on 2016/5/24.
 */
(function($){


  var loadComplete = function () {

    new Price('.js_price1',{
      add:'.add',
      reduce:'.reduce'
    },[0,60,0,0],1);

    new Price('.js_price3',{
      add:'.add',
      reduce:'.reduce'
    },[0,0,0,0],1);

    new Price('.js_price2',{
      add:'.add',
      reduce:'.reduce'
    },[20,50,80,0],1);


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
