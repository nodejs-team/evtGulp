/*
 * Created by mcake on 2016/5/24.
 */
(function($){

  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500);


    function xiaoshi(els,opts,disArr) {
      this.$els = $(els);
      this.$add = this.$els.find(opts.add);
      this.$reduce = this.$els.find(opts.reduce);
      this.num=1;
      this.max=50;
      this.oldPrice =0;
      this.totalPrice =0;
      this.newPrice =0;
      this.disArr = disArr;
      this.dis = 0;
      this._init();
    }

    xiaoshi.prototype={
      add:function (ele) {
        var self = this;
        self.num = ele.parents("li").find('.num').text()-0;

        if(self.num<self.max){
          self.num++;
        }
        ele.siblings().find('.num').text(self.num);
        self.counts(ele);

      },
      reduce:function (ele) {
        var self = this;
        self.num = ele.parents("li").find('.num').text()-0;
        if(self.num>1){
          self.num--;
        }
        ele.siblings().find('.num').text(self.num);
        self.counts(ele);
      },
      /*价格计算*/
      counts:function (ele) {
        var self = this;
        self.oldPrice = ele.parents("li").data('oldprice');
        self.totalPrice =self.oldPrice * self.num;

        self.newPrice = self.totalPrice-self.oldPrice*(Math.floor((self.num/2))*(1-self.disArr[1]));
       /* self.newPrice = self.totalPrice-self.oldPrice*(Math.floor((self.num/2))*0.3+Math.floor((self.num/3))*0.4);  第二件7折，第三件6折*/
        ele.parents("li").find('.old-price').html(self.totalPrice.toFixed(2));  /*原价*/
        ele.parents("li").find('.new-price').html(self.newPrice.toFixed(2)); /*现价*/
        ele.parents("li").find('.go-btn').attr("data-num",self.num);
      },
      /*初始化*/
      initialize:function () {
        var self = this;
        this.$els.find("li").each(function () {
          self.oldPrice = $(this).data('oldprice');
          self.num = $(this).find(".num").text()-0;
          self.totalPrice = self.oldPrice*self.num;
          self.newPrice = self.totalPrice-self.oldPrice*(Math.floor((self.num/2))*(1-self.disArr[1]));
          $(this).find(".old-price").text(self.totalPrice);
          $(this).find(".new-price").text(self.newPrice.toFixed(2));
          $(this).find('.go-btn').attr("data-num",self.num);
        });
      },
      _init:function () {
        var self = this;
        this.initialize();
        this.$add.click(function () {
          self.add($(this));
        });
        this.$reduce.click(function () {
          self.reduce($(this));
        });
      }
    };
    new xiaoshi('.select-li',{
      add:'.add',
      reduce:'.reduce'
    },[1,0.6]);  /*第二件6折*/

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



(function () {
  /*领取优惠券*/
  var $Dialogbg = $(".Dialogbg-quan"),
    $Dialog=$(".Dialog-quan"),
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

  window.QuanDialog = QuanDialog;

})(window);
