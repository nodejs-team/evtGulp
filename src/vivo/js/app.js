/**
 * Created by shuxy on 2016/8/9.
 */

(function (window, undefined) {

    var getParameter = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2];
        return null;
    };

    var session = {
        set: function (key, value) {
            try {
                window.sessionStorage[__globalCfg.projectName + "_" + key] = value;
            } catch (e) {
            }
        },
        get: function (key) {
            try {
                return window.sessionStorage[__globalCfg.projectName + "_" + key] || null;
            } catch (e) {
                return null;
            }
        }
    };

    var storage = {
        set: function (key, value) {
            try {
                window.localStorage.setItem(__globalCfg.projectName + "_" + key, value);
            } catch (e) {
            }
        },
        get: function (key) {
            try {
                return window.localStorage.getItem(__globalCfg.projectName + "_" + key);
            } catch (e) {
                return null;
            }
        }
    };


    var getUserId = function () {
        return app.session.get("userId");
    };

    var setUserId = function (value) {
        app.session.set("userId", value);
    };

    var http = {};
    http.request = function (url, type, data, context) {
        var defer = $.Deferred();
        url = /^https?/.test(url) ? url : __globalCfg.serverUrl + url;
        $.ajax({
            url: url,
            data: data,
            type: type,
            /*headers: {
             "Accept-Encoding": "gzip, deflate"
             },*/
            success: function (res, status, xhr) {
                if (res.success) {
                    defer.resolveWith(context, [res.data, status, xhr]);
                }
                else {
                    defer.rejectWith(context, [res.message, res.errorCode, xhr]);
                }
            },
            error: function (xhr, status, errThrow) {
                defer.rejectWith(context, [(errThrow || (xhr.status == 0 ? "与服务器连接失败！" : "请求发生错误")) + " code: " + xhr.status, xhr.status, xhr]);
            }
        });

        return defer.promise();
    };

    http.get = function (url, data, context) {
        return http.request(url, 'GET', data, context);
    };

    http.post = function (url, data, context) {
        return http.request(url, 'POST', data, context);
    };

    var WXShareCallback = function (type) {
        http.post("project/share", {
            userId: getUserId(),
            type: type,
            projectId: __globalCfg.projectId
        });
    };

    var GetWXShareJSSDK = function () {
        http.get("project/jsConfig", {
            projectId: __globalCfg.projectId,
            url: location.href.split("#")[0]
        }).then(function (data) {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名
                jsApiList: /*data.jsApiList ||*/ [
                    "checkJsApi",
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2。详见：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html

            }, function (err) {
                console.error("wx jsConfig:" + err);
            });
        });
    };

    var noop = function () {
    };
    var shareSuccessPool = [];
    var shareCancelPool = [];

    var onShareSuccess = function (cb) {
        if (typeof cb === 'function') {
            shareSuccessPool.push(cb);
        }
    };

    var onShareCancel = function (cb) {
        if (typeof cb === 'function') {
            shareCancelPool.push(cb);
        }
    };

    var triggerShare = function (type) {
        var pool;
        if (type == 'success') {
            pool = shareSuccessPool;
        } else if (type == "cancel") {
            pool = shareCancelPool;
        }

        pool && pool.forEach(function (cb) {
            cb();
        });
    };

    var WXShareRefresh = function (data) {
        //转发到朋友圈
        wx.onMenuShareTimeline({
            title: data.title,
            link: data.link,
            imgUrl: data.imgUrl,
            success: function () {
                WXShareCallback(2);
                triggerShare("success");
            },
            cancel: function () {
                triggerShare("cancel");
            }
        });
        //转发给朋友
        wx.onMenuShareAppMessage({
            title: data.title,
            desc: data.desc,
            link: data.link,
            imgUrl: data.imgUrl,
            type: 'link',
            dataUrl: '',
            success: function () {
                WXShareCallback(1);
                triggerShare("success");
            },
            cancel: function () {
                triggerShare("cancel");
            }
        });
    };

    var hideWXmenu = function () {
        wx.hideAllNonBaseMenuItem();
        wx.hideMenuItems({
            menuList: [] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
        wx.showMenuItems({
            menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline'] // 要显示的菜单项，所有menu项见附录3
        });
    };

    var isSameDomain = function (link) {
        if (!/^https?:\/\//.test(link)) return true;
        return link.match(/^https?:\/\/([^/]+)/)[1] === location.hostname;
    };

    var chase = function () {
        window.history.pushState({}, null, isSameDomain(__globalCfg.link) ? __globalCfg.link : "auth.html?redirect_uri=" + __globalCfg.link);
    };

    window.app = {
        getParameter: getParameter,
        session: session,
        storage: storage,
        getUserId: getUserId,
        setUserId: setUserId,
        http: http,
        WXShareCallback: WXShareCallback,
        GetWXShareJSSDK: GetWXShareJSSDK,
        WXShareRefresh: WXShareRefresh,
        onShareSuccess: onShareSuccess,
        onShareCancel: onShareCancel,
        chase: chase,
        noop: noop
    };

    GetWXShareJSSDK();

    var userId;
    if (userId = getParameter("userId")) {
        setUserId(userId);
    }

    var _hasChase = __globalCfg.chase == undefined ? true : __globalCfg.chase;
    if (_hasChase) {
        chase();
    }

    $(function () {
        $(document).on("click", "[data-dismiss]", function (e) {
            e.preventDefault();
            $(this).closest(".dialog").hide();
        });

        if (__globalCfg.debug) {
            var deleteEl = $("<button />", {
                style: 'position:absolute;left:0;bottom:0;padding:.5em 1em;z-index:1000;font-size:1.4rem;',
                html: '清数据'
            }).appendTo(document.body);
            deleteEl.on("click", function () {
                location.href = 'delete.html';
            });
        }
    });

    wx.ready(function () {
        WXShareRefresh(__globalCfg);
        if (__globalCfg.hideWXmenu) {
            hideWXmenu();
        }
    });

})(this);