/*
 * Created by mcake on 2016/5/24.
 */
(function($){

  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500);

    var swiper1 = new Swiper('.swiper1', {
      pagination: '.pagination1',
      paginationClickable: true,
      grabCursor: true,
      loop:true,
      speed:800,
      autoplay : 5000,
      autoplayDisableOnInteraction : true
    });
    $('.arrow-left').on('click', function(e){
      e.preventDefault()
      swiper1.swipePrev()
    })
    $('.arrow-right').on('click', function(e){
      e.preventDefault()
      swiper1.swipeNext()
    });
    $(".sec-swiper").hover(function () {
      swiper1.stopAutoplay();
    },function () {
      swiper1.startAutoplay();
    });

    function imgShow(ele){
      var i=-1;
      var len=ele.children("p").length;
      function imgAnimate(){   //设置动画
        i++; console.log(i)
        if(i<len){
          setTimeout(function(){
            ele.children("p").eq(i).show().siblings().hide();
            imgAnimate(); //内部回调
          },500);   //间隔时间
        }else{
          //动画执行一次完成后
        }
      }
      imgAnimate();  //执行一次动画,否则其他动画不隐藏
    }

    imgShow($(".piont"));  //执行一次
    setInterval(function(){imgShow($(".piont"))},2000);  //循环执行

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
  $card=$(".card"),
  $goUse=$(".go-use"),
  $closes=$(".closes");

function QuanDialog(n) {
  $Dialogbg.fadeIn(300);
  $Dialog.fadeIn(300);
  $Dialog.find(".quan-"+n).fadeIn(300).siblings().not(".closes").hide();
  /* $card.find("img").attr("src","https://act.mcake.com/fangli/2020/pc/memberDay-2yue/images/card-"+n+".png");*/

  /*$Dialog.find(".quan").fadeIn(300).siblings().not(".closes").hide();*/
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
$Dialogbg.click(function () {
  $Dialogbg.fadeOut(300);
  $Dialog.fadeOut(300);
});

window.QuanDialog = QuanDialog;

