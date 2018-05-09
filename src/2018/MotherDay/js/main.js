/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  /*主页磅数选择
  * 1磅减40元，
  * 2磅减60元，
  * 3磅减80元，
  * 5磅减140元
  * */
  function Price(els,opts,dis) {
    this.$els = $(els);
    this.$add = this.$els.find(opts.add);
    this.$reduce = this.$els.find(opts.reduce);
    this.num=0;
    this.max=50;
    this.oldPrice =0;
    self.bs = 0;
    this.totalOldprice =0;
    this.totalPrice =0;
    this.dis = 0;
    // this.disArr=[20,30,40,60];
    this.disArr=dis;
    this.disCount = 0;
    this._init();
  }

  Price.prototype={
    add:function (ele) {
      var self = this;
      self.num = ele.parents(".price").find('.num').text()-0;
      if(self.num<self.max){
        self.num++;
      }
      ele.siblings().find('.num').text(self.num);
      self.numCounts(ele);
    },
    reduce:function (ele) {
      var self = this;
      self.num = ele.parents(".price").find('.num').text()-0;
      if(self.num>1){
        self.num--;
      }
      ele.siblings().find('.num').text(self.num);
      self.numCounts(ele);
    },
    /*数量加减后计算价格*/
    numCounts:function (ele) {
      var self = this;
      var cur = ele.parents(".price").find('.price_p li.cur');
      self.oldPrice = cur.data('oldprice');
      self.num = ele.parents(".price").find('.num').text()-0;
      var ix = parseInt(self.num / 2);

      self.bs = cur.data('bs');
      self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/

      self.totalOldprice =self.oldPrice * self.num;
      self.totalPrice =(self.oldPrice-self.disCount) * self.num;

      ele.parents(".price").find('.old-price').html(self.totalOldprice);  /*原价*/
      ele.parents(".price").find('.now-price').html(self.totalPrice); /*现价*/

      ele.parents(".price").find('.disc span').html(self.num*self.disCount);  /*显示立减金额*/
    },
    /*磅数选择后计算价格*/
    counts:function (ele) {
      var self = this;
      self.oldPrice = ele.data('oldprice');
      self.num = ele.parents(".price").find('.num').text()-0;
     /* var ix = parseInt(self.num / 2);*/

      self.bs = ele.data('bs');

      self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/

      self.totalOldprice =self.oldPrice * self.num;
      self.totalPrice =(self.oldPrice-self.disCount) * self.num;

      ele.parents(".price").find('.old-price').html(self.totalOldprice);
      ele.parents(".price").find('.now-price').html(self.totalPrice);

      ele.parents(".price").find('.disc span').html(self.num*self.disCount);  /*显示立减金额*/
    },
    /*折扣：通过判断磅数决定减多少*/
    disFun:function (bs,discount) {
      switch (bs){
        case 1:
          this.dis = discount[0];
          break;
        case 2:
          this.dis = discount[1];
          break;
        case 3:
          this.dis = discount[2];
          break;
        case 5:
          this.dis = discount[3];
          break;
      }
      return this.dis;
    },
    /*磅数选择*/
    bsSelect:function (ele) {
      var self = this;

      ele.hover(function () {
        ele.addClass('hover').siblings().removeClass('hover');
      },function () {
        ele.removeClass('hover');
      });
      ele.click(function () {
        ele.addClass('cur').siblings().removeClass('cur');
        self.counts($(this));
      });
    },
    /*初始化数量和价格*/
    numInit:function () {
      var self = this;
      var Oldprice = 0;

      this.$els.each(function () {
        Oldprice = $(this).find('.price_p li.cur').data('oldprice');
        var totalNum = $(this).find(".num").text()-0;
        var totalOldprice = Oldprice * totalNum;
        /*var ix = parseInt(totalNum / 2);*/

        self.bs = $(this).find('.price_p li.cur').data('bs');
        self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/
        var totalPrice =(Oldprice-self.disCount) * totalNum;

        $(this).find('.old-price').html(totalOldprice);
        $(this).find('.now-price').html(totalPrice);
      });

    },

    _init:function () {
      var self = this;
      this.numInit();

      this.$els.find('.price_p li').each(function () {
        self.bsSelect($(this));
      });

      /*换购*/
      this.$els.find('.huangou').each(function () {
        var a = false;
        $(this).click(function () {
          if(a){
            $(this).find(".icon").addClass("on");
            a = false;
          }else{
            $(this).find(".icon").removeClass("on");
            a = true;
          }
        });
      });

      this.$add.hover(function () {
        $(this).addClass("on");
      },function () {
        $(this).removeClass("on");
      });
      this.$reduce.hover(function () {
        $(this).addClass("on");
      },function () {
        $(this).removeClass("on");
      });

      this.$add.click(function () {
        self.add($(this));
      });
      this.$reduce.click(function () {
        self.reduce($(this));
      });
    }
  };


  function floater(){
    var floater = $('.floater');
    var headerHeight = $(".header").height();
    var floaterHeight = $('.floater').height();
    var msTop =$(".sec-1").offset().top;
    var fTop = 110; /*导航高度*/
    var floaterPosition =floater.css("position") ;  /*'fixed'*/


    $(".floater").fadeIn(500);


    /*初始化位置*/
    floater.css({
      top:msTop-headerHeight,
      position: "absolute"
    });


    floater.find("li").hover(function () {
      $(this).addClass("on").siblings().removeClass("on");
    });

    floater.find("li").click(function () {
      var index=$(this).index();
      var hotspot=$('.sec-hotspot').eq(index).offset().top;
      $("html,body").animate({scrollTop: hotspot-100}, 1000);
    });




    scrollFun();
    function scrollFun() {
      $(window).on("scroll", function(){
        var sTop = $(this).scrollTop();
        if(floaterPosition === 'fixed' &&  sTop < msTop-floaterHeight ){
          floater.css({
            position: "absolute",
            top: msTop-headerHeight+10
          });
          floaterPosition = 'absolute';
        }
        if(floaterPosition === 'absolute' && sTop > msTop-floaterHeight){
          floater.css({
            position: "fixed",
            top: fTop
          });
          floaterPosition = 'fixed';
        }
      });
    };
  }


  /*判断较小屏幕（笔记本）
   * 小屏幕下：banner上移
   * 小屏幕下：浮动窗口往里移动
   * */
  (function screen(){
    var screenW = document.body.clientWidth;  //网页可见区域宽
    function smallScreen() {
      if(screenW<1700){  /*小屏幕*/
        $(".sec-banner").css("margin-top","-180px"); /*小屏banner向上偏移*/
        $(".floater").addClass("samllScreen");/*小屏floater向左偏移*/
      }else{
        $(".sec-banner").css("margin-top","0");
        $(".floater").removeClass("samllScreen");
      }
    }

    smallScreen();

    $(window).resize(function() {  /*缩放屏幕*/
      screenW = document.body.clientWidth;
      smallScreen();
    });

  })();

  var loadComplete = function () {
    new Price('.js_price',{
      add:'.add',
      reduce:'.reduce'
    },[20,30,40,60]);

    new Price('.js_price2',{
      add:'.add',
      reduce:'.reduce'
    },[40]);

    new Price('.js_price3',{
      add:'.add',
      reduce:'.reduce'
    },[50]);

    /*一键订购*/
    $(".floater").fadeOut(10);
    $("html,body").animate({scrollTop: 0},500,function () {
      floater();
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

