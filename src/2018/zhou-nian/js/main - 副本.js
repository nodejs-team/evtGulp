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

  /*头部移动*/
  function bannerMove() {
    $(window).scroll(function () {
      var distance = $(document).scrollTop()/10;
      var height = $(".sec-banner").height();
      var percent = distance/height*100;
      var dis=1+Math.min(9,percent);

      $(".banner-l").css({top:-dis*30+130,left:-dis*4+'%'});
      $(".banner-r").css({bottom:-dis*30,right:-dis*4.5+'%'});
     /* $(".banner-l").css({top:-dis*50+100,left:-dis*100});
      $(".banner-r").css({bottom:-dis*50+100,right:-dis*100});*/
    });
  }

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


  /*抽奖弹窗*/
  (function () {
      var $Dialogbg = $(".Dialogbg-tip"),
        $Dialog=$(".Dialog-tip"),
        $rules=$(".tip"),
        $goUse=$(".go-wait"),
        $closesx=$(".closesx");

      function QuanDialog(n,arr) {
        $Dialogbg.fadeIn(300);
        $Dialog.fadeIn(300);
        $Dialog.find(".jp-leve").html(arr[n].leve);
        $Dialog.find(".jp-name").html(arr[n].name);
        $Dialog.find(".jp-price").html(arr[n].price);
        $Dialog.find(".jp").css({"background":"url('https://act.mcake.com/fangli/2018/pc/zhou-nian/images/jiang-"+(n+1)+".png') center","background-size":"cover"});
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


  /*指定锚点跳转位置*/
  function scrollTopAni(ele,callback) {
    var sTop = $(ele).offset().top;
    $("html,body").animate({scrollTop:sTop},500,function () {
      callback && callback();
    });
  }
  /*活动规则*/
  var guize = {
    bg:0,
    index:0,
    $haoli:$("#sec-haoli"),
    $haoliItem:$(".guize-btn"),
    $Dialogbg:$(".Dialogbg-rules"),
    $Dialog:$(".Dialog-rules"),
    $rules:$(".rules"),
    $closes:$(".closes"),
    Dialog:function (ele) {
      var self = this;
      this.$Dialogbg.fadeIn(300);
      this.$Dialog.fadeIn(300);
      var str = ele.find(".txtHtml").html();
      this.$rules.html(str);

    },
    init:function () {
      var self = this;

      this.$haoliItem.click(function () {
        self.Dialog($(this));
      });

      /*关闭*/
      this.$closes.click(function () {
        self.$Dialogbg.fadeOut(300);
        self.$Dialog.fadeOut(300,function () {
          self.$rules.empty();
        });

      });
      this.$Dialogbg.click(function () {
        self.$Dialogbg.fadeOut(300);
        self.$Dialog.fadeOut(300,function () {
          self.$rules.empty();
        });

      });

    }
  };

  var loadComplete = function () {
    $("html,body").animate({scrollTop:0},500);
    /*排行榜滚动*/
    if($("#ul1 li").length>5){
            roll();
     }
    if($("#ul3 li").length>3){
        roll2();
    }

    /*头屏计算*/
    banner();
    $(window).resize(function () {
      banner();
    });
    /*滚动，banner放大*/
    bannerMove();

    if(!isSupportCss3){
        $(".xiaofei,.juhui").addClass("border-ie8");
        $(".banner-l,.banner-r").addClass("ie8");
    }

    $(".prizeImg").not(':first').fadeOut(0);

    /*Top 消费 奖品切换*/
    $(".prize-nub li").hover(function () {
      var idx = $(this).index();
      $(this).addClass("on").siblings().removeClass("on");
      $(".prize .prizeImg").eq(idx).fadeIn(10).siblings().fadeOut(0);

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

    /*按钮变色*/
    $(".zn-btn,.buy-yuanbtn,.m-car,.m-btn,.go-buy,go-car").hover(function () {
      $(this).addClass("on");
    },function () {
      $(this).removeClass("on");
    });

    $(".buy-btn").hover(function () {
      $(this).addClass("on").siblings().removeClass("on");
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

    /*活动规则*/
    guize.init();

    /*指定锚点跳转位置*/

    $(".whdlink").click(function () {
      scrollTopAni("#whd");
    });
    $(".zuhelink").click(function () {
      $(".zuhecard").fadeOut(0);
      scrollTopAni("#quanli",function () {
        $(".zuhe-1").slideDown(500,function () {
          $(".zuhe-3").slideDown(500,function () {
            $(".zuhe-2").slideDown(500,function () {
              $(".zuhe-4").slideDown(500,function () {
                $(".zuhe-5").slideDown(600);
              });
            });
          });
        });
      });
    });
    $(".xplink").click(function () {
      scrollTopAni("#xp");
    });

    $(".zclink").click(function () {
      scrollTopAni("#zhekou");
    });

    $(".toplink").click(function () {
      scrollTopAni("#Top");
    });

    $(".manzenglink").click(function () {
      scrollTopAni("#lb");
    });

    $(".yuan1link").click(function () {
      scrollTopAni("#1yuan");
    });
    $(".qingshenglink").click(function () {
      scrollTopAni("#kh");
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

(function () {
  var $Select = $(".Select"),
    $bangshu = $Select.find(".s-bangshu"),
    $price = $Select.find(".s-price"),
    $newprice = $Select.find(".s-new-price");
  var num = 1,
    pond = 2,
    price = 0,
    postid = 0,
    totaPrice=0,
    dis = 0;  /*通过传值获得折扣*/
  /*数量选择*/
  function SelectShow(ele,d,isShow) {
    var ponds = [];
    var prices = [];
    var postids = [];
    var tips = [];
    var time = [];
    var pondsingle = $(ele).data("pond").indexOf(",");
    dis=d;
    /*d为1，说明不打折*/
    if(d==1){
      $(".old-p").hide(0);
    }else{
      $(".old-p").show(0);
    }
    /*是否有数量加减项*/
    if(!isShow){
      $(".s-num").hide(0);
    }else{
      $(".s-num").show(0);
    }
    /*只有1盒*/
    if(pondsingle<0){
      ponds = $(ele).data("pond").split(',');
      prices = $(ele).data("price");
      postids = $(ele).data("postid");
      tips = $(ele).data("tips");
      time = $(ele).data("time");


      /*初始化默认*/
      $price.html(prices.toFixed(2));
      $newprice.html((prices*dis).toFixed(2));

      $(".postid").data('postid',postids);
      $Select.find("li").eq(1).addClass("on").siblings().removeClass("on");
      $(".num").val(1);
      $(".tips").html(tips);
      $(".time").html(time);
      price = prices;

      var str = '';
      str = '<li class="on" data-pond="'+ponds+'">'+ponds+'</li>';
      $bangshu.find("ul").append(str);


    }else{  /*多磅数选择*/
      ponds = $(ele).data("pond").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
      prices = $(ele).data("price").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
      postids = $(ele).data("postid").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
      tips = $(ele).data("tips").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
      time = $(ele).data("time").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});


      /*初始化默认*/
      $price.html((prices[1]-0).toFixed(2));
      $newprice.html((prices[1]*dis).toFixed(2));
      $(".postid").data('postid',postids[1]);
      $Select.find("li").eq(1).addClass("on").siblings().removeClass("on");
      $(".num").val(1);
      $(".tips").html(tips[1]);
      $(".time").html(time[1]);
      price = prices[1];

      var len = ponds.length;

      for(var i=0; i<len; i++){
        var str = '';
        if(i==1){
          str = '<li class="on" data-pond="'+ponds[i]+'">'+ponds[i]+'</li>';
        }else{
          str += '<li data-pond="'+ponds[i]+'">'+ponds[i]+'</li>';
        }

        $bangshu.find("ul").append(str);

        $bangshu.find("li").each(function (i) {  /*磅数选择*/
          var self = $(this);
          $(this).data("price",prices[i]);
          $(this).data("postid",postids[i]);
          $(this).data("tips",tips[i]);
          $(this).data("time",time[i]);

          $(this).click(function () {
            postid = self.data("postid");
            tips = self.data("tips");
            time = self.data("time");
            $(".postid").data('postid',postid);

            price = self.data("price");
            totaPrice = price * num;
            $price.html(totaPrice.toFixed(2));
            $newprice.html((totaPrice*dis).toFixed(2));
            $(".tips").html(tips);
            $(".time").html(time);
            self.addClass("on").siblings().removeClass("on");
          });
        });

      }
    }

    $(".Dialogbg-Select,.Dialog-Select").fadeIn(500);
  }

  /*加*/
  $(".plus").click(function () {
    if(num>=50){
      return;
    }else{
      num+=1;
    }
    $(".num").val(num);

    totaPrice = price * num;
    $price.html(totaPrice.toFixed(2));
    $newprice.html((totaPrice*dis).toFixed(2));
  });

  /*减*/
  $(".minus").click(function () {
    if(num<=1){
      return;
    }else{
      num-=1;
    }
    $(".num").val(num);
    totaPrice = price * num;
    $price.html(totaPrice.toFixed(2));
    $newprice.html((totaPrice*dis).toFixed(2));
  });

  function SelectHide() {
    num = 1;
    $bangshu.find("ul").empty();
    $(".Dialogbg-Select,.Dialog-Select").fadeOut(0);
  }

  $(".Dialogbg-Select").click(function () {
    SelectHide();
  });


  window.SelectShow = SelectShow;
  window.SelectHide = SelectHide;


  /*使用方法：
   $(".prolist li").each(function () {
   var self = this;
   $(this).find('.m-btn,.m-car').click(function () {
   SelectShow(self);
   })
   });
   $(".go-car").click(function () {
   SelectHide();
   });
   $(".go-buy,.s-closes").click(function () {
   SelectHide();
   });*/

})();


