/**
 * Created by shimily on 2018/8/30.
 */
(function($){

   function floater(){
    var floater = $('.floater');
    var headerHeight = $(".header").height();
    var floaterHeight = $('.floater').height();
    var msTop =$(".floatCss").offset().top;  /*图标停留的位置*/
    var winWidth = $(window).width();
    var fTop = 110; /*导航高度*/
    var floaterPosition =floater.css("position") ;  /*'fixed'*/

    $(".floater").fadeIn(500);


    /*初始化位置*/
    floater.css({
      top:msTop-headerHeight,
      position: "absolute"
    });


    scrollFun();
    function scrollFun() {
      $(window).on("scroll", function(){
        var sTop = $(this).scrollTop();
        if(floaterPosition === 'fixed' &&  sTop < msTop ){
          floater.css({
            position: "absolute",
            top: msTop-headerHeight
          });
          floaterPosition = 'absolute';
        }
        if(floaterPosition === 'absolute' && sTop > msTop){
          floater.css({
            position: "fixed",
            top: fTop
          });
          floaterPosition = 'fixed';
        }
      });
    };

   /*兼容小屏，重新设置floater的marginLeft值*/
    var mLeft = 550 * (winWidth<1700? 1700 : winWidth) / 1920;
    floater.css({
      marginLeft: mLeft
    });
   /*缩放屏幕*/
     $(window).resize(function() {  /*缩放屏幕*/
         floater.css({
          marginLeft: mLeft
        });
    });
  }

 window.floater = floater;


  /*调用方法 如：9月会员日*/

   /*$(".floater").fadeOut(10);
    $("html,body").animate({scrollTop: 0},500,function () {
      floater();
    });*/


})(jQuery);


