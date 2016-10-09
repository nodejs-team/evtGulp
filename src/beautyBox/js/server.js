/**
 * 获取服务端url前缀
 */
function getServerUrl() {
    return "http://mbbh5.geemedia.com.cn/wechat/controller"
}

/**
 * 用户长按二维码关注按钮,不用处理返回值,可异步调用
 * @param {Object} userId
 */
function subscrib(userId) {
    $.ajax({
        type: "post",
        url: getServerUrl() + "/beautyBox/subscrib",
        async: true,
        data: {userId: userId},
        success: function (response) {
            var data = eval(response);
            console.log(data);
        }
    });
}

/**
 * 根据用户id获取游戏数据,同步调用
 * @param {Object} userId
 */
function getById(userId) {
    var defer = $.Deferred();
    $.ajax({
        type: "get",
        url: getServerUrl() + "/beautyBox/getById",
        async: false,
        data: {userId: userId},
        success: function (response) {
            var data = eval(response);
            if (data.success) {
                if (data.data.beautyBoxItem != null) {
                    //data.data.beautyBoxItem为游戏主数据
                    //data.data.user为用户信息
                    //data.data.impress被选中的评论信息
                    //详情参见接口文档
                    defer.resolve(data.data);
                } else {
                    //alert("您还未参与游戏");
                    location.href = "index.html";
                }
            } else {
                defer.reject(data.message);
                alert("getById error:" + data.message);
            }
        }
    });

    return defer.promise();
}

/**
 * 用户参与游戏,保存数据
 * @param {Object} userId用户id
 * @param {Object} box选择盒子的标志位
 * @param {Object} words填写的内容
 */
function save(userId, box, words) {
    var defer = $.Deferred();
    $.ajax({
        type: "post",
        url: getServerUrl() + "/beautyBox/save",
        data: {userId: userId, box: box, words: words},
        success: function (response) {
            var data = eval(response);
            if (data.success) {
                //data.data.beautyBoxItem为游戏主数据
                //data.data.user为用户信息
                //data.data.impress被选中的评论信息
                //详情参见接口文档
                defer.resolve(data.data);
            } else {
                defer.reject(data.message);
                alert("save error:" + data.Message);
            }
        }
    });

    return defer.promise();
}

/**
 * 评论好友
 * @param {Object} myId 评论人id
 * @param {Object} firendId 被评论人id
 * @param {Object} impress 评论内容
 */
function impress(myId, firendId, impress) {
    var defer = $.Deferred();
    $.ajax({
        type: "post",
        url: getServerUrl() + "/beautyBox/impress",
        data: {
            myId: myId,
            firendId: firendId,
            impress: impress
        },
        success: function (response) {
            var data = eval(response);
            if (data.success) {
                defer.resolve(data);
                $boxCommentInput.hide();
                $commentBtn.hide();
                $(".box-dia-friend2, .game-comment-tags").hide();
                $boxComment.show();
                $playBtn.show();
                $buyBtn.show();
                $boxFriend3.show();
            } else {
                defer.reject(data.message);
                alert("impress error:" + data.message);
            }
        }
    });

    return defer.promise();
}

/**
 * 获取指定用户收到的所有评论
 * @param {Object} userId 用户id
 * @param {Object} start 分页开始行 不分页传入null
 * @param {Object} limit 单页显示行数 不分页传入null
 */
function getImpresses(userId, showBtn) {
    $.ajax({
        type: "post",
        url: getServerUrl() + "/beautyBox/impresses",
        data: {
            userId: userId
        },
        success: function (response) {
            var res = eval(response), commentsList = "";
            if (res.success) {
                //方法说明:该方法支持分页, start默认为0, limit默认为10000, 如果前端需要分页,请传入对应数字即可.
                //返回值说明:data.totalCount表示记录总条数,data.startRow表示起始条数,data.data为获取到的评论数组,
                //其中data.data.id需要前端保存,用于选择评论的时候回传.myId表示评论人的id,
                //mynickname表示评论人的昵称,firendId表示被评论人的id, firendNickname表示被评论人的昵称,impress为评论内容
                var result = res.data;
                if (result.totalCount == 0) {
                    $("#commentList").html("<p class='empty-impresses'>暂无评论</p>");
                    try {
                        $completeBtn.hide();
                    } catch (e) {
                    }
                    $callBtn.show();
                    return;
                }
                result.data.forEach(function (impress) {
                    commentsList += "<li data-impressId=" + impress.id + "><i><img src=\"" + impress.myHeadimgurl + "\" /></i><em>" + impress.mynickname + "</em><b>：</b><span>" + impress.impress + "</span>" + (showBtn ? "<button class='cmt-btn'></button>" : "") + "</li>";
                });

                $("#commentList").addClass(showBtn ? "has-btn" : "").html(commentsList);

            } else {
                alert("impresses error:" + res.message);
            }
        }
    });
}

/**
 * 选择好友评论
 * @param {Object} userId 当前用户id
 * @param {Object} impressId 评论id
 */
function chooseImpress(userId, impressId) {
    var defer = $.Deferred();
    var impressIds = "";
    impressId.forEach(function (id) {
        impressIds += "&impressId=" + id;
    });
    var params = "userId=" + userId + impressIds;
    $.ajax({
        type: "post",
        url: getServerUrl() + "/beautyBox/chooseImpress",
        async: false,
        data: params,
        success: function (response) {
            var data = eval(response);
            if (data.success) {
                defer.resolve(data);
            } else {
                defer.reject(data.message);
                alert("chooseImpress error:" + data.message);
            }
        }
    });

    return defer.promise();
}

/**
 * 分享回调函数
 * @param {Object} userId 用户id
 * @param {Object} type 1为分享给好友, 2分享到朋友圈
 */
function share(userId, type) {
    var projectId = "533e1dfb-ef36-47b7-9bed-6fd0a0cb6828";
    var defer = $.Deferred();
    $.ajax({
        type: "post",
        url: getServerUrl() + "/project/share",
        data: {projectId: projectId, userId: userId, type: type},
        success: function (response) {
            var data = eval(response);
            if (data.success) {
                defer.resolve(data);
                console.log("分享回调成功");
            } else {
                defer.reject(data.message);
                console.log("分享回调失败");
            }
        },
        error: function (xhr, status, err) {
            defer.reject(err);
        }
    });

    return defer.promise();
}

