!function(e, t) {
    function n(e) {
        var t = Ut[e], n = Array.prototype.slice.call(arguments, 1);
        if (t) {
            t = t.slice(0);
            for (var r = 0, i = t.length; i > r; r++) t[r].apply(Ht, n);
        }
    }
    function r() {
        if (!Ct && !Lt) {
            Lt = !0, Ht.get("init", function() {
                Lt = !1, Q = localStorage.getItem(It + "guid");
                var e = A('meta[name="x-key"]');
                return e && (Y = (e.getAttribute("content") || "").trim(), Mt = Y + "_"), Y ? void Ht.get("bt", function(e) {
                    return e ? (K = e.token, Q = e.guid, localStorage.setItem(It + "guid", Q), void Ht.get("vt", function(e) {
                        return e ? (V = e, Ct = !0, a(), Ot.forEach(function(e) {
                            c.apply(null, e);
                        }), void (Ot = null)) : void n("error", {
                            type: "init",
                            code: 102
                        });
                    })) : void n("error", {
                        type: "init",
                        code: 101
                    });
                }) : void n("error", {
                    type: "init",
                    code: 100
                });
            });
            var e = A('meta[name="x-splashscreen"]');
            return e && (jt = parseInt((e.getAttribute("content") || "").trim(), 10) || 0), 
            jt && Ht.splashscreen(jt), Ht;
        }
    }
    function i() {
        var e = A('meta[name="x-toolbar"]');
        if (!e || "no" !== (e.getAttribute("content") || "").toLowerCase().trim()) {
            var t = A(Wt);
            if (!t) {
                var n = [ Wt + " {text-shadow:none;font-family:'Microsoft Yahei', Arial, 'Helvetica Neue', sans-serif;-webkit-font-smoothing: antialiased;z-index: 99990;text-align: left;height: 0;width: 0;font-size: 13px;}", Wt + " * {padding: 0; margin: 0; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;}", Wt + " .hw-bar {width: 170px; box-sizing: border-box; position: fixed; z-index: 99990; top: 10px; left: -190px; background-color: #FFF; box-shadow: 0 0 3px rgba(0,0,0,0.3);transition-property: left; transition-timing-function: ease-in; transition-duration: .3s;}", Wt + " .hw-bar.hw-bar-expand {left:0;}", Wt + " .hw-bar header {width: 100%; height: 36px; text-align: center; color: #FFF; background-color: #1399d2;}", Wt + " .hw-bar h4 {display: inline; line-height: 38px;}", Wt + " .hw-bar .hw-clip {display: block; position: absolute; z-index: 3000; height: 38px; width: 60px; top: 0; right: -60px; background-color: transparent;}", Wt + " .hw-bar .hw-clip-btn {height: 36px; background-color: #1399d2; box-shadow: 3px 0 3px rgba(0,0,0,0.2); position: relative; transition-property: width; transition-timing-function: ease-in; transition-duration: .3s;}", Wt + " .hw-bar .hw-clip-btn img {height: 30px; position: absolute; top: 3px; right: 5px;}", Wt + " .hw-bar nav ul {list-style: none; text-align: center;}", Wt + " .hw-bar nav a {font-size: 14px; line-height: 34px; text-decoration: none; display: block; font-weight: 700; color: #666; border-top: 1px solid #E5E5E5;}", Wt + " .hw-bar nav em {font-style: normal; color: #0080ff; margin: 0 2px;}", Wt + " .hw-bar nav strong {color: #f0404f;}", Wt + " .hw-bar nav .hw-btn-app {font-size: 12px; background: #F7F6F6;}", Wt + " .hw-bar nav .hw-btn-resume {font-size: 18px; font-weight: 900; color: #fff; background: #1399d2;}" ];
                w(n.join("")), t = Z.createElement("div"), t.id = Wt.slice(1), t.innerHTML = [ '<div id="hw-bar" class="hw-bar">', "<header>", "<h4>火舞游戏，为未来而生</h4>", '<div class="hw-clip">', '<div class="hw-clip-btn"><img src="' + wt + '/images/home/logo200.png"></div>', "</div>", "</header>", "<nav>", "<ul>", Ht.env.android ? '<li><a href="#" class="hw-btn-app" data-action="app">安装<strong>火舞APP</strong>，体验精品游戏</a></li>' : "", '<li><a href="#" data-action="follow">关注<em>火舞</em>公众号</a></li>', '<li><a href="#" data-action="more">更多游戏</a></li>', '<li><a href="#" class="hw-btn-resume" data-action="close">返回游戏</a></li>', "</ul>", "</nav>", "</div>" ].join(" "), 
                t.addEventListener(nt, M), t.addEventListener(it, M), A("header", t).addEventListener(nt, function() {
                    B("toolbar", "click", "toggle"), o();
                }), A("nav", t).addEventListener(rt, function(e) {
                    var t = e.target.getAttribute("data-action");
                    t && (e.preventDefault(), B("toolbar", "click", t)), "app" === t ? Ht.download() : "follow" === t ? Ht.follow() : "more" === t ? Ht.more() : "close" === t && o(!1);
                }), A("body").appendChild(t), zt.toolbarExpand = !1;
            }
            return t;
        }
    }
    function o(e) {
        var t = "boolean" === y(e) ? e : !zt.toolbarExpand;
        t !== zt.toolbarExpand && (zt.toolbarExpand = t, A(Wt + " .hw-bar").className = "hw-bar" + (t ? " hw-bar-expand" : ""));
    }
    function a() {
        var e = A(qt);
        e || (e = Z.createElement("iframe"), e.width = e.height = 1, e.style.display = "none", 
        A("head").appendChild(e)), e.src = I(xt + "/apis-sso.html", {
            id: Q,
            t: Y,
            bt: K,
            vt: V,
            _: Date.now()
        });
    }
    function s(e, t, n) {
        Ht.set("tc", T({
            act: e,
            aop: t
        }, n || {}));
    }
    function c(e, t, n, r) {
        var i = Tt[t];
        if (i && !(0 === i & St[e])) {
            if (!Ct && "init" !== t && "bt" !== t && "vt" !== t) return void Ot.push(Array.prototype.slice.call(arguments));
            E(n) && (r = n, n = null);
            var o = At[t];
            if (o) {
                try {
                    o.abort();
                } catch (a) {}
                o = null, delete At[t];
            }
            At[t] = v(tt, l(t, e), n, r);
        }
    }
    function l(e, t) {
        return xt + yt + (t === et ? "get" : "set") + e + ".html";
    }
    function u(e) {
        return e.charAt(0).toUpperCase() + e.slice(1);
    }
    function d(e) {
        var t = null, r = p(), i = r.style.opacity > 0;
        "boolean" === y(e) ? e !== i && (t = e ? 1 : 0) : t = i ? 0 : 1, null !== t && (r.style.display = t ? "" : "none", 
        r.style.opacity = t, n("splashscreen." + (t ? "show" : "hide")));
    }
    function p() {
        var e = A(Xt);
        if (!e) {
            var t = A('meta[name="x-author"]');
            t && (t = (t.getAttribute("content") || "").trim().replace(/</g, "<").replace(/>/g, ">"));
            var n = [ Xt + " {position:fixed;left:0;top:0;z-index:9947483646;width:100%;height:100%;transition:opacity .6s ease;-webkit-transition:opacity .6s ease;-o-transition:opacity .6s ease;box-sizing:border-box;background: #01a8fe;background: -moz-linear-gradient(top,#01a8fe 0%,#5fdfff 100%);background: -webkit-gradient(linear,left top,left bottom,color-stop(0%,#01a8fe),color-stop(100%,#5fdfff));background: -webkit-linear-gradient(top,#01a8fe 0%,#5fdfff 100%);background: -o-linear-gradient(top,#01a8fe 0%,#5fdfff 100%);background: -ms-linear-gradient(top,#01a8fe 0%,#5fdfff 100%);background: linear-gradient(to bottom,#01a8fe 0%,#5fdfff 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#01a8fe',endColorstr='#5fdfff',GradientType=0 );color:#fff;text-shadow:none;font-family:'Microsoft Yahei', Arial, 'Helvetica Neue', sans-serif;-webkit-font-smoothing: antialiased;}", Xt + " .inner {position:relative;top:0;width:100%;height:100%;padding-top:80px;pointer-events:none;}", Xt + " img {display:block;margin:10px auto 30px;height:80px;width:auto;}", Xt + " p {font-size:16px;line-height:24px;text-align:center;margin:10px auto;padding:0 10px;}", Xt + " .hw_info {font-size: 12px;color: rgba(255,255,255,.7);}", Xt + " .progress {height:20px;overflow:hidden;margin: 5px 10px;background-color:#f5f5f5;border-radius:4px;box-sizing:border-box;box-shadow:inset 0 1px 2px rgba(0,0,0,.1);-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.1);}", Xt + " .progress .bar {float:left;min-width:20px;height:100%;line-height:20px;font-size:12px;text-align:center;color:#fff;box-sizing:border-box;background-color:#428bca;box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);transition:width .6s ease;-webkit-transition:width .6s ease;-o-transition:width .6s ease;}" ];
            w(n.join("")), e = Z.createElement("div"), e.id = Xt.slice(1), e.style.display = "none", 
            e.style.opacity = 0, e.innerHTML = [ '<div class="inner">', '<img src="' + wt + '/images/home/logo_wr_220x100.png" height="80">', ut[dt] ? '<img src="' + wt + "/images/home/logo_" + ut[dt] + '.png" height="80">' : "", t ? "<p><strong>火舞游戏</strong> 鈥� <strong>" + t + "</strong> 原创出品</p><p>转载请经过授权，侵权必究</p>" : "<p>火舞游戏 鈥� 为未来而生</p>", '<p class="hw_info">游戏载入中...</p>', '<div class="progress" style="display:none;"><div class="bar">0%</div></div>', "</div>" ].join(" "), 
            e.addEventListener(nt, M), e.addEventListener(it, M), A("body").appendChild(e);
        }
        return e;
    }
    function f(e) {
        var t, r = h(), i = "none" !== r.style.display;
        "boolean" === y(e) ? e !== i && (t = e ? "block" : "none") : t = i ? "none" : "block", 
        t && (r.style.display = t, n("orientation." + ("none" === t ? "hide" : "show")));
    }
    function h() {
        var e = A(Kt);
        if (!e) {
            var t = [ Kt + " {position:fixed;left:0;top:0;z-index:9999;width:100%;height:100%;box-sizing:border-box;background:#fff;}", Kt + " .inner {width:100%;height:100%;padding-top:200px;pointer-events:none;}", Kt + " .tip {position:absolute;top:80px;left:50%;margin-left:-64px;width:128px;z-index:9999;}", Kt + " p {color:#4a87ee;font-size:16px;line-height:24px;text-align:center;margin:10px auto;padding:0 10px;}" ];
            w(t.join("")), e = Z.createElement("div"), e.id = Kt.slice(1), e.style.display = "none", 
            e.innerHTML = [ '<div class="inner">', '<img src="' + wt + '/images/orientation.gif" class="tip">', "<p>请旋转手机屏幕，以达到最佳效果</p>", "</div>" ].join(" "), 
            e.addEventListener(nt, M), e.addEventListener(it, M), A("body").appendChild(e);
        }
        return e;
    }
    function g() {
        clearTimeout(Qt), Qt = setTimeout(function() {
            var t = !0, r = e.orientation;
            if (0 === r || 180 === r) t = !0; else if (-90 === r || 90 === r) t = !1; else {
                var i = R();
                t = i.h > i.w;
            }
            null === Yt ? Yt = t : Yt !== t && (Yt = t, n("orientation", t)), "boolean" == typeof t && f(t !== t);
        }, Vt);
    }
    function m(t, r) {
        t && r && !zt.banner && (k(r) && (r = A("#" + r)), Z.documentElement.contains(r) && ((e.BAIDU_DUP = e.BAIDU_DUP || []).push([ "fillAsync", t, r ]), 
        zt.banner = !0, n("banner.set")));
    }
    function v(t, n, r, i) {
        var o = new XMLHttpRequest();
        return t === et && r && (n = I(n, r), r = null), o.open(t, n, !0), Y && o.setRequestHeader("X-KEY", Y), 
        (K || V) && o.setRequestHeader("X-TOKEN", V || K), Q && o.setRequestHeader("X-GUID", Q), 
        t === tt && o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), 
        i && (o.onerror = o.onabort = function() {
            b(o), i(null, 500, o);
        }, o.onload = function() {
            b(o);
            var t = o.status;
            if (t >= 200 && 300 > t || 304 == t) {
                var n, r = o.responseText;
                try {
                    n = JSON.parse(r);
                } catch (a) {
                    e[_0](r);
                }
                if (n && n.url) return void (location.href = n.url);
                n && 1 === n.status ? i(n.data || "", n.status, o) : i(null, n.status, o);
            } else i(null, t, o);
        }), o.send(e.FormData && r instanceof FormData ? r : k(r) ? r : j(r)), o;
    }
    function b(e) {
        e.onload = e.onabort = e.onerror = e.ontimeout = null;
    }
    function w(e, t) {
        var n;
        t = t || Z, n = t.createElement("style"), n.type = "text/css", t.getElementsByTagName("head")[0].appendChild(n), 
        n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(t.createTextNode(e));
    }
    function x(e, t) {
        var n;
        t = t || Z, n = t.createElement("script"), n.type = "text/javascript", n.src = e, 
        t.getElementsByTagName("head")[0].appendChild(n);
    }
    function y(e) {
        return null == e ? String(e) : Bt[Object.prototype.toString.call(e)] || "object";
    }
    function k(e) {
        return "string" === y(e);
    }
    function E(e) {
        return "function" === y(e);
    }
    function _(e) {
        return "object" === y(e) && Object.getPrototypeOf(e) === Object.prototype;
    }
    function S(e, t) {
        Object.keys(e).forEach(function(n) {
            t(n, e[n]);
        });
    }
    function T(e, t) {
        return S(t, function(t, n) {
            e[t] = n;
        }), e;
    }
    function A(e, t) {
        return k(e) ? (t = t || Z, t.querySelector(e)) : e;
    }
    function O(e) {
        return "string" == typeof e && "" !== e;
    }
    function z(e) {
        return O(e);
    }
    function C(t) {
        var n = e.location.search.substr(1).match(new RegExp("(^|&)" + t + "=([^&]*)(&|$)"));
        return n ? decodeURIComponent(n[2]) : null;
    }
    function L(e, t) {
        if (O(e)) {
            var n = String(Z.cookie).match(new RegExp("(?:^| )" + e + "(?:(?:=([^;]*))|;|$)"));
            if (n) return (n = n[1]) ? t ? decodeURIComponent(n) : n : "";
        }
        return null;
    }
    function D(e, t) {
        return t = t || {}, L(z(e) ? e : "", !t.raw);
    }
    function j(e) {
        var t = [];
        return S(e || {}, function(e, n) {
            Array.isArray(n) || (n = [ n ]), n.forEach(function(n) {
                t.push(e + "=" + encodeURIComponent(n));
            });
        }), t.join("&");
    }
    function I(e, t) {
        k(t) || (t = j(t)), e = e.split("#");
        var n = e[1];
        return e = e[0], t && (e += e.indexOf("?") >= 0 ? "&" : "?", e += t + (n ? "#" + n : "")), 
        e;
    }
    function M(e) {
        e && (e.preventDefault(), e.stopPropagation());
    }
    function R() {
        return {
            w: e.innerWidth,
            h: e.innerHeight
        };
    }
    function P(e) {
        var t = A('meta[name="x-' + e + '"]');
        return t ? (t.getAttribute("content") || "").trim() : null;
    }
    function B(t) {
        var n = e[F + "hmt"];
        n && n.push([ F + "trackEvent", t ].concat(Array.prototype.slice.call(arguments, 1).map(function(e) {
            return t + F + e;
        })));
    }
    for (var H = ":", U = "/", W = ".", q = "-", F = "_", N = "1", J = "5", G = [], X = 97; 122 > X; X++) G.push(String.fromCharCode(X));
    var Y, K, V, Q, Z = e.document, et = "GET", tt = "POST", nt = "touchstart", rt = "touchend", it = "mousedown", ot = location.hostname, at = location.pathname, st = e.navigator.userAgent, ct = G[7] + G[19] + G[19] + G[15] + H + U + U, lt = W + G[2] + G[14] + G[12], ut = {
        1003: "ishanku"
    }, dt = C("f"), pt = [ "gokh5", "huowureng", "591huowu", "gohh5", "h5yq8", "9aih5", "wan5219", "tnbh5", "h55278", "wanleilea" ].map(function(e) {
        return G[6] + W + e + lt;
    }), ft = "...........".split("").map(function(e, t) {
        return G[6] + (t > 0 ? t : "") + W + G[22] + G[0] + G[13] + G[7] + J + lt;
    }), ht = G[3] + G[14] + G[22] + G[13] + W + J + N + G[7] + J + lt !== ot && ft.indexOf(ot) < 0, gt = ct + J + N + G[7] + J + lt, mt = gt + U + G[22] + G[23], vt = gt + U + G[0] + G[15] + G[15] + q + G[3] + G[14] + G[22] + G[13] + G[11] + G[14] + G[0] + G[3] + U, bt = "http://mp.weixin.qq.com/s?__biz=MzA4MTgxODQyMg==&mid=200342529&idx=1&sn=8b6d75091f7ca91a9a7bcb85e12ed899#rd", wt = ct + G[18] + G[19] + G[0] + G[19] + G[8] + G[2] + W + G[22] + G[0] + G[13] + G[7] + J + lt, xt = ct + (ht ? "dev" + W : "") + G[0] + G[15] + G[8] + W + J + N + G[7] + J + lt, yt = U + G[0] + G[15] + G[8] + G[18] + q, kt = ct + (ht ? "dev" + W : "") + pt[Math.floor(Math.random() * pt.length)], Et = kt + at.replace(/\/([^\/]+\.\w+)$/, "/").replace(/\w+$/, "$1/"), _0 = G[4] + G[21] + G[0] + G[11], St = {
        GET: 1,
        SET: 2
    }, Tt = {
        init: 1,
        bt: 1,
        vt: 1,
        ui: 1,
        gv: 1,
        jf: 3,
        ph: 1,
        ok: 1,
        data: 3,
        title: 1,
        tc: 2,
        guc: 3,
        gpd: 3,
        dtc: 1,
        grlg: 1
    }, At = {}, Ot = [], zt = {
        nick: "火舞玩家"
    }, Ct = !1, Lt = !1, Dt = !1, jt = 3e3, It = "51h5_", Mt = It, Rt = "51h5_user", Pt = "wx_user", Bt = {};
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e) {
        Bt["[object " + e + "]"] = e.toLowerCase();
    });
    var Ht = e.ih5game = {};
    Ht.ver = "1.4";
    var Ut = {};
    Ht.on = function(e, t) {
        return Ut[e] = Ut[e] || [], Ut[e].push(t), Ht;
    }, Ht.once = function(e, t) {
        function n() {
            Ht.off(e, n), t.apply(this, arguments);
        }
        return n.listener = t, Ht.on(e, n), Ht;
    }, Ht.off = function(e, t) {
        if (0 === arguments.length) return Ut = {}, Ht;
        var n = Ut[e];
        if (!n) return Ht;
        if (1 === arguments.length) return delete Ut[e], Ht;
        for (var r, i = 0; i < n.length; i++) if (r = n[i], r === t || r.listener === t) {
            n.splice(i, 1);
            break;
        }
        return Ht;
    }, Ht.env = {}, Ht.is = function(e) {
        return e = e.toLowerCase(), Ht.env.hasOwnProperty(e) && Ht.env[e] ? !0 : !1;
    }, function(e) {
        var t = st.match(/Html5Plus\/([\d.]+)/);
        t && (e.app = t[1]);
        var n = st.match(/MicroMessenger\/([\d.]+)/);
        n && (e.wechat = n[1]);
        var r = st.match(/(Android);?[\s\/]+([\d.]+)?/);
        r && (e.android = r[2]);
        var i = st.match(/(iPad).*OS\s([\d_]+)/);
        i && (e.ipad = i[2].replace(/_/g, "."));
        var o = st.match(/(iPod)(.*OS\s([\d_]+))?/);
        o && (e.ipod = o[3].replace(/_/g, ".") || null);
        var a = !i && st.match(/(iPhone\sOS)\s([\d_]+)/);
        a && (e.iphone = a[2].replace(/_/g, ".")), e.ios = e.ipod || e.iphone || e.ipad, 
        st.match(/mso_app/i) && (e.mso = "1.0"), /\s+weico/i.test(st) && (e.weico = "1.0");
    }(Ht.env), Ht.storage = {
        get: function(e) {
            return localStorage.getItem(Mt + e);
        },
        set: function(e, t, n) {
            e && (n || null === this.get(e)) && localStorage.setItem(Mt + e, t);
        },
        remove: function(e) {
            e && null !== this.get(e) && localStorage.removeItem(Mt + e);
        }
    }, e.addEventListener("storage", function(e) {
        if (Y) {
            var t = e.key;
            if (t && 0 === t.indexOf(Mt)) {
                var r = {
                    key: t.slice(Mt.length),
                    from: e.oldValue,
                    to: e.newValue,
                    time: e.timeStamp,
                    url: e.url
                };
                null === r.from ? n("storage.add", {
                    key: r.key,
                    value: r.to,
                    time: r.time,
                    url: r.url
                }) : null === r.to ? n("storage.remove", {
                    key: r.key,
                    time: r.time,
                    url: r.url
                }) : n("storage.change", r), n("storage", r);
            }
        }
    }), Ht.config = function(e, t) {
        if (_(e)) for (var n in e) Ht.config(n, e[n]); else "nickName" === e && t && (zt.nick = t);
    }, Ht.init = function() {}, Ht.ssoFinish = function(e) {
        Ht.getUser(function(e) {
            e && e.name && (zt.nick = e.name);
        }), n("sso", e), n("init");
    }, Ht.ready = function(e) {
        return Dt ? e && e() : Ht.once("ready", e), Ht;
    }, /complete|loaded|interactive/.test(Z.readyState) && Z.body ? Dt = !0 : Z.addEventListener("DOMContentLoaded", function() {
        Dt = !0, n("ready");
    }, !1);
    var Wt = "#hw-toolbar";
    Ht.ready(i);
    var qt = "#ih5game_sso";
    Ht.get = function(e, t, n) {
        var r = Ht[et.toLowerCase() + u(e)];
        return r ? r(t, n) : c(et, e, t, n), Ht;
    }, Ht.set = function(e, t, n) {
        var r = Ht[tt.toLowerCase() + u(e)];
        return r ? r(t, n) : c(tt, e, t, n), Ht;
    };
    var Ft = [ 0, 0, 0 ];
    Ht.start = function() {
        return Ft[0] || (Ft[0] = Ft[1] = Date.now(), s("game", "start"), n("status.start")), 
        Ht;
    }, Ht.restart = function() {
        Ft[1] = Date.now(), Ft[2] = Ft[3] = 0, s("game", "restart"), n("status.restart");
    }, Ht.pause = function() {
        Ft[2] || (Ft[2] = Date.now(), s("game", "pause"), n("status.pause"));
    }, Ht.stop = function() {
        Ft[2] || (Ft[2] = Date.now(), s("game", "stop"), n("status.stop"));
    };
    var Nt, Jt = "#hw_share";
    Ht.share = function(e) {
        clearTimeout(Nt);
        var t = A(Jt);
        if (!t) {
            var r = Ht.env.mso, i = [ Jt + " {position:fixed;left:0;top:0;z-index:9999;width:100%;height:100%;box-sizing:border-box;background:rgba(0,0,0,0.85);}", Jt + " .inner {width:100%;height:100%;padding-top:100px;pointer-events:none;}", Jt + " .hw_arron {position:absolute;z-index:9999;width:100px;}", Jt + " .hw_arron_rt {top:3px;right:18px;}", Jt + " .hw_arron_rb {bottom:3px;right:18px;}", Jt + " p {color:#fff;font-size:24px;text-align:center;margin:5px auto;padding:0;}" ];
            w(i.join("")), t = Z.createElement("div"), t.id = Jt.slice(1), t.innerHTML = [ '<div class="inner">', '<img src="' + wt + "/images/home/" + (r ? "arron_rb" : "arron_rt") + '.png" class="hw_arron ' + (r ? "hw_arron_rb" : "hw_arron_rt") + '">', r ? "<p>请点击右下角</p><p>分享给好友</p>" : "<p>请点击右上角</p><p>点击【分享到朋友圈】</p>", '<p style="margin: 20px auto;">' + (e || "火舞为未来而生") + "</p></div>" ].join(" "), 
            t.addEventListener(nt, M), t.addEventListener(it, M);
            var o = t.querySelector(".inner");
            o && (o.addEventListener(nt, Ht.hideShare), o.addEventListener(it, Ht.hideShare)), 
            A("body").appendChild(t);
        }
        return Ht.wx.showOption(), t.style.display = "block", n("share.show"), Nt = setTimeout(function() {
            t.querySelector(".inner").style.pointerEvents = "auto";
        }, 500), Ht;
    }, Ht.env.weico && (Ht.share = function() {
        location.href = "weico3://compose?action=present&type=weibo&content=" + Ht.getShare("desc");
    }), Ht.hideShare = function() {
        var e = A(Jt);
        return e && (e.style.display = "none", e.querySelector(".inner").style.pointerEvents = "none", 
        n("share.hide")), Ht;
    }, Ht.more = function(e) {
        var t = Ht.env.wechat ? mt : gt;
        return e ? t : void (location.href = t);
    }, Ht.home = function(t) {
        return t ? gt : void (e.location.href = gt);
    }, Ht.follow = function(t) {
        return t ? bt : void (e.location.href = bt);
    }, Ht.download = function(t) {
        return t ? vt : void (e.location.href = vt);
    }, Ht.progress = function(e, t) {
        var r = A(Xt);
        if (!r) return Ht;
        var i = A(".progress", r);
        return i ? ("none" === i.style.display && (i.style.display = "block"), t = k(t) ? t.trim() : "", 
        t && (i = A(".hw_info", r)) && (i.innerText = t), e = "number" === y(e) ? Math.min(100, Math.max(0, e)) : -1, 
        e >= 0 && (i = A(".progress .bar", r)) && (i.innerText = e + "%", i.style.width = e + "%", 
        n("progress", e, t)), Ht) : Ht;
    }, Ht.splashscreen = function(e) {
        return Gt = clearTimeout(Gt), "boolean" === y(e) ? d(e) : e > 0 ? (d(!0), Gt = setTimeout(function() {
            d(!1);
        }, e)) : d(), Ht;
    };
    var Gt, Xt = "#hw_splashscreen", Yt = null, t = null;
    Ht.getOrientation = function() {
        return Yt;
    }, Ht.orientationTip = function(e) {
        return "boolean" == typeof e && (t = e, g()), Ht;
    };
    var Kt = "#hw_orientationtip", Vt = Ht.is("android") ? 350 : 100, Qt = null;
    Ht.ready(function() {
        e.addEventListener("onorientationchange" in e ? "orientationchange" : "resize", g, !1), 
        g();
        var t = A('meta[name="x-orientation"]');
        t && (t = parseInt((t.getAttribute("content") || "").trim(), 10), t && Ht.orientationTip(1 === t));
    }), Ht.getUser = function(e, t) {
        E(e) ? (t = e, e = !1) : "boolean" !== y(e) && (e = !1);
        var r = {
            id: 0,
            name: null,
            avatar: "http://i1.wanh5.com/avatar/default/1.jpg",
            gender: 0
        }, i = D(Rt);
        i && (i = decodeURIComponent(i).split("|"), r = {
            id: parseInt(i[0], 10) || 0,
            name: decodeURIComponent(i[1]) || null,
            avatar: decodeURIComponent(i[2]),
            gender: parseInt(i[3], 10) || 0
        }), e ? c(et, "ui", function(e, i) {
            null !== e ? (r = T(r, e), n("user.get", r)) : n("error", {
                type: "user.get",
                code: i
            }), t && E(t) && t(r, i);
        }) : (n("user.get", r), t && E(t) && t(r));
    }, Ht.getWXUser = function() {
        var e = D(Pt);
        if (e) try {
            e = JSON.parse(decodeURIComponent(e)), n("wxuser.get", e);
        } catch (t) {
            n("error", {
                type: "wxuser.get",
                code: t.message
            });
        }
        return e || null;
    }, Ht.getStat = function(e) {
        c(et, "gv", function(t, r) {
            null !== t ? n("stat.get", t) : n("error", {
                type: "stat.get",
                code: r
            }), e && E(e) && e(t, r);
        });
    }, Ht.getScore = function(e) {
        c(et, "jf", function(t, r) {
            null !== t ? n("score.get", t) : n("error", {
                type: "score.get",
                code: r
            }), e && E(e) && e(t, r);
        });
    }, Ht.setScore = function(e, t, r) {
        if (e = parseFloat(e, 10), 0 >= e) return Ht;
        E(t) && (r = t, t = null);
        var i = {
            s: e
        };
        return t = parseFloat(t, 10), t > 0 && (i.t = t), zt.nick && (i.n = zt.nick), c(tt, "jf", i, function(e, t) {
            null !== e ? n("score.set", i.s, i.t, i.n) : n("error", {
                type: "score.set",
                code: t
            }), r && E(r) && r(e, t);
        }), Ht;
    }, Ht.setScoreWithName = function() {
        var e = arguments, t = prompt("你获得了" + e[0] + "分, 使用下面名字并通知好友？", zt.nick);
        return t ? (zt.nick = t, Ht.setScore.apply(Ht, e)) : Ht;
    }, Ht.getRank = function(e, t) {
        return E(e) && (t = e, e = null), c(et, "ph", {
            order: k(e) && "time" === e ? "time" : "score"
        }, function(e, r) {
            null !== e ? n("rank.get", e) : n("error", {
                type: "rank.get",
                code: r
            }), t && E(t) && t(e, r);
        }), Ht;
    }, Ht.getSaveData = function(e) {
        return c(et, "data", function(t, r) {
            null !== t ? n("savedata.get", t) : n("error", {
                type: "savedata.get",
                code: r
            }), e && E(e) && e(t, r);
        }), Ht;
    }, Ht.setSaveData = function(e, t) {
        return k(e) ? (e = {
            d: e
        }, c(tt, "data", e, function(r, i) {
            null !== r ? n("savedata.set", e.d) : n("error", {
                type: "savedata.set",
                code: i
            }), t && E(t) && t(r, i);
        }), Ht) : Ht;
    }, Ht.getData = function(e) {
        return c(et, "guc", function(t, r) {
            null !== t ? n("data.get", t) : n("error", {
                type: "data.get",
                code: r
            }), e && E(e) && e(t, r);
        }), Ht;
    }, Ht.setData = function(e, t) {
        return k(e) ? (e = {
            d: e
        }, c(tt, "guc", e, function(r, i) {
            null !== r ? n("data.set", e.d) : n("error", {
                type: "data.set",
                code: i
            }), t && E(t) && t(r, i);
        }), Ht) : Ht;
    }, Ht.getGameData = function(e, t) {
        return c(et, "gpd", {
            p: e
        }, function(r, i) {
            null !== r ? n("gamedata.get", e, r) : n("error", {
                type: "gamedata.get",
                code: i
            }), t && E(t) && t(r, i);
        }), Ht;
    }, Ht.setGameData = function(e, t, r) {
        return k(t) ? (t = {
            p: e,
            v: t
        }, c(tt, "gpd", t, function(e, i) {
            null !== e ? n("gamedata.set", t.p, t.v) : n("error", {
                type: "gamedata.set",
                code: i
            }), r && E(r) && r(e, i);
        }), Ht) : Ht;
    }, Ht.getTitle = function(e) {
        return c(et, "title", function(t, r) {
            null !== t ? n("title.get", t) : n("error", {
                type: "title.get",
                code: r
            }), e && E(e) && e(t, r);
        }), Ht;
    }, Ht.getHotGames = function(e) {
        return c(et, "grlg", function(t, r) {
            null !== t ? n("hotgames.get", t) : n("error", {
                type: "hotgames.get",
                code: r
            }), e && E(e) && e(t, r);
        }), Ht;
    }, function(t) {
        function r(e, t) {
            return /^(?:\w+)?:/.test(e) || t && !/\.(?:png|jpg)$/.test(e) ? void 0 : (e = e.replace(/^\/+/, ""), 
            e = e.replace(/^(\.+\/+)+/, ""), Et + e);
        }
        function i(t, n, r) {
            e.WeixinJSBridge && e.WeixinJSBridge.invoke(t, n, r);
        }
        function o(t) {
            e.WeixinJSBridge && e.WeixinJSBridge.call(t);
        }
        function a(e, t) {
            n("share.open", e);
            var r = w[e + "Link"] || w.link;
            Q && (r = r + (r.indexOf("?") >= 0 ? "&" : "?") + "fu=" + encodeURIComponent(Q)), 
            r = r + (r.indexOf("?") >= 0 ? "&" : "?") + "ft=" + new Date().getTime(), i(g[e], {
                appid: w.appid || "",
                img_url: w.img,
                img_width: w.imgWidth,
                img_height: w.imgHeight,
                link: r,
                title: e === f ? w.desc : w.title,
                desc: e === f ? w.title : w.desc,
                content: w.desc
            }, function(r) {
                var i = {
                    type: e
                }, o = r.err_msg.slice(m[e].length + 1);
                ("confirm" === o || "ok" === o) && (o = "success"), i[o] = !0, n("share", i, r), 
                n("share.close"), "cancel" !== o && s("share", o), t && E(t) && t(i, r);
            });
        }
        function c(t) {
            e.WeixinJSBridge && e.WeixinJSBridge.on(v + b[t], function() {
                a(t);
            });
        }
        function l() {
            c(p), c(f), c(h);
        }
        var u = "no" === P("wxbridge"), d = t.wx = t.wx || {}, p = d.SHARE_TYPE_APP = "app", f = d.SHARE_TYPE_TIMELINE = "timeline", h = d.SHARE_TYPE_WIEBO = "weibo", g = {};
        g[p] = "sendAppMessage", g[f] = "shareTimeline", g[h] = "shareWeibo";
        var m = {};
        m[p] = "send_app_msg", m[f] = "share_timeline", m[h] = "share_weibo";
        var v = "menu:share:", b = {};
        b[p] = "appmessage", b[f] = "timeline", b[h] = "weibo";
        var w = {
            img: Et + "icon.png",
            imgWidth: 200,
            imgHeight: 200,
            link: Et,
            query: "",
            title: Z.title || "火舞游戏",
            desc: Z.title || "火舞游戏"
        };
        t.getShare = function(e) {
            return w[e];
        }, t.setShare = function(e, i) {
            if (_(e)) for (var o in e) t.setShare(o, e[o]); else if (e && w.hasOwnProperty(e) && k(e) && k(i) && i) {
                if ("link" === e) {
                    if (i = r(i, !1), !i) return t;
                } else if ("img" === e) {
                    if (i = r(i, !0), !i) return t;
                } else "query" === e && (w.link = I(w.link, i));
                var a = w[e];
                w[e] = i, n("share.set", e, a, i);
            }
            return t;
        }, d.sendFriend = function(e, n) {
            return t.setShare(e), a(p, n), this;
        }, d.sendTimeline = function(e, n) {
            return t.setShare(e), a(f, n), this;
        }, d.sendWeibo = function(e, n) {
            return t.setShare(e), a(h, n), this;
        }, d.preview = function(e, t) {
            return e && t && t.length && i("imagePreview", {
                current: e,
                urls: t
            }), this;
        }, d.showOption = function() {
            return o("showOptionMenu"), this;
        }, d.hideOption = function() {
            return o("hideOptionMenu"), this;
        }, d.showToolbar = function() {
            return o("showToolbar"), this;
        }, d.hideToolbar = function() {
            return o("hideToolbar"), this;
        }, d.close = function() {
            return o("closeWindow"), this;
        }, u || ("undefined" == typeof WeixinJSBridge ? Z.addEventListener("WeixinJSBridgeReady", l, !1) : l());
    }(Ht);
    var Zt, en;
    Ht.setBanner = function(e) {
        return m(Zt, e), Ht;
    }, function() {
        var t = A('meta[name="x-banner"]');
        t && (en = (t.getAttribute("data-type") || "").trim(), Zt = (t.getAttribute("content") || "").trim(), 
        Zt > 0 && Ht.ready(function() {
            if (e.BAIDU_DUP_require || x("http://dup.baidustatic.com/js/zm.js"), "1" === en) {
                var t = Z.createElement("div");
                t.id = "hw_banner_" + Zt, A("body").appendChild(t), Ht.setBanner(t.id);
            }
        }));
    }(), Ht.ready(r), Ht.ready(function() {
        var t = "//hm.baidu.com/hm.js?0c906e9f94713174584881c774a94212", n = F + "hmt";
        if (!e[n]) {
            for (var r, i = Z.querySelectorAll("script"), o = i.length; o > r; r++) if (i[r].src.indexOf(t) >= 0) return;
            e[n] = e[n] || [];
            var a = Z.createElement("script");
            a.src = t;
            var s = Z.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(a, s);
        }
    });
}(this);