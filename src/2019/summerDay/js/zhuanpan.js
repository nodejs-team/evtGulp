/**
 * Created by shimily on 2017/9/29.
 */

+!(function () {

  var $pan = $("#pan"),
      $start = $("#zp-start"),
      $zhuanpanCover = $(".zhuanpan-cover"),
      $zhuanpan = $(".zhuanpan"),
      $zpaward = $(".zhuanpan-award"),
      $award = $(".award"),
      $zpcenter = $(".zhuanpan-center"),
      n=10,
      circle = 360*n,
     /* arr = [0,[1,'小食券'],[3,'小食券'],4,[5,'蛋糕券'],[10,'蛋糕券']];*/
    /*arr = [
    [10,'蛋糕'],
    ['恭喜你获得<br><span>潮流行李箱</span><br><b>价值1398元</b><p>购买冰淇淋蛋糕即可拿到</p>'],
    [10,'蛋糕'],
    ['恭喜你获得<br><span>潮流行李箱</span><br><b>价值1398元</b><p>购买冰淇淋蛋糕即可拿到</p>'],
    ['恭喜你获得<br><span>MCAKE定制帆布袋</span><p>购买冰淇淋蛋糕即可拿到</p>'],
    ['恭喜你获得<br><span>时尚水杯</span><br><b>价值299元</b><p>购买冰淇淋蛋糕即可拿到</p>']
    ],
      angle = [30,90,150,210,270,330]; */ /*对应的旋转角度*/


  arr = [
    ['恭喜你获得<br><span>潮流行李箱</span><br><b>价值1398元</b><p>购买冰淇淋蛋糕即可拿到</p>'],
    ['恭喜你获得<br><span>时尚水杯</span><br><b>价值299元</b><p>购买冰淇淋蛋糕即可拿到</p>'],
    ['恭喜你获得<br><span>10元蛋糕券</span><p>已发放到您的账户</p>'],
    ['恭喜你获得<br><span>潮流行李箱</span><br><b>价值1398元</b><p>购买冰淇淋蛋糕即可拿到</p>'],
    ['恭喜你获得<br><span>MCAKE定制帆布袋</span><p>购买冰淇淋蛋糕即可拿到</p>'],
    ['恭喜你获得<br><span>时尚水杯</span><br><b>价值299元</b><p>购买冰淇淋蛋糕即可拿到</p>']
  ],
    angle = [60,120,180,240,300,360];  /*对应的旋转角度*/


  /*获奖*/
  var awardFun =function (aw) {

    $award.find("span").text(arr[aw][0]);
    $award.find("b").text(arr[aw][1]);
    $award.find(".text").html(arr[aw][0]);
    $zpaward.find(".award-1").show(0);

   /* if(aw==2){
      $zpaward.find(".award-1").hide(0);
      $zpaward.find(".award-2").show(0); /!*蛋糕券*!/
    }
    else{
      $zpaward.find(".award-1").show(0); /!*实物赠品*!/
      $zpaward.find(".award-2").hide(0);
    }*/


    $zhuanpanCover.fadeIn(300);
    $zhuanpan.fadeIn(300);
    $zpaward.fadeIn(300);
   /* $zpcenter.fadeOut(300);*/
  };
  var rotation = function (award){

    if(!isSupportCss3){
      alert("您的浏览器版本过低，请升级浏览器！")
    }

    /*var ang = circle-(award * angle);*/
    var ang = circle+angle[award];

    $pan.rotate({
      animateTo:-ang,
      callback:function () {
        awardFun(award);
      }
    });
  };
  /*转盘抽奖*/
  // $start.click(function () {
  //   rotation(award,angle);
  // });

  function zhuanpan() {
    $zhuanpanCover.fadeIn(200);
    $zhuanpan.fadeIn(300);
    $zpaward.fadeOut(300);
    /*$zpcenter.fadeIn(300);*/

  }

  function jiangpin() {
    $zhuanpanCover.fadeIn(200);
    $zhuanpan.fadeIn(300);
    $zpaward.fadeIn(300);
    awardFun(award);
  }


   /*关闭*/
  $(".closes").click(function () {
    $zhuanpanCover.fadeOut(300);
    $zhuanpan.fadeOut(300);
    /*$pan.rotate(0);复原*/

  });

  $zhuanpanCover.click(function () {
    $zhuanpanCover.fadeOut(200);
    $zhuanpan.fadeOut(300);
    /*$pan.rotate(0);*/
  });


//rotation(award,angle)
  window.rotation = rotation;
  window.jiangpin = jiangpin;
  window.zhuanpan = zhuanpan;




})(window);
