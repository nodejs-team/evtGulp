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
      arr = [0,[1,'小食券'],[3,'小食券'],4,[5,'蛋糕券'],[10,'蛋糕券']];

  /*获奖*/
  var awardFun =function (aw) {

    $award.find("span").text(arr[aw][0]);
    $award.find("b").text(arr[aw][1]);

    if(aw==0){
      $zpaward.find(".award-1").show(0);/*汉堡王*/
    }else if(aw==1 ||aw==2 ||aw==4 ||aw==5){
      $zpaward.find(".award-2").show(0); /*优惠券*/
    }else{
      $zpaward.find(".award-3").show(0); /*谢谢参与*/
    }


    $zpaward.fadeIn(300);
    $zpcenter.fadeOut(300);
  };
  var rotation = function (award,angle){
    $pan.rotate({
      animateTo:circle-(award * angle),
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
    $zpcenter.fadeIn(300);

  }
  
  function jiangpin() {
    $zhuanpanCover.fadeIn(200);
    $zhuanpan.fadeIn(300);
    $zpaward.fadeIn(300);
    awardFun(award);
  }


   /*关闭*/
  $(".closes").click(function () {
    $zhuanpanCover.fadeOut(200);
    $zhuanpan.fadeOut(300);
  });

  $zhuanpanCover.click(function () {
    $zhuanpanCover.fadeOut(200);
    $zhuanpan.fadeOut(300);
  });


//rotation(award,angle)
  window.rotation = rotation;
  window.jiangpin = jiangpin;
  window.zhuanpan = zhuanpan;

})(window);
