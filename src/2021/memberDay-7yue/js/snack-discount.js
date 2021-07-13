function snack(els,opts,disArr) {
  this.$els = $(els);
  this.$add = this.$els.find(opts.add);
  this.$reduce = this.$els.find(opts.reduce);
  this.num=1;
  this.max=2;
  this.oldPrice =0;
  this.totalPrice =0;
  this.newPrice =0;
  this.disArr = disArr;
  this.dis = 0;
  this._init();
}

snack.prototype={
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

/*第二件6折*/
/*
new snack('.snack',{
  add:'.add',
  reduce:'.reduce'
},[1,0.6]); */
