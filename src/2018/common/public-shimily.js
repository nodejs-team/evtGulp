/**
 * Created by shimily on 2018/5/1.
 */
(function($){

  /*刚进入页面，自动滚动到顶部*/
  $("html,body").animate({scrollTop: 0},500);

  /*判断屏幕是否超过1280*/
  function initTopIcon(){
    var icon = $('.top_icon'),
      topBtn=$('.top_btn'),
      winWidth = $(window).width();
    icon.css('top', 405 * (winWidth<1280? 1280 : winWidth) / 1920);
    /*topBtn.css('top',517 * (winWidth<1280? 1280 : winWidth) / 1920);*/
  }

  /*使用方法：initTopIcon();*/
  /*initTopIcon();*/


  /*窗口缩放*/
/*  console.log(maxWidth);
  $(window).resize(function() {
    maxWidth = $(window).width();
    console.log(maxWidth);
  });
 */

  /*
  *适配banner在第一屏显示完全
  * 给banner里面的元素增加一个class:newPosition
  * */
  var maxWidth = $(window).width();
  function BannerRedraw(ele,opts) {
    this.$ele = $(ele);
    this.$opts = opts;
    this._init();
  }
  BannerRedraw.prototype = {
    removenewPosition:function () {
      for(var i=0;i<this.$opts.length;i++){
        $(this.$opts[i]).removeClass("newPosition");
      }
    },
    addnewPosition:function () {
      for(var i=0;i<this.$opts.length;i++){
        $(this.$opts[i]).addClass("newPosition");
      }
    },
    _init:function () {
      var self = this;
      if(maxWidth < 1700){
        self.addnewPosition();
      }else{
        self.removenewPosition();
      }
      /*缩放窗口*/
      $(window).resize(function() {
        maxWidth = $(window).width();
        if(maxWidth < 1700){
          self.addnewPosition();
        }else{
          self.removenewPosition();
        }
      });

    }
  };

 window.BannerRedraw = BannerRedraw;
 /*new BannerRedraw(".sec-banner", ['.evt-content','.banner-bg','.cake-title','.b-cake-1','.b-cake-2','.b-cake-3']);*/

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

})(jQuery);


