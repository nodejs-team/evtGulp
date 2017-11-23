/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  function Select() {
    $(".products .pro-li").each(function(){
      var self = $(this);
      /*展开li*/
      $(this).find('.js_bshu').not(".sigle").click(function () {
        $(this).addClass("on");
        $(this).parent().find('.js_select').toggle();
        return false;
      });
      $(this).find('.dot').click(function () {
        $(this).parent().find('.js_select').toggle();
        return false;
      });

      /*添加背景*/
      $(this).find(".pro-content").not(".sigle").mouseover(function () {
        $(this).find('.js_bshu').addClass("on");
      }).mouseout(function () {
        $(this).find('.js_bshu').removeClass("on");
      });

      var num = $(".num").val();
      var price = 0;
      var totalPrice = 0;

      /*选择磅数计算价格*/
      $(this).find("li").click(function () {
        self.find('.js_bshu').removeClass("on");
        var bs=$(this).data("bsn");
        price=$(this).data("price");
        totalPrice =  num * price;
        self.find(".js_bshu").html($(this).html());
        self.find(".js_bshu").data("num",bs);
        self.find(".price").text(totalPrice);
        self.find(".price").data('price',price);
      });


      /*计算价格*/
      function count(ele) {
        price = self.find(".price").data('price');
        totalPrice = num * price;
        console.log(price);
        ele.siblings(".num").val(num);
        self.find(".price").text(totalPrice);
      }
      /*增加数量*/
      $(this).find(".plus").click(function () {
        var _self = $(this);
        if(num>=50){
          return;
        }else{
          num++;
        }
        count(_self);
      });

      /*减少数量*/
      $(this).find(".minus").click(function () {
        var _self = $(this);
        if(num<=1){
          return;
        }else{
          num--;
        }
        count(_self);
      });


      $(this).find("li").hover(function(){
        $(this).addClass("on").siblings().removeClass("on");
      });

      $(document).click( function() {
        self.find(".js_select").hide();
      });

    });

  };


  var haoli = {
    bg:0,
    index:0,
    $haoli:$("#sec-haoli"),
    $haoliItem:$("#sec-haoli li").not(".link"),
    $Dialogbg:$(".Dialogbg-rules"),
    $Dialog:$(".Dialog-rules"),
    $rules:$(".rules"),
    $closes:$(".closes"),
    chengeBg:function (ele) {
      this.index=ele.index();
      this.bg = ele.data("background");
      this.$haoli.removeClass();
      this.$haoli.addClass(this.bg+this.index);
    },
    Dialog:function (ele) {

      var self = this;
      this.$Dialogbg.fadeIn(300);
      this.$Dialog.fadeIn(300);
      var str = ele.find(".txtHtml").html();
      this.$rules.html(str);

    },
    init:function () {
      var self = this;
      this.$haoliItem.mouseover(function () {
        self.chengeBg($(this));
      });

      this.$haoliItem.click(function () {
        self.Dialog($(this));
      });

      /*关闭*/
      this.$closes.click(function () {
        self.$Dialogbg.fadeOut(300);
        self.$Dialog.fadeOut(300);
        self.$rules.empty();
      });
      this.$Dialogbg.click(function () {
        self.$Dialogbg.fadeOut(300);
        self.$Dialog.fadeOut(300);
        self.$rules.empty();
      });

    }
  };

  function miaosha(ms) {
    /*1立即秒杀  2即将秒杀  0秒杀结束*/
    var state=1;
    $(".miaosha li").each(function () {
      state=$(this).data("state");
      if(state==0){
        $(this).find(".ms-sq").fadeIn(200);
      }else if(state==1){
        $(this).find(".txt").text("立即秒杀");
        $(this).find(".ms-cover").css({
          opacity:0.5
        });
        $(this).hover(function () {
          $(this).find(".ms-start").fadeIn(500);
        },function () {
          $(this).find(".ms-start").fadeOut(200);
        })

      }else if(state==2){
        $(this).find(".ms-cover").css({
          opacity:0.75
        });
        $(this).find(".ms-start").show(0);

        $(this).find(".txt").text("即将秒杀");
      }
    });

    $(".miaosha-wait .swiper-slide").each(function () {
      state=$(this).data("state");
      $(this).find(".cover").css({
        opacity:0.5
      });
      if(state==0){
        $(this).find(".cover").css({
          opacity:0.75
        });
        $(this).find(".text span").text('秒杀结束');
      }else if(state==2){
        $(this).find(".text span").text('即将秒杀');
      }
    });
  }

  function floater(){
    var floater = $('.floater');
    var headerHeight = $(".header").height();

    var msTop =$(".ms-zhuanqu").offset().top>300 ? $(".ms-zhuanqu").offset().top : $(".sec-ad .evt-content").offset().top;

    var fTop = 110; /*导航高度*/
    var floaterPosition =floater.css("position") ;  /*'fixed'*/

    var floaterML = floater.css("marginLeft").split('p')[0]-0;
    var floaterW = floater.width();
    var windowW = $(document).width();

    $(".floater").fadeIn(500);
    /*初始化位置*/
    /*小屏判断*/
    if(windowW < (floaterML+floaterW)*2){
      floater.css({
        position: "fixed",
        top: msTop,
        right:0,
        left:'auto'
      });
    }else{
      floater.css({
        top:msTop,
        position: "fixed",
        right:'auto',
        left:'50%'
      });

    }


    floater.find("li").hover(function () {
      $(this).addClass("on").siblings().removeClass("on");
    });

    floater.find("li").click(function () {
      var index=$(this).index();
      var hotspot=$('.sec-hotspot').eq(index).offset().top;
      $("html,body").animate({scrollTop: hotspot-100}, 1000);
    });


    $(window).resize(function() {
      var windowW = $(document).width();
      /*小屏判断*/
      if(windowW < (floaterML+floaterW)*2){
        floater.css({
          position: "fixed",
          top: msTop,
          right:0,
          left:'auto'
        });
      }else{
        floater.css({
          top:msTop,
          position:"fixed",
          right:'auto',
          left:'50%'
        });
      }
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
  }


  var lastTime = {
    targetTimes:0,
    time:0,
    timer:null,
    init:function (data,onEnd) {

      this.targetTimes = new Date(data).getTime();
      this.start(onEnd);

    },
    Htmls:function (day,hours,minites,seconds) {
      if(day<=0){
        $(".dayout").hide();
      }

      $(".day").html(day);
      $(".hours").html(hours);
      $(".minites").html(minites);
      $(".seconds").html(seconds);

    },
    calculate:function (onEnd) {
      this.time = parseInt((this.targetTimes - new Date().getTime())/1000);

      if(this.time == 0){
        this.end(onEnd);
      } else if(this.time < 0){
        return this.stop();
      }

      var day = Math.floor(this.time / (60 * 60 * 24));
      var hours = Math.floor((this.time-day*24*60*60) / (60 * 60 ));

      var minites = Math.floor(this.time / 60 % 60);
      var seconds = this.time % 60;
      /* console.log(this.time / (60 * 60 * 24));*/
      this.Htmls(day,hours,minites,seconds);
    },
    start:function (onEnd) {
      var self = this;
      this.timer = setInterval(function () {
        self.calculate(onEnd);
      }, 1000);
    },
    end:function (onEnd) {
      typeof onEnd === 'function' && onEnd();
    },
    stop:function () {
      clearInterval(this.timer);

    }
  }


  var loadComplete = function () {

    lastTime.init(__END_DATE__,onEnd);
    Select();
    haoli.init();
    var swiper = new Swiper('.swiper-container', {
      slidesPerGroup:2,
      slidesPerView: 6,
      loop: true,
      freeModeMomentum:true,
      spaceBetween : 20,
      initialSlide: 0,
      autoplay: false  /*5000*/

    });



    $('.arrow-left').on('click', function (e) {
      e.preventDefault();
      swiper.swipePrev();
    });
    $('.arrow-right').on('click', function (e) {
      e.preventDefault();
      swiper.swipeNext();
    });

    miaosha();
    $(".floater").fadeOut(10);
    $("html,body").animate({scrollTop: 0},500,function () {
      floater();
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