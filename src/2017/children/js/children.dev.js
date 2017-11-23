/**
 * Created by mcake on 2016/4/14.
 */
(function($, undefined){

    $.extend($.easing, {
        easeInCubic:function(e,f,a,h,g){
            return h*(f/=g)*f*f+a;
        },
        easeOutCubic: function(e,f,a,h,g){
            return h*((f=f/g-1)*f*f+1)+a;
        }
    });

    var aniMap = {
        "slide-down-l": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginLeft: -el.offsetWidth*0.3,
                marginTop: -el.offsetHeight*0.8
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginLeft: 0,
                    marginTop: 0
                }, 1000, 'easeOutCubic', function(){
                    cb && cb();
                });
            }, delay);

        },
        "slide-down-r": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginLeft: el.offsetWidth*0.15,
                marginTop: -el.offsetHeight*0.8
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginLeft: 0,
                    marginTop: 0
                }, 1000, 'easeOutCubic', function(){
                    cb && cb();
                });
            }, delay);

        },
        "slide-up-l": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginLeft: -el.offsetWidth*0.5,
                marginTop: el.offsetHeight*0.5
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginLeft: 0,
                    marginTop: 0
                }, 1000, 'easeOutCubic', function(){
                    cb && cb();
                });
            }, delay);

        },
        "slide-up-r": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginLeft: el.offsetWidth*0.5,
                marginTop: el.offsetHeight*0.5
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginLeft: 0,
                    marginTop: 0
                }, 1000, 'easeOutCubic', function(){
                    cb && cb();
                });
            }, delay);

        },
        "slide-up": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                //marginRight: -el.offsetWidth*0.5,
                marginTop: el.offsetHeight*0.5
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                   // marginRight: 0,
                    marginTop: 0
                }, 1000, 'easeOutCubic', cb);
            }, delay);

        },
        "fade-in": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1
                }, 800, cb);
            }, delay);
        }
    };

    var isSupportCss3 = (function(){
        var ret = /MSIE (\d+\.\d+)/.exec(navigator.userAgent);
        if( !ret || ret[1] > 9 ){
            return true;
        }
        return false;
    })();

    var setAnimate = function(el){
        var anim = el.getAttribute('data-anim');
        if( !aniMap[anim] ) return;
        var delay = Number(el.getAttribute('data-delay')||0)*1000;
        if( isSupportCss3 ){
            el.className = [el.className, anim].join(" ");
            el.style['-webkit-animation-delay'] = delay + "ms";
            el.style['animationDelay'] = delay + "ms";
        } else {
            aniMap[anim].call(el, el, delay);
        }
    };

    var setAllAnimate = function(container){
        $(container).find("[data-anim]").each(function(){
            setAnimate(this);
        });
    };

    Resource.baseUrl = "resource/";

    var scenMovieClip = {
         loading: function () {
            var mc = new MovieClip(Resource.getRes('loading_png'), Resource.getRes('loading_json'), "loading", "loading_anim");
            mc.gotoAndPlay(1, -1);
            return mc;
         },
         book: function () {
            var mc = new MovieClip(Resource.getRes('book_png'), Resource.getRes('book_json'), "book", "book");
            return mc;
         },
         mouseC: function () {
            var mc = new MovieClip(Resource.getRes('mouse_c_png'), Resource.getRes('mouse_c_json'), "mouse_c", "mouse_c");
            mc.gotoAndPlay(1, -1);
            return mc;
        },
        birdC: function () {
            var mc = new MovieClip(Resource.getRes('bird_c_png'), Resource.getRes('bird_c_json'), "bird_c", "bird_c");
            mc.gotoAndPlay(1, -1);
            return mc;
        },
        skating: function () {
            var mcData;
            var mcTexture;
            var mc = new MovieClip(mcTexture = Resource.getRes('skating_png'), mcData = Resource.getRes('skating_json'), "skating", "skating");
            mc.gotoAndPlay(1, 1);

            mc.once('complete', function(){
                mcData['mc']['skating']['frames'] = mcData['mc']['skating']['frames'].slice(20);
                mc = new MovieClip(mcTexture, mcData, "skating", "skating");
                mc.gotoAndPlay(1, -1);
            });
        },
        fish: function () {
            var mc = new MovieClip(Resource.getRes('fish_png'), Resource.getRes('fish_json'), "fish", "fish");
            mc.gotoAndPlay(1, -1);
            return mc;
        },
        house: function () {
            var mc = new MovieClip(Resource.getRes('house_png'), Resource.getRes('house_json'), "house", "house");
            mc.gotoAndPlay(1, -1);
            return mc;
        },
        mouse: function () {
            var mcData;
            var mcTexture;
            var mc = new MovieClip(mcTexture = Resource.getRes('mouse_png'), mcData = Resource.getRes('mouse_json'), "mouse", "mouse");
            mc.gotoAndPlay(1, 1);

            mc.once('complete', function(){
                mcData['mc']['mouse']['frames'] = mcData['mc']['mouse']['frames'].slice(28);
                mc = new MovieClip(mcTexture, mcData, "mouse", "mouse");
                mc.gotoAndPlay(1, -1);
            });
        },
        bird: function () {
            var mcData;
            var mcTexture;
            var mc = new MovieClip(mcTexture = Resource.getRes('bird_png'), mcData = Resource.getRes('bird_json'), "bird", "bird");
            mc.gotoAndPlay(1, 1);

            mc.once('complete', function(){
                mcData['mc']['bird']['frames'] = mcData['mc']['bird']['frames'].slice(35);
                mc = new MovieClip(mcTexture, mcData, "bird", "bird");
                mc.gotoAndPlay(1, -1);
            });
        },
        man: function () {
            var mcData;
            var mcTexture;
            var mc = new MovieClip(mcTexture = Resource.getRes('man_png'), mcData = Resource.getRes('man_json'), "man", "man");
            mc.gotoAndPlay(1, 1);

            mc.once('complete', function(){
                mcData['mc']['man']['frames'] = mcData['mc']['man']['frames'].slice(25);
                mc = new MovieClip(mcTexture, mcData, "man", "man");
                mc.gotoAndPlay(1, -1);
            });
        }
    };

    var Scenes = (function() {

        var Scene1 = function(){
            this.superClass.constructor.call(this);
            this.sceneContainer = $('#first_scene');
            this.stageH = this.sceneContainer.closest('.evt-section').height();

            this.book = this.sceneContainer.find('.book');
            this.book._w = this.book.width();
            this.book._y = parseFloat(this.book.css('top')) || 0;
            this.title = this.sceneContainer.find(".title");
            this.title._y = parseFloat(this.title.css('top')) || 0;
            this.titleText = this.sceneContainer.find(".title-text");
            this.titleText._y = parseFloat(this.titleText.css('top')) || 0;
            this.arrow = this.sceneContainer.find('.arrow');
            this.arrow._y = parseFloat(this.arrow.css('top')) || 0;
            this.arrowSprite = this.sceneContainer.find(".arrow-wrap");
            this.arrowSprite._y = parseFloat(this.arrowSprite.css('top')) || 0;

            this.bookMC = scenMovieClip.book();
            this.bookMC.setFrame(0);

            this.setAnimation();
        };

        ClassExtend(Scene1, CustEvent, {

            setAnimation: function(){
                var self = this;

                this.title.delay(300).animate({opacity: 1, marginTop: 0}, 800, 'easeOutCubic');
                this.titleText.delay(800).animate({opacity: 1, marginTop: 0}, 800, 'easeOutCubic');

                var handler = function() {
                    self.arrow.animate({marginTop:  30}, 600, 'easeInCubic').animate({marginTop: 0}, 600, 'easeOutCubic', function(){
                        setTimeout(handler, 200);
                    });
                };

                handler.call(this);
            },

            setBookFrame: function(frameIndex){
                var totalFrames = this.bookMC.totalFrames;
                if( frameIndex > totalFrames ) return;
                this.bookMC.gotoAndStop(frameIndex);
            },

            setScroll: function (scrollTop) {
                this.setViewPort(-this.stageH/2 + (scrollTop - this.stageH*2));
            },

            setViewPort: function( dis ){
                this.sceneContainer.get(0).style.top = dis + "px";
            },

            setScrollAnim: function(scrollTop){

                var ratio = scrollTop/(this.stageH/2);
                var opacity = Math.max(0, 1 - ratio);
                var scale = 1 + ratio*0.32;
                var scrollDist = scrollTop*0.8;

                this.book.get(0).style.zoom = scale;
                this.book.css({
                    top: this.book['_y'] + scrollDist/3,
                    marginLeft: -this.book['_w']*(scale-1)/1.5
                });

                this.title.css({
                    opacity: opacity,
                    top: this.title['_y'] + scrollDist
                });

                this.titleText.css({
                    opacity: opacity,
                    top: this.titleText['_y'] + scrollDist
                });

                this.arrowSprite.css({
                    opacity: opacity,
                    top: this.arrowSprite['_y'] + scrollDist
                });

            }
        });

        var Scene2 = function () {
            this.superClass.constructor.call(this);
            this.sceneContainer = $('#second_scene');
            this.stageH = this.sceneContainer.closest('.evt-section').height();
            this.initEvents();
        };

        ClassExtend(Scene2, CustEvent, {

            setAnimation: function () {
                scenMovieClip.house();
                scenMovieClip.mouse();
                scenMovieClip.bird();
                scenMovieClip.man();
            },

            setScroll: function (scrollTop) {
                this.setViewPort(-this.stageH/2 + (scrollTop - this.stageH));
            },

            setViewPort: function( dis ){
                this.sceneContainer.get(0).style.top = dis + "px";
            },

            initEvents: function () {
                this.once('SCENE_ENTER_2', function () {
                    this.setAnimation();
                }, this);
            }
        });

        var Scene3 = function () {
            this.superClass.constructor.call(this);
            this.sceneContainer = $('#third_scene');
            this.stageH = this.sceneContainer.closest('.evt-section').height();
            this.initEvents();
        };

        ClassExtend(Scene3, CustEvent, {

            setAnimation: function () {
                scenMovieClip.mouseC();
                scenMovieClip.birdC();
                scenMovieClip.skating();
                scenMovieClip.fish();
            },

            setScroll: function (scrollTop) {
                this.setViewPort(-this.stageH/1.6 + (scrollTop - this.stageH*2));
            },

            setViewPort: function( dis ){
                this.sceneContainer.get(0).style.top = dis + "px";
            },

            initEvents: function () {
                this.once('SCENE_ENTER_3', function () {
                    this.setAnimation();
                }, this);
            }
        });

        var Scene4 = function () {
            this.superClass.constructor.call(this);
            this.sceneContainer = $('#fourth_scene');
            this.stageH = this.sceneContainer.closest('.evt-section').height();
            this.initEvents();
        };

        ClassExtend(Scene4, CustEvent, {

            setAnimation: function () {
                setAllAnimate(this.sceneContainer);
            },

            setScroll: function (scrollTop) {
                this.setViewPort(Math.min(0, -this.stageH + (scrollTop - this.stageH*2)));
            },

            setViewPort: function( dis ){
                this.sceneContainer.get(0).style.top = dis + "px";
            },

            initEvents: function () {
                this.once('SCENE_ENTER_4', function () {
                    this.setAnimation();
                }, this);
            }
        });

        return {
            Scene1: Scene1,
            Scene2: Scene2,
            Scene3: Scene3,
            Scene4: Scene4
        };

    })();

    var Snow = function(type){
        this.type = type;
        this.snowEl = document.createElement('div');

        var type = 'snow'+this.type;
        var snowItem = Resource.getRes('snow_json', type);

        if( !snowItem ) return this;

        this.snowUrl = Resource.getRes('snow_png');
        this.width = snowItem.w;
        this.height = snowItem.h;

        this.hasOpacity = 'opacity' in document.body.style;

        this.addStyle(snowItem);

    };

    ClassExtend(Snow, {
        addStyle: function(config){
            for(var i in config){
                this.snowEl.style.position = 'absolute';
                this.snowEl.style.width = config.w + "px";
                this.snowEl.style.height = config.h + "px";
                this.snowEl.style.background = 'url('+ this.snowUrl +') '+ -config.x +'px '+ -config.y +'px no-repeat';
            }
        },
        setStyle: function(styles){
            for(var i in styles){
                if( i == 'opacity' && !this.hasOpacity ){
                    this.snowEl.style.zoom = '1';
                    this.snowEl.style.filter = "alpha(opacity="+ styles[i]*100 +")";
                    continue;
                }
                this.snowEl.style[i] = styles[i];
            }
        }
    });

    var SnowScene = function(container, x, y, dist){
        this.snowX = x;
        this.snowY = y;
        this.container = $(container).get(0);
        this.scrollHolder = dist;
        this.snowStack = new Array();
        this.stageH = 800;
        this.stageW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.createSnows();
    };

    ClassExtend(SnowScene, CustEvent, {
        createSnows: function(){
            for(var i = 1; i<13; i++){
                this.createSnow(i);
            }
        },
        createSnow: function( type ){
            var snow = new Snow(type);

            snow.setStyle({
                opacity: 0,
                '-webkit-transform': 'scale(0.4)',
                'transform': 'scale(0.4)',
                left: this.snowX - snow.width/2 + "px",
                top: this.snowY - snow.height/2 + "px"
            });

            snow.typeIndex = type;
            snow.randOffsetX = this.rand(0, 500);
            this.container.appendChild(snow.snowEl);
            this.snowStack.push(snow);
        },
        doAnimate: function(snow, scrollTop){
            var ratio = scrollTop/this.stageH/4;
            var isLeft = snow.typeIndex < 7 ? true: false;
            var offsetX = snow.typeIndex*this.stageW/15;
            var extRatio = Math.min(scrollTop/this.scrollHolder, 1);
            var extRatio2 = scrollTop/this.stageH*60;
            var yRatio = 0.05;

            if( scrollTop > this.stageH*2 ){
                yRatio = 0.22;
            }

            if( scrollTop > this.stageH*2.5 ){
                yRatio = 0.32;
            }

            snow.setStyle({
                opacity: extRatio,
                '-webkit-transform': 'scale('+ extRatio +') rotate('+ extRatio2 +'deg)',
                'transform': 'scale('+ extRatio +') rotate('+ extRatio2 +'deg)',
                top: this.snowY - scrollTop*yRatio + snow.randOffsetX + "px",
                left: this.snowX + (isLeft ? -1 : 1) * Math.sin(ratio*5)*offsetX + "px"
            });
        },
        setAnimates: function(scrollTop){
            for(var i=0; i<this.snowStack.length; i++){
                this.doAnimate(this.snowStack[i], scrollTop);
            }
        },
        rand: function(min, max){
            return min + Math.random()*(max-min);
        }
    });

    var Main = function(){
        this.loadResource();
    };

    ClassExtend(Main, {
        createScenes: function(){

            for(var i=0; i<4; i++){
                this['scene' + (i+1)] = new Scenes['Scene' + (i+1)];
            }

            this.container = $('#wb_container');
            this.sections = this.container.find('.evt-section');
            this.numChildren = this.sections.length;
            this.book = $("#book");
            this.scrollNode = document.getElementById('evt_scroll_view');
            this.sceneContainer = this.container.find(".evt-views");
            this.bigMan = $('#bigMan');
            this.snowContainer = $('#snow_scene');
            this.bigManH = this.bigMan.height();
            this.stageH = parseFloat(this.sceneContainer.find('.evt-section').eq(0).css('height'))||0;

            this.setScrollView();
            this.initEvents();

            var bkOffset = this.book.offset();
            var bkHeight = this.book.height()/2;
            this.snowScene = new SnowScene(this.snowContainer, bkOffset.left, bkOffset.top + bkHeight/2, bkHeight/2);
        },
        loadResource: function(){
            var self = this;

            var loadComplete = function () {
                self.loadingMC.stop();
                Resource.el('#evt_loading').style.display = "none";
                Resource.el('#wb_container').style.display = 'block';
                correctPNG(Resource.el('#wb_container'));
                self.createScenes();
            };

            new Resource.JSONloader('default.res.json').success(function(resData){
                var preLoader = new Resource.loadGroup("loading", resData);
                preLoader.addEvent('complete', function(){

                    self.loadingMC = scenMovieClip.loading();

                    var loader = new Resource.loadGroup("preload", resData);
                    var spin = Resource.el('#evt_spin');

                    loader.addEvent("progress", function (loaded, total) {
                        spin.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";
                    });

                    loader.addEvent("complete", loadComplete);
                });
            });
        },
        setScrollHeight: function(){
            var diff = this.stageH - document.documentElement.clientHeight;
            this.scrollNode.style.height = this.stageH*4 - diff + "px";
        },
        setScrollView: function(){
            var bgsrc = Resource.getRes('page_bg_png');
            this.scrollNode.style.background = 'url('+ bgsrc +')';
            this.setViewPort(-this.stageH*3);
            this.setScrollHeight();
        },
        setSceneAnimate: function(scrollDist){
            this.setViewPort(scrollDist);
        },
        setViewPort: function( dis ){
            var el = this.sceneContainer.get(0);
            if( isSupportCss3 ){
                el.style['-webkit-transform'] = 'translate3d(0,'+ dis +'px,0)';
                el.style['transform'] = 'translate3d(0,'+ dis +'px,0)';
            } else {
                el.style.top = dis + "px";
            }
        },
        showBigMan: function(){
            if( !this.isBigManShow ) {
                if( isSupportCss3 ){
                    this.bigMan.css({
                        '-webkit-transform': 'translate3d(0,'+ -this.bigManH +'px,0)',
                        'transform': 'translate3d(0,'+ -this.bigManH +'px,0)'
                    });
                } else {
                    this.bigMan.stop().animate({marginTop: -this.bigManH}, 800, 'easeOutCubic');
                }
                this.isBigManShow = true;
            }
        },
        hideBigMan: function(){
            if( this.isBigManShow ) {
                if( isSupportCss3 ){
                    this.bigMan.css({
                        '-webkit-transform': 'translate3d(0,0,0)',
                        'transform': 'translate3d(0,0,0)'
                    });
                } else {
                    this.bigMan.stop().animate({marginTop: 0}, 800, 'easeOutCubic');
                }
                this.isBigManShow = false;
            }
        },
        initEvents: function(){
            var self = this;
            var bookCellH = this.book.height()/12;
            var initY = (function(){
                    var $el = self.sceneContainer;
                    if( isSupportCss3 ){
                        var transform = $el.get(0).style['transform'] || $el.get(0).style['-webkit-transform'];
                        var ret = /translate3d\(([\s\S]+)\)/g.exec(transform);
                        return parseFloat(ret[1].split(",")[1]);
                    } else {
                        return parseFloat($el.css('top')) || 0;
                    }
                })();

            var scrollHandle;

            window.onscroll = scrollHandle = function(e){
                var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

                self.setSceneAnimate(initY + scrollTop);
                self.snowScene.setAnimates(scrollTop);
                self.scene1.setBookFrame(Math.ceil(scrollTop/bookCellH));
                self.scene1.setScrollAnim(scrollTop);

                if( scrollTop > self.stageH ){
                    self.scene2.dispatchEvent('SCENE_ENTER_2');
                    self.scene2.setScroll(scrollTop);
                }

                if( scrollTop > self.stageH*2 ){
                    self.scene3.dispatchEvent('SCENE_ENTER_3');
                    self.scene3.setScroll(scrollTop);
                }

                if( scrollTop > self.stageH*2.8 ){
                    self.scene4.dispatchEvent('SCENE_ENTER_4');
                    self.scene4.setScroll(scrollTop);
                    self.snowContainer[0].style.display = 'none';
                } else {
                    self.snowContainer[0].style.display = '';
                }

                if( scrollTop > self.stageH*0.5 && scrollTop < self.stageH*2.3 ){
                    self.showBigMan();
                } else {
                    self.hideBigMan();
                }

            };

            //scrollHandle();

            window.onresize = function(){
                self.setScrollHeight();
            }
        }
    });


    var correctPNG = function(container){
        var arVersion = navigator.appVersion.split("MSIE");
        var version = parseFloat(arVersion[1]);
        if (version && (version >= 5.5 && version < 9) && (document.body.filters)) {
            var lee_i = 0;
            var docimgs= container.getElementsByTagName('img');
            for (var j = 0; j < docimgs.length; j++) {
                var img = docimgs[j];
                var imgName = img.src.toUpperCase();
                if( !img.getAttribute('usefixed') ) continue;
                if (imgName.substring(imgName.length - 3, imgName.length) == "PNG" && !img.getAttribute("usemap")) {
                    lee_i++;
                    var SpanID = img.id || 'ra_png_' + lee_i.toString();
                    var imgData = new Image();
                    imgData.proData = SpanID;
                    imgData.onload = function () {
                        $("#" + this.proData).css("width", this.width + "px").css("height", this.height + "px");
                    }
                    imgData.src = img.src;
                    var imgID = "id='" + SpanID + "' ";
                    var imgClass = (img.className) ? "class='" + img.className + "' " : ""
                    var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
                    var imgStyle = "display:inline-block;" + img.style.cssText
                    if (img.align == "left") imgStyle = "float:left;" + imgStyle
                    if (img.align == "right") imgStyle = "float:right;" + imgStyle
                    if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
                    var strNewHTML = "<span " + imgID + imgClass + imgTitle
                        + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
                        + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
                        + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
                    img.outerHTML = strNewHTML;
                    j = j - 1;
                }
            }
        }
    };

    var supportCanvas = (function(){
        var context = document.createElement('canvas').getContext;
        if( !context ) return false;
        return true;
    })();

    if( supportCanvas ){
        location.href = 'childrenDay.html';
    }

    $(function(){
        new Main();
    });

})(jQuery);