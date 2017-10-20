/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  function video() {
    var videoTop = $(".video").offset().top;
    var videoHeight = $(".video").height();
    var ftop=110;
    var floaterPosition = 'absolute';
    var video = $('.video');
    console.log(videoTop-ftop);
    $(window).on("scroll", function(){
      var sTop = $(this).scrollTop();

      if(floaterPosition === 'fixed' &&  sTop < videoTop-ftop ){
        $(".bgcover").fadeOut(500);
        video.css({
          position: "absolute",
          top: 173,
          marginTop:0
        });
        floaterPosition = 'absolute';

      }
      if(floaterPosition === 'absolute' && sTop > videoTop-ftop){
        $(".bgcover").fadeIn(500);
        video.css({
          position: "fixed",
          top: "50%",
          marginTop:-videoHeight/2
        });
        floaterPosition = 'fixed';

      }

    });
  }
  var loadComplete = function () {

   // video();


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