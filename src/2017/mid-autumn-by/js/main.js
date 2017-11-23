/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  function Slider(el,opts) {
    this.$wrapper = $(el);
    this.$items = this.$wrapper.children();
    this.$ka1 = $(opts.ka1);
    this.$ka2 = $(opts.ka2);
    this.smallWidth =  this.$ka1.width();
    this.smallHeight =  this.$ka1.height();
    this.bigWidth =  this.$ka2.width();
    this.bigHeight =  this.$ka2.height();
    this.isSliding = false;
    this.position ={
      big: {
        top:60,
        left:110,
        width:this.bigWidth
      },
      small:{
        top:100,
        left:-10,
        width:this.smallWidth
      }
    }
    this.init();
  }

  Slider.prototype = {
    sliding1:function () {
      this.isSliding = true;
      var self = this;
      self.$ka1.css('z-index',4).stop().animate(self.position.big,500);
      self.$ka2.css('z-index',1).stop().animate(self.position.small,300,function () {
        self.isSliding = false;
      });
    },
    sliding2:function () {
      this.isSliding = true;
      var self = this;
      self.$ka2.css('z-index',4).stop().animate(self.position.big,500);
      self.$ka1.css('z-index',1).stop().animate(self.position.small,300,function () {
        self.isSliding = false;
      });
    },
    init:function () {
      var self = this;
      this.$wrapper.hover(function () {
        if(self.isSliding) return;
        self.sliding1();
      },function () {
        if(self.isSliding) return;
        self.sliding2();
      });
    }
  }


  var loadComplete = function () {
    $(".row").hover(function () {
      $(this).find('.moon-hl').fadeToggle(200);
    });

    new Slider('.kaquan',{
      ka1:".ka-1",
      ka2:".ka-2"
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