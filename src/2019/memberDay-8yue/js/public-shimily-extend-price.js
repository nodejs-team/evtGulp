/**
 * Created by shimily on 2018/8/30.
 */
(function($){

  /*会员日：价格计算【通用】
  * disArr 每磅立减金额
  * percent  折扣
  * double 第二件半价
  * */
  function Price(els,opts,disArr,percent,double) {
    this.$els = $(els);
    this.$add = this.$els.find(opts.add);
    this.$reduce = this.$els.find(opts.reduce);
    this.num=0;
    this.max=50;
    this.oldPrice =0;
    this.bs = 0;
    this.weight = 0;
    this.totalOldprice =0;
    this.totalPrice =0;
    this.disCount = 0;
    this.dis = 0;
    this.disArr = disArr; /*每磅立减金额*/
    this.percent = percent || 1;  /*折扣*/
    this.double = double || 0;  /*第二件是否立减： 1立减  0不立减*/

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

      self.bs = cur.data('bs');
      self.weight = cur.data('weight');
      self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/

      self.totalOldprice =self.oldPrice * self.num;

      if(this.double){ /*第二件半价*/
        var ix = parseInt(self.num / 2);  /*向下取整*/
        self.totalPrice =self.totalOldprice - self.oldPrice/2 * ix;
      }else{
        self.totalPrice =(self.oldPrice-self.disCount) * this.percent * self.num;
      }

      ele.parents(".price").find('.old-price').html(self.totalOldprice.toFixed(2));  /*原价*/
      ele.parents(".price").find('.now-price').html(self.totalPrice.toFixed(2)); /*现价*/
      ele.parents(".price").find('.p-bs').html(self.bs);
      ele.parents(".price").find('.p-weight').html(self.weight);


    },
    /*磅数选择后计算价格*/
    counts:function (ele) {
      var self = this;
      self.oldPrice = ele.data('oldprice');
      self.num = ele.parents(".price").find('.num').text()-0;
      /* var ix = parseInt(self.num / 2);*/

      self.bs = ele.data('bs');
      self.weight = ele.data('weight');

      self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/

      self.totalOldprice =self.oldPrice * self.num;

      if(this.double){ /*第二件半价*/
        var ix = parseInt(self.num / 2);  /*向下取整*/
        self.totalPrice =self.totalOldprice - self.oldPrice/2 * ix;
      }else{
        self.totalPrice =(self.oldPrice-self.disCount) * this.percent * self.num;
      }

      ele.parents(".price").find('.old-price').html(self.totalOldprice.toFixed(2));
      ele.parents(".price").find('.now-price').html(self.totalPrice.toFixed(2));
      ele.parents(".price").find('.p-bs').html(self.bs);
      ele.parents(".price").find('.p-weight').html(self.weight);

    },
    /*折扣：通过判断磅数决定减多少   增加1.5磅，2.5磅，3.5磅立减*/
    disFun:function (bs,discount) {
      switch (bs){
        case 1:
          this.dis = discount[0];
          break;
        case 1.5:
          this.dis = discount[0];
          break;
        case 2:
          this.dis = discount[1];
          break;
        case 2.5:
          this.dis = discount[1];
          break;
        case 3:
          this.dis = discount[2];
          break;
        case 3.5:
          this.dis = discount[2];
          break;
        case 5:
          this.dis = discount[3];
          break;
        case 5.5:
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
        self.weight = $(this).find('.price_p li.cur').data('weight');

        self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/
        var totalPrice =(Oldprice - self.disCount) * self.percent * totalNum;

        $(this).find('.old-price').html(totalOldprice.toFixed(2));
        $(this).find('.now-price').html(totalPrice.toFixed(2));
        $(this).find('.p-bs').html(self.bs);
        $(this).find('.p-weight').html(self.weight);
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

  window.Price = Price;


/**实例化方法：例如：开学季、9月会员日*/
/*
   //2磅立减40
    new Price('.js_price1',{
      add:'.add',
      reduce:'.reduce'
    },[0,40,0,0],1);

   //第二件半价
    new Price('.js_price2',{
      add:'.add',
      reduce:'.reduce'
    },[0,0,0,0],1,1);  

    //八折优惠
     new Price('.js_price3',{
      add:'.add',
      reduce:'.reduce'
    },[0,0,0,0],0.8);

*/


})(jQuery);

/*阻止页面内容被选中*/
document.body.onselectstart = function () {
  return false;
};

