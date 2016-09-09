/**
 * Created by mcake on 2016/9/6.
 */

var EC = {
    version: '1.0.0'
};

(function (EC) {
    "use strict";

    var slice = Array.prototype.slice,
        toString = Object.prototype.toString,
        hasOwn = Object.prototype.hasOwnProperty,
        arrayProto = Array.prototype,
        objProto = Object.prototype,
        funProto = Function.prototype;

    Date.now || (Date.now = function(){
        return +( new Date() );
    });

    Object.create = function() {

        function Temp() {}

        return function(O) {

            if (typeof O != "object") {
                throw TypeError("Object prototype may only be an Object or null");
            }

            Temp.prototype = O;
            var obj = new Temp();
            Temp.prototype = null;

            if (arguments.length > 1) {
                var Properties = Object(arguments[1]);
                for (var prop in Properties) {
                    if (hasOwn.call(Properties, prop)) {
                        obj[prop] = Properties[prop];
                    }
                }
            }

            return obj;
        };
    }();

    funProto.bind || (funProto.bind = function(){
        var self = this,
            context = [].shift.call(arguments),
            args = [].slice.call(arguments);
        return function(){
            return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
        }
    });

    arrayProto.find || (arrayProto.find = function(cb){
        var i = 0,
            l = this.length;

        for(; i < l; i++){
            if( cb && cb(this[i], i, this) === true ){
                return this[i];
            }
        }

    });

    Array.isArray || (Array.isArray = function(obj){
        return objProto.toString.call(obj) === '[object Array]';
    });

    arrayProto.contains = arrayProto.includes || function( prop ){
        return this.indexOf(prop) > -1;
    };

    /**
     * Extend
     * **/
   var Extend = EC.extend = function (source) {
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

    EC.provide = function( props ){
        if( typeof props !== 'object' ) return;
        Extend(EC, props);
    };

    EC.provide({
        isDefined: function (obj) {
            return typeof obj !== 'undefined';
        },
        isNumber: function (obj) {
            return typeof obj === 'number';
        },
        isString: function (obj) {
            return typeof obj === 'string';
        },
        isFunction: function (obj) {
            return typeof obj === 'function';
        },
        isObject: function (obj) {
            return typeof obj === 'object';
        },
        isArray: Array.isArray || function (obj) {
            return toString.call(obj) === "[object Array]";
        },
        upperKey: function (key) {
            return key.replace(/\-(\w)/g, function (m, n) {
                return n.toUpperCase();
            });
        },
        getStyle: function (node, prop) {
            return window.getComputedStyle(node, null)[EC.upperKey(prop)];
        }
    });

    /**
     * 类的继承封装
     * **/
    var ClassExtend = function (protoProps, staticProps) {
        var parent = this;
        var child;

        if (protoProps && hasOwn.call(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () {
                return parent.apply(this, arguments);
            };
        }

        Extend(child, parent, staticProps);

        child.prototype = Object.create(parent.prototype, protoProps);
        child.prototype.constructor = child;

        child.superclass = parent.prototype;

        return child;
    };

    EC.provide({
        classExtend: ClassExtend
    });

})(EC);


/**
 * Created by mcake on 2016/9/6.
 */

(function(EC){
    "use strict";

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

    var isPointInPath = function(coord, object){
        if( coord.x > object.x && coord.x < (object.x + object.width) &&
            coord.y > object.y && coord.y < (object.y + object.height) ){
            return true;
        }

        return false;
    };

    EC.util = EC.util || {};

    EC.extend(EC.util, {
        color: colorTransfer,
        isPointInPath: isPointInPath
    });

})(window.EC);


/**
 * Created by mcake on 2016/9/6.
 */
(function(EC){
    "use strict";

    var slice = Array.prototype.slice;

    var Event = function() {
        this.initialize.apply(this, arguments);
    };

    EC.extend(Event.prototype, {

        initialize: function(){
            this._eventPool = {};
            this._guid = 0;
        },

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
    });

    Event.extend = EC.classExtend;

    EC.provide({
        Event: Event
    });

})(window.EC);

/**
 * Created by mcake on 2016/9/6.
 */

(function(EC){
    "use strict";

    var doc = document,
        dob = doc.body,
        doe = doc.documentElement;

    var isTouch = 'ontouchstart' in document;
    var pointerEnabled = window.navigator.msPointerEnabled;

    isTouch = isTouch || pointerEnabled;

    var EVENTS = pointerEnabled ? {
        START: 'MSPointerDown',
        MOVE: 'MSPointerMove',
        END: 'MSPointerCancel'
    } : {
        START: isTouch ? 'touchstart' : 'mousedown',
        MOVE: isTouch ? 'touchmove' : 'mousemove',
        END: isTouch ? 'touchend' : 'mouseup'
    };

    var TouchEvent = function(options){
        this.enableStack = [];
        this._touchX = 0;
        this._touchY = 0;
        this._offsetX = 0;
        this._offsetY = 0;
        this._bound = {};
        this._ratio = 1;
    };

    TouchEvent.prototype = {
        attach: function(stage){
            this.stage = stage;
            this.element = stage.canvas;
            this._startTime = 0;
            this._bindEvents();
        },
        _bindEvents: function(){
            this.element.addEventListener(EVENTS.START, this._onTouchStart.bind(this), false);
            this.element.addEventListener(EVENTS.MOVE, this._onTouchMove.bind(this), false);
            this.element.addEventListener(EVENTS.END, this._onTouchEnd.bind(this), false);
        },
        _onTouchStart: function(event){
            event = isTouch ? event.targetTouches[0] : event;

            this._startTime = Date.now();
            this._offsetX = window.pageXOffset || doe.scrollLeft || dob.scrollLeft || 0;
            this._offsetY = window.pageYOffset || doe.scrollTop || dob.scrollTop || 0;
            this._bound = this.element.getBoundingClientRect();
            this._ratio = this.stage.width/parseFloat(EC.getStyle(this.element, 'width'));

            this._setTouchXY(event);
            this.enableStack = this._getTouchEnables();

            this._triggerEvent("touchstart", event);
        },
        _onTouchMove: function(event){
            event = isTouch ? event.changedTouches[0] : event;
            this._setTouchXY(event);
            this._triggerEvent("touchmove", event);
        },
        _onTouchEnd: function(event){
            event = isTouch ? event.changedTouches[0] : event;
            this._setTouchXY(event);
            this._triggerEvent("touchend", event);

            var diffTime = Date.now() - this._startTime;

            if( diffTime < 200 ){
                this._triggerEvent("click", event);
            }

            if( diffTime > 500 ) {
                this._triggerEvent("longtap", event);
            }
        },
        _triggerEvent: function(type, event){
            var self = this;
            var enableObj = this.enableStack.find(function(obj){
                return EC.util.isPointInPath({x: self._touchX, y: self._touchY}, obj);
            });

            if( enableObj ) {
                var eventObj = {
                    type: type,
                    stageX: this._touchX,
                    stageY: this._touchY,
                    target: enableObj
                };
                enableObj.dispatch(type, EC.extend(eventObj, this._getOriginalEvent(event)));
            }
        },
        _getTouchEnables: function(){
            var enableSatck = [];

            function getItems( obj ) {
                var childs = obj.getChilds();
                var i = childs.length;
                while (i--) {
                    if (childs[i].touchEnabled) {
                        enableSatck.push(childs[i]);
                    }
                    if( childs[i].$type === "Sprite" ){
                        getItems(childs[i]);
                    }
                }
            }

            getItems(this.stage);

            return enableSatck;
        },
        _getOriginalEvent: function(event){
            var props = {};
            ["pageX", "pageY", "clientX", "clientY", "screenX", "screenY", "radiusX", "radiusY", "rotationAngle"].forEach(function(prop){
                props[prop] = event[prop];
            });

            return props;
        },
        _setTouchXY: function(event){
            this._touchX = (event.pageX - this._bound.left - this._offsetX) * this._ratio;
            this._touchY = (event.pageY - this._bound.top - this._offsetY) * this._ratio;
        }
    };

    EC.provide({
        TouchEvent: TouchEvent
    });

})(window.EC);


/**
 * Created by mcake on 2016/9/6.
 */
(function(RES){
    "use strict";

    var regHttps = /^https?:\/\//;
    var assets = {};

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

        src = regHttps.test(src) ? src : (RES.baseUrl + src);

        img.src = src;

    };

    var IMGloader = EC.Event.extend({
        initialize: function(src){
            var self = this;
            IMGloader.superclass.initialize.call(this);

            loadImg(src, function(img){
                self.dispatch('success', img);
            }, function(img){
                self.dispatch('error', img);
            });
        }
    });

    var loadBitMap = function(resItem, callback){
        loadImg(resItem.url, function(img){
            assets[resItem.name] = {
                width: img.width,
                height: img.height,
                bitMapData: img
            };
            EC.extend(assets[resItem.name], resItem);
            EC.isFunction(callback) && callback(resItem);
        });
    };

    var loadJSON = function (url, sucFn, errFn) {
        var xhr = (function () {
            if ( !!window.XMLHttpRequest ) {
                return new XMLHttpRequest();
            } else {
                try {
                    return new ActiveXObject("Microsoft.XMLHttp");
                }catch (e){
                    return null;
                }
            }
        })();

        if ( !xhr ) return;

        url = regHttps.test(url) ? url : (RES.baseUrl + url);

        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    try {
                        sucFn && sucFn(JSON.parse(xhr.responseText));
                    }catch (e){
                        //console.error(e.message);
                    }
                } else {
                    errFn && errFn(xhr);
                    console.error('fail load:' + url);
                }
            }
        };

        xhr.send(null);

        return xhr;
    };

    var JSONloader = EC.Event.extend({
        initialize: function(url){
            var self = this;
            JSONloader.superclass.initialize.call(this);

            loadJSON(url, function(data){
                self.dispatch('success', data);
            }, function(xhr){
                self.dispatch('error', xhr);
            });
        }
    });

    var loadAsset = function (cfgItem, callback) {
        if (typeof cfgItem != 'object') {
            return;
        }

        if (cfgItem.type == 'image') {
            loadBitMap(cfgItem, function(){
                callback && callback(cfgItem);
            });
        }
        else if (cfgItem.type == 'json' || cfgItem.type == 'sheet') {
            loadJSON(cfgItem.url, function (data) {
                var obj = EC.extend({}, cfgItem, {data: data});
                assets[cfgItem.name] = obj;

                if( cfgItem.type == 'sheet' ){
                    var url = cfgItem.url.replace(/\.json$/, '.png');
                    var name = cfgItem.name.replace(/_json$/, '_png');
                    var resObj = EC.extend({}, cfgItem, {url: url, name: name, type: 'image'});
                    loadBitMap(resObj, function(){
                        callback && callback(obj);
                    });
                } else {
                    callback && callback(obj);
                }
            });
        }
        else {
            assets[cfgItem.name] = cfgItem;
            callback && callback(cfgItem);
        }

    };

    var getAsset = function(){
        return assets;
    };

    var getRes = function(resId, sheetKey){
        var pathReg = /\[(\d+\-\d+)\]/;
        var pathRes = pathReg.exec(resId);

        if( pathRes ){
            var bitMapDataGroup = [];
            var path = RegExp.$1.split('-');
            var pathPre = resId.replace(pathReg, "").split("_");
            for(var i = Number(path[0]); i<Number(path[1]) + 1; i++){
                var pathId = pathPre[0] + i + "_" + pathPre[1];
                bitMapDataGroup.push(assets[pathId]);
            }

            return bitMapDataGroup;
        }

        var asset = assets[resId];

        if( asset === undefined ){
            return console.error(resId + " does not exist!");
        }

        if( asset.type == 'json' || asset.type == 'sheet' ){
            if( sheetKey ) return asset.data.frames[sheetKey];
            return asset.data;
        }
        else {
            return asset;
        }

        return null;
    };

    var getElement = function (selector, container) {
        if( typeof selector != 'string' ) return selector;

        if( !/^(#|\.)/.test( selector ) ) return null;

        var type = selector.charAt(0);
        container = container || document;

        if (type == "#") {
            return document.getElementById(selector.substr(1, selector.length));
        }

        if( !!document.querySelectorAll ) {
            return container.querySelectorAll(selector);
        } else {
            try{
                return container.getElementsByClassName(selector);
            } catch(e) {
                var ary = [];
                var els = container.getElementsByTagName('*');
                els.forEach(function(el){
                    if( (" " + el.className + " ").indexOf(" " + selector + " ") > -1 ){
                        ary.push(el);
                    }
                });

                return ary;
            }
        }
    };

    var getKeys = function( groupKey, data ){
        var group = data.groups.find(function( group ){
            return group.name == groupKey;
        });

        if( group === undefined ){
            return console.error('group "' + groupKey + '" dose not exsit!');
        }

        var keys = group.keys.split(",").map(function( key ){
            return key.trim();
        });

        return keys;
    };

    var getLoadGroup = function(resources, keys){
        var groupRes = [];
        resources.forEach(function(res){
            if( keys.indexOf(res.name) > -1 ){
                groupRes.push(res);
            }
        });

        return groupRes;
    };

    var loadGroup = EC.Event.extend({
        initialize: function(groupKey, data){

            var keys = getKeys(groupKey, data);

            if( keys === undefined ) return;

            var sources = getLoadGroup(data.resources, keys);

            var self = this,
                loaded = 0,
                total = sources.length;

            loadGroup.superclass.initialize.call(this);

            sources.forEach(function(source){
                loadAsset(source, function(){
                    self.dispatch('progress', ++loaded, total, source);
                    if (loaded > total - 1) {
                        self.dispatch('complete');
                    }
                });
            });

        }
    });

    EC.extend(RES, {
        loadImage: function(src){
            return new IMGloader(src);
        },
        loadJson: function(url){
            return new JSONloader(url);
        },
        loadGroup: function(groupKey, data){
            return new loadGroup(groupKey, data);
        },
        getAsset: getAsset,
        getRes: getRes,
        el: getElement,
        baseUrl: 'images/'
    });

})(window.RES || (window.RES = {}));



