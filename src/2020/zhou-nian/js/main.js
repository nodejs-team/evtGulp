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


    /*根据日期判断进度条*/
    var vDate = new Date();
    var myDate = '';
    if((vDate.getMonth() + 1)<10){
      if(vDate.getDate()<10){
        myDate = vDate.getFullYear() + '-' +'0'+ (vDate.getMonth() + 1) + '-' +'0'+  vDate.getDate();
      }else {
        myDate = vDate.getFullYear() + '-' +'0'+  (vDate.getMonth() + 1) + '-' + vDate.getDate();
      }

    }else{
      if(vDate.getDate()<10){
        myDate = vDate.getFullYear() + '-' + (vDate.getMonth() + 1) + '-' +'0'+  vDate.getDate();
      }else {
        myDate = vDate.getFullYear() + '-' + (vDate.getMonth() + 1) + '-' + vDate.getDate();
      }
    }



   /* console.log('您的当前时间：',myDate);*/

    if(myDate<'2020-10-22'){
      $(".progress span").width("10%");
      $(".progress i").css("left","10%");

    }else if(myDate>='2020-10-22' && myDate<'2020-10-26') {
      $(".progress span").width("33%");
      $(".progress i").css("left","33%");
    }else if(myDate>='2020-10-26' && myDate<'2020-10-29') {
      $(".progress span").width("58%");
      $(".progress i").css("left","58%");
    }else if(myDate>='2020-10-29') {
      $(".progress span").width("86%");
      $(".progress i").css("left","86%");
      $(".icon").addClass("icon-100");
    }


    if(myDate>='2020-10-30' && myDate<='2020-11-05'){
      $(".mcake-1").find(".buy-btn").removeClass("on").html("立即购买");
    }else if(myDate>='2020-11-06' && myDate<='2020-11-10'){
      $(".mcake-1").find(".buy-btn").addClass("on").html("已结束");
      $(".mcake-2").find(".buy-btn").removeClass("on").html("立即购买");
    }else if(myDate>'2020-11-10'){
      $(".mcake-1").find(".buy-btn").addClass("on").html("已结束");
      $(".mcake-2").find(".buy-btn").addClass("on").html("已结束");
    }


    /*part 切换*/

  /*  $(".tab-bar span").click(function () {
      var index = $(this).index();
      $(this).addClass("cur").siblings().removeClass("cur");
      $(".tab-box .part").eq(index).fadeIn(100).siblings().fadeOut(10);
      $(".sub-bar .sec-title").eq(index).fadeIn(100).siblings().fadeOut(10);
      $(".sec-cakes").fadeIn(0);
      if(index == 2){
        $(".sec-cakes").fadeOut(0);
      }
    });
*/


    var swiper1 = new Swiper('.swiper1', {
      grabCursor: true,
      loop:true,
      autoplay : 5000,
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

    /*$(".win-prize,.prize-nub,.swiper1").hover(function () {
      clearInterval(time1);
      swiper1.stopAutoplay();
    },function () {
      swiper1.startAutoplay();
    });*/


    /*Top 消费 奖品切换*/
  /*  var index = 0;
    var idx= 0;*/
   /* var time1 = setInterval(function () {
      if(index >=$(".prize-nub li").length){
        index = 0;
      }
      idx = index;
      $(".prize-nub li").eq(idx).addClass("on").siblings().removeClass("on");
      $(".prize .prizeImg").eq(idx).fadeIn(200).siblings().fadeOut(0);
      index++;
    },5000);*/

  /*  $(".prize-nub li").click(function () {
      clearInterval(time1);
      idx = $(this).index();
      $(this).addClass("on").siblings().removeClass("on");
      $(".prize .prizeImg").eq(idx).fadeIn(200).siblings().fadeOut(0);

    });*/

    /*按钮变色*/
    $(".zn-btn,.buy-yuanbtn,.m-car,.m-btn,.go-buy,go-car").hover(function () {
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
   var more = true;
   $(".more").click(function () {
     if(more){
       $(this).addClass('on');
       $("#box").removeClass("min-height");
       more=!more;
     }else {
       $(this).removeClass('on');
       $("#box").addClass("min-height");
       more=!more;
     }
   });

    /*指定锚点跳转位置*/
    $(".hllink").click(function () {
      scrollTopAni("#hl");
    });

    $(".quanlink").click(function () {
      scrollTopAni("#quan");
    });
    $(".cakelink").click(function () {
      scrollTopAni("#cake");
    });
    $(".wxlink").click(function () {
      scrollTopAni("#wx");
    });



    $(".shengbanglink").click(function () {
      scrollTopAni("#shengbang");
    });


    $(".wxCodelink").click(function () {
      scrollTopAni("#wxCode");
    });


    $(".zuhelink").click(function () {
      scrollTopAni("#zuhe");
    });


    $(".cake99link").click(function () {
      scrollTopAni("#cake99");
    });

    $(".cake86link").click(function () {
      scrollTopAni("#cake86");
    });






    /*电话号码中间4位用*代替*/
    $(".bangList li,.awardlist li").each(function () {
      var mobile = $(this).find('.tel-phone').text();
      var reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
      var tel = mobile.replace(reg, "$1****$3");
      $(this).find('.tel-phone').text(tel);
    });

   /*消费金额*/

    $(".bangList li").each(function () {
      var money = $(this).find('.price').html();
      var reg = new RegExp("(\\d{1})(\\d*)");
      var tel = money.replace(reg, "*$2");
      $(this).find('.price').html(tel);
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


/*
 时间倒计时插件
 TimeDown.js
 */
/*function TimeDown(id, endDateStr) {
  //结束时间
  var endDate = new Date(endDateStr);
  //当前时间
  var nowDate = new Date();
  //相差的总秒数
  var totalSeconds = parseInt((endDate - nowDate) / 1000);
  //天数
  var days = Math.floor(totalSeconds / (60 * 60 * 24));
  //取模（余数）
  var modulo = totalSeconds % (60 * 60 * 24);
  //小时数
  var hours = Math.floor(modulo / (60 * 60));
  modulo = modulo % (60 * 60);
  //分钟
  var minutes = Math.floor(modulo / 60);
  //秒
  var seconds = modulo % 60;
  //输出到页面
  //document.getElementById(id).innerHTML = "还剩:" + days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";

  if(days<=0){
    document.getElementById(id).innerHTML="已经开始了";
  }


  //延迟一秒执行自己
  setTimeout(function () {
    TimeDown(id, endDateStr);
  }, 1000)
}

TimeDown("show", "2020-9-23 00:00:00");*/
