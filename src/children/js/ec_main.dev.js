/**
 * Created by mcake on 2016/3/31.
 */

!function(window, document, undefined){
    'use strict';

    var noop = function(){},
        arrayProto = Array.prototype,
        strProto = String.prototype,
        slice = arrayProto.slice;

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
        var filterAry = [],
            i = 0, l = this.length;

        for(; i < l; i++){
            if( cb && cb(this[i], i, this) === true ){
                filterAry.push(this[i]);
            }
        }

        return filterAry;
    });

    arrayProto.find || (arrayProto.find = function(cb){
        var i = 0, l = this.length;

        for(; i < l; i++){
            if( cb && cb(this[i], i, this) === true ){
                return this[i];
            }
        }

        return null;
    });

    arrayProto.map || (arrayProto.map = function(cb){
        var i = 0, l = this.length,
            ret = [];

        for(; i < l; i++){
            cb && ret.push(cb(this[i], i, this));
        }

        return ret;
    });

    arrayProto.indexOf || (arrayProto.indexOf = function(key){
        var i = 0, l = this.length;

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
        this._guid = 0;
    };

    Event.prototype = {

        addEvent: function(eventName, handle, scope){
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
                this.removeEvent(eventName, handler);
            };

            this.addEvent(eventName, handler, this);

            return this;
        },

        removeEvent: function(eventName, handle, scope){
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

        dispatchEvent: function( eventName ){
            var events = this._eventPool[eventName];

            if( !events ) return this;

            var args = slice.call(arguments, 1);

            for(var i = 0; i<events.length; i++){
                typeof events[i] == 'function' && events[i].apply(this, args);
            }

            return this;
        },

        dispatchEvents: function(){
            var args = slice.call(arguments);

            for(var i in this._eventPool){
                args.unshift(i);
                this._dispatchEvent.apply(this, args);
            }

            return this;
        },

        success: function(cb){
            return this.addEvent('success', cb);
        },

        complete: function(cb){
            return this.addEvent('complete', cb);
        },

        error: function(cb){
            return this.addEvent('error', cb);
        },

        progress: function(cb){
            return this.addEvent('progress', cb);
        },

        clear: function(){
            this._eventPool = {};
            return this;
        }
    };


    /*=============Timer==============*/
    var Timer = function(delay, repeatCount){
        this.delay = delay;
        this._currentCount = 0;
        this._lastTime = 0;
        this._repeatCount = repeatCount;
        this.timer = null;
        this.superClass.constructor.call(this);
    };

    classExtend(Timer, Event, {

        start: function(){
            var self = this;
            this._lastTime = Date.now();
            this.timer = window.setInterval(function(){
               self._timerHandle();
            }, 1000/60);

            return this;
        },
        stop: function (){
            if( this.timer ) {
                window.clearInterval(this.timer);
                this.dispatchEvent('complete');
                this.reset();
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
                this.dispatchEvent('timer');
            }
        },
        reset: function(){
            this._currentCount = 0;
            this.timer = null;
            return this;
        }

    });


    /*==============Movieclip===============*/
    var MovieClip = function(resUrl, res, frameKey, el){
        this.el = typeof el == 'string' ? document.getElementById(el) : el;
        this._startFrame = 0;
        this._playTimes = -1;
        this.currentFrame = 0;
        this.isPlaying = false;
        this.RESUrl = resUrl;
        this.RES = res;
        this.frame = this.getMovieClipData(frameKey);
        this.frameRate = this.frame.frameRate;
        this.totalFrames = this.frame.frames.length;

        if( this.RESUrl instanceof Array ){
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

        gotoAndPlay: function(startFrame, playTimes){
            startFrame = Math.max(0, startFrame-1);

            this._startFrame = startFrame;
            this.currentFrame = startFrame;
            this._playTimes = playTimes;

            if( this._playTimes > 0 ){
                this._repeatCount = this._playTimes*this.totalFrames;
                this._timer.setRepeatCount(this._repeatCount);
            }

            this.setFrame(this.currentFrame);
            this.play();

            return this;
        },

        gotoAndStop: function( frameIndex ){
            return this.setFrame( frameIndex );
        },

        play: function(){
            if( this.isPlaying ) {
                return this;
            }

            this._timer.start();
            this.isPlaying = true;

            return this;
        },

        stop: function(){
            this._timer.stop();
            this.isPlaying = false;
            return this;
        },

        setFrameBySprite: function( index ){
            var resItem = this.frame.frames[index]||{};
            var res = this.RES.res[resItem.res];

            if( res == undefined ) return;

            this._timer.delay = (resItem.duration || 0)*50;

            this.el.style.width = res.w + "px";
            this.el.style.height = res.h + "px";
            this.el.style.marginLeft = (resItem.x || 0) + "px";
            this.el.style.marginTop = (resItem.y || 0) + "px";
            this.el.style.background = 'url('+ this.RESUrl +') no-repeat ' + -res.x +"px " + -res.y + "px";

            return this;
        },

        setFrameByPath: function( index ){
            var resItem = this.frame.frames[index]||{};

            this._timer.delay = (resItem.duration || 0)*50;

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
            this._timer.addEvent('timer', function(){
                if( ++this.currentFrame > this.totalFrames - 1 ){
                    this.currentFrame = this._startFrame;
                }

                this.setFrame(this.currentFrame);

            }, this);

            this._timer.addEvent('complete', function(){
                this.dispatchEvent('complete');
            }, this);
        }

    });


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

            src = /^https?:\/\//.test(src) ? src : (Resource.baseUrl + src);
            img.src = src;
        };

        var IMGloader = function(src){
            var self = this;

            this.superClass.constructor.call(this);

            loadImg(src, function(img){
                self.dispatchEvent('success', img);
            }, function(img){
                self.dispatchEvent('error', img);
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

            url = /^https?:\/\//.test(url) ? url : (Resource.baseUrl + url);

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
                self.dispatchEvent('success', data);
            }, function(xhr){
                self.dispatchEvent('error', xhr);
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
            var regHttps = /^https?:\/\//;

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
                    for(var i = 0; i<els.length; i++){
                        if( (" " + els.className + " ").indexOf(" " + selector + " ") > -1 ){
                            ary.push(els[i]);
                        }
                    }

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
                length = sources.length,
                obj = sources[index];

            this.superClass.constructor.call(this);

            loadAsset(obj, function handle() {
                self.dispatchEvent('progress', ++index, length, obj);
                if (index > length - 1) {
                    self.dispatchEvent('complete');
                    return;
                }
                loadAsset((obj = sources[index]), handle);
            });
        };

        classExtend(loadGroup, Event);

        return {
            IMGloader: IMGloader,
            JSONloader: JSONloader,
            loadGroup: loadGroup,
            getAsset: getAsset,
            getRes: getRes,
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
