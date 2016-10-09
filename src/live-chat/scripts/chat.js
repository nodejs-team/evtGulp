(function($, io, undefined){
  var socket;
  var from = {};
  var userPool = {};
  var to = {name:'所有人', uid:'all'};//设置默认接收对象为"所有人"
  var COOKIE_NAME = "socket.user";
  var EVENTS = 'ontouchstart' in document ? {
    START: "touchstart",
    MOVE: "touchmove",
    END: "touchend"
  }:{
    START: "mousedown",
    MOVE: "mousemove",
    END: "mouseup"
  };

  var tpl = {
    say: '<div class="message-item"><div class="msg-hd" style="color:#{color}">#{title}</div><div class="msg-bd">#{msg}</div></div>',
    sys: '<div class="message-item"><div class="msg-hd" style="color:#{color}">#{msg}</div></div>',
    item: '<a href="javascript:;" data-user="#{user}" title="点击与他私聊" class="list-group-item#{className}">#{name}</a>'
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

  function htmlFormat(str, o, regexp) {
      if (typeof str != 'string' || !o) {
        return str;
      }
      return str.replace(regexp || /\\?#\{([^{}]+)\}/igm, function (match, name) {
        if (match.charAt(0) === '\\') {
          return match.slice(1);
        }
        return (o[name] === undefined) ? '' : o[name];
      });
  }

  var Methods = {
    appendMsg: function(msg){
      var $content = $("#contents");
      var $parent = $content.parent();
      $content.append(msg);
      $parent.get(0).scrollTop = $content.height() - $parent.height();
    },
    sendMsg: function(msg){
      if( msg == "" || msg == undefined ) return;

      if (to.uid == "all") {
        this.appendMsg(htmlFormat(tpl.say, {color: "#06c", title: '你对 所有人 说：'+ now(), msg: msg}));
      } else {
        this.appendMsg(htmlFormat(tpl.say, {color: "#f90", title: '你对 ' + to.name + ' 说：'+ now(), msg: msg}));
      }

      socket.emit('say', {from: from, to: to, msg: msg});

    },
    online: function( data ){
      var sys;
      if (data.user.uid != from.uid) {
        sys = htmlFormat(tpl.sys, {color: "#f00", msg: '系统' + now() + ':' + '用户 ' + data.user.name + ' 上线了！'});
      } else {
        sys = htmlFormat(tpl.sys, {color: "#f00", msg: '系统' + now() + ': 你进入了聊天室！'});
      }

      this.appendMsg(sys);
      //刷新用户在线列表
      this.flushUsers(data.users);
      //显示正在对谁说话
      this.showSayTo();
    },
    offline: function(data){
      var sys = htmlFormat(tpl.sys, {color: "#f00", msg: '系统' + now() + ': ' + '用户 ' + data.user.name + ' 下线了！'});
      this.appendMsg(sys);

      //刷新用户在线列表
      this.flushUsers(data.users);

      //如果正对某人聊天，该人却下线了
      if (data.user.uid == to.uid) {
        to = {name:"所有人", uid:"all"};
      }

      //显示正在对谁说话
      this.showSayTo();
    },
    refuse: function(data){
      $.cookie(COOKIE_NAME, null);
      $("#loginModal").modal("show");
      alert("你输入的用户名已经存在，请重新输入！");
    },
    disconnect:function(){
      var sys = htmlFormat(tpl.sys, {color: "#f00", msg: '系统:连接服务器失败！'});
      this.appendMsg(sys);
      $("#list").empty();
    },
    reconnect: function(){
      var sys = htmlFormat(tpl.sys, {color: "#f00", msg: '系统:重新连接服务器！'});
      this.appendMsg(sys);
      Methods.joinUser();
    },
    //刷新用户在线列表
    flushUsers: function (users) {
      var self = this;
      var $list = $("#list");

      userPool = users;

      $list.empty().append(htmlFormat(tpl.item, {user: "all|所有人", name: "所有人", className: " active"}));
      //遍历生成用户在线列表
      for (var i in users) {
        $list.append(htmlFormat(tpl.item, {user: users[i].uid + "|" + users[i].name, name: users[i].name + ( users[i].uid == from.uid ? "<em class='mark'>(你自己)</em>" : "" ), className: ""}));
      }
      //点击对某人聊天
      $list.find(">a").on(EVENTS.END, function() {
        var $this = $(this);
        var user = $this.attr('data-user').split("|");
        var uid = user[0];
        var name = user[1];

        if( uid == to.uid ) return;

        if (uid != from.uid) {
          to = {name: name, uid: uid};
          $this.addClass('active').siblings().removeClass('active');
          //刷新正在对谁说话
          self.showSayTo();
          //隐藏用户列表面板
          Methods.hideUserPanel();
        } else {
            alert("不能与自己私聊");
        }
      });
    },
    checkUser: function( user ){
       if( userPool.hasOwnProperty(user.uid) ){
          return false;
       }
       return true;
    },
    say: function(data){
      //对所有人说
      if (data.to.uid == 'all') {
        this.appendMsg(htmlFormat(tpl.say, {color: "#06c", title: data.from.name + '对 所有人 说：'+ now(), msg:  data.msg}));
      }
      //对你密语
      else if (data.to.uid == from.uid) {
        this.appendMsg(htmlFormat(tpl.say, {color: "#f90", title: data.from.name + '对 你 说：'+ now(), msg:  data.msg}));
      }
    },
    joinUser: function(){
      socket.emit('online', {user: from});
    },
    //显示正在对谁说话
    showSayTo: function () {
      $("#chat-from").html(from.name);
      $("#chat-to").html(to.name);
    },
    doLogin: function(){
      //从 cookie 中读取用户名，存于变量 from
      from = $.cookie(COOKIE_NAME);

      if( from == "" || from == null || from == undefined ){
          $("#loginModal").modal("show");
          $("#loginForm").on("submit", function(e){
              e.preventDefault();
              var username = $.trim($("#login-name").val());
              if( username == "" ){
                  return alert("请输入一个昵称");
              }
              else {
                  from = {name: username, uid: genUID()};
                  $.cookie(COOKIE_NAME, JSON.stringify(from), {expires: 1});
                  $("#loginModal").modal("hide");
                  Methods.createServer();
              }
          });
      } else {
          from = JSON.parse(from);
          Methods.createServer();
      }

    },
    showUserPanel: function(){
      var self = this;
      var sidebar = $("#J-sidebar");
      var backdrop = $("#sidebar-backdrop");

      backdrop.addClass("fade").css("display", "block").one(EVENTS.START, function(e){
          e.preventDefault();
          self.hideUserPanel();
      });
      sidebar.addClass("slide").css("display", "block").width();
      sidebar.add(backdrop).addClass("in");
      sidebar.one(EVENTS.END, "[data-action=dismiss]", function(){
         self.hideUserPanel();
      });
    },
    hideUserPanel: function(){
      var backdrop = $("#sidebar-backdrop").removeClass("in");
      $("#J-sidebar").removeClass("in").on("webkitTransitionEnd transitionend", function(){
          $(this).removeClass("slide").css("display", "").off("webkitTransitionEnd transitionend");
          backdrop.removeClass("fade").css("display", "");
      });
    },
    createServer: function(){
      socket = io.connect("http://" + location.hostname + ":4000");

      socket.on('connect', function(){
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
      socket.on('disconnect', function() {
        Methods.disconnect();
      });

      //重新启动服务器
      socket.on('reconnect', function() {
        Methods.reconnect();
      });

    }
  };


$(function() {

  Methods.doLogin();

  $("#J-user-group").on(EVENTS.END, function(){
     Methods.showUserPanel();
  });

  //发话
  $("#send-button").on(EVENTS.END, function() {
    var $input = $("#input_content");
    var msg = $input.html();
    if($.trim(msg.replace(/<[^>]+>/g, "")) == "") return alert("输入内容不能空");

    Methods.sendMsg(msg);
    $input.html("").focus();

  });

});

})(this.jQuery || this.Zepto, io);
