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
    this.discount = 0; /*立减69*/
    this._init();
  }
  Price.prototype= {
    add: function (ele) {
      var self = this;
      self.num = ele.parents(".price").find('.num').text()-0;
      if (self.num < self.max) {
        self.num++;
      }

      ele.siblings().find('.num').text(self.num);
      self.numCounts(ele);
    },
    reduce: function (ele) {
      var self = this;
      self.num = ele.parents(".price").find('.num').text()-0;
      if (self.num > 1) {
        self.num--;
      }
      ele.siblings().find('.num').text(self.num);
      self.numCounts(ele);
    },
    numCounts:function (ele) {  /*加减计算价格*/
      var self = this;
      self.oldPrice = ele.parents(".price").find('.old-price').data("price");
      self.nowPrice = ele.parents(".price").find('.now-price').data("price");

      self.num = ele.parents(".price").find('.num').text()-0;
      self.totalOldprice =self.oldPrice * self.num ;
      self.totalnowPrice =self.nowPrice * self.num ;
      ele.parents(".price").find('.old-price').html(self.totalOldprice);
      ele.parents(".price").find('.now-price').html(self.totalnowPrice+".00");
    },
    _init:function () {
      var self = this;

      //this.numInit();


      this.$add.click(function () {
        self.add($(this));
      });
      this.$reduce.click(function () {
        self.reduce($(this));
      });
    }
  }
  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500);


    new Price('.price',{
      add:'.add',
      reduce:'.reduce'
    });

    var swiper1 = new Swiper('.swiper1', {
      loop: true,
      autoplay: 3000,  /*5000*/
      slidesPerView: 1
    });
    $('.arrow-prev').on('click', function (e) {
      e.preventDefault();
      swiper1.swipePrev();
    });
    $('.arrow-next').on('click', function (e) {
      e.preventDefault();
      swiper1.swipeNext();
    });



    var swiper2 = new Swiper('.swiper2', {
      loop: true,
      autoplay: 3000,  /*5000*/
      slidesPerView: 1
    });

    $('.arrow-left').on('click', function (e) {
      e.preventDefault();
      swiper2.swipePrev();
    });
    $('.arrow-right').on('click', function (e) {
      e.preventDefault();
      swiper2.swipeNext();
    });

    /*$(".swiper2").mouseover(function (e) {
      swiper2.stopAutoplay();
    }).mouseout(function (e) {
      swiper2.startAutoplay();
    });*/

    
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