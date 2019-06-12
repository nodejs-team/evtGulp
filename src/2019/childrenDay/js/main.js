/**
 * Created by mcake on 2016/5/24.
 */
(function($){



  var loadComplete = function () {

    /*商品价格计算*/

    new Price('.js_price2',{
      add:'.add',
      reduce:'.reduce'
    },[0,0,0,0],1);

    var swiper1 = new Swiper('.swiper1', {
      pagination: '.pagination1',
      grabCursor: true,
      loop:true,
      autoplay : 3000,
      autoplayDisableOnInteraction : false,
      paginationClickable: true
    });
    
    $(".buy_btn_box li span").hover(function () {
      $(this).addClass("on").parents("li").siblings().find("span").removeClass("on");
    });



    /*购物清单*/
    /*$(".floater").fadeOut(10);*/
    $("html,body").animate({scrollTop: 0},500);

    
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


/*领取优惠券*/
var $Dialogbg = $(".Dialogbg-quan"),
  $Dialog=$(".Dialog-quan"),
  $rules=$(".quan"),
  $goUse=$(".go-use"),
  $closes=$(".closes");

function QuanDialog(n) {
  $Dialogbg.fadeIn(300);
  $Dialog.fadeIn(300);
  $Dialog.find(".quan-"+n).fadeIn(300).siblings().not(".closes").hide();
}

/*关闭*/
$closes.click(function () {
  $Dialogbg.fadeOut(300);
  $Dialog.fadeOut(300);
});

$goUse.click(function () {
  $Dialogbg.fadeOut(300);
  $Dialog.fadeOut(300);
});


window.QuanDialog = QuanDialog;


var maxWidth = $(window).width();
var dis = 0;
if(maxWidth>1700){
  dis = -200;
}else{
  dis = 0;
}

/*砸蛋*/
var breakEgg={
  x:-100,
  y:-100,
  $dadan:$(".dadan"),
  $egg:$(".egg"),
  $ele:$(".chuizi"),
  move:function (e) {
    var self = this;
    var eggX = this.$egg.offset().left;
    var eggY = this.$egg.offset().top;
    $(".dadan,.egg").mousemove(function(e){
          self.$ele.stop().fadeIn(10);
           var eX=$(this).offset().left;
           var eY=$(this).offset().top;

            $(".on").css({
              "left":(e.pageX+self.x+dis)+"px",
              "top":(e.pageY+self.y-eY)+"px"
            });
          self.$ele.addClass("on");
      }).mouseout(function(){
      $(".chuizi").fadeOut(200);   //鼠标移出时删除#info层
    });
  },
  init:function () {
    this.move();
  }
};


breakEgg.init();


