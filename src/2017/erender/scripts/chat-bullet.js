
$(function () {

    $("#bullet-form").on("submit", function (e) {
        e.preventDefault();

        var $input = $("#input_content");
        var msg = $input.val();
        if ($.trim(msg) == "")
            return alert("输入内容不能空");

        videoBullet.addData({
            color: "#f90",
            text: msg
        });

        $input.val("").focus();
    });

    var $doc = $(document);

    $doc.on("click", "[data-action=sendMsg]", function () {
        $(this).closest(".acts-list").hide();
        $(".panel-input").show();
    });

    $doc.on("click", "[data-action=bullet-switcher]", function () {
        var $this = $(this);
        if ($this.hasClass("on")) {
            $this.removeClass("on");
            videoBullet.clear();
        } else {
            $this.addClass("on");
            videoBullet.start();
        }
    });

    $doc.on("click", function (e) {
        var $target = $(e.target);
        if ($target.closest(".panel-input").length > 0 || $target.closest(".acts-list").length > 0) {
            return;
        }
        $(".panel-input").hide();
        $(".acts-list").show();
    });
});