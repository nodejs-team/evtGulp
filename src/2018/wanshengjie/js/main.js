/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  /*计算banner整平的高度*/
  function bannerHeight() {
    var winH = $(window).height();
    return winH;
  }

  /*banner整屏幕自适应*/
  function banner() {
    var bannerH= bannerHeight();
    $(".sec-banner").height(bannerH-100);
    $(".bannerbg").height(bannerH*1.5);
  }

  var game = {
    /*开门*/
    openDoor:function (ele,open) {
      var self = this;
      ele.find(".room").delay(200).fadeIn(500);
      ele.find(".nangua").animate({"margin-left":"-311px"},1000);
      ele.find(".shuigang").animate({"margin-left":"85px"},1000);
      ele.find(".paopao").animate({"margin-left":"140px"},1000);
      ele.find(".door-left").delay(200).animate({"left":"0"},800);
      ele.find(".door-right").delay(200).animate({"right":"0"},800,function () {
        if(open){
          self.openBox();
        }
      });
    },
    /*开箱子*/
    openBox:function () {
      $(".box-1").fadeOut(0);
      $(".box-2").fadeIn(100);
      $(".card").addClass("fly");
    },
    /*蛋糕下落*/
    cakeDrop:function () {
      $(".cake-0").animate({"top":"0"},800);
    },
    /*进行抽奖*/
    award:function (card,callback) {
      card.addClass("a-flip");
      setTimeout(function () {
        callback && callback();
        card.removeClass("a-flip");
      },800);
    },
    tips:function () {
      alert("为了更好体验“萌鬼万圣节”带来的惊喜\n请升级您的浏览器!");
    },
    init:function () {
      var self = this;
      /*敲门*/
      var knock = document.getElementById("knock");
      $(".sec-1 .qm-shou").click(function () {
        if(!isSupportCss3){
          self.tips();
        }
        $(".box-2").fadeOut();
        var that = $(this);
        knock.play();
        $(this).addClass('qiaomen');
        $(this).parents(".sec-1").find(".qm-word").delay(1000).fadeIn(500,function () {
          that.parents(".sec-1").find(".qm-shou,.qm-word,.qm-acrow").delay(500).fadeOut(400,function () {
            self.openDoor(that.parents(".sec-1"),true);
          });
        });
      });

      $(".sec-2 .qm-shou").click(function () {
        if(!isSupportCss3){
          self.tips();
        }
        var that = $(this);
        knock.play();
        $(this).addClass('qiaomen');
        $(this).parents(".sec-2").find(".qm-word").delay(1000).fadeIn(500,function () {
          that.parents(".sec-2").find(".qm-shou,.qm-word,.qm-acrow").delay(500).fadeOut(400,function () {
            self.openDoor(that.parents(".sec-2"),false);
          });
        });
      });


      $(".yanjing").click(function () {
        self.cakeDrop();
      });


      /*ie8*/
      if(!isSupportCss3){
        $(".door-left").css({"left":"0"});
        $(".door-right").css({"right":"0"});
        $(".qm-shou,.qm-word,.qm-acrow").fadeOut(400);
        $(".room").fadeIn(500);
        $(".card").addClass("on");
        $(".nangua").css({"margin-left":"-311px"});
        $(".shuigang").css({"margin-left":"85px"});
        $(".paopao").css({"margin-left":"140px"});
        $(".box-1").fadeOut(0);
        $(".box-2").show();
      }
      /*$(".door-left").css({"left":"0"});
      $(".door-right").css({"right":"0"});
      $(".qm-shou,.qm-word,.qm-acrow").fadeOut(400);
      $(".room").fadeIn(500);
      $(".card").addClass("on");
      $(".nangua").css({"margin-left":"-311px"});
      $(".shuigang").css({"margin-left":"85px"});
      $(".paopao").css({"margin-left":"140px"});*/

    }
  };

  window.game = game;

  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500,function () {});
    /*头屏计算*/
    banner();
    game.init();

    /*按钮变色*/
    $(".go-btn span,.go-buy,.swiper-button-next,.swiper-button-prev").hover(function () {
      $(this).addClass("on");
    },function () {
      $(this).removeClass("on");
    });



    var swiper1 = new Swiper('.swiper1', {
      pagination: '.pagination1',
      grabCursor: true,
      loop:true,
      autoplay : false,
      paginationClickable: true
    });

    $('.button-prev1').on('click', function(e){
      e.preventDefault()
      swiper1.swipePrev()
    });
    $('.button-next1').on('click', function(e){
      e.preventDefault()
      swiper1.swipeNext()
    });

    var swiper2 = new Swiper('.swiper2', {
      grabCursor: true,
      loop:true,
      autoplay : false,
      autoplayDisableOnInteraction : false,
      paginationClickable: true
    });

    $('.button-prev2').on('click', function(e){
      e.preventDefault()
      swiper2.swipePrev()
    });
    $('.button-next2').on('click', function(e){
      e.preventDefault()
      swiper2.swipeNext()
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


/*抽奖弹窗*/
(function () {
  var $Dialogbg = $(".Dialogbg-tip"),
    $Dialog=$(".Dialog-tip"),
    $rules=$(".tip"),
    $goUse=$(".go-btn"),
    $closesx=$(".closesx");

  function QuanDialog(n,arr) {
    $Dialogbg.fadeIn(300);
    $Dialog.fadeIn(300);
    $Dialog.find(".jp-leve").addClass("leve-"+n);
    $Dialog.find(".jp-quan").addClass("quan-"+n);

    if(n==0){
      $(".tips-word").css({top:"200px",opacity:0});
      $(".quans-1").fadeOut(0);
      $(".quans-2").fadeIn(100,function () {
        $(".tips-word").animate({top:"90px",opacity:0.8},800);
        $(".tips-word").delay(3000).animate({opacity:0},500,function () {
          $(".tips-word").css({top:"200px",opacity:0});
        });
      });
    }else{
      $(".quans-1").fadeIn(0);
      $(".quans-2").fadeOut(0);
      $Dialog.find(".jp-name").html(arr[n].name);
    }

  }

  /*关闭*/
  $closesx.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
  });

  $goUse.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
  });
  window.QuanDialog = QuanDialog;
})();