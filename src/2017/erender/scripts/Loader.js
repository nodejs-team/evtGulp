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
