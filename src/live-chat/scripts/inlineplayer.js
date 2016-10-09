/*!
 * VERSION: 0.1.0
 * DATE: 2016-05-05
 * GIT:https://github.com/shrekshrek/inlineplayer
 *
 * @author: Shrek.wang, shrekshrek@gmail.com
 **/

(function (factory) {

    var root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global);

    if (typeof define === 'function' && define.amd) {
        define(['exports'], function (exports) {
            root.InlinePlayer = factory(root, exports);
        });
    } else if (typeof exports !== 'undefined') {
        factory(root, exports);
    } else {
        root.InlinePlayer = factory(root, {});
    }

}(function (root, InlinePlayer) {

    function uaParser() {
        var u = navigator.userAgent;
        return {
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            iosv: u.substr(u.indexOf('iPhone OS') + 9, 3)
        };
    }

    function extend(obj, obj2) {
        for (var prop in obj2) {
            obj[prop] = obj2[prop];
        }
    }

    InlinePlayer = function () {
        this.initialize.apply(this, arguments);
    };

    extend(InlinePlayer.prototype, {
        initialize: function (config) {
            var _config = config || {};
            this.el = _config.el || function () {
                    var video = document.createElement("video");
                    video.webKitPlaysInline = 'webkit-playsinline';
                    video.playsInline = 'playsinline';
                    video.autoplay = 'autoplay';
                    return video;
                }();

            this.proxy = document.createElement("audio");
            this.proxy.autoplay = 'autoplay';

            this.proxy.src = _config.src || '';
            this.el.src = _config.src || '';
            this.fps = _config.fps || 18;
            this.useProxy = _config.useProxy || true;

            this.el.pause();
            this.proxy.pause();

        },

        src: function () {

        },

        play: function () {
            var self = this;
            if(this.useProxy){
                this.proxy.play();
                this.iv = setInterval(function () {
                    if(self.proxy.currentTime) self.el.currentTime = self.proxy.currentTime;
                }, 1000 / this.fps);
            }else{
                this.el.play();
            }
        },

        pause: function () {
            if(this.useProxy) {
                this.proxy.pause();
                if (this.iv) clearInterval(this.iv);
            }else{
                this.proxy.pause();
            }
        },
    });

    return InlinePlayer;
}));
