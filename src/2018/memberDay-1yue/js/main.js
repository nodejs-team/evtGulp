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


  function Price(els,opts) {
    this.$els = $(els);
    this.$add = this.$els.find(opts.add);
    this.$reduce = this.$els.find(opts.reduce);
    this.num=0;
    this.max=50;
    this.oldPrice =0;
    this.totalOldprice =0;
    this.totalPrice =0;
    this._init();
  }

  Price.prototype={
    add:function (ele) {
      var self = this;
      self.num = ele.parents(".price").find('.num').val();
      if(self.num<self.max){
        self.num++;
      }
      ele.siblings().find('.num').val(self.num);
      self.numCounts(ele);
    },
    reduce:function (ele) {
      var self = this;
      self.num = ele.parents(".price").find('.num').val();
      if(self.num>1){
        self.num--;
      }
      ele.siblings().find('.num').val(self.num);
      self.numCounts(ele);
    },
    numCounts:function (ele) {
      var self = this;
      var cur = ele.parents(".price").find('.price_p li.cur');
      self.oldPrice = cur.data('oldprice');
      self.num = ele.parents(".price").find('.num').val();
      var ix = parseInt(self.num / 2);
      self.totalOldprice =self.oldPrice * self.num;
      self.totalPrice =(self.oldPrice * self.num) - (self.oldPrice/2 * ix);
      ele.parents(".price").find('.old-price').html(self.totalOldprice);
      ele.parents(".price").find('.now-price').html(self.totalPrice);
    },
    counts:function (ele) {
      var self = this;
      self.oldPrice = ele.data('oldprice');
      self.num = ele.parents(".price").find('.num').val();
      var ix = parseInt(self.num / 2);
      self.totalOldprice =self.oldPrice * self.num;
      self.totalPrice =(self.oldPrice * self.num) - (self.oldPrice/2 * ix);
      ele.parents(".price").find('.old-price').html(self.totalOldprice);
      ele.parents(".price").find('.now-price').html(self.totalPrice);
    },
    /*初始化*/
    numInit:function () {
      var self = this;
      var Oldprice = 0;

      this.$els.each(function () {
        Oldprice = $(this).find('.price_p li.cur').data('oldprice');
        var totalNum = $(this).find(".num").val();
        var totalOldprice = Oldprice * totalNum;
        var ix = parseInt(totalNum / 2);
        var totalPrice =(Oldprice * totalNum) - (Oldprice/2 * ix);
        $(this).find('.old-price').html(totalOldprice);
        $(this).find('.now-price').html(totalPrice);

      });

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
  };


  function floater(){
    var floater = $('.floater');
    var headerHeight = $(".header").height();
    var floaterHeight = $('.floater').height();
    var msTop =$(".sec-1 .quan").offset().top;
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

    new Price('.price',{
      add:'.add',
      reduce:'.reduce'
    });

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