/**
 * Created by mcake on 2016/9/6.
 */
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


/**
 * Created by mcake on 2016/9/6.
 */

(function(EC){
    "use strict";

    var Ticker = EC.Event.extend({
        initialize: function(){
            Ticker.superclass.initialize.call(this);
            this.ticker = null;
        },

        start: function(){
            var self = this;

            +function runTicker() {
                self.ticker = requestAnimationFrame(runTicker);
                self.dispatch('ticker');
            }();

            return this;
        },
        stop: function (){
            if( this.ticker ) {
                cancelAnimationFrame(this.ticker);
                delete this.ticker;
            }

            return this;
        }
    });

    EC.provide({
        Ticker: Ticker
    });

})(window.EC);


/**
 * Created by mcake on 2016/9/6.
 */

(function(EC){
    "use strict";

    var Timer = EC.Event.extend({
        initialize: function(delay, repeatCount){
            Timer.superclass.initialize.call(this);

            this._currentCount = 0;
            this._lastTime = 0;
            this._repeatCount = repeatCount;
            this._waitTime = 0;
            this._ticker = new EC.Ticker();
            this.delay = delay;

            this._initEvents();
        },

        start: function(){
            this._lastTime = Date.now();
            this._ticker.start();

            return this;
        },
        stop: function (){
            if( this._ticker ) {
                this._ticker.stop();

                if( this._waitTime > 0 ){
                    var self = this;
                    setTimeout(function(){
                        self.dispatch('complete');
                        self.reset();
                    }, this._waitTime);
                }
                else {
                    this.dispatch('complete');
                    this.reset();
                }

            }

            return this;
        },
        wait: function( waitTime ){
            this._waitTime = waitTime;
            return this;
        },
        pause: function( dur ){
            if( this._ticker ) {
                this._ticker.stop();
                this.dispatch('pause');
            }

            if( typeof dur === 'number' && dur > 0 ){
                var self = this;
                setTimeout(function () {
                    self._ticker.start();
                }, dur);
            }
            return this;
        },
        setRepeatCount: function(repeatCount){
            this._repeatCount = repeatCount;
            return this;
        },
        _timerHandle: function(){
            var now = Date.now();

            if( now - this._lastTime >= this.delay ){
                if( this._repeatCount && (++this._currentCount == this._repeatCount) ){
                    this.stop();
                    return;
                }

                this._lastTime = now;
                this.dispatch('timer', now);
            }
        },
        _initEvents: function(){
            this._ticker.on("ticker", this._timerHandle, this);
        },
        reset: function(){
            this._currentCount = 0;
            this._ticker = null;
            return this;
        }

    });

    EC.provide({
        Timer: Timer
    });

})(window.EC);


