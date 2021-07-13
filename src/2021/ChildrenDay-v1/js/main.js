/*
 * Created by mcake on 2016/5/24.
 */
(function($){

  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500);

    var game={
        $clow:$(".clow"),
        $left:$(".machine-btn-left"),
        $start:$(".machine-btn-start"),
        $right:$(".machine-btn-right"),
        distance:10,
        maxdistance:170,
        moveDistance:0,
        catchs:'catch1',
        left:parseFloat($(".clow").css("marginLeft")),
        moveLeft:function (n) {
          this.moveDistance=this.left+n;
          this.$clow.stop().animate({marginLeft:this.moveDistance+"px"},100);
        },
        moveRight:function (n) {
          this.moveDistance=this.left+n;
          this.$clow.stop().animate({marginLeft:this.moveDistance+"px"},100);
        },
        event:function () {
          var self = this;

          this.$left.click(function () {
            self.distance-=50;
            if(self.distance<=-self.maxdistance){
              self.distance=-self.maxdistance;

            }
            if(self.distance>=-self.maxdistance && self.distance<=-self.maxdistance+40){
              self.catchs="catch2";
            }else{
              self.catchs="catch1";
            }

            self.moveLeft(self.distance);
          });
          this.$right.click(function () {
            self.distance+=50;
            if(self.distance>=self.maxdistance){
              self.distance=self.maxdistance;
            }
            if(self.distance>=self.maxdistance-40 && self.distance<=self.maxdistance){
              self.catchs="catch2";
            }else{
              self.catchs="catch1";
            }
            self.moveRight(self.distance);
          });
        },
        gameStart:function () {
          var self = this;
          /*this.$start.click(function () {

           $(".clow").addClass(self.catch);

            setTimeout(function () {
              QuanDialog(winPrize.num);
              self.$clow.removeClass(self.catch);
            },1500);
          });*/
          this.event();
        }
    }

    window.game = game;
    game.gameStart()





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

