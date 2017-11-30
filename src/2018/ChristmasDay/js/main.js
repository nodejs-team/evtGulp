/**
 * Created by mcake on 2016/5/24.
 */
(function($){
  var selectNum = {
    num:0,
    price:0,
    add:function (ele) {
      var self = this;
      ele.find(".add").click(function () {
        self.num =ele.find(".num").val();
        self.price =ele.find(".price").data('price');
        if(self.num>=50){
          return;
        }else{
          self.num++;
        }
        ele.find(".num").val(self.num);
        ele.find(".num-span").html(self.num);
        self.count(ele,self.price,self.num);
      });

    },
    reduce:function (ele) {
      var self = this;
      ele.find(".reduce").click(function () {
        self.num =ele.find(".num").val();
        self.price =ele.find(".price").data('price');
        if(self.num<=1){
          return;
        }else{
          self.num--;
        }
        ele.find(".num").val(self.num);
        ele.find(".num-span").html(self.num);
        self.count(ele,self.price,self.num);
      });
    },
    count:function (ele,price,num) {
      var totalPrice = price * num;
      ele.find(".price em").text(totalPrice);
    },
    _init:function () {
      $(".num").val(1);
      var self = this;
      $(".tab-box").each(function () {
        this.price =$(this).find(".price").data('price');
        $(this).find(".price em").text(this.price);
        self.add($(this));
        self.reduce($(this));
      });
    }
  };


  var Tab = {
    _init:function () {
      $('.tab-top li').hover(function () {
        $(this).removeClass("on").siblings().addClass('on');
        var idx = $(this).index();
        $(".tab-box").eq(idx).fadeIn(0).siblings(".tab-box").fadeOut(0);
        if(idx == 1){
          $(".sec-1").addClass('on');
        }else{
          $(".sec-1").removeClass('on');
        }
      });



    }
  };


  var loadComplete = function () {


    var swiper1 = new Swiper('.swiper1', {
      pagination: '.pagination1',
      grabCursor: true,
      paginationClickable: true
    });

    var swiper2 = new Swiper('.swiper2', {
      pagination: '.pagination2',
      grabCursor: true,
      paginationClickable: true
    });





    $(".tab-box-hide").hide();

    $(".buybtns li").hover(function () {
      $(this).addClass("on").siblings().removeClass();
    });

    $(".select-price > .p2 > i").click(function () {
      $(this).toggleClass("on");
    });


    selectNum._init();
    Tab._init();
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