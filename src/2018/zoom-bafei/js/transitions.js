(function () {
  /*浏览器自适应*/
  var isSupportTransition = (function(){
    var rootStyle = document.documentElement.style;
    var keys = ["transition", "WebkitTranstion", "MozTranstion", "msTranstion", "OTransition"];
    for(var i=0; i<keys.length; i++){
      if( keys[i] in rootStyle ){
        return true;
      }
    }
    return false;
  })();

  var isIE8 = /msie 8.0/i.test(navigator.userAgent);

  isIE8 && (document.documentElement.className += " IE8");

  function getWindowWidth(){
    return window.innerWidth || document.documentElement.clientWidth;
  }


  $(window).resize(function () {
    var winWidth = $(window).width();
    var percent =(winWidth<1280? 1280 : winWidth) / 1920;

   console.log(percent);


  });

  /*$(".evt-container").width(1200);*/


  if(!isSupportTransition){/*不支持缩放*/
    console.log('不支持缩放');
  }else{  /*支持缩放*/
    console.log('支持缩放');
    /*$(".evt-container").css({
      'webkitTransform':'scale(0.5)',
      'transform':'scale(0.5)'
    });*/

  }
/*  $(".banner-title").style.transform = "translate3d(100%,0,0)";*/

})();