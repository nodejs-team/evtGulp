/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  /*排行榜滚动显示*/
  function roll(){
    var ul1=document.getElementById("ul1");
    var ul2=document.getElementById("ul2");
    var box=document.getElementById("box");
    ul2.innerHTML=ul1.innerHTML;
    box.scrollTop = 18;
    var timer=setInterval(rollStart,30);
    box.onmouseover=function(){
      clearInterval(timer)
    }
    box.onmouseout=function(){
      timer=setInterval(rollStart,30);
    }


  }
  function rollStart(){
    if (box.scrollTop>=ul1.scrollHeight) {//scrollTop属性既是scroll最上端和box的距离
      box.scrollTop=18;
    }else{
      box.scrollTop++;
    }

  }

  function roll2(){
    var ul3=document.getElementById("ul3");
    var ul4=document.getElementById("ul4");
    var box2=document.getElementById("box2");
    ul4.innerHTML=ul3.innerHTML;
    box2.scrollTop = 0;
    var timer2=setInterval(rollStart2,20);
    box2.onmouseover=function(){
      clearInterval(timer2)
    }
    box2.onmouseout=function(){
      timer2=setInterval(rollStart2,20);
    }


  }
  function rollStart2(){
    if (box2.scrollTop>=ul3.scrollHeight) {//scrollTop属性既是scroll最上端和box的距离
      box2.scrollTop=0;
    }else{
      box2.scrollTop++;
    }

  }

 /*判断活动是否开始*/
  function ActStart(ele,n) {
        if(n){
            $(ele).find('.not-startbg').fadeOut(0);
            $(ele).find('.not-start').fadeOut(0);
        }else{
            $(ele).find('.not-startbg').fadeIn(0);
            $(ele).find('.not-start').fadeIn(0);
        }
    }

   window.ActStart = ActStart;




  /*指定锚点跳转位置*/
  function scrollTopAni(ele,callback) {
    var sTop = $(ele).offset().top;
    $("html,body").animate({scrollTop:sTop-110},500,function () {
      callback && callback();
    });
  }
  window.scrollTopAni = scrollTopAni;


  var loadComplete = function () {
    $("html,body").animate({scrollTop:0},500);

    /*part 切换*/

    /*$(".tab-bar span").click(function () {
      var index = $(this).index();
      $(this).addClass("cur").siblings().removeClass("cur");
      $(".tab-box .part").eq(index).fadeIn(100).siblings().fadeOut(10);
      $(".sec-cakes").fadeIn(0);
      if(index == 2){
        $(".sec-cakes").fadeOut(0);
      }
    });*/



    var swiper1 = new Swiper('.swiper1', {
      grabCursor: true,
      loop:true,
      autoplay : 3000,
      mode: 'vertical',
      autoplayDisableOnInteraction : true,
      onSlideChangeStart: function(swiper){
        $(".prize-nub li.on").removeClass('on');
        $(".prize-nub li").eq(swiper.activeLoopIndex).addClass('on');
      }

    });

    $(".prize-nub li").on('click',function(e){
      e.preventDefault();
      $(".prize-nub li").removeClass('on');
      $(this).addClass('on');
      swiper1.swipeTo( $(this).index());
    });

    $(".win-prize,.prize-nub,.swiper1").hover(function () {
      swiper1.stopAutoplay();
    },function () {
      swiper1.startAutoplay();
    });


    /*按钮变色*/
    $(".zn-btn,.buy-yuanbtn,.buy-btn,.m-car,.m-btn,.go-buy,go-car").hover(function () {
      $(this).addClass("on");
    },function () {
      $(this).removeClass("on");
    });

    /*鼠标悬浮，图片放大*/
    $(".scaleImg").hover(function () {
      $(this).addClass("on")
    },function () {
      $(this).removeClass("on")
    });

    $(".zoom").hover(function () {
      $(this).addClass("on")
    },function () {
      $(this).removeClass("on")
    });

    /*排行榜滚动*/
   /* if($("#ul1 li").length>5){
      roll();
    }
    if($("#ul3 li").length>3){
      roll2();
    }*/

   $(".more").click(function () {
     $(this).fadeOut(200);
     $("#box").removeClass("min-height");
   });

    /*指定锚点跳转位置*/
    $(".whdlink").click(function () {
      scrollTopAni("#whd");
    });

    $(".quanlink").click(function () {
      scrollTopAni("#quan");
    });
    $(".xplink").click(function () {
      scrollTopAni("#xp");
    });
    $(".manzenglink").click(function () {
      scrollTopAni("#manzeng");
    });
    $(".winlink").click(function () {
      scrollTopAni("#win");
    });

    $(".Mcardlink").click(function () {
      scrollTopAni("#Mcard");
    });

    $(".zenglink").click(function () {
      scrollTopAni("#zeng");
    });

    $(".zhelink").click(function () {
      scrollTopAni("#zhekou");
    });
    $(".shenglink").click(function () {
      scrollTopAni("#shengbang");
    });




    /*Top 消费 奖品切换*/
    var index = 0;
    var idx= 0;
    var time1 = setInterval(function () {
      if(index >=$(".prize-nub li").length){
        index = 0;
      }
      idx = index;
      $(".prize-nub li").eq(idx).addClass("on").siblings().removeClass("on");
      $(".prize .prizeImg").eq(idx).fadeIn(200).siblings().fadeOut(0);
      index++;
    },3000);

    $(".prize-nub li").click(function () {
      clearInterval(time1);
      idx = $(this).index();
      $(this).addClass("on").siblings().removeClass("on");
      $(".prize .prizeImg").eq(idx).fadeIn(200).siblings().fadeOut(0);

    });




    /*电话号码中间4位用*代替*/
    $(".bangList li,.awardlist li").each(function () {
      var mobile = $(this).find('.tel-phone').text();
      var reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
      var tel = mobile.replace(reg, "$1****$3");
      $(this).find('.tel-phone').text(tel);
    });

   /*消费金额*/

    /*$(".bangList li").each(function () {
      var money = $(this).find('.price').html();
      var reg = new RegExp("(\\d{1})(\\d*)");
      var tel = money.replace(reg, "*$2");
      $(this).find('.price').html(tel);
    });
*/

    $(".select li").click(function () {
      $(this).addClass('on').siblings().removeClass('on');
    });





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

    $(".buy-btn").click(function () {
      QuanDialog(1);
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




