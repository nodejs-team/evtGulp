function insertUser(openId, nickname, headimgurl, parentId) {
    var indexHtmlUrl = null;
    var userId = null;
    $.ajax({
        type: "post",
        url: getServerUrl() + "/beautyBox/insertUser",
        async: false,
        data: {openId: openId, nickname: nickname, headimgurl: headimgurl, parentId: parentId},
        success: function (response) {
            var data = eval(response);
            if (data.success) {
                indexHtmlUrl = data.data.inHtml;
                userId = data.data.userId;
                setUserId(userId);
                getUserInfo(userId, parentId);
            } else {
                console.log(data.message);
            }
        }
    });
    //window.location.href = indexHtmlUrl + "?userId=" + userId;
}


function getUserInfo(userId, parentId) {
    $.ajax({
        url: getServerUrl() + "/beautyBox/getById",
        data: {
            userId: userId
        },
        success: function (res) {
            res = eval(res);
            if (res.success) {
                if (!parentId || (parentId && userId === parentId)) {
                    if (res.data.beautyBoxItem) {
                        var state = res.data.beautyBoxItem.state;
                        if (state == 1) {
                            location.href = "box_bibi.html";
                        } else if (state == 2) {
                            location.href = "box_comments.html" + ( parentId ? "?parentId=" + parentId : "" ); //"box_bibiResult.html";
                        }
                    } else {
                        location.href = "trueindex.html";
                    }
                } else {
                    location.href = "box_comments.html";
                }
            } else {
                alert("getById error:" + res.message);
            }
        }
    });
}