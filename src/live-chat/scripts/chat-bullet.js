(function ($, io, undefined) {
    var socket;
    var from = {};
    var isConnected = false;
    var canBullet = true;
    var to = {
        name: '所有人',
        uid: 'all'
    };
    //设置默认接收对象为"所有人"
    var COOKIE_NAME = "socket.user";
    var EVENTS = 'ontouchstart' in document ? {
        START: "touchstart",
        MOVE: "touchmove",
        END: "touchend"
    } : {
        START: "mousedown",
        MOVE: "mousemove",
        END: "mouseup"
    };
    //获取当前时间
    function now() {
        var date = new Date();
        var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
        return '<span class="msg-time">(' + time + ')</span>';
    }

    //生成用户唯一ID
    function genUID(length) {
        var g = '';
        var rnd = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
        var len = length || 12;
        while (len--) {
            g += rnd[Math.floor(Math.random() * 62)];
            if (len % 4 == 0)
                g += "-";
        }
        return g.slice(0, -1);
    }

    var Methods = {
        sendMsg: function (msg) {
            if (msg == "" || msg == undefined)
                return;
            videoBullet.addData({
                color: "#f90",
                text: from.name + ": " + msg
            });
            socket.emit('say', {
                from: from,
                to: to,
                msg: msg
            });
        },
        refreshUsers: function (data) {
            if (typeof data !== 'object') return;
            data.userCount = Object.keys(data.users).length;
            $("#act_layer_top").html(template("tpl-user-list", data));
        },
        online: function (data) {
            if (data.user.uid != from.uid) {
                console.log(data.user.name + "上线了！");
            } else {
                console.log("你进入了聊天室！");
            }
            this.refreshUsers(data);
        },
        offline: function (data) {
            console.log(data.user.name + '下线了！');
            this.refreshUsers(data);
        },
        refuse: function (data) {
            $.cookie(COOKIE_NAME, null);
            $("#loginModal").modal("show");
            alert("你输入的用户名已经存在，请重新输入！");
        },
        disconnect: function () {
            isConnected = false;
        },
        reconnect: function () {
            isConnected = true;
            Methods.joinUser();
        },
        say: function (data) {
            if (!canBullet) return;

            if (isConnected) {
                videoBullet.addData({
                    color: "#fff",
                    text: data.from.name + ":" + data.msg
                }, true);
            } else {
                alert("与服务器连接失败！");
            }
        },
        joinUser: function () {
            isConnected = true;
            socket.emit('online', {
                user: from
            });
        },
        doLogin: function () {
            //从 cookie 中读取用户名，存于变量 from
            from = $.cookie(COOKIE_NAME);
            if (from == "" || from == null || from == undefined) {
                $("#loginModal").modal("show");
                $("#loginForm").on("submit", function (e) {
                    e.preventDefault();
                    var username = $.trim($("#login-name").val());
                    if (username == "") {
                        return alert("请输入一个昵称");
                    } else {
                        from = {
                            name: username,
                            uid: genUID(),
                            avatar: 'images/avatar_default.jpg'
                        };
                        $.cookie(COOKIE_NAME, JSON.stringify(from), {
                            expires: 1
                        });
                        $("#loginModal").modal("hide");
                        Methods.createServer();
                    }
                });
            } else {
                from = JSON.parse(from);
                Methods.createServer();
            }
        },
        createServer: function () {
            socket = io.connect("http://" + location.hostname + ":4000");
            socket.on('connect', function () {
                //发送用户上线信号
                Methods.joinUser();
            });
            socket.on('online', function (data) {
                Methods.online(data);
            });
            socket.on('say', function (data) {
                Methods.say(data);
            });
            socket.on('offline', function (data) {
                Methods.offline(data);
            });
            socket.on('refuse', function (data) {
                Methods.refuse(data);
            });
            //服务器关闭
            socket.on('disconnect', function () {
                Methods.disconnect();
            });
            //重新启动服务器
            socket.on('reconnect', function () {
                Methods.reconnect();
            });
        }
    };
    $(function () {
        Methods.doLogin();
        //发话
        $("#bullet-form").on("submit", function (e) {
            e.preventDefault();
            if (!canBullet) return;
            var $input = $("#input_content");
            var msg = $input.val();
            if ($.trim(msg) == "")
                return alert("输入内容不能空");
            Methods.sendMsg(msg);
            $input.val("");
            //.focus();
        });

        var $doc = $(document);

        $doc.on(EVENTS.END, "[data-action=sendMsg]", function () {
            $(this).closest(".acts-list").hide();
            $(".panel-input").show();
        });

        $doc.on(EVENTS.END, "[data-action=bullet-switcher]", function () {
            var $this = $(this);
            if ($this.hasClass("on")) {
                $this.removeClass("on");
                videoBullet.clear();
                canBullet = false;
            } else {
                $this.addClass("on");
                videoBullet.start();
                canBullet = true;
            }
        });

        $doc.on(EVENTS.END, function (e) {
            var $target = $(e.target);
            if ($target.closest(".panel-input").length > 0 || $target.closest(".acts-list").length > 0) {
                return;
            }
            $(".panel-input").hide();
            $(".acts-list").show();
        });

        /*$(document).on(EVENTS.START, function() {
         $("#live-frame").get(0).contentWindow.postMessage("play", "*");
         });*/
    });
})(this.jQuery || this.Zepto, io);