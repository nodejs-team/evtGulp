/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  function selectBangshu() {
    var bsn =0,
        price = 0,
        totalPrice=0,
        discount = 0.85;
    $(".prolist li").each(function () {
      var self = $(this);
      $(this).find(".js_bshu").click(function () {
          self.siblings().find('.js_select').slideUp(100);
          self.find('.js_select').stop().slideToggle(200);
          return false;
      });
      $(this).find(".js_select dd").click(function () {
        $(this).addClass('on').siblings().removeClass("on");
         bsn = $(this).data("bsn");
         price = $(this).data("price");
         totalPrice = (price * discount);
         totalPrice = parseFloat(totalPrice.toFixed(2));

         self.find('.js_bshu em').html(bsn);
         self.find('.js_bshu').data("num",bsn);

         self.find('.pro-price').html(totalPrice);
         self.find('.old-price').html(price);


      });

      /*初始化*/
      price= $(this).find('.js_select dd.on').data('price');
      totalPrice = (price * discount);
      $(this).find(".pro-price").html(totalPrice);
      $(this).find(".old-price").html(price);

    });

    $(document).click(function () {
      $(".js_select").slideUp(100);
    });



  }

  function proList(els,opts) {
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
    this.disCount = 0;
    this._init();
  }

  proList.prototype = {
    add:function (ele) {
      var self = this;
      self.num = ele.parents(".item").find('.nums').text()-0;
      if(self.num<self.max){
        self.num++;
      }
      ele.siblings().find('.nums').text(self.num);
      self.numCounts(ele);
    },
    reduce:function (ele) {
      var self = this;
      self.num = ele.parents(".item").find('.nums').text()-0;
      if(self.num>1){
        self.num--;
      }
      ele.siblings().find('.nums').text(self.num);
      self.numCounts(ele);
    },
    /*数量加减后计算价格*/
    numCounts:function (ele) {
      var self = this;
      var cur = ele.parents(".item").find('.js_select dd.on');
      self.oldPrice = cur.data('price');
      self.num = ele.parents(".item").find('.nums').text()-0;
      var ix = parseInt(self.num / 2);

      self.bs = cur.data('bs');
      self.totalOldprice =self.oldPrice * self.num;
      self.totalPrice = self.totalOldprice - (self.oldPrice/2 * ix);

     /* ele.parents(".price").find('.old-price').html(self.totalOldprice.toFixed(2)); */ /*原价*/
      ele.parents(".item").find('.pro-price').html(self.totalPrice); /*现价*/
    },
    /*初始化数量和价格*/
    numInit:function () {
      var self = this;
      var Oldprice = 0;

      this.$els.each(function () {
        Oldprice = $(this).find('.select dd.on').data('price');
        var totalNum = $(this).find(".nums").text()-0;
        var totalOldprice = Oldprice * totalNum;
        var ix = parseInt(totalNum / 2);
        var totalPrice =totalOldprice - Oldprice/2 * ix;
        /*$(this).find('.old-price').html(totalOldprice.toFixed(2));*/
        $(this).find('.pro-price').html(totalPrice);
      });
    },
    _init:function () {
      var self = this;
      this.numInit();

      this.$els.find('.price_p li').each(function () {
        self.bsSelect($(this));
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
  }
  
  
  function Price(els,opts,disArr,percent) {
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
    this.disArr = disArr;
    this.percent = percent;
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
      self.totalPrice =(self.oldPrice-self.disCount) * this.percent * self.num;

      ele.parents(".price").find('.old-price').html(self.totalOldprice.toFixed(2));  /*原价*/
      ele.parents(".price").find('.now-price').html(self.totalPrice.toFixed(2)); /*现价*/
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
      self.totalPrice =(self.oldPrice-self.disCount) * this.percent * self.num;
      ele.parents(".price").find('.old-price').html(self.totalOldprice.toFixed(2));
      ele.parents(".price").find('.now-price').html(self.totalPrice.toFixed(2));
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
        var totalPrice =(Oldprice - self.disCount) * self.percent * totalNum;

        $(this).find('.old-price').html(totalOldprice.toFixed(2));
        $(this).find('.now-price').html(totalPrice.toFixed(2));
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
    var msTop =$(".sec-vip").offset().top;
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
            top: msTop-headerHeight
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




  var loadComplete = function () {

    selectBangshu();
    /*$(".price-select li").click(function () {
      $(this).addClass('on').siblings().removeClass("on");
    });*/
    new proList('.prolist li',{
      add:'.add',
      reduce:'.reduce'
    },[0,61.8,0,0],1);

    new Price('.price',{
      add:'.add',
      reduce:'.reduce'
    },[0,61.8,0,0],1);



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