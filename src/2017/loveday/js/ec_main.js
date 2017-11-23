/**
 * Created by mcake on 2016/3/31.
 */

!function(window, document, undefined){
    'use strict';

    var noop = function(){},
        arrayProto = Array.prototype,
        strProto = String.prototype,
        objProto = Object.prototype,
        slice = arrayProto.slice,
        regHttps = /^https?:\/\//;

    window.console || (window.console = {
        log: noop,
        error: noop
    });

    Date.now || (Date.now = function(){
        return +( new Date() );
    });

    window.JSON || (function(){
        window.JSON = {
            parse: function(data){
                return ( Function( "return " + data ) )()
            }
        }
    })();

    arrayProto.forEach || (arrayProto.forEach = function(cb){
        var i = 0,
            l = this.length;

        for (; i < l; i++) {
            if (cb && cb(this[i], i, this) === false) {
                continue;
            }
        }
    });

    arrayProto.filter || (arrayProto.filter = function(cb){
        var filterAry = [];

        this.forEach(function(item, i, array){
            if( cb && cb(item, i, array) === true ){
                filterAry.push(item);
            }
        });

        return filterAry;
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

    arrayProto.map || (arrayProto.map = function(cb){
        var ret = [];
        this.forEach(function(item, i, array){
            cb && ret.push(cb(item, i, array));
        });

        return ret;
    });

    arrayProto.indexOf || (arrayProto.indexOf = function(key){
        var i = 0,
            l = this.length;

        for(; i < l; i++){
            if( this[i] === key ){
                return i;
            }
        }

        return -1;
    });

    arrayProto.contains = arrayProto.includes || function( prop ){
            return this.indexOf(prop) > -1;
        };

    strProto.trim || (strProto.trim = function(){
        return this.replace(/(^\s+)|(\s+$)/g, "");
    });

    Array.isArray || (Array.isArray = function(obj){
        return objProto.toString.call(obj) === '[object Array]';
    });

    var vendors = ['webkit', 'moz'],
        requestAnimationFrame = window.requestAnimationFrame,
        cancelAnimationFrame = window.cancelAnimationFrame;

    if(!requestAnimationFrame) {
        vendors.forEach(function(vendor){
            requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
            cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
        });
    }

    if (!requestAnimationFrame) {
        requestAnimationFrame = function(callback) {
            return window.setTimeout(callback, 1000/60);
        }
    }

    if (!cancelAnimationFrame) {
        cancelAnimationFrame = function(id) {
            clearTimeout(id);
        }
    }

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

    var classExtend = function(dest, source, proto){

        if( typeof source === 'object' ){
            var args = slice.call(arguments, 1);
            args.unshift(dest.prototype);
            Extend.apply(null, args);
            return dest;
        }

        var f = function(){};
        f.prototype = source.prototype;
        dest.prototype = new f();
        dest.prototype.constructor = dest;
        dest.prototype.superClass = source.prototype;

        if(source.prototype.constructor == Object.prototype.constructor)
            source.prototype.constructor = source;

        Extend(dest.prototype, proto);
        Extend(dest, source);

        return dest;

    };


    /*=========== Event ==========*/
    var Event = function() {
        this._eventPool = {};
    };

    Event.prototype = {

        on: function(name, callback, ctx){
            var e = this._eventPool;

            (e[name] || (e[name] = [])).push({
                fn: callback,
                ctx: ctx || this
            });

            return this;
        },

        once: function(name, callback, ctx){
            var self = this;

            function listener () {
                self.off(name, listener);
                callback.apply(this, arguments);
            }

            listener._ = callback;

            return this.on(name, listener, ctx);
        },

        off: function(name, callback){
            var e = this._eventPool;
            var evts = e[name];
            var liveEvents = [];

            if (evts && callback) {
                liveEvents = evts.filter(function(evt){
                    return evt.fn !== callback && evt.fn._ !== callback;
                });
            }

            (liveEvents.length)
                ? e[name] = liveEvents
                : delete e[name];

            return this;
        },

        dispatch: function( name ){
            var args = slice.call(arguments, 1);
            var evts = (this._eventPool[name] || []).slice();

            if( evts.length ) {
                evts.forEach(function (evt) {
                    evt.fn.apply(evt.ctx, args);
                });
            }

            return this;
        },

        emit: function () {
            return this.dispatch.apply(this, arguments);
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


    /*=============Timer==============*/
    var Timer = function(delay, repeatCount){
        this._currentCount = 0;
        this._lastTime = 0;
        this._repeatCount = repeatCount;
        this._waitTime = 0;
        this.timer = null;
        this.delay = delay;
        this.superClass.constructor.call(this);
    };

    classExtend(Timer, Event, {

        start: function(){
            var self = this;
            this._lastTime = Date.now();

            +function runTimer() {
                self.timer = requestAnimationFrame(runTimer);
                self._timerHandle();
            }();

            return this;
        },
        stop: function (){
            if( this.timer ) {
                cancelAnimationFrame(this.timer);

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
            if( this.timer ) {
                cancelAnimationFrame(this.timer);
                this.dispatch('pause');
            }

            if( typeof dur === 'number' && dur > 0 ){
                var self = this;
                setTimeout(function () {
                    self.start();
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

            this.dispatch('enterframe', now);
        },
        reset: function(){
            this._currentCount = 0;
            this.timer = null;
            return this;
        }

    });


    /*==============Movieclip===============*/
    var MovieClip = function(resUrl, res, resKey, el){
        this.el = typeof el == 'string' ? document.getElementById(el) : el;
        this._startFrame = 0;
        this._startTime = 0;
        this._playTimes = -1;
        this._resKey = resKey;
        this.currentFrame = 0;
        this.isPlaying = false;
        this.setRES(resUrl, res);

        if( Array.isArray(this.RESUrl) ){
            this.totalFrames = this.RESUrl.length;
            this.setFrame = this.setFrameByPath;
            this.elImg = document.createElement('img');
            this.el.appendChild(this.elImg);
        } else {
            this.setFrame = this.setFrameBySprite;
        }

        this.superClass.constructor.call(this);

        this._timer = new Timer(this.frameRate, this._repeatCount);
        this._initEvents();
    };


    classExtend(MovieClip, Event, {

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

        setRES: function( resUrl, res, frameRate ){
            this.RESUrl = _getResUrl(resUrl);
            this.RES = _getResData(res, this._resKey, this.el);
            this.currentFrame = 0;
            this.frame = this.getMovieClipData(this._resKey);
            this.frameRate = Math.round(1000/(this.frame.frameRate||24));
            this.totalFrames = this.frame.frames.length;

            if( frameRate ){
                this.setFrameRate(frameRate);
            }
        },

        setFrameBySprite: function( index ){
            var resItem = this.frame.frames[index]||{};
            var res = this.RES.res[resItem.res];

            if( res == undefined ) return;

            this._timer.delay = (resItem.duration || 0) * this.frameRate;

            this.el.style.width = res.w + "px";
            this.el.style.height = res.h + "px";
            this.el.style.marginLeft = (resItem.x || 0) + "px";
            this.el.style.marginTop = (resItem.y || 0) + "px";
            this.el.style.background = 'url('+ this.RESUrl +') no-repeat ' + -res.x +"px " + -res.y + "px";

            return this;
        },

        setFrameByPath: function( index ){
            var resItem = this.frame.frames[index]||{};

            this._timer.delay = (resItem.duration || 0) * this.frameRate;

            this.el.style.marginLeft = (resItem.x || 0) + "px";
            this.el.style.marginTop = (resItem.y || 0) + "px";

            this.elImg.src = this.RESUrl[index];

            return this;
        },

        clear: function(){
            this.el.style.width = "";
            this.el.style.height = "";
            this.el.style.marginLeft = "";
            this.el.style.marginTop = "";
            this.el.style.background = "";
            if( this.elImg ){
                this.el.removeChild(this.elImg);
                delete this.elImg;
            }

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

            this._timer.on('enterframe', function( currentTime ){
                this.dispatch('enterframe', this.currentFrame, currentTime - this._startTime);
            }, this);

            this._timer.on('complete', function(){
                this.dispatch('complete');
            }, this);
        }

    });

    var _getStyle = function(el, prop){
        return window.getComputedStyle ? window.getComputedStyle(el, null)[prop] : el.currentStyle[prop];
    };

    var _getResUrl = function(resUrl){
        if( /_(png|jpg|jpeg|gif|bmp|)$/.test(resUrl) ){
            return Resource.getRes(resUrl);
        }
        return resUrl;
    };

    var _getResData = function(res, resKey, el){
        if( typeof res === 'string' ){
            return Resource.getRes(res);
        }
        else if( Array.isArray(res) ){
            var resFrames = [];
            var resObj = {};
            var resCfg = {mc:{}, res:{}};
            var width = parseFloat(_getStyle(el, 'width'));
            var height = parseFloat(_getStyle(el, 'height'));

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
                    y: -1*pos[1],
                    w: width,
                    h: height
                }
            });

            resCfg.mc[resKey] = {
                frames: resFrames,
                frameRate: 24
            };

            resCfg.res = resObj;

            return resCfg;
        } else if( typeof res === 'object' && !res.mc ) {
            var resFrames = [];
            var resObj = {};
            var resCfg = {mc:{}, res:{}};

            for(var i in res) {
                var pos = res[i];
                var uid = _genUID();
                resFrames.push({
                    res: uid,
                    key: i,
                    x: pos.offX,
                    y: pos.offY,
                    duration: pos.duration === undefined ? 1 : pos.duration
                });

                resObj[uid] = {
                    x: pos.x,
                    y: pos.y,
                    w: pos.w,
                    h: pos.h
                }
            }

            resFrames = resFrames.sort(function (a, b) {
                return parseInt(a.key.replace(/^[^\d]+/, "")) - parseInt(b.key.replace(/^[^\d]+/, ""));
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

    /*============Resource Loder=============*/
    var Resource = (function() {

        var assets = {};

        var loadImg = function( src, sucFn, errFn ){
            var img = new Image();
            img.onload = function(){
                img.onload = new Function;
                sucFn && sucFn( img );
            };
            img.onerror = function(){
                img.onerror = new Function;
                errFn && errFn( img );
                console.error('fail load:' + src);
            };

            src = regHttps.test(src) ? src : (Resource.baseUrl + src);
            img.src = src;
        };

        var IMGloader = function(src){
            var self = this;

            this.superClass.constructor.call(this);

            loadImg(src, function(img){
                self.dispatch('success', img);
            }, function(img){
                self.dispatch('error', img);
            });
        };

        classExtend(IMGloader, Event);

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

            url = regHttps.test(url) ? url : (Resource.baseUrl + url);

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

        var JSONloader = function(url){
            var self = this;

            this.superClass.constructor.call(this);

            loadJSON(url, function(data){
                self.dispatch('success', data);
            }, function(xhr){
                self.dispatch('error', xhr);
            });
        };

        classExtend(JSONloader, Event);


        var loadAsset = function (cfgItem, callback) {
            if (typeof cfgItem != 'object') {
                return;
            }

            if (cfgItem.type == 'image') {
                loadImg(cfgItem.url, function(){
                    assets[cfgItem.name] = cfgItem;
                    callback && callback(cfgItem);
                });
            }
            else if (cfgItem.type == 'json' || cfgItem.type == 'sheet') {
                loadJSON(cfgItem.url, function (data) {
                    var obj = Extend({}, cfgItem, {data: data});
                    assets[cfgItem.name] = obj;

                    if( cfgItem.type == 'sheet' ){
                        var url = cfgItem.url.replace(/\.json$/, '.png');
                        var name = cfgItem.name.replace(/_json$/, '_png');
                        loadImg(url, function(){
                            var obj = Extend({}, cfgItem, {url: url, name: name, type: 'image'});
                            assets[name] = obj;
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
                var pathGroup = [];
                var path = RegExp.$1.split('-');
                var pathPre = resId.replace(pathReg, "").split("_");
                for(var i = Number(path[0]); i<Number(path[1]) + 1; i++){
                    var pathId = pathPre[0] + i + "_" + pathPre[1];
                    var url = regHttps.test(assets[pathId].url) ? assets[pathId].url : (Resource.baseUrl + assets[pathId].url);
                    pathGroup.push(url);
                }

                return pathGroup;
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
                return regHttps.test(asset.url) ? asset.url : (Resource.baseUrl + asset.url);
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

        var loadGroup = function(groupKey, data){

            var keys = getKeys(groupKey, data);

            if( keys === undefined ) return;

            var sources = getLoadGroup(data.resources, keys);

            var self = this,
                index = 0,
                length = sources.length;
            //obj = sources[index];

            this.superClass.constructor.call(this);

            /*loadAsset(obj, function handle() {
             self.dispatch('progress', ++index, length, obj);
             if (index > length - 1) {
             self.dispatch('complete');
             return;
             }
             loadAsset((obj = sources[index]), handle);
             });*/

            //需要等外部progress和complete事件注册完成后再loadResource
            //否则在IE中会出现progress事件还未注册，img的onload事件已经出发
            setTimeout(function(){
                sources.forEach(function(source){
                    loadAsset(source, function(){
                        self.dispatch('progress', ++index, length, source);
                        if (index > length - 1) {
                            self.dispatch('complete');
                        }
                    });
                });
            }, 0)

        };

        classExtend(loadGroup, Event);

        return {
            IMGloader: IMGloader,
            JSONloader: JSONloader,
            loadGroup: loadGroup,
            getAsset: getAsset,
            getRes: getRes,
            getStyle: _getStyle,
            el: getElement
        }

    })();


    Resource.baseUrl = 'images/';

    //export method
    window.Extend = window.Extend || Extend;
    window.CustEvent = Event;
    window.ClassExtend = classExtend;
    window.Timer = Timer;
    window.MovieClip = MovieClip;
    window.Resource = Resource;

}(window, window.document);