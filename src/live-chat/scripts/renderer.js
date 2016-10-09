/**
 * Created by shuxy on 2016/4/20
 */

+function($, window, undefined){
    "use strict";

    var EC = {};
    EC.version = '1.0.0';

    var slice = Array.prototype.slice,
        toString = Object.prototype.toString,
        isDefined = function(obj){
            return typeof obj !== 'undefined';
        },
        isNumber = function(obj){
            return typeof obj === 'number';
        },
        isString = function(obj){
            return typeof obj === 'string';
        },
        isFunction = function(obj){
            return typeof obj == 'function';
        },
        isArray = Array.isArray || function(obj){
            return toString.call(obj) == "[object Array]";
        },
        RESIZE_EVENT = 'onorientationchange' in window ? 'orientationchange' : 'resize',
        upperKey = function( key ){
            return key.replace(/\-(\w)/g, function( m,n ){
                return n.toUpperCase();
            });
        },
        getStyle = function (node, prop){
            return window.getComputedStyle(node, null)[upperKey(prop)];
        };

    /**
     * Extend类似jquery.extend
     * **/
    var Extend = function (source) {
        var props = slice.call(arguments, 1);
        var prop, p;
        for (var i = 0; i < props.length; i++) {
            for (p in (prop = props[i])) {
                if (prop.hasOwnProperty(p)) {
                    source[p] = prop[p];
                }
            }
        }

        return source;
    };

    /**
     * 类的继承简单封装
     * **/
    var ClassExtend = function(dest, source, proto){
        if( typeof source === 'object' ){
            var args = slice.call(arguments, 1);
            args.unshift(dest.prototype);
            Extend.apply(null, args);
            return dest;
        }

        var f = function(){};
        f.prototype = source.prototype;

        var fObj = new f();

        for(var i in fObj){
            dest.prototype[i] = fObj[i];
        }

        dest.prototype.constructor = dest;
        dest.prototype.superclass = source.prototype;

        if(source.prototype.constructor == Object.prototype.constructor)
            source.prototype.constructor = source;

        if( proto ) {
            for(i in proto) {
                dest.prototype[i] = proto[i];
            }
        }

        Extend(dest, source);

        return dest;
    };

    Extend(EC.util||(EC.util={}), {
        isDefined: isDefined,
        isNumber: isNumber,
        isString: isString,
        isFunction: isFunction,
        isArray: isArray,
        getStyle: getStyle
    });

    /*=========== Event ==========*/
    var Event = function() {
        this._eventPool = {};
        this._guid = 0;
    };

    Event.prototype = {

        on: function(eventName, handle, scope){
            var self = this;

            if( !(eventName in this._eventPool) ){
                this._eventPool[eventName] = [];
            }

            handle._guid = this._guid++;

            var scopeHandle = function(){
                return handle.apply(scope || self, arguments);
            };

            scopeHandle._guid = handle._guid;

            this._eventPool[eventName].push(scopeHandle);

            return this;
        },

        once: function(eventName, handle, scope){
            var handler = function(){
                handle.apply(scope||this, arguments);
                this.off(eventName, handler);
            };

            this.on(eventName, handler, this);

            return this;
        },

        off: function(eventName, handle, scope){
            if( handle === undefined ){
                delete this._eventPool[eventName];
                return this;
            }

            var events = this._eventPool[eventName];

            if( !events ) return this;

            for(var i=0; i<events.length; i++){
                if( events[i]._guid === handle._guid ){
                    events.splice(i, 1);
                }
            }

            return this;
        },

        dispatch: function( eventName ){
            var events = this._eventPool[eventName];

            if( !events ) return this;

            var args = slice.call(arguments, 1);

            for(var i = 0; i<events.length; i++){
                typeof events[i] == 'function' && events[i].apply(this, args);
            }

            return this;
        },

        dispatchAll: function(){
            var args = slice.call(arguments);

            for(var i in this._eventPool){
                args.unshift(i);
                this.dispatch.apply(this, args);
            }

            return this;
        },

        success: function(cb){
            return this.on('success', cb);
        },

        complete: function(cb){
            return this.on('complete', cb);
        },

        error: function(cb){
            return this.on('error', cb);
        },

        progress: function(cb){
            return this.on('progress', cb);
        },

        clear: function(){
            this._eventPool = {};
            return this;
        }
    };

    //位图存放对象
    var bitMapData = {};

    //加载图片
    var loadImg = function(src, suc, err){
        var img = new Image();
        img.addEventListener('load', function sucHandler(){
            suc && suc(img);
            this.removeEventListener('load', sucHandler, false);
        }, false);

        img.addEventListener('error', function errHandler(){
            err && err();
            console.error('fail load:' + src);
            this.removeEventListener('error', errHandler, false);
        }, false);

        img.src = src;

    };

    var setBiMap = function(src, callback){
        var _setData = function(img){
            var label = img.getAttribute("data-label");
            var keyName = label ? label : img.src.split("/").pop().replace(".", "_");
            bitMapData[keyName] = {
                src: img.src,
                tag: keyName,
                width: img.width,
                height: img.height,
                bitMapData: img
            };

            callback && callback(img, bitMapData[keyName]);
        };

        if( isString(src) ) {
            loadImg(src, _setData);
        } else {
            _setData(src);
        }
    };

    var getBitMap = function(key){
        return bitMapData[key];
    };

    var loadResource = function(queue, context){
        var defer = $.Deferred();
        var _count = 0;
        var length = queue.length;
        var source = queue[_count];

        setBiMap(source, function handle(){
            if (++_count > length - 1) {
                defer.resolveWith(context||null, []);
                return;
            }
            setBiMap((source = queue[_count]), handle);
        });

        return defer;
    };

    Extend(EC, {
        loadImg: loadImg,
        setBiMap: setBiMap,
        getBitMap: getBitMap,
        loadResource: loadResource
    });

    var requestAnimationFrame =
        window.requestAnimationFrame        ||
        window.webkitRequestAnimationFrame  ||
        window.mozRequestAnimationFrame     ||
        function (callback) {
            return setTimeout(callback, 1000 / 60);
    };

    var cancelAnimationFrame =
        window.cancelAnimationFrame        ||
        window.webkitCancelAnimationFrame  ||
        window.mozCancelAnimationFrame     ||
        function (id) {
            return clearTimeout(id);
        };

    var drawImg = function(ctx, obj){
        if( 'sx' in obj ){
            var _width = ctx.canvas.width,
                _height = ctx.canvas.height,
                swidth = obj.swidth,
                sheight = obj.sheight;

            if( swidth >= _width ) swidth = _width - 1;
            if( sheight >= _height ) sheight = _height - 1;

            ctx.drawImage(obj.bitMapData, obj.sx, obj.sy, swidth, sheight, -1*obj.anchorX*obj.width, -1*obj.anchorY*obj.height, obj.width, obj.height);
        } else {
            ctx.drawImage(obj.bitMapData, -1*obj.anchorX*obj.width, -1*obj.anchorY*obj.height, obj.width, obj.height);
        }
    };

    var drawText = function(ctx, obj){
        ctx.font = obj.size + "px " + obj.textFamily;
        ctx.textAlign = obj.textAlign;
        ctx.textBaseline = obj.textBaseline || "hanging";

        if( obj.stroke ) {
            ctx.strokeStyle = obj.textColor;
            ctx.strokeText(obj.text, -1*obj.anchorX*obj.width, -1*obj.anchorY*obj.height);
        } else {
            ctx.fillStyle = obj.textColor;
            ctx.fillText(obj.text, -1*obj.anchorX*obj.width, -1*obj.anchorY*obj.height);
        }
    };

    var mixTextSize = function(ctx, obj){
        ctx.font = obj.size + "px " + obj.textFamily;
        obj.width = ctx.measureText(obj.text).width;
        obj.height = obj.size + 2;
    };

    var drawShape = function(ctx, obj){
        ctx.beginPath();
        drawShapeContext(ctx, obj);
        obj.draw(ctx);
        ctx.closePath();
    };

    var drawContext = function(ctx, obj){
        obj = obj || {};
        ctx.globalAlpha = obj.parent.alpha < 1 ? obj.parent.alpha : obj.alpha;
        //ctx.translate( obj.parent.x + obj.x + obj.anchorX*obj.width, obj.parent.y + obj.y + obj.anchorY*obj.height);
        //ctx.scale.apply(ctx, [obj.parent.scaleX * obj.scaleX, obj.parent.scaleY * obj.scaleY]);
        ctx.transform(
            obj.scaleX * obj.parent.scaleX, //水平缩放绘图
            obj.skewX * obj.parent.skewX, //水平倾斜绘图
            obj.skewY * obj.parent.skewY, //垂直倾斜绘图
            obj.scaleY * obj.parent.scaleY, //垂直缩放绘图
            obj.parent.x + obj.x + (obj.anchorX + obj.parent.anchorX)*obj.width, //水平移动绘图
            obj.parent.y + obj.y + (obj.anchorY + obj.parent.anchorY)*obj.height //垂直移动绘图
        );
        ctx.rotate((obj.rotation + obj.parent.rotation)*Math.PI/180);
    };

    var drawShapeContext = function(ctx, obj){
        ctx.fillStyle = obj.fillStyle;
        ctx.strokeStyle = obj.strokeStyle;
        ctx.shadowColor = obj.shadowColor;
        ctx.shadowBlur = obj.shadowBlur;
        ctx.shadowOffsetX = obj.shadowOffsetX;
        ctx.shadowOffsetY = obj.shadowOffsetY;
        ctx.lineCap = obj.lineCap;
        ctx.lineJoin = obj.lineJoin;
        ctx.lineWidth = obj.lineWidth;
        ctx.miterLimit = obj.miterLimit;
    };

    var baseMethods = [
        "rect",
        "arc",
        "moveTo",
        "lineTo",
        "clip",
        "quadraticCurveTo",
        "bezierCurveTo",
        "arcTo"
    ];

    var colorTransfer = (function(){
        //十六进制颜色值的正则表达式
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var colorTransfer = {};

        /*RGB颜色转换为16进制*/
        colorTransfer.toHex = function(rgb){
            if(/^(rgb|RGB)/.test(rgb)){
                var aColor = rgb.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
                var strHex = "#";
                for(var i=0; i<aColor.length; i++){
                    var hex = Number(aColor[i]).toString(16);
                    if(hex === "0"){
                        hex += hex;
                    }
                    strHex += hex;
                }
                if(strHex.length !== 7){
                    strHex = rgb;
                }
                return strHex;
            } else if(reg.test(rgb)){
                var aNum = rgb.replace(/#/,"").split("");
                if(aNum.length === 6){
                    return rgb;
                } else if(aNum.length === 3){
                    var numHex = "#";
                    for(var i=0; i<aNum.length; i+=1){
                        numHex += (aNum[i]+aNum[i]);
                    }
                    return numHex;
                }
            } else {
                return rgb;
            }
        };

        /*16进制颜色转为RGB格式*/
        colorTransfer.toRgb = function(hex, alpha){
            var sColor = hex.toLowerCase();
            if(sColor && reg.test(sColor)){
                var sPrefix = "rgb";
                if(sColor.length === 4){
                    var sColorNew = "#";
                    for(var i=1; i<4; i+=1){
                        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
                    }
                    sColor = sColorNew;
                }
                //处理六位的颜色值
                var sColorChange = [];
                for(var i=1; i<7; i+=2){
                    sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
                }
                if( typeof alpha == 'number' ){
                    sColorChange.push(alpha);
                    sPrefix = "rgba";
                }
                return sPrefix + "(" + sColorChange.join(",") + ")";
            } else {
                return sColor;
            }
        };

        return colorTransfer;

    })();

    Extend(EC.util||(EC.util={}), {
        colorTransfer: colorTransfer
    });

    /**
     * BaseClass 操作基类
     * **/
    var BaseClass = function(){
        BaseClass.prototype.superclass.constructor.call(this);

        this.x = 0;
        this.y = 0;

        this.visible = true;
        this.alpha = 1;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.skewX = 0;
        this.skewY = 0;
        this.anchorX = 0;
        this.anchorY = 0;

        this._children = [];
        this.numChildren = 0;
    };

    ClassExtend(BaseClass, Event, {

        addChild: function( object, index ){
            object.parent = this;

            object.visible = isDefined(object.visible) ? object.visible : this.visible;
            object.alpha = isDefined(object.alpha) ? object.alpha : this.alpha;
            object.rotation = isDefined(object.rotation) ? object.rotation : this.rotation;
            object.scaleX = isDefined(object.scaleX) ? object.scaleX : this.scaleX;
            object.scaleY = isDefined(object.scaleY) ? object.scaleY : this.scaleY;

            if( !isNumber(index) ) {
                this._children.push(object);
            } else {
                this._children.splice(index, 0, object);
            }

            if( object.$type == 'TextField' ){
                mixTextSize(object.MainContext, object);
            }

            this.numChildren = this._children.length;

            return this;
        },

        addChildAt: function( object, index ){
            return this.addChild(object, index);
        },

        removeChild: function(object){
            /*var self = this;
            this._children.forEach(function(data, i){
                if( data.tag == object.tag ){
                    self._children.splice(i, 1);
                }
            });*/

            this._stopTweens(object);

            for(var i = 0; i < this._children.length; i++){
                if( this._children[i].tag === object.tag ){
                    this._children.splice(i, 1);
                    break;
                }
            }

            this.numChildren = this._children.length;

            return this;
        },

        removeAllChildren: function(){
            this._stopAllTweens();
            this._children = [];
            this.numChildren = 0;
            return this;
        },

        getChild: function(object){
            return this._children.find(function(item){
                return item.tag == object.tag;
            });
        },

        getChilds: function(){
            return this._children;
        },

        getChildIndex: function(childObj){
            for(var i=0; i<this._children.length; i++){
                if( this._children[i].tag == childObj.tag ) return i;
            }

            return -1;
        },

        setChildIndex: function( childObj, index ){
            this.removeChild(childObj);
            this._children.splice(index, 0, childObj);
            return this;
        },

        transform: function(scaleX, skewX, skewY, scaleY, x, y){
            this.x = x;
            this.y = y;
            this.scaleX = scaleX;
            this.scaleY = scaleY;
            this.skewX = skewX;
            this.skewY = skewY;

            return this;
        },

        setTransform: function(rotation, skewX, skewY, scaleY, x, y){
            this.x = x;
            this.y = y;
            this.rotation = rotation;
            this.scaleY = scaleY;
            this.skewX = skewX;
            this.skewY = skewY;

            return this;
        },

        _stopTweens: function( target ){
            Tween.removeTweens(target);
            return this;
        },

        _stopAllTweens: function(){
            Tween.removeAllTweens(this);
            return this;
        }
    });

    /**
     * TextField 文字类
     * **/
    var TextField = function(text, size, x, y, color, align, family, width, height){
        BaseClass.call(this);
        TextField.prototype.superclass.constructor.call(this);

        this.text = text || "";
        this.size = size || 16;
        this.textAlign = align || "start";
        this.textBaseline = "";
        this.textFamily = family || "Microsoft yahei,Arial,sans-serif";
        this.textColor = color || "#000";
        this.stroke = false;

        this.x = x||0;
        this.y = y||0;
        this.width = width||0;
        this.height = height||0;

        this.$type = "TextField";
    };

    ClassExtend(TextField, Event);

    /**
     * BitMap 位图类
     * **/
    var BitMap = function(key, x, y, width, height, sx, sy, swidth, sheight){
        BaseClass.call(this);
        BitMap.prototype.superclass.constructor.call(this);

        this.x = x||0;
        this.y = y||0;

        if( isDefined(sx) ) {
            this.sx = sx;
        }
        if( isDefined(sy) ) {
            this.sy = sy;
        }
        if( isDefined(swidth) ) {
            this.swidth = swidth || 0.1;
        }
        if( isDefined(sheight) ) {
            this.sheight = sheight || 0.1;
        }

        this.$type = "BitMap";

        Extend(this, getBitMap(key));

        if( isDefined(width) ){
            this.width = width;
        }

        if( isDefined(height) ){
            this.height = height;
        }

    };

    ClassExtend(BitMap, Event);

    /**
     * Shape 图形界面
     * **/
    var Shape = function(x, y, w, h){
        BaseClass.call(this);
        Shape.prototype.superclass.constructor.call(this);

        this.x = x||0;
        this.y = y||0;
        this.width = w||0;
        this.height = h||0;

        this._drawFuns = [];
        this._drawTypes = [];

        this.$type = "Shape";

    };

    ClassExtend(Shape, Event, {
        _setStyle: function(type, color, alpha, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY){
            this._drawTypes.push(type.replace("Style", ""));

            if(typeof alpha == 'number' && alpha < 1){
                this[type] = colorTransfer.toRgb(color, alpha);
            } else {
                this[type] = color;
            }

            this.shadowColor = shadowColor;
            this.shadowBlur = shadowBlur;
            this.shadowOffsetX = shadowOffsetX;
            this.shadowOffsetY = shadowOffsetY;
        },
        fill: function(){
            var args = slice.call(arguments);
            args.unshift("fillStyle");
            this._setStyle.apply(this, args);
        },
        stroke: function(color, alpha){
            var args = slice.call(arguments);
            args.unshift("strokeStyle");
            this._setStyle.apply(this, args);
        },
        draw: function(ctx){
            this._drawFuns.forEach(function(fun){
                isFunction(fun)&&fun(ctx);
            });
            this._drawTypes.forEach(function(drawType){
                ctx[drawType]();
            });
        }
    });

    baseMethods.forEach(function(method){
        Shape.prototype[method] = function(){
            var self = this;
            var args = slice.call(arguments);
            if( method == 'rect' || method == 'arc' ){
                self.x = args.shift();
                self.y = args.shift();
                if( method == 'arc' ) {
                    self.width = args[0]*2;
                    self.height = args[0]*2;
                } else {
                    self.width = args[0];
                    self.height = args[1];
                }
                args = [-1*self.anchorX*self.width, -1*self.anchorY*self.height].concat(args);
            }
            this._drawFuns.push(function(ctx){
                ctx[method].apply(ctx, args);
            });
        };
    });

    /**
     * Sprite 雪碧图类
     * **/
    var Sprite = function(x, y, w, h){
        Sprite.prototype.superclass.constructor.call(this);

        this.x = x||0;
        this.y = y||0;
        this.width = w||0;
        this.height = h||0;

        this.$type = "Sprite";

        this.on("addToStage", function(){
            this.getChilds().forEach(function(childObj){
                childObj.dispatch("addToStage", childObj);
            });
        }, this);
    };

    ClassExtend(Sprite, BaseClass, {
        addChild: function( childObj ){
            childObj.MainContext = this.MainContext;
            Sprite.prototype.superclass.addChild.apply(this, arguments);

            if( this.getChilds().length == 1 ) {
                this.width = childObj.x + childObj.width;
            } else {
                if( childObj.x + childObj.width > this.width ){
                    this.width = childObj.x + childObj.width;
                }
            }
        }
    });

    /**
     * Renderer 渲染器
     * **/
    var Renderer = function(canvas, options){
        Renderer.prototype.superclass.constructor.call(this);

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.$type = "ObjectContainer";
        this.options = Extend({}, {adapter: true, showFps: false, width: window.innerWidth, height: window.innerHeight}, options||{});
        this.width = this.options.width;
        this.height = this.options.height;
        this.lastTime = 0;
        this._updateCb = [];
        this._stopCb = [];

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        if( this.options.adapter ) {
            this.setAdapter();
            this._initEvents();
        }

        if( this.options.showFps ){
            this.createFps();
            this.onenterframe(function(){
                this.showFps();
            }, this);
        }

        this.start();
    };

    ClassExtend(Renderer, BaseClass, {
        addChild: function( childObj ){
            childObj.MainContext = this.ctx;
            Renderer.prototype.superclass.addChild.apply(this, arguments);
            this._triggerAddToStage();
        },
        render: function(){
            var self = this;
            var _render = function (obj) {
                if (obj.$type == 'Sprite') {
                    obj.getChilds().forEach(function(item){
                        _render(item);
                    });
                } else {
                    self._renderItem(obj);
                }
            };

            this._children.forEach(_render);

            return this;
        },
        _renderItem: function(obj){
            var self = this;

            if( obj.visible === false ) return;

            self.ctx.save();
            drawContext(self.ctx, obj);
            switch ( obj.$type ){
                case 'BitMap':
                    drawImg(self.ctx, obj);
                    break;
                case 'TextField':
                    drawText(self.ctx, obj);
                    break;
                case 'Shape':
                    drawShape(self.ctx, obj);
                    break;
            }

            self.ctx.restore();
        },
        erase: function(){
            this.ctx.clearRect(0, 0, this.width, this.height);
            return this;
        },
        clear: function(){
            this.removeAllChildren();
        },
        start: function(){
            var self = this;

            if( isDefined(self.renderTimer) ) return this;

            var callRender = function(){
                self.erase();
                self.render();
                self.renderTimer = requestAnimationFrame(callRender);
                self._triggerUpdate();
            };

            callRender();

            return this;
        },
        stop: function(){
            cancelAnimationFrame(this.renderTimer);
            delete this.renderTimer;
            this._triggerStop();
            return this;
        },
        onenterframe: function(callback, context){
            var self = this;
            this._updateCb.push(function(){
                isFunction(callback) && callback.apply(context||self, arguments);
            });

            return this;
        },
        onStop: function(callback, context){
            var self = this;
            this._stopCb.push(function(){
                isFunction(callback) && callback.apply(context||self, arguments);
            });

            return this;
        },
        _triggerAddToStage: function(){
            this.getChilds().forEach(function(childObj){
                if( !childObj._isAddTriggered ) {
                    childObj.dispatch("addToStage", childObj);
                    childObj._isAddTriggered = true;
                }
            });
        },
        _triggerUpdate: function(){
            this._updateCb.forEach(function(cb){
                cb();
            });
        },
        _triggerStop: function(){
            this._stopCb.forEach(function(cb){
                cb();
            });
        },
        setAdapter: function(){
            var parent = this.canvas.parentNode;
            var parentW = parent.offsetWidth - parseFloat(getStyle(parent, 'padding-left')) - parseFloat(getStyle(parent, 'padding-right'));
            this.canvas.style.width = parentW + "px";
            this.canvas.style.height = this.height/this.width*parentW + "px";

            return this;
        },
        _initEvents: function(){
            var self = this;
            window.addEventListener(RESIZE_EVENT, function(){
                self.setAdapter();
            }, false);

            this.onenterframe(function(){
                this.dispatch("enterframe");
                this.getChilds().forEach(function(childObj){
                    childObj.dispatch("enterframe");
                });
            });
        },
        createFps: function(){
            this.fpsLoger = document.createElement('div');
            this.fpsLoger.className = 'fps-loger';
            this.fpsLoger.style.cssText = "position:fixed;left:0;top:0;right:0;padding:8px 15px;background-color:#f5f5f5;border-bottom:1px solid #ccc;z-index:2000;";
            document.body.appendChild(this.fpsLoger);
        },
        calculateFps: function(now) {
            var fps = 1000/(now-this.lastTime);
            this.lastTime = now;
            return fps;
        },
        showFps: function(){
            this.fpsLoger.innerHTML = "FPS: " + this.calculateFps(Date.now()).toFixed(2);
        }
    });

    baseMethods.concat([
        "createLinearGradient",
        "createPattern",
        "createRadialGradient",
        "createImageData",
        "putImageData",
        "getImageData",
        "isPointInPath",
        "globalCompositeOperation" /*source-over source-atop source-in source-out destination-over destination-atop destination-in destination-out lighter copy source-over*/
    ]).forEach(function(method){
        Renderer.prototype[method] = function(){
            return this.ctx[method].apply(this.ctx, arguments);
        };
    });

    /**
     * Easing
     * **/
    var pow = Math.pow,
        sin = Math.sin,
        PI = Math.PI,
        BACK_CONST = 1.70158;

    var Easing = {
        linear: function(t) {
            return t
        },
        easeIn: function(t) {
            return t * t
        },
        easeOut: function(t) {
            return (2 - t) * t
        },
        easeBoth: function(t) {
            return (t *= 2) < 1 ? .5 * t * t: .5 * (1 - (--t) * (t - 2))
        },
        easeInStrong: function(t) {
            return t * t * t * t
        },
        easeOutStrong: function(t) {
            return 1 - (--t) * t * t * t
        },
        easeBothStrong: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t: .5 * (2 - (t -= 2) * t * t * t)
        },
        easeOutQuart: function(t) {
            return - (pow((t - 1), 4) - 1)
        },
        easeInOutExpo: function(t) {
            if (t === 0) return 0;
            if (t === 1) return 1;
            if ((t /= 0.5) < 1) return 0.5 * pow(2, 10 * (t - 1));
            return 0.5 * ( - pow(2, -10 * --t) + 2)
        },
        easeOutExpo: function(t) {
            return (t === 1) ? 1 : -pow(2, -10 * t) + 1
        },
        swing: function(t) {
            return 0.5 - Math.cos(t * PI) / 2
        },
        swingFrom: function(t) {
            return t * t * ((BACK_CONST + 1) * t - BACK_CONST)
        },
        swingTo: function(t) {
            return (t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1
        },
        backIn: function(t) {
            if (t === 1) t -= .001;
            return t * t * ((BACK_CONST + 1) * t - BACK_CONST)
        },
        backOut: function(t) {
            return (t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1
        },
        bounce: function(t) {
            var s = 7.5625,
                r;
            if (t < (1 / 2.75)) {
                r = s * t * t
            } else if (t < (2 / 2.75)) {
                r = s * (t -= (1.5 / 2.75)) * t + .75
            } else if (t < (2.5 / 2.75)) {
                r = s * (t -= (2.25 / 2.75)) * t + .9375
            } else {
                r = s * (t -= (2.625 / 2.75)) * t + .984375
            }
            return r
        },
        doubleSqrt: function(t) {
            return Math.sqrt(Math.sqrt(t))
        }
    };

    /**
     * Tween 动画类
     * **/

    var Tween = function(obj, cfg){
        this.tweenObj = obj;
        this._updateCb = [];
        this._completeCb = [];

        this.cfg = cfg || {};
        this._repeatIndex = 0;
        this._repeatCount = 0;

        if( this.cfg.reverse ){
            this._repeatCount = 2;
        }

        if( this.cfg.loop ){
            if( isNumber(this.cfg.loop) ){
                this._repeatCount = this.cfg.loop;
            } else {
                this._repeatCount = -1;
            }
        }
    };

    Tween.cache = {};
    Tween.timerCache = {};
    Tween.uuid = 0;
    Tween.expando = '@Tween-' + +new Date;
    Tween.get = function(obj, cfg){
        return new Tween(obj, cfg);
    };

    Tween.removeTweens = function(target){
        if( target && target[ Tween.expando ] && Tween.timerCache[target[ Tween.expando ]] ) {
            Tween.get(target).stop();
        }

        return this;
    };

    Tween.removeAllTweens = function(container){
        container.getChilds().forEach(function(target){
            Tween.removeTweens(target);
        });

        return this;
    };

    Tween.prototype = {
        to: function(){
            var self = this,
                args = arguments;

            this.queue(function(){
                self.anim.apply(self, args);
            });

            return this;

        },
        wait: function(time){
            if( isNumber(time) ){
                this.queue( time );
            }

            return this;
        },
        anim: function(attrs, duration, easing){
            var self = this,
                startTime = +new Date,
                timer = Tween.timerCache[self.tweenObj[ Tween.expando ]],
                per;

            this.duration = duration || 600;
            this.easing = easing;
            this.startAttrs = Extend({}, this.tweenObj);
            this.endAttrs = attrs;

            if( timer ){
                return this;
            }

            var callUpdate = function(){
                per = (+new Date - startTime)/self.duration;
                per = per >=1 ? 1 : per;
                self.percent = per;

                timer = requestAnimationFrame(callUpdate);
                Tween.timerCache[self.tweenObj[ Tween.expando ]] = timer;
                self.update(self.tweenObj);

                if( per == 1 ){
                    self.stop();
                    self.dequeue();
                }
            };

            callUpdate();

            return this;
        },
        update: function(obj){
            var self = this;

            self._update(obj);

            /*if( obj.$type == 'Sprite' ){
                obj.getChilds().forEach(function(child){
                    self.update(child);
                });
            }*/
        },
        _update: function( obj ){
            for( var i in this.endAttrs ){
                if( this.endAttrs[i] == this.startAttrs[i] ) continue;
                obj[i] = this.startAttrs[i] + (this.endAttrs[i] - this.startAttrs[i])*(this.easing||Easing.linear)(this.percent);
            }

            this._triggerUpdate(this.tweenObj);
        },
        stop: function(){
            cancelAnimationFrame(Tween.timerCache[this.tweenObj[ Tween.expando ]]);
            delete Tween.timerCache[this.tweenObj[ Tween.expando ]];

            return this;
        },
        onUpdate: function(callback, context){
            var self = this;
            this._updateCb.push(function(){
                isFunction(callback) && callback.apply(context||self, arguments);
            });

            return this;
        },
        call: function(callback, context){
            var self = this;
            this._completeCb.push(function(){
                isFunction(callback) && callback.apply(context||self, arguments);
            });

            return this;
        },
        _triggerUpdate: function( tweenObj ){
            this._updateCb.forEach(function(cb){
                cb(tweenObj);
            });
        },
        _triggerComplete: function( tweenObj ){
            this._completeCb.forEach(function(cb){
                cb(tweenObj);
            });
        },
        queue: function( data ){
            if( !this.tweenObj[ Tween.expando ] )
                this.tweenObj[ Tween.expando ] = ++Tween.uuid;

            var fx = Tween.cache[ Tween.uuid ];
            if( fx == undefined ){
                fx = Tween.cache[ Tween.uuid ] = [];
            }
            if( data ){
                fx.push( data );
            }

            if( fx[0] !== 'running' ){
                this.dequeue();
            }

            return this;
        },

        dequeue: function() {
            var self = this,
                fx = Tween.cache[ this.tweenObj[ Tween.expando ] ] || [],
                delay,
                fn = fx.shift();

            if( fn === 'running' ){
                fn = fx.shift();
            }

            if( fn ){
                fx.unshift( 'running' );
                if( isNumber(fn) ){
                    delay = window.setTimeout(function(){
                        window.clearTimeout( delay );
                        delay = null;
                        self.dequeue();
                    }, fn );
                }
                else if( isFunction(fn) ){
                    fn.call(self.tweenObj, function(){
                        self.dequeue();
                    });
                }
            }

            if( !fx.length ){

                if( this._repeatCount == -1 || ++this._repeatIndex < this._repeatCount ){
                    this.to(this.startAttrs, this.duration, this.easing);
                }
                else {
                    delete Tween.cache[ this.tweenObj[ Tween.expando ] ];
                }

                this._triggerComplete(this.tweenObj);
            }

            return this;
        },

        clearQueue: function(){
            delete Tween.cache[ this.tweenObj[ Tween.expando ] ];
            return this;
        }
    };

    Extend(EC, {
        TextField: TextField,
        BitMap: BitMap,
        Shape: Shape,
        Sprite: Sprite,
        Stage: Renderer
    });

    Extend(window, {
        Extend: Extend,
        ClassExtend: ClassExtend,
        Tween: window.Tween || Tween,
        Easing: Easing
    });

    window.EC = EC;

}(this.jQuery||this.Zepto, window);