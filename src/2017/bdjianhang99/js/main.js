/**
 * Created by mcake on 2016/5/24.
 */
(function($){
    function Slider(container, opts){
        this.$outer = $(container);

        this.$inner = this.$outer.children();
        this.$prev = $(opts.prev);
        this.$next = $(opts.next);
        this.$els = this.$inner.children();
        this.total = this.$els.length;
        this.w = this.$els.outerWidth(true);
        this.timer = null;
        this.isSliding = false;
        this.autoplay = opts.autoplay || false;
        this.init();
    }
    var proto = Slider.prototype;
    proto.init = function(){
        var self = this;
        var $last = this.$els.eq(this.total-1);
        if(this.total<6){
            $last = this.$els.clone().appendTo(this.$inner).eq(this.total-1);
            this.total *= 2;
        }
        $last.prependTo(this.$inner);
        this.$inner.css('marginLeft', -this.w);

        this.$prev.on('click', function(){
            self.prev();
        })
        this.$next.on('click', function(){
            self.next();
        })
        this.$outer.on('mouseenter', function(){
            clearTimeout(self.timer);
        })
        this.$outer.on('mouseleave', function(){
            self.auto();
        })
        this.auto();
    }
    proto.prev = function(){
        if(this.isSliding) return;
        this.isSliding = true;
        var self = this;
        this.$inner.animate({
            marginLeft: 0
        }, 500, function(){
            self.$inner.children().eq(self.total-1).prependTo(self.$inner);
            self.$inner.css('marginLeft', -self.w);
            self.isSliding = false;
        })
    }
    proto.next = function(){
        if(this.isSliding) return;
        this.isSliding = true;
        var self = this;
        this.$inner.animate({
            marginLeft: -this.w*2
        }, 500, function(){
            self.$inner.children().eq(0).appendTo(self.$inner);
            self.$inner.css('marginLeft', -self.w);
            self.isSliding = false;
        })
    }
    proto.auto = function(){
        if(!this.autoplay) return;
        var self = this;
        function delay(){
            self.timer = setTimeout(function(){
                self.next();
                delay();
            }, 5000)
        }
        delay();
    };

    function initNum() {
        var items = [];
        $(".products li").each(function(i,el){
            var ponds = $(el).attr('data-pond');
            var ids = $(el).attr('data-price');
            var postId = $(el).attr('data-postid');
            if(ponds){
                items.push({
                    ponds: ponds.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    ix: 0,
                    ids: ids.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    postId: postId.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")})
                })
            }

            var index = i;
            var currentItem = items[index];

          /*
           *蛋糕磅数加
           */
            $(this).find(".plus").on('click', function(){
                var ix = ++currentItem.ix;
                if(ix>=currentItem.ponds.length-1){
                    ix =currentItem.ix = currentItem.ponds.length-1;
                }

                $(this).parents("li").find(".bangshu").html(currentItem.ponds[ix]);
                $(this).parents("li").find(".bangshu").data("num", currentItem.ponds[ix]);
                $(this).parents("li").find(".price").html(currentItem.ids[ix]);
                $(this).parents("li").find(".price").data("price", currentItem.ids[ix]);
                $(this).parents("li").find(".postid").html(currentItem.postId[ix]);
                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);
            });
          /*
           *蛋糕磅数减少
           */
            $(this).find(".reduce").on('click', function(){
                var ix = --currentItem.ix;
                if(ix<=0){
                    ix=currentItem.ix = 0;
                }
                $(this).parents("li").find(".bangshu").html(currentItem.ponds[ix]);
                $(this).parents("li").find(".bangshu").data("num", currentItem.ponds[ix]);
                $(this).parents("li").find(".price").html(currentItem.ids[ix]);
                $(this).parents("li").find(".price").data("price", currentItem.ids[ix]);
                $(this).parents("li").find(".postid").html(currentItem.postId[ix]);
                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);

            });


        });
    };

    var animates = {
        bao:function(){
            var mc = new MovieClip('bao_png', "bao_json", 'el_bao');
            mc.gotoAndPlay(1, -1);
            return mc;
        },
        boy:function(){
            var mc = new MovieClip('boy_png', "boy_json", 'el_boy');
            mc.gotoAndPlay(1, -1);
            return mc;
        },
        girl:function(){
            var mc = new MovieClip('girl_png', "girl_json", 'el_girl');
            mc.gotoAndPlay(1, -1);
            return mc;
        },
        huojian:function(){
            var mc = new MovieClip('huojian_png', "huojian_json", 'el_huojian');
            mc.gotoAndPlay(1, -1);
            return mc;
        }
    };


    var loadComplete = function () {
        new Slider('.slideOuter',{
            prev: '.prev',
            next: '.next',
            autoplay: true
        });
        initNum();
        animates.bao();
        animates.boy();
        animates.girl();
        animates.huojian();
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