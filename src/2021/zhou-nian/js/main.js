/**
 * Created by mcake on 2016/5/24.
 */
(function($){

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

    /*导航日期切换*/
   /* $(".tab-bar span").click(function () {
      var index = $(this).index();
      $(this).addClass("cur").siblings().removeClass("cur");
      $(".tab-box .part").eq(index).fadeIn(100).siblings().fadeOut(10);
      $(".sub-bar .sec-title").eq(index).fadeIn(100).siblings().fadeOut(10);
      $(".sec-cakes").fadeIn(0);
      if(index == 2){
        $(".sec-cakes").fadeOut(0);
      }
    });*/

    /*根据日期判断蛋糕是否抢购*/
    var vDate = new Date();
    var myDate = '';
    var hours = vDate.getHours()
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


    /*function lastTime(time1,time2,ele) {

      if (myDate > time1 && myDate <= time2 || myDate > time2) {
        ele.fadeIn(0);
        ele.find(".last-time").fadeOut(0);
        ele.find(".sell-out").fadeIn(0);
      } else if (myDate == time1 && hours >= "12") {
        ele.fadeOut(0);
      }
    }*/


    function lastTime(time1,time2,ele) {

      /*当天才需要判断时间*/
      if (myDate >= time1 && myDate < time2 && !(myDate == time1 && hours < "12")) {
        ele.fadeOut(0);
      } else if (myDate > time1) {
        ele.fadeIn(0);
        ele.find(".last-time").fadeOut(0);
        ele.find(".sell-out").fadeIn(0);
      }
    }
    $(".product li").eq(0).find(".disCover").fadeIn(0);
    $(".product li").eq(0).find(".disCover").find(".last-time").fadeOut(0);
    $(".product li").eq(0).find(".disCover").find(".sell-out").fadeIn(0);
    //lastTime("2021-10-23","2021-10-26",$(".product li").eq(0).find(".disCover"));
    lastTime("2021-10-26","2021-10-29",$(".product li").eq(1).find(".disCover"));
    lastTime("2021-10-29","2021-11-03",$(".product li").eq(2).find(".disCover"));
    lastTime("2021-11-03","2021-12-30",$(".product li").eq(3).find(".disCover"));


    $(".jp .item").hover(function () {
      var index = $(this).index();
      $(this).addClass("cur").siblings().removeClass("cur");
      $(".libao").fadeIn(0);
      $(".libao .item").eq(index).stop().fadeIn(100).siblings().not(".close").fadeOut(10);
    },function () {
      $(".libao").fadeOut(10);
    });
    $(".libao").hover(function () {
      $(".libao").fadeIn(0);

    },function () {
      $(".libao").fadeOut(10);
    });

    $(".zengpin").each(function (i) {
      $(this).find(".taggle-down").click(function () {
        $(this).fadeOut(50);
        $(this).parents(".zengpin").find(".man-zeng").slideDown(100);
      });
      $(this).find(".taggle-up").click(function () {
        $(this).parents(".zengpin").find(".taggle-down").fadeIn(50);
        $(this).parents(".zengpin").find(".man-zeng").slideUp(100);
      });
    });




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


    /*按钮变色*/
    $(".zn-btn,.buy-yuanbtn,.m-car,.m-btn,.go-buy,go-car").hover(function () {
      $(this).addClass("on");
    },function () {
      $(this).removeClass("on");
    });

    /*鼠标悬浮，图片放大*/

    $(".zoom").hover(function () {
      $(this).addClass("on")
    },function () {
      $(this).removeClass("on")
    });


    /*指定锚点跳转位置*/
    $(".wxlink").click(function () {
      scrollTopAni("#wx");
    });

    $(".cakelink").click(function () {
      scrollTopAni("#cake");
    });

    $(".cake2link").click(function () {
      scrollTopAni("#cake2");
    });
    $(".hllink").click(function () {
      scrollTopAni("#hl");
    });



    $(".quanlink").click(function () {
      scrollTopAni("#quan");
    });

    $(".specialCardlink").click(function () {
      scrollTopAni("#specialCard");
    });

    $(".breadlink").click(function () {
      scrollTopAni("#bread");
    });

    $(".snacklink").click(function () {
      scrollTopAni("#snack");
    });

    $(".cake3link").click(function () {
      scrollTopAni("#cake3");
    });



    $(".shengbanglink").click(function () {
      scrollTopAni("#shengbang");
    });



    /*电话号码中间4位用*代替*/
    $(".bangList li,.awardlist li").each(function () {
      var mobile = $(this).find('.tel-phone').text();
      var reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
      var tel = mobile.replace(reg, "$1****$3");
      $(this).find('.tel-phone').text(tel);
    });




    /**排行榜*/
    var len = $(".bangList ul li").length;
    if(len <= 0){
      $(".bangList ul").html('暂无数据');
      $("#box").removeClass("min-height");
    }




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
