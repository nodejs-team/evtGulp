/**
 * Created by shimily on 2019/2/28.  new-people-gift
 */
/*弹窗加入购物车立即订购蛋糕*/
/*d：折扣，
 *isShow:是否显示数量加减按钮，
 *n:默认显示第几磅数
 *db:是否享第二件半价：1享受半价，0不享受半价
 */
;(function () {
  var $Select = $(".Select"),
    $bangshu = $Select.find(".s-bangshu"),
    $price = $Select.find(".s-price"),
    $newprice = $Select.find(".s-new-price");
  var num = 1,
    pond = 2,
    price = 0,
    postid = 0,
    totaPrice=0,
    newPrice=0,
    disArr=0,
    disc=0,
    bs=2,
    disCount=0,
    dis = 0,  /*通过传值获得折扣*/
    double=0;
  /*arr立减
   d：折扣，
   *isShow:是否显示数量加减按钮，
   *n:默认显示第几磅数
   *db:是否享第二件半价
   */
  function SelectShow(ele,arr,d,isShow,n,db) {

    if(typeof ($(ele).data("pond")) == "undefined"){
       return;
    }


    var ponds = [];
    var weight = [];
    var prices = [];
    var postids = [];
    var tips = [];
    var time = [];

    var sku = [];
    var method = [];
    var pid = [];
    var ptype = [];
    var channel = [];
    var pondsingle = $(ele).data("pond").indexOf(",");
    disArr=arr;
    dis=d;
    double = db;


    /*是否有数量加减项*/
    if(!isShow){
      $(".s-num").hide(0);
    }else{
      $(".s-num").show(0);
    }

    /*只有1盒*/
    if(pondsingle<0){
      ponds = $(ele).data("pond").split(',');
      weight = $(ele).data("weight").split(',');
      prices = $(ele).data("price");
      postids = $(ele).data("postid");
      tips = $(ele).data("tips");
      time = $(ele).data("time");

      sku = $(ele).data("sku");
      method = $(ele).data("method");
      pid = $(ele).data("pid");
      ptype = $(ele).data("ptype");
      channel = $(ele).data("channel");

      bs= n; /*当前磅数*/

      /*初始化默认*/
      $(".go-buy,.go-car").attr('data-sku',sku);
      $(".go-buy,.go-car").attr('data-method',method);
      $(".go-buy,.go-car").attr('data-pid',pid);
      $(".go-buy,.go-car").attr('data-ptype',ptype);
      $(".go-buy,.go-car").attr('data-channel',channel);
      $(".go-buy,.go-car").attr('data-num',1);

      disCount = disFun(bs,disArr);

      $price.html((prices-0).toFixed(2));
      $newprice.html(((prices-disCount)*dis).toFixed(2));

      $(".dhquan").html(disCount); /*兑换券*/
      $(".go-buy,.go-car").attr('data-quan',disCount);

      $(".postid").data('postid',postids);
      $Select.find("li").eq(1).addClass("on").siblings().removeClass("on");
      $(".num").val(1);
      $(".tips").html(tips);
      $(".time").html(time);
      price = prices;

      var str = '';
      str = '<li class="on" data-pond="'+ponds+'"><span>'+ponds+'<br><i>'+weight+'</i></span></li>';
      $bangshu.find("ul").append(str);

      /*判断原价和现价是否一致，如果一致，原价不显示；d为1，说明不打折  db第二件是否半价*/
      newPrice = (prices-disCount)*dis;
      if(d==1 && db==0 && newPrice==prices){
        $(".old-p").hide(0);
      }else{
        $(".old-p").show(0);
      }


    }else{  /*多磅数选择*/
      ponds = $(ele).data("pond").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
      weight = $(ele).data("weight").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
      prices = $(ele).data("price").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
      postids = $(ele).data("postid").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
      tips = $(ele).data("tips").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
      time = $(ele).data("time").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});

      sku = $(ele).data("sku").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
      method = $(ele).data("method").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
      pid = $(ele).data("pid").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
      ptype = $(ele).data("ptype").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
      channel = $(ele).data("channel").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});

      /*按磅数立减*/
      bs= ponds[n].replace(/[^\d|.]/g, '')-0; /*当前磅数*/

      /*初始化默认*/
      disCount = disFun(bs,disArr);
      $(".go-buy,.go-car").attr('data-sku',sku[n]);
      $(".go-buy,.go-car").attr('data-method',method[n]);
      $(".go-buy,.go-car").attr('data-pid',pid[n]);
      $(".go-buy,.go-car").attr('data-ptype',ptype[n]);
      $(".go-buy,.go-car").attr('data-channel',channel[n]);
      $(".go-buy,.go-car").attr('data-num',1);
      $(".go-buy,.go-car").attr('data-quan',disCount);

      $(".dhquan").html(disCount); /*兑换券*/

      $price.html((prices[n]-0).toFixed(2));
      $newprice.html(((prices[n]-disCount)*dis).toFixed(2));
      $(".postid").data('postid',postids[n]);
      $Select.find("li").eq(n).addClass("on").siblings().removeClass("on");
      $(".num").val(1);



      $(".tips").html(tips[n]);
      $(".time").html(time[n]);
      price = prices[n];

      /*判断原价和现价是否一致，如果一致，原价不显示；d为1，说明不打折  db第二件是否半价*/
      newPrice = ((prices[n]-disCount)*dis).toFixed(2);
      totaPrice = (prices[n]-0).toFixed(2);
      if(d==1 && db==0 && newPrice==totaPrice){
        $(".old-p").hide(0);
      }else{
        $(".old-p").show(0);
      }

      var len = ponds.length;
      for(var i=0; i<len; i++){
        var str = '';
        if(i==n){
          str = '<li class="on" data-pond="'+ponds[i]+'"><span>'+ponds[i]+'<br><i>'+weight[i]+'</i></span></li>';
        }else{
          str += '<li data-pond="'+ponds[i]+'"><span>'+ponds[i]+'<br><i>'+weight[i]+'</i></span></li>';
        }

        $bangshu.find("ul").append(str);


        /*****磅数选择******/
        $bangshu.find("li").each(function (i) {
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

            /*按磅数立减*/
            bs= ponds[i].replace(/[^\d|.]/g, '')-0; /*当前磅数*/
            disCount = disFun(bs,disArr);

            price = self.data("price");
            totaPrice = (price) * num;

            if(double){ /*第二件半价*/
              var ix = parseInt(num / 2);  /*向下取整*/
              newPrice = (totaPrice - price/2 * ix)*dis;
            }else{
              newPrice = totaPrice*dis-disCount*num;
            }


            $price.html(totaPrice.toFixed(2));
            $newprice.html((newPrice).toFixed(2));

            $(".tips").html(tips);
            $(".time").html(time);
            $(".dhquan").html(disCount); /*兑换券*/
            $(".go-buy,.go-car").attr('data-sku',sku[i]);
            $(".go-buy,.go-car").attr('data-method',method[i]);
            $(".go-buy,.go-car").attr('data-pid',pid[i]);
            $(".go-buy,.go-car").attr('data-ptype',ptype[i]);
            $(".go-buy,.go-car").attr('data-channel',channel[i]);
            $(".go-buy,.go-car").attr('data-num',num);
            $(".go-buy,.go-car").attr('data-quan',disCount);

            self.addClass("on").siblings().removeClass("on");
          });
        });

      }
    }

    $(".Dialogbg-Select,.Dialog-Select").fadeIn(500);
  }
  /*折扣：通过判断磅数决定减多少   增加1.5磅，2.5磅，3.5磅立减 2019-1-28*/
  function disFun(bs,discount) {

    switch (bs){
      case 1:
        disc = discount[0];
        break;
      case 1.5:
        disc = discount[0];
        break;
      case 2:
        disc = discount[1];
        break;
      case 2.5:
        disc = discount[1];
        break;
      case 3:
        disc = discount[2];
        break;
      case 3.5:
        disc = discount[2];
        break;
      case 5:
        disc = discount[3];
        break;
      case 5.5:
        disc = discount[3];
        break;
    }
    return disc;
  }
  /*加数量*/
  $(".plus").click(function () {
    if(num>=50){
      return;
    }else{
      num+=1;
    }
    $(".num").val(num);

    /*按磅数立减*/
    disCount = disFun(bs,disArr);
    totaPrice = (price) * num;

    if(double){ /*第二件半价*/
      var ix = parseInt(num / 2);  /*向下取整*/
      newPrice = (totaPrice - price/2 * ix)*dis;
    }else{
      newPrice = totaPrice*dis-disCount*num;
    }
    $(".go-buy,.go-car").attr('data-num',num);
    $price.html(totaPrice.toFixed(2));
    $newprice.html((newPrice).toFixed(2));
  });

  /*减数量*/
  $(".minus").click(function () {
    if(num<=1){
      return;
    }else{
      num-=1;
    }
    $(".num").val(num);

    /*按磅数立减*/
    disCount = disFun(bs,disArr);
    totaPrice = (price) * num;

    if(double){ /*第二件半价*/
      var ix = parseInt(num / 2);  /*向下取整*/
      newPrice = (totaPrice - price/2 * ix)*dis;
    }else{
      newPrice = totaPrice*dis-disCount*num;
    }
    $(".go-buy,.go-car").attr('data-num',num);
    $price.html(totaPrice.toFixed(2));
    $newprice.html((newPrice).toFixed(2));
  });

  function SelectHide() {
    num = 1;
    $bangshu.find("ul").empty();
    $(".Dialogbg-Select,.Dialog-Select").fadeOut(0);
  }

  $(".Dialogbg-Select").click(function () {
    SelectHide();
  });

  /*换购*/
  $(".pro-list .row").find('.huangou').each(function () {
    var a = false;
    $(this).click(function () {
      if(!a){
        $(this).find(".icon").addClass("on");
        a = !a;
      }else{
        $(this).find(".icon").removeClass("on");
        a = !a;
      }
    });
  });

  window.SelectShow = SelectShow;
  window.SelectHide = SelectHide;


  /*使用方法：
   $(".zhekou .prolist li").each(function () {
   var self = this;
   $(this).find('.m-btn,.m-car').click(function () {
   SelectShow(self,[0,0,0,0],1,true,1,0);
   })
   });
   $(".go-car").click(function () {
   SelectHide();
   });
   $(".go-buy,.s-closes").click(function () {
   SelectHide();
   });*/

})();


