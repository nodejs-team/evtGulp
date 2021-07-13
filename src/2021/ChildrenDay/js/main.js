/*
 * Created by mcake on 2016/5/24.
 */
(function($){

  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500);

    /*蛋糕折扣*/
    $(".productLi").each(function () {
      var self = this;
      $(this).find('.btns').click(function () {
        SelectShow(self,[0,0,0,0],1,true,0,0);
        if(!isSupportCss3){
          $(".s-bangshu li,.go-car,.go-buy").addClass('ie8');
        }
      });
    });

    $(".go-car").click(function () {
      SelectHide();
    });
    $(".go-buy").click(function () {
      SelectHide();
    });
    $(".s-closes").click(function () {
      SelectHide();
    });

    var game = {
        $Dialogbg:$(".Dialogbg-bubble"),
        $Dialog:$(".Dialog-bubble"),
        $closes:$(".closes"),
        $quan:$(".Dialog-quan"),
        $goUse:$(".go-use"),
        num:0,
        uimg:0,
        a:false,
        time:null,
        bubblesW:parseFloat($(".bubbleBig").width()),
        bubblesH:parseFloat($(".bubbleBig").height()),
        quanFade:function (n) {
          this.$Dialogbg.fadeIn(100);
          this.$Dialog.fadeIn(100);
          this.$Dialog.find(".bubble-"+n).fadeIn(100).siblings(".bubble").not(".closes").hide();
        },
        select:function () {
          var self = this;
          $(".uimg li").each(function (i) {
            $(this).find(".select").click(function () {
              $(".select").removeClass("on");
              $(this).addClass("on");
              self.uimg = i+1;
            })
          })
        },
        closeFun:function () {
          this.$Dialogbg.fadeOut(300);
          this.$Dialog.fadeOut(300);
          this.$quan.fadeOut(300);
        },
        choujiang:function (n) {
          if(!this.a){
            this.$quan.fadeIn(100);
            this.$quan.find(".quan-"+n).fadeIn(100).siblings().not(".closes").hide();
            this.a=true;
          }

        },
        step1:function () {
          this.quanFade(1);

        },
        step2:function () {
          var self = this;
          this.quanFade(2);
          this.select();
        },
        step3:function () {
          var self = this;
          this.quanFade(3);
          this.countdown();
          $(".start").click(function () {
            self.num+=15;
            if(self.num>=80){
              self.num=80;
              $(".bubbleBig").addClass("p");
              setTimeout(function () {
                // self.closeFun();
                this.a=false;
                clearTimeout(self.time);
                $(".bubble-time").fadeOut(10);
               // self.choujiang(result);
                choujiang();
              },500)
              //self.closeFun();
              // QuanDialog(1);  //抽奖
            }

            $(".bubbleBig").stop().animate({width:"+="+self.num+"px",height:"+="+self.num+"px",top:"-="+self.num/2+"px",left:"-="+self.num/2+"px"},500);

          });
        },
        countdown:function () {
          var self = this;
          var countdown=10;
          function settime(obj) {
            if (countdown < 0) {
              //self.closeFun();
              //self.choujiang(result);
              choujiang();
              countdown = 10;
              return;
            } else {
              obj.text("倒计时："+countdown+"s");
              countdown--;
            }
            self.time = setTimeout(function() {
              settime(obj);
            },1000);
          }
          settime($(".bubble-time"));
        },
        event:function () {
          var self = this;
            $(".bubble-1 .go").click(function () {
               self.step2();
            });
            $(".bubble-2 .confirm").click(function () {
              self.step3();
              $(this).attr("data-uimg",self.uimg);
              $(".uimg-big").addClass("uimg-big-"+self.uimg);
            });
            this.$closes.click(function () {
              self.closeFun();
            })
            this.$goUse.click(function () {
              self.closeFun();
            })
        },
        init:function () {
           /*this.step1();*/
           this.event();

        }
    }


    window.game = game;
    game.init();

    /*指定锚点跳转位置*/
    function scrollTopAni(ele,callback) {
      var sTop = $(ele).offset().top;
      $("html,body").animate({scrollTop:sTop-110},500,function () {
        callback && callback();
      });
    }
    $(".go-use1").click(function () {
      scrollTopAni("#cake1");
    });

    $(".go-use2").click(function () {
      scrollTopAni("#cake2");
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
/*阻止页面内容被选中*/
document.body.onselectstart = function () {
  return false;
};




var $Dialogbg = $(".Dialogbg-quan"),
  $Dialog=$(".Dialog-quan"),
  $rules=$(".quan"),
  $card=$(".card"),
  $goUse=$(".go-use"),
  $closes=$(".closes");

function QuanDialog(n) {
  $Dialogbg.fadeIn(100);
  $Dialog.fadeIn(100);
  $Dialog.find(".quan-"+n).fadeIn(100).siblings().not(".closes").hide();
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

window.QuanDialog = QuanDialog

