/**
 * Created by mcake on 2016/5/24.
 */
(function($){
function aaaa() {
  console.log(5)
}
  var animations= {
    loadings: function () {
      var mc = new MovieClip('loading_png', "loading_json", 'loadings');
      mc.gotoAndPlay(1, 1);
      /*"duration":12 = 0.6*20*/
      return mc;
    },
    S: function () {
      var mc = new MovieClip('s_png', "s_json", 'el_s');
      mc.gotoAndPlay(1, -1);
      /*"duration":12 = 0.6*20*/
      return mc;
    },
    cake: function () {
      var mc = new MovieClip('cake_png', "cake_json", 'el_cake');
      mc.gotoAndPlay(1, -1);
      /*"duration":12 = 0.6*20*/
      return mc;
    },
    tou: function () {
      var mc = new MovieClip('tou_png', "tou_json", 'el_tou');
      mc.gotoAndPlay(1, -1);
      /*"duration":12 = 0.6*20*/
      return mc;
    },
    huaA: function () {
      var mc = new MovieClip('huaA_png', "huaA_json", 'el_huaA');
      mc.gotoAndPlay(1, -1);
      /*"duration":12 = 0.6*20*/
      return mc;
    },
    huaB: function () {
      var mc = new MovieClip('huaB_png', "huaB_json", 'el_huaB');
      mc.gotoAndPlay(1, -1);
      /*"duration":12 = 0.6*20*/
      return mc;
    }
  };

  var Price = {
    num:$(".num").html(),
    price:$(".new-pirce").data("price"),
    oldprice:$(".old-pirce").data("oldprice"),
    count:function () {
      console.log(this.num);
      var totalPrice = this.price * this.num;
      var totaloldPrice = this.oldprice * this.num;
      $(".new-pirce span").html(totalPrice);
      $(".old-pirce s").html(totaloldPrice);
    },
    add:function () {
      if(this.num<50){
        this.num++;
      }
      $(".num").html(this.num);
      $(".numVal").val(this.num);
      this.count();
    },
    mins:function () {
      this.num--;
      if(this.num<=1){
        this.num=1;
      }
      $(".num").html(this.num);
      $(".numVal").val(this.num);
      this.count();
    },
    _init:function () {
      var self = this;
      $(".numVal").val(this.num);
      $(".mins").click(function () {
        self.mins();
      });
      $(".add").click(function () {
        self.add();
      });
    }
  }

  var loadComplete = function () {
    animations.S();
    animations.cake();
    animations.tou();
    animations.huaA();
    animations.huaB();
    Price._init();

    $(".numbtn").hover(function () {
      $(this).fadeTo("fast",0.5);
    },function () {
      $(this).fadeTo("fast",1);
    });


    $(".wbtn,.floadMen").hover(function () {
      $(this).addClass("hover");
    },function () {
      $(this).removeClass("hover");
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
        Resource.el('#evt_loadings').style.display = 'block';
        animations.loadings();
        setTimeout(function () {
          Resource.el('#evt_loadings').style.display = 'none';
          Resource.el('#evt_container').style.display = 'block';
          correctPNG($('#evt_container').get(0));
          bindScroll('#evt_container');
          loadComplete();
        },6500);

      });
    }

  };

  $(function(){
    loadResource();
  });

})(jQuery);