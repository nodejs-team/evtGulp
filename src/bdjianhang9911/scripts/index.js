;(function(){

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
    }


    var loader;
    function startLoading(){
        var domLoad = document.getElementById('evt_loading');
        loader = new Loader('images/');
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        })
        loader.on('complete', function(groupName){
            domLoad.style.display = 'none';
            document.getElementById('evt_container').style.display = 'block';
            loadComplete();

        });
        loader.loadGroup('preload');
    }
    startLoading();
    function formatResData(objConfig) {
        if( !( typeof objConfig === 'object') ) return [];
        if( objConfig instanceof Array) return objConfig;
        var frames = [];
        for( var i in objConfig ){
            objConfig[i].key = i;
            frames.push(objConfig[i]);
        }
        return frames.sort(function (a, b) {
            return parseInt(a.key.replace(/^[^\d]+/, "")) - parseInt(b.key.replace(/^[^\d]+/, ""));
        });
    }

    var animate = {
        bao:function () {

            var mcConfig = {
                "bao-1":{"x":171,"y":1,"w":168,"h":89,"offX":0,"offY":9,"sourceW":177,"sourceH":114,"duration":2},
                "bao-2":{"x":341,"y":1,"w":167,"h":86,"offX":0,"offY":12,"sourceW":177,"sourceH":114,"duration":2},
                "bao-3":{"x":1,"y":92,"w":168,"h":89,"offX":0,"offY":9,"sourceW":177,"sourceH":114,"duration":2},
                "bao-4":{"x":341,"y":89,"w":167,"h":86,"offX":0,"offY":12,"sourceW":177,"sourceH":114,"duration":2},
                "bao-5":{"x":1,"y":1,"w":168,"h":89,"offX":0,"offY":9,"sourceW":177,"sourceH":114,"duration":10}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('bao', loader.get('bao_png').data, formatResData(mcConfig)).play();

        },
        boy:function () {

            var mcConfig = {
                "boy-3":{"x":1,"y":526,"w":89,"h":173,"offX":2,"offY":3,"sourceW":107,"sourceH":177,"duration":10},
                "boy-4":{"x":1,"y":351,"w":89,"h":173,"offX":2,"offY":3,"sourceW":107,"sourceH":177,"duration":0},
                "boy-5":{"x":365,"y":176,"w":89,"h":173,"offX":2,"offY":3,"sourceW":107,"sourceH":177,"duration":0},
                "boy-6":{"x":274,"y":176,"w":89,"h":173,"offX":2,"offY":3,"sourceW":107,"sourceH":177,"duration":0},
                "boy-7":{"x":183,"y":176,"w":89,"h":173,"offX":2,"offY":3,"sourceW":107,"sourceH":177,"duration":1},
                "boy-8":{"x":92,"y":176,"w":89,"h":173,"offX":2,"offY":3,"sourceW":107,"sourceH":177,"duration":1},
                "boy-9":{"x":1,"y":176,"w":89,"h":173,"offX":2,"offY":3,"sourceW":107,"sourceH":177,"duration":1},
                "boy-10":{"x":365,"y":1,"w":89,"h":173,"offX":2,"offY":3,"sourceW":107,"sourceH":177,"duration":2},
                "boy-11":{"x":274,"y":1,"w":89,"h":173,"offX":2,"offY":3,"sourceW":107,"sourceH":177,"duration":1},
                "boy-12":{"x":183,"y":1,"w":89,"h":173,"offX":2,"offY":3,"sourceW":107,"sourceH":177,"duration":1},
                "boy-1":{"x":92,"y":1,"w":89,"h":173,"offX":2,"offY":3,"sourceW":107,"sourceH":177,"duration":1},
                "boy-2":{"x":1,"y":1,"w":89,"h":173,"offX":2,"offY":3,"sourceW":107,"sourceH":177,"duration":1}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('boy', loader.get('boy_png').data, formatResData(mcConfig)).play();
        },
        girl:function () {

            var mcConfig = {
                "girl-2":{"x":221,"y":232,"w":108,"h":229,"offX":11,"offY":1,"sourceW":123,"sourceH":230,"duration":10},
                "girl-3":{"x":111,"y":232,"w":108,"h":229,"offX":11,"offY":1,"sourceW":123,"sourceH":230,"duration":1},
                "girl-4":{"x":1,"y":232,"w":108,"h":229,"offX":11,"offY":1,"sourceW":123,"sourceH":230,"duration":1},
                "girl-5":{"x":1,"y":694,"w":107,"h":229,"offX":12,"offY":1,"sourceW":123,"sourceH":230,"duration":10},
                "girl-6":{"x":331,"y":1,"w":108,"h":229,"offX":11,"offY":1,"sourceW":123,"sourceH":230,"duration":1},
                "girl-7":{"x":331,"y":232,"w":107,"h":229,"offX":12,"offY":1,"sourceW":123,"sourceH":230,"duration":1},
                "girl-8":{"x":221,"y":1,"w":108,"h":229,"offX":11,"offY":1,"sourceW":123,"sourceH":230,"duration":1},
                "girl-9":{"x":1,"y":463,"w":107,"h":229,"offX":12,"offY":1,"sourceW":123,"sourceH":230,"duration":1},
                "girl-10":{"x":111,"y":1,"w":108,"h":229,"offX":11,"offY":1,"sourceW":123,"sourceH":230,"duration":1},
                "girl-1":{"x":1,"y":1,"w":108,"h":229,"offX":11,"offY":1,"sourceW":123,"sourceH":230,"duration":2}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('girl', loader.get('girl_png').data, formatResData(mcConfig)).play();
        },
        huojian:function () {

            var mcConfig = {
                "huojian-1":{"x":1,"y":1,"w":151,"h":217,"offX":5,"offY":6,"sourceW":161,"sourceH":227,"duration":2},
                "huojian-2":{"x":1,"y":220,"w":153,"h":212,"offX":3,"offY":11,"sourceW":161,"sourceH":227,"duration":2}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('huojian', loader.get('huojian_png').data, formatResData(mcConfig)).play();
        }
    }
    var loadComplete = function () {
        animate.bao();
        animate.boy();
        animate.girl();
        animate.huojian();
        new Slider('.slideOuter',{
            prev: '.prev',
            next: '.next',
            autoplay: true
        });

        initNum();
    };



    function initNum() {
        var items = [];
        $(".products li").each(function(i,el){
            var ponds = $(el).attr('data-pond');
            var ids = $(el).attr('data-price');
            if(ponds){
                items.push({
                    ponds: ponds.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    ix: 0,
                    ids: ids.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")})
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
            });

            $(this).find(".buybtn").click(function () {

                var price =  $(this).parents("li").find(".price").data("price");
                var sum = price;
                console.log(sum);
            });
        });
    };




})()