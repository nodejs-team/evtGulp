/**
 * Created by mcake on 2016/5/24.
 */
(function($){



  var loadComplete = function () {
    $("html,body").animate({scrollTop:0},500);


    /*判断是否支持css3*/
    if(!isSupportCss3){

    }



    /*按钮变色*/
    $(".zn-btn,.buy-yuanbtn,.go-buy,.go-car,.buy-btn").hover(function () {
      $(this).addClass("on");
    },function () {
      $(this).removeClass("on");
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
    newPrice=0,
    dis = 0,  /*通过传值获得折扣*/
    double=0;
  /*d：折扣，
   *isShow:是否显示数量加减按钮，
   *n:默认显示第几磅数
   *db:是否享第二件半价
  */
  function SelectShow(ele,d,isShow,n,db) {
    var ponds = [];
    var prices = [];
    var postids = [];
    var tips = [];
    var time = [];
    var pondsingle = $(ele).data("pond").indexOf(",");
    dis=d;
    double = db;

    /*d为1，说明不打折  db第二件是否半价*/
    if(d==1 && db==0){
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
      $price.html((prices[n]-0).toFixed(2));
      $newprice.html((prices[n]*dis).toFixed(2));
      $(".postid").data('postid',postids[n]);
      $Select.find("li").eq(n).addClass("on").siblings().removeClass("on");
      $(".num").val(1);
      $(".tips").html(tips[n]);
      $(".time").html(time[n]);
      price = prices[n];

      var len = ponds.length;

      for(var i=0; i<len; i++){
        var str = '';
        if(i==n){
          str = '<li class="on" data-pond="'+ponds[i]+'">'+ponds[i]+'</li>';
        }else{
          str += '<li data-pond="'+ponds[i]+'">'+ponds[i]+'</li>';
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

            price = self.data("price");
            totaPrice = price * num;

            if(double){ /*第二件半价*/
              var ix = parseInt(num / 2);  /*向下取整*/
              newPrice = (totaPrice - price/2 * ix)*dis;
            }else{
              newPrice = totaPrice*dis;
            }

            $price.html(totaPrice.toFixed(2));
            $newprice.html((newPrice).toFixed(2));

            $(".tips").html(tips);
            $(".time").html(time);
            self.addClass("on").siblings().removeClass("on");
          });
        });

      }
    }

    $(".Dialogbg-Select,.Dialog-Select").fadeIn(500);
  }

  /*加数量*/
  $(".plus").click(function () {
    if(num>=50){
      return;
    }else{
      num+=1;
    }
    $(".num").val(num);

    totaPrice = price * num;

    if(double){ /*第二件半价*/
      var ix = parseInt(num / 2);  /*向下取整*/
      newPrice = (totaPrice - price/2 * ix)*dis;
    }else{
      newPrice = totaPrice*dis;
    }

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
    totaPrice = price * num;

    if(double){ /*第二件半价*/
      var ix = parseInt(num / 2);  /*向下取整*/
      newPrice = (totaPrice - price/2 * ix)*dis;
    }else{
      newPrice = totaPrice*dis;
    }

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


