/**
 * Created by shimily on 2018/5/1.
 */
(function($){

  /*刚进入页面，自动滚动到顶部*/
  $("html,body").animate({scrollTop: 0},500);
  /**************************************************/

  /*BD活动，判断屏幕是否超过1280*/
  function initTopIcon(){
    var icon = $('.top_icon'),
      topBtn=$('.top_btn'),
      winWidth = $(window).width();
    icon.css('top', 405 * (winWidth<1280? 1280 : winWidth) / 1920);
    /*topBtn.css('top',517 * (winWidth<1280? 1280 : winWidth) / 1920);*/
  }

  /*使用方法：initTopIcon();*/
  /*initTopIcon();*/

 /**************************************************/

  /*窗口缩放*/
/*  console.log(maxWidth);
  $(window).resize(function() {
    maxWidth = $(window).width();
    console.log(maxWidth);
  });
 */

  /*判断小屏幕
  *适配banner在第一屏显示完全
  * 给banner里面的元素增加一个class:small
  * */
  var maxWidth = $(window).width();
  function BannerRedraw(ele,opts) {
    this.$ele = $(ele);
    this.$opts = opts;
    this._init();
  }
  BannerRedraw.prototype = {
    removenewClass:function () {
      this.$ele.removeClass("small");
      for(var i=0;i<this.$opts.length;i++){
        $(this.$opts[i]).removeClass("small");
      }
    },
    addnewClass:function () {
      this.$ele.addClass("small");
      for(var i=0;i<this.$opts.length;i++){
        $(this.$opts[i]).addClass("small");
      }
    },
    _init:function () {
      var self = this;
      if(maxWidth < 1700){
        self.addnewClass();
      }else{
        self.removenewClass();
      }
      /*缩放窗口*/
      $(window).resize(function() {
        maxWidth = $(window).width();
        if(maxWidth < 1700){
          self.addnewClass();
        }else{
          self.removenewClass();
        }
      });

    }
  };

 window.BannerRedraw = BannerRedraw;
 /*new BannerRedraw(".sec-banner", ['.evt-content','.banner-bg','.cake-title','.b-cake-1','.b-cake-2','.b-cake-3']);*/

 /**************************************************/



  /**************************************************/

 /*
 *判断ie浏览器版本
 * */
  function IEVersion() {
    var userAgent = navigator.userAgent; /*取得浏览器的userAgent字符串*/
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; /*判断是否IE<11浏览器*/
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; /*判断是否IE的Edge浏览器*/
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if(fIEVersion == 7) {
        return 7;
      } else if(fIEVersion == 8) {
        return 8;
      } else if(fIEVersion == 9) {
        return 9;
      } else if(fIEVersion == 10) {
        return 10;
      } else {
        return 6;//IE版本<=7
      }
    } else if(isEdge) {
      return 'edge';//edge
    } else if(isIE11) {
      return 11; //IE11
    }else{
      return -1;//不是ie浏览器
    }
  }
  //console.log(IEVersion());
  window.IEVersion = IEVersion;
  /*浏览器判断*/
  /*if(IEVersion() > 0 && IEVersion() < 11){
    alert("您的浏览器版本过低，\n因此无法上传照片参与抽奖活动，\n请及时更换最新的浏览器！");
  }*/


 /**************************************************/

  /*弹窗*/
  function Dialog(opts) {
    this.$ele = $(opts.ele);
    this.$elebg = $(opts.elebg);
    this.$close = $(opts.close);
    this._init();
  }
  Dialog.prototype = {
    show:function () {
      var self = this;
      this.$ele.show();
      this.$elebg.show();
    },
    hide:function () {
      var self = this;
      this.$ele.hide();
      this.$elebg.hide();
    },
    _init:function () {
      var self = this;
      /*关闭*/
      this.$close.click(function () {
        self.hide();
      });
      this.$elebg.click(function () {
        self.hide();
      });
    }
  };

  window.Dialog = Dialog;

/*外部调用方法*/
  /*实例化弹窗*/
  /*var dialog1 = new Dialog({
    elebg:'.Dialogbg-box',
    ele:'.Dialog-box',
    close:'.closes'
  });*/
  /*外部调用弹窗的方法*/
  /*$(".buy-btn").click(function () {
    //console.log(Dialog.show);
    dialog1.show();
  });
  $(".go-use").click(function () {
    //console.log(Dialog.show);
    dialog1.hide();
  });*/

 /**************************************************/

  /*阻止页面内容被选中*/
  document.body.onselectstart = function () {
    return false;
  };

  /*阻止特定区域的内容被选中*/
  /*var elem = document.getElementById('elemId');
  elem.onselectstart = function () {
    return false;
  };*/

 /**************************************************/

  /*会员日：加入购物清单，浮动图标*/
    function floater(){
    var floater = $('.floater');
    var headerHeight = $(".header").height();
    var floaterHeight = $('.floater').height();
    var msTop =$(".sec-kaixue").offset().top;
    var winWidth = $(window).width();
    var fTop = 110; /*导航高度*/
    var floaterPosition =floater.css("position") ;  /*'fixed'*/


    $(".floater").fadeIn(500);

    /*兼容小屏，重新设置floater的marginLeft值*/
    var mLeft = 550 * (winWidth<1700? 1700 : winWidth) / 1920;
    console.log(winWidth,mLeft);
    floater.css({
      marginLeft: mLeft
    });

    /*初始化位置*/
    floater.css({
      top:msTop-headerHeight,
      position: "absolute"
    });

    floater.find("li").hover(function () {
      $(this).addClass("on").siblings().removeClass("on");
    });

    floater.find("li").click(function () {
      var index=$(this).index();
      var hotspot=$('.sec-hotspot').eq(index).offset().top;
      $("html,body").animate({scrollTop: hotspot-100}, 1000);
    });




    scrollFun();
    function scrollFun() {
      $(window).on("scroll", function(){
        var sTop = $(this).scrollTop();
        if(floaterPosition === 'fixed' &&  sTop < msTop-floaterHeight ){
          floater.css({
            position: "absolute",
            top: msTop-headerHeight
          });
          floaterPosition = 'absolute';
        }
        if(floaterPosition === 'absolute' && sTop > msTop-floaterHeight){
          floater.css({
            position: "fixed",
            top: fTop
          });
          floaterPosition = 'fixed';
        }
      });
    };
  }

  window.floater = floater;

  /*调用方法*/
   /*$(".floater").fadeOut(10);
    $("html,body").animate({scrollTop: 0},500,function () {
      floater();
    });*/

 /**************************************************/


/*阻止页面内容被选中*/
document.body.onselectstart = function () {
  return false;
};


})(jQuery);


