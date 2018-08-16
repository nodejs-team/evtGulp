/**
 * Created by mcake on 2016/5/24.
 */
(function($){

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

      ele.parents(".price").find('.old-price').html(self.totalOldprice);  /*原价*/
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
      ele.parents(".price").find('.old-price').html(self.totalOldprice);
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

        $(this).find('.old-price').html(totalOldprice);
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

  
  function scroll() {
    $(window).scroll(function () {
      var distance = $(document).scrollTop()/10;
      var height = $(".sec-banner").height();
      var percent = distance/height*10;
      var dis=1+Math.min(0.2,percent);
      $(".banner-moon").css("transform","scale("+dis+")");

    });
  }
  

  var loadComplete = function () {
    scroll();
    new BannerRedraw(".sec-banner", ['.banner-moon','.banner-title','.banner-time','.w-time']);


    var swiper1 = new Swiper('.swiper1', {
      pagination: '.pagination1',
      grabCursor: true,
      loop:true,
      autoplay : 3000,
      autoplayDisableOnInteraction : false,
      paginationClickable: true
    });





    $(".buy-btn").hover(function () {
      $(this).addClass("on")
    },function () {
      $(this).removeClass("on")
    });

    new Price('.js_price',{
      add:'.add',
      reduce:'.reduce'
    },[0,0,0,0],0.9);
    
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