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
      n=5,
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
    ['恭喜您抽中<br><span>5.5元无门槛红包</span><br><b></b><p>已经发送您的账户，请在“会员中心”查看</p>'],
    ['恭喜您抽中<br><span>腾讯视频会员季卡</span><br><b> </b><p>将在活动结束后15个工作日内发送给您</p>'],
    ['恭喜您抽中<br><span>MCAKE夏日潮流水杯</span><p>将在活动结束后15个工作日内寄送给您</p>'],
    ['恭喜您抽中<br><span>5.5元无门槛红包</span><br><b></b><p>已经发送您的账户，请在“会员中心”查看</p>'],
    ['恭喜您抽中<br><span>腾讯视频会员月卡</span><p>将在活动结束后15个工作日内发送给您</p>'],
    ['恭喜您抽中<br><span>30元蛋糕优惠券</span><br><b></b><p>已经发送您的账户，请在“会员中心”查看</p>'],
    ['恭喜您抽中<br><span>历师定制抱枕</span><br><b></b><p>将在活动结束后15个工作日内寄送给您</p>'],
    ['恭喜您抽中<br><span>历师CV大神签名照</span><br><b></b><p>将在活动结束后15个工作日内寄送给您</p>']
  ],
    angle = [23,70,115,160,205,250,291,338];  /*对应的旋转角度*/


  /*获奖*/
  var awardFun =function (aw) {

    /*$award.find(".txt span").text(arr[aw][0]);
    $award.find(".word b").text(arr[aw][1]);*/
    $award.find(".text").html(arr[aw][0]);
    $zpaward.find(".award-1").show(0);

  /*  if(aw==5){
      $zpaward.find(".award-1").hide(0);
      $zpaward.find(".award-2").show(0); 
    }
    else{
      $zpaward.find(".award-1").show(0); 
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
