/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  var maxWidth = $(window).width();
  function BannerRedraw(ele,opts) {
    this.$ele = $(ele);
    this.$opts = opts;
    this._init();
  }
  BannerRedraw.prototype = {
    removenewPosition:function () {
      this.$ele.removeClass("small");
      for(var i=0;i<this.$opts.length;i++){
        $(this.$opts[i]).removeClass("small");
      }
    },
    addnewPosition:function () {
      this.$ele.addClass("small");
      for(var i=0;i<this.$opts.length;i++){
        $(this.$opts[i]).addClass("small");
      }
    },
    _init:function () {
      var self = this;
      if(maxWidth < 1700){
        self.addnewPosition();
      }else{
        self.removenewPosition();
      }
      /*缩放窗口*/
      $(window).resize(function() {
        maxWidth = $(window).width();
        if(maxWidth < 1700){
          self.addnewPosition();
        }else{
          self.removenewPosition();
        }
      });

    }
  };

  function conunt(p1,p2,dis) {
    $(".zuhe .price").data('price',p1+p2-dis);
    $(".zuhe .price").html(p1+p2-dis);
  }

  function postId(id1,id2) {
    $(".zuhe .pond").data('postId1',id1);
    $(".zuhe .pond").data('postId2',id2);
  }

  var loadComplete = function () {
    new BannerRedraw(".sec-banner", ['.banner-3','.banner-4']);
    var swiper1 = new Swiper('.swiper1', {
      grabCursor: true,
      loop:true,
      autoplay : false,
      autoplayDisableOnInteraction : false,
      paginationClickable: true,
      onSlideChangeEnd: function(swiper){
       var index = swiper.activeIndex;
        price1 = $(".cake-zh .p-old-price").eq(index).data("price");
        postId1 = $(".cake-zh .p-old-price").eq(index).data("postid");
        conunt(price1,price2,77);
        postId(postId1,postId2);
      }
    });

    $('.button-prev1').on('click', function(e){
      e.preventDefault()
      swiper1.swipePrev()
    });
    $('.button-next1').on('click', function(e){
      e.preventDefault()
      swiper1.swipeNext()
    });

    var swiper2 = new Swiper('.swiper2', {
      grabCursor: true,
      loop:true,
      autoplay : false,
      autoplayDisableOnInteraction : false,
      paginationClickable: true,
      onSlideChangeEnd: function(swiper){
        var index = swiper.activeIndex;
        price2 = $(".xiaoshi-zh .p-old-price").eq(index).data("price");
        postId2 = $(".xiaoshi-zh .p-old-price").eq(index).data("postid");
        conunt(price1,price2,77);
        postId(postId1,postId2);
      }
    });

    $('.button-prev2').on('click', function(e){
      e.preventDefault()
      swiper2.swipePrev()
    });
    $('.button-next2').on('click', function(e){
      e.preventDefault()
      swiper2.swipeNext()
    });

    $("html,body").animate({scrollTop: 0},500,function () {});

    var price1 = $(".cake-zh .swiper-slide-active").find(".p-old-price").data("price")-0;
    var price2 = $(".xiaoshi-zh .swiper-slide-active").find(".p-old-price").data("price")-0;

    var postId1 = $(".cake-zh .swiper-slide-active").find(".p-old-price").data("postid")-0;
    var postId2 = $(".xiaoshi-zh .swiper-slide-active").find(".p-old-price").data("postid")-0;

    conunt(price1,price2,77);
    postId(postId1,postId2);

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