/**
 * Created by mcake on 2016/9/6.
 */
(function(EC){
    "use strict";

    /**
     * Easing
     * **/
    var pow = Math.pow,
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

    EC.provide({
        Easing: Easing
    });

})(window.EC);


/**
 * Created by mcake on 2016/9/6.
 */
(function(EC){
    "use strict";

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
            if( EC.isNumber(this.cfg.loop) ){
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
            if( EC.isNumber(time) ){
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
            this.startAttrs = EC.extend({}, this.tweenObj);
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
        update: function( obj ){
            for( var i in this.endAttrs ){
                if( this.endAttrs[i] == this.startAttrs[i] ) continue;
                obj[i] = this.startAttrs[i] + (this.endAttrs[i] - this.startAttrs[i])*(this.easing||EC.Easing.linear)(this.percent);
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
                EC.isFunction(callback) && callback.apply(context||self, arguments);
            });

            return this;
        },
        call: function(callback, context){
            var self = this;
            this._completeCb.push(function(){
                EC.isFunction(callback) && callback.apply(context || self, arguments);
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
                if( EC.isNumber(fn) ){
                    delay = window.setTimeout(function(){
                        window.clearTimeout( delay );
                        delay = null;
                        self.dequeue();
                    }, fn );
                }
                else if( EC.isFunction(fn) ){
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

    EC.provide({
        Tween: Tween
    });

})(window.EC);


/**
 * Created by shuxy on 2016/4/20
 */

+function(EC){
    "use strict";

    var slice = Array.prototype.slice,
        RESIZE_EVENT = 'onorientationchange' in window ? 'orientationchange' : 'resize';

    var drawImg = function(ctx, obj){

        var anchorX = obj.anchorX + obj.parent.anchorX,
            anchorY = obj.anchorY + obj.parent.anchorY;

        if( 'sx' in obj ){
            var _width = ctx.canvas.width,
                _height = ctx.canvas.height,
                swidth = obj.swidth,
                sheight = obj.sheight;

            if( swidth >= _width ) swidth = _width - 1;
            if( sheight >= _height ) sheight = _height - 1;

            ctx.drawImage(obj.bitMapData, obj.sx, obj.sy, swidth, sheight, -1*anchorX*obj.width, -1*anchorY*obj.height, obj.width, obj.height);
        } else {
            ctx.drawImage(obj.bitMapData, -1*anchorX*obj.width, -1*anchorY*obj.height, obj.width, obj.height);
        }
    };

    var drawText = function(ctx, obj){
        ctx.font = obj.size + "px " + obj.textFamily;
        ctx.textAlign = obj.textAlign;
        ctx.textBaseline = obj.textBaseline || "hanging";

        var anchorX = obj.anchorX + obj.parent.anchorX,
            anchorY = obj.anchorY + obj.parent.anchorY;

        if( obj.stroke ) {
            ctx.strokeStyle = obj.textColor;
            ctx.strokeText(obj.text, -1*anchorX*obj.width, -1*anchorY*obj.height);
        } else {
            ctx.fillStyle = obj.textColor;
            ctx.fillText(obj.text, -1*anchorX*obj.width, -1*anchorY*obj.height);
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
        ctx.shadowBlur = obj.shadowBlur || 0;
        ctx.shadowOffsetX = obj.shadowOffsetX || 0;
        ctx.shadowOffsetY = obj.shadowOffsetY || 0;
        ctx.lineCap = obj.lineCap;
        ctx.lineJoin = obj.lineJoin;
        ctx.lineWidth = obj.lineWidth || 0;
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

    /**
     * ObjectContainer 操作基类
     * **/
    var ObjectContainer = EC.Event.extend({

        initialize: function(){
            ObjectContainer.superclass.initialize.call(this);

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

            this.$type = "ObjectContainer";

            this._children = [];
            this.numChildren = 0;
        },

        addChild: function( object, index ){
            if( !EC.isObject(object) ){
                throw new Error(String(object) + "is not a instance of EC");
            }

            object.parent = this;

            object.visible = EC.isDefined(object.visible) ? object.visible : this.visible;
            object.alpha = EC.isDefined(object.alpha) ? object.alpha : this.alpha;
            object.rotation = EC.isDefined(object.rotation) ? object.rotation : this.rotation;
            object.scaleX = EC.isDefined(object.scaleX) ? object.scaleX : this.scaleX;
            object.scaleY = EC.isDefined(object.scaleY) ? object.scaleY : this.scaleY;

            if( !EC.isNumber(index) ) {
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

            this._stopTweens(object);

            for(var i = 0; i < this._children.length; i++){
                if( this._children[i] === object ){
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

        getChilds: function(){
            return this._children;
        },

        getChildIndex: function(childObj){
            for(var i=0; i<this._children.length; i++){
                if( this._children[i] == childObj ) return i;
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
            EC.Tween.removeTweens(target);
            return this;
        },

        _stopAllTweens: function(){
            EC.Tween.removeAllTweens(this);
            return this;
        }
    });

    /**
     * TextField 文字类
     * **/
    var TextField = ObjectContainer.extend({
        initialize: function(text, size, x, y, color, align, family, width, height){
            TextField.superclass.initialize.call(this);

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
        }
    });

    /**
     * BitMap 位图类
     * **/
    var BitMap = ObjectContainer.extend({
        initialize: function(key, x, y, width, height, sx, sy, swidth, sheight){
            BitMap.superclass.initialize.call(this);

            this.x = x||0;
            this.y = y||0;

            if( EC.isDefined(sx) ) {
                this.sx = sx;
            }
            if( EC.isDefined(sy) ) {
                this.sy = sy;
            }
            if( EC.isDefined(swidth) ) {
                this.swidth = swidth || 0.1;
            }
            if( EC.isDefined(sheight) ) {
                this.sheight = sheight || 0.1;
            }

            this.$type = "BitMap";

            if( EC.isDefined(key) ) {
                EC.extend(this, EC.isObject(key) ? key : RES.getRes(key));
            }

            if( EC.isDefined(width) ){
                this.width = width;
            }

            if( EC.isDefined(height) ){
                this.height = height;
            }

        },
        setBitMap: function( bitMapObject ){
            if( !EC.isObject(bitMapObject) )
                throw new Error(String(bitMapObject) + "is a invalid bitMapObject");
            if( 'nodeType' in bitMapObject ){
                this.bitMapData = bitMapObject;
            } else {
                EC.extend(this, bitMapObject);
            }
        }
    });

    /**
     * Shape 图形界面
     * **/
    var Shape = ObjectContainer.extend({
        initialize: function(x, y, w, h){
            Shape.superclass.initialize.call(this);

            this.x = x||0;
            this.y = y||0;
            this.width = w||0;
            this.height = h||0;

            this._drawFuns = [];
            this._drawTypes = [];

            this.$type = "Shape";
        },
        _setStyle: function(type, color, alpha, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY){
            this._drawTypes.push(type.replace("Style", ""));

            if(typeof alpha == 'number' && alpha < 1){
                this[type] = EC.util.color.toRgb(color, alpha);
            } else {
                this[type] = color;
            }

            this.shadowColor = shadowColor || 0;
            this.shadowBlur = shadowBlur || 0;
            this.shadowOffsetX = shadowOffsetX || 0;
            this.shadowOffsetY = shadowOffsetY || 0;
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
                EC.isFunction(fun)&&fun(ctx);
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
                self.x = self.x + args.shift();
                self.y = self.y + args.shift();
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
    var Sprite = ObjectContainer.extend({
        initialize: function(x, y, w, h){
            Sprite.superclass.initialize.call(this);

            this.x = x||0;
            this.y = y||0;
            this.width = w||0;
            this.height = h||0;

            this.$type = "Sprite";

        },
        addChild: function( childObj ){
            childObj.MainContext = this.MainContext;
            Sprite.superclass.addChild.apply(this, arguments);

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
    var Renderer = ObjectContainer.extend({
        initialize: function(canvas, options){
            Renderer.superclass.initialize.call(this);

            this.canvas = canvas;
            this.ctx = this.canvas.getContext('2d');
            this.$type = "Stage";
            this.options = EC.extend({}, {adapter: true, showFps: false, width: window.innerWidth, height: window.innerHeight}, options||{});
            this.width = parseFloat(this.canvas.getAttribute("width")) || this.options.width;
            this.height = parseFloat(this.canvas.getAttribute("height")) || this.options.height;
            this.lastTime = 0;
            this._ticker = new EC.Ticker();

            this.canvas.width = this.width;
            this.canvas.height = this.height;

            if( this.options.adapter ) {
                this.setAdapter();
            }

            if( this.options.showFps ){
                this.createFps();
                this.on("enterframe", this.showFps, this);
            }

            this._initEvents();
            this.start();
        },
        addChild: function( childObj ){
            if( !EC.isObject(childObj) ){
                throw new Error(String(childObj) + "is not a instance of EC");
            }
            childObj.MainContext = this.ctx;
            Renderer.superclass.addChild.apply(this, arguments);
            this._triggerAddToStage(childObj);
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
        clear: function(){
            this.ctx.clearRect(0, 0, this.width, this.height);
            return this;
        },
        clearChildren: function(){
            this.removeAllChildren();
        },
        start: function(){
            if( EC.isDefined(self.renderTimer) ) return this;
            this._ticker.start();

            return this;
        },
        stop: function(){
            this._ticker.stop();
            this.dispatch("stop");
            return this;
        },
        _triggerAddToStage: function( childObj ){

            var _runAddToStage = function( obj ){

                obj.dispatch("addToStage");

                if (obj.$type == 'Sprite') {
                    obj.getChilds().forEach(_runAddToStage);
                }
            };

            childObj.dispatch("addToStage", childObj);
            childObj.getChilds().forEach(_runAddToStage);
        },
        _triggerEnterFrame: function(){

            var _runEnterFrame = function( obj ){

                obj.dispatch("enterframe");

                if (obj.$type == 'Sprite') {
                    obj.getChilds().forEach(_runEnterFrame);
                }
            };

            this.getChilds().forEach(_runEnterFrame);
        },
        setAdapter: function(){
            var parent = this.canvas.parentNode;
            var parentW = parent.offsetWidth - parseFloat(EC.getStyle(parent, 'padding-left')) - parseFloat(EC.getStyle(parent, 'padding-right'));
            this.canvas.style.width = parentW + "px";
            this.canvas.style.height = this.height/this.width*parentW + "px";

            return this;
        },
        _initEvents: function(){

            this._ticker.on("ticker", function(){
               this.clear();
               this.render();
               this.dispatch("enterframe");
            }, this);

            this.on("enterframe", this._triggerEnterFrame, this);

            if( this.options.adapter ) {
                window.addEventListener(RESIZE_EVENT, function () {
                    this.setAdapter();
                }.bind(this), false);
            }

            new EC.TouchEvent().attach(this);

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

    EC.provide({
        TextField: TextField,
        BitMap: BitMap,
        Shape: Shape,
        Sprite: Sprite,
        Stage: Renderer
    });

}(window.EC);


/**
 * Created by mcake on 2016/9/6.
 */

(function(EC, undefined){
    "use strict";

    var MovieClip = EC.Sprite.extend({
        initialize: function(resUrl, res, resKey){
            MovieClip.superclass.initialize.call(this);

            this._startFrame = 0;
            this._startTime = 0;
            this._playTimes = -1;
            this._resKey = resKey;
            this.currentFrame = 0;
            this.isPlaying = false;

            this.setRES(resUrl, res);
            this._clip = new EC.BitMap(this.RESUrl);
            this.addChild(this._clip);

            if( Array.isArray(this.RESUrl) ){
                this.totalFrames = this.RESUrl.length;
                this.setFrame = this.setFrameByPath;
            } else {
                this.setFrame = this.setFrameBySprite;
            }

            this._timer = new EC.Timer(this.frameRate, this._repeatCount);
            this._initEvents();
        },

        setRES: function( resUrl, res, frameRate ){
            this.RESUrl = _getResUrl(resUrl);
            this.RES = _getResData(res, this._resKey);
            this.currentFrame = 0;
            this.frame = this.getMovieClipData(this._resKey);
            this.frameRate = Math.round(1000/(this.frame.frameRate||24));
            this.totalFrames = this.frame.frames.length;

            if( !Array.isArray(this.RESUrl) ) {
                if( EC.isObject(this.RESUrl) && "nodeType" in this.RESUrl ){
                    this.RESUrl = {
                        bitMapData: this.RESUrl,
                        width: this.RESUrl.width,
                        height: this.RESUrl.height
                    }
                }
                this.bitMapData = this.RESUrl.bitMapData;
            } else {
                this.bitMapData = this.RESUrl[this.currentFrame].bitMapData;
            }

            if( frameRate ){
                this.setFrameRate(frameRate);
            }
        },

        getMovieClipData: function(key){
            return this.RES.mc[key]||[];
        },

        gotoAndPlay: function(startFrame, playTimes, frameRate){
            startFrame = Math.max(0, startFrame-1);

            this._startFrame = startFrame;
            this._playTimes = playTimes;
            this.currentFrame = startFrame;

            if( this._playTimes > 0 ){
                this._repeatCount = this._playTimes*this.totalFrames;
                this._timer.setRepeatCount(this._repeatCount);
            }

            if( frameRate ){
                this.setFrameRate(Math.round(1000/frameRate));
            }

            this.setFrame(this.currentFrame);
            this.play();

            return this;
        },

        gotoAndStop: function( frameIndex ){
            return this.setFrame( frameIndex );
        },

        prevFrame: function(){
            return this.setFrame(--this.currentFrame);
        },

        nextFrame: function(){
            return this.setFrame(++this.currentFrame);
        },

        play: function(){
            if( this.isPlaying ) {
                return this;
            }

            this._startTime = Date.now();
            this._timer.start();
            this.isPlaying = true;

            return this;
        },

        stop: function(){
            this._timer.stop();
            this.isPlaying = false;
            return this;
        },

        pause: function(dur){
            this._timer.pause(dur);
            this._startTime += dur;
            this.isPlaying = false;
            return this;
        },

        wait: function(waitTime){
            this._timer.wait(waitTime);
            return this;
        },

        setFrameRate: function(frameRate){
            this.frameRate = frameRate;
        },

        setFrameBySprite: function( index ){
            var resItem = this.frame.frames[index]||{};
            var res = this.RES.res[resItem.res];

            if( res == undefined ) return;

            this._timer.delay = (resItem.duration || 0) * this.frameRate;

            this._clip.x = resItem.x || 0;
            this._clip.y = resItem.y || 0;
            this._clip.sx = res.x || 0;
            this._clip.sy = res.y || 0;
            this._clip.swidth = res.w || this.width || 0;
            this._clip.sheight = res.h || this.height || 0;
            this._clip.width = this._clip.swidth;
            this._clip.height = this._clip.sheight;

            /*this.width = this.width || this._clip.width;
            this.height = this.height || this._clip.height;*/

            this.width = this._clip.width;
            this.height = this._clip.height;

            return this;
        },

        setFrameByPath: function( index ){
            var resItem = this.frame.frames[index]||{};
            var resData = this.RESUrl[index];

            this._timer.delay = (resItem.duration || 0) * this.frameRate;

            this._clip.bitMapData = resData.bitMapData;
            this._clip.x = resItem.x || 0;
            this._clip.y = resItem.y || 0;
            this._clip.width = resData.width || this.width || 0;
            this._clip.height = resData.height || this.height || 0;

            return this;
        },

        _initEvents: function(){
            this._timer.on('timer', function(){
                if( ++this.currentFrame > this.totalFrames - 1 ){
                    this.currentFrame = this._startFrame;
                    this.dispatch('loopcomplete');
                }

                this.setFrame(this.currentFrame);
            }, this);

            this._timer.on('complete', function(){
                this.off('enterframe');
                this.dispatch('complete');
            }, this);
        }

    });

    var _getResUrl = function(resUrl){
        if( /_(png|jpg|jpeg|gif|bmp|)$/.test(resUrl) ){
            return RES.getRes(resUrl);
        }
        return resUrl;
    };

    var _getResData = function(res, resKey){
        if( typeof res === 'string' ){
            return RES.getRes(res);
        }
        else if( Array.isArray(res) ){
            var resFrames = [];
            var resObj = {};
            var resCfg = {mc:{}, res:{}};

            res.forEach(function(resItem){
                var pos = resItem.split(' ');
                var uid = _genUID();
                resFrames.push({
                    res: uid,
                    x: 0,
                    y: 0,
                    duration: 1
                });

                resObj[uid] = {
                    x: -1*pos[0],
                    y: -1*pos[1]
                }
            });

            resCfg.mc[resKey] = {
                frames: resFrames,
                frameRate: 24
            };

            resCfg.res = resObj;

            return resCfg;
        }

        return res;
    };

    var _genUID = function(len){
        var g = '',
            i = 0;
        len = len || 8;

        while (i++ < len){
            g += Math.floor(Math.random() * 16.0).toString(16);
        }

        return g.toUpperCase();
    };

    EC.provide({
        MovieClip: MovieClip
    });

})(window.EC);