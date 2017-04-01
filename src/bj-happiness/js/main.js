/**
 * Created by mcake on 2016/5/24.
 */
(function ($) {
    var clouder = function (opts) {
        this.className = $(opts.className);
        this.start = opts.start;
        this.end = opts.end;
        this.duration = opts.duration;
        this._init();
    }
    clouder.prototype = {
        _init: function () {
            var self = this;
            console.log(self.start)
            function reset() {
                self.className.css({
                    left: self.start
                });
            }
            function doAnimate() {
                self.className.animate(
                    {
                        left: self.end
                    }, {
                        duration: self.duration,
                        easing: 'linear',
                        complete: function () {
                            setTimeout(function () {
                                reset();
                                doAnimate();
                            }, 1000);
                        }
                    });
            }

            reset();
            setTimeout(doAnimate, 1000);
        }
    };

    var goodsAnimate = function (opts) {
        this.$className = $(opts.className);
        this.marginLeft = opts.marginLeft;
        this.marginTop = opts.marginTop;
        this._init();
    }
    goodsAnimate.prototype = {
        _init: function () {
            var self = this;
            self.$className.find(".cake").hover(function () {
                self.overEvent($(this));
            }, function () {
                self.outEvent($(this));
            });
        },
        overEvent: function (ele) {
            var self = this;
            ele.stop().animate({
                marginLeft: self.marginLeft
            }, 200);
            ele.siblings('.word').stop().animate({
                marginTop: '0',
                opacity: 1
            }, 300);
        },
        outEvent: function (ele) {
            var self = this;
            ele.stop().animate({
                marginLeft: '0'
            }, 200);
            ele.siblings('.word').stop().animate({
                marginTop: self.marginTop,
                opacity: 0
            }, 300);
        }
    };


    var loadComplete = function () {
        var winW = $(document).width();
        var floaderW = $('.cloud img').width();

        if (isSupportCss3) {
            /* alert("支持css3")
             css3animate();*/
        } else {
            /*alert("不支持")*/
            new clouder({
                className: "#cloud-1",
                start: -floaderW,
                end: winW,
                duration: 20000
            });
            new clouder({
                className: "#cloud-2",
                start: winW,
                end: -floaderW,
                duration: 15000
            });
            new goodsAnimate({
                className: '.goods-1',
                marginLeft: "-8%",
                marginTop: '5%'
            });
            new goodsAnimate({
                className: '.goods-2',
                marginLeft: '8%',
                marginTop: '5%'
            });
            new goodsAnimate({
                className: '.goods-3',
                marginLeft: '-10%',
                marginTop: '5%'
            });
        }
    };

    var loadResource = function () {
        if (typeof resData == 'object' && Array.isArray(resData.resources) && resData.resources.length > 0) {
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
                //spin.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";
            });

            loader.on("complete", function () {
                setTimeout(function () {
                    $("#evt_spin").animate({
                        top: "100px",
                        right: '6%'
                    }, 1000, function () {
                        $("#icon-2").fadeIn(500);
                        Resource.el('#evt_loading').style.display = "none";
                        Resource.el('#evt_container').style.display = 'block';
                        correctPNG($('#evt_container').get(0));
                        bindScroll('#evt_container');
                        loadComplete();
                    });
                    // $("#evt_spin").addClass("fixed");
                }, 2000);
            });
        }

    };

    $(function () {
        loadResource();
    });

})(jQuery);