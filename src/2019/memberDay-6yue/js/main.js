/**
 * Created by mcake on 2016/5/24.
 */
(function($){



  var loadComplete = function () {

    /*商品价格计算*/

    /*购物清单*/
    $(".floater").fadeOut(10);
    $("html,body").animate({scrollTop: 0},500,function () {
      floater();
    });

    
    function xiaoshi(els,opts,disArr) {
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

        /*第二件6折，第三件7折*/
         self.newPrice = self.totalPrice-self.oldPrice*(Math.floor((self.num/2))*(1-self.disArr[1])+Math.floor((self.num/3))*(1-self.disArr[2]));

        ele.parents("li").find('.old-price').html(self.totalPrice.toFixed(2));  /*原价*/
        ele.parents("li").find('.new-price').html(self.newPrice.toFixed(2)); /*现价*/
      },
      /*初始化*/
      initialize:function () {
        var self = this;
        this.$els.find("li").each(function () {
          self.oldPrice = $(this).data('oldprice');
          self.num = $(this).find(".num").text()-0;
          self.totalPrice = self.oldPrice*self.num;
          /*第二件6折，第三件7折*/
          self.newPrice = self.totalPrice-self.oldPrice*(Math.floor((self.num/2))*(1-self.disArr[1])+Math.floor((self.num/3))*(1-self.disArr[2]));
          $(this).find(".old-price").text(self.totalPrice.toFixed(2));
          $(this).find(".new-price").text(self.newPrice.toFixed(2));
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
    /*new xiaoshi('.select-li',{
      add:'.add',
      reduce:'.reduce'
    },[1,0.7,0.6]);*/

    $(".buy_btn_box li,.go-btn span").click(function () {
      $(this).addClass("on").siblings().removeClass();
    })

    new xiaoshi('.select-li',{
      add:'.add',
      reduce:'.reduce'
    },[1,0.7,0.6]);
    
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






