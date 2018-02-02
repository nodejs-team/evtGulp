/**
 * Created by mcake on 2016/5/24.
 */
(function($){

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
        console.log(self.num)
        ele.siblings().find('.num').val(self.num);
        ele.siblings().find('.num-span').html(self.num);
        self.numCounts(ele);
    },
    reduce:function (ele) {
        var self = this;
        self.num = ele.parents(".price").find('.num').val();
        if(self.num>1){
          self.num--;
        }
        ele.siblings().find('.num').val(self.num);
        ele.siblings().find('.num-span').html(self.num);
        self.numCounts(ele);
    },
    numCounts:function (ele) {
        var self = this;
        var cur = ele.parents(".price").find('.price_p li.cur');
        self.oldPrice = cur.data('oldprice');
        self.num = ele.parents(".price").find('.num').val();
        var ix = parseInt(self.num / 2);
        self.totalOldprice =self.oldPrice * self.num;
        self.totalPrice =(self.oldPrice * self.num)*discount;
        self.totalPrice = self.totalPrice.toFixed(2);
        ele.parents(".price").find('.old-price').html(self.totalOldprice);
        ele.parents(".price").find('.now-price').html(self.totalPrice);
    },
    counts:function (ele) {
        var self = this;
        self.oldPrice = ele.data('oldprice');
        self.num = ele.parents(".price").find('.num').val();
        var ix = parseInt(self.num / 2);
        self.totalOldprice =self.oldPrice * self.num;
        self.totalPrice =(self.oldPrice * self.num)*discount;
        self.totalPrice = self.totalPrice.toFixed(2);
        ele.parents(".price").find('.old-price').html(self.totalOldprice);
        ele.parents(".price").find('.now-price').html(self.totalPrice);
    },
    /*初始化*/
    numInit:function () {
        var self = this;
        var Oldprice=0;
      var totalOldprice=0;
      $(".num").val(1);

        this.$els.each(function () {
          Oldprice= $(this).find('.price_p li.cur').data('oldprice');
          var totalNum = $(this).find(".num").val();


          totalOldprice = Oldprice * totalNum;

          var ix = parseInt(totalNum / 2);
          var totalPrice =(Oldprice * totalNum)*discount;
          totalPrice = totalPrice.toFixed(2);

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
  }



  var lastTime = {
    targetTimes:0,
    time:0,
    timer:null,
    init:function (data,onEnd) {

      this.targetTimes = new Date(data).getTime();
      this.start(onEnd);

    },
    Htmls:function (day,hours,minites,seconds) {
      if(day<=0){
        $(".dayout").hide();
      }

      $(".day").html(day);
      $(".hours").html(hours);
      $(".minites").html(minites);
      $(".seconds").html(seconds);

    },
    calculate:function (onEnd) {
      this.time = parseInt((this.targetTimes - new Date().getTime())/1000);

      if(this.time == 0){
        this.end(onEnd);
      } else if(this.time < 0){
        return this.stop();
      }

      var day = Math.floor(this.time / (60 * 60 * 24));
      var hours = Math.floor((this.time-day*24*60*60) / (60 * 60 ));

      var minites = Math.floor(this.time / 60 % 60);
      var seconds = this.time % 60;
      /* console.log(this.time / (60 * 60 * 24));*/
      this.Htmls(day,hours,minites,seconds);
    },
    start:function (onEnd) {
      var self = this;
      this.timer = setInterval(function () {
        self.calculate(onEnd);
      }, 1000);
    },
    end:function (onEnd) {
      typeof onEnd === 'function' && onEnd();
    },
    stop:function () {
      clearInterval(this.timer);

    }
  }


  var loadComplete = function () {

    lastTime.init(__END_DATE__);

     new Price('.price',{
       add:'.add',
       reduce:'.reduce'
     });
    $(".buy_btn_box li span").hover(function () {
      $(this).toggleClass("on");
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