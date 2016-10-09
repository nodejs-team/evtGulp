
/**
 * Module dependencies.
 */


var app = require('http').createServer();
var io = require('socket.io').listen(app);
var port = 4000;

var users = {};//存储在线用户列表的对象
var userWS = {};//存储在线用户socket对象

io.sockets.on('connection', function (socket) {

  //有人上线
  socket.on('online', function (data) {

    if( !data || typeof data.user !== 'object' ){
        socket.disconnect();
        return;
    }
     //将上线的用户名存储为 socket 对象的属性，以区分每个 socket 对象，方便后面使用
     socket.user = data.user;
    //users 对象中不存在该用户名则插入该用户名
    if (!users[data.user.uid]) {
      users[data.user.uid] = data.user;
      userWS[data.user.uid] = socket;
    }/* else {
      socket.emit("refuse", {users: users, user: data.user});
      socket.disconnect();
      return;
    }*/
    //向所有用户广播该用户上线信息
    io.sockets.emit('online', {users: users, user: data.user});

  });

  //有人发话
  socket.on('say', function (data) {

    if( !data || typeof data.to !== 'object'){
       return;
    }

    if (data.to.uid == 'all') {
      //向其他所有用户广播该用户发话信息
      socket.broadcast.emit('say', data);
    } else {
      //向特定用户发送该用户发话信息
      //clients 为存储所有连接对象的数组
      /*var clients = io.sockets.clients();
      //遍历找到该用户
      clients.forEach(function (client) {
        if (client.user.uid == data.to.uid) {
          //触发该用户客户端的 say 事件
          client.emit('say', data);
        }
      });*/

      if( userWS[data.to.uid] ) {
          userWS[data.to.uid].emit('say', data);
      }

    }
  });

  //有人下线
  socket.on('disconnect', function() {

    if( typeof socket.user !== 'object' ) return;

    //若 users 对象中保存了该用户名
    if (users[socket.user.uid]) {
        //从 users 对象中删除该用户名
        delete users[socket.user.uid];
        //从 userWS 对象中删除该用户socket对象
        delete userWS[socket.user.uid];
        //向其他所有用户广播该用户下线信息
        socket.broadcast.emit('offline', {users: users, user: socket.user});
    }
  });

});

app.listen(port, function(){
    console.log('io server listening on port ' + port);
});
