/**
 * Created by mcake on 2016/5/24.
 */
;(function($){
    var createPlayer = function(){
        var player = videojs('topic_player',
            {
                flash: {swf: "http://edm.mcake.com/shuxy/2016/luc/js/video-js.swf"},
                sources: [{src: "http://edm.mcake.com/shuxy/2016/luc/images/video/luc-brief.mp4", type: "video/mp4"}]
            },
            function() {
                setLayout();
                this.play();
                this.on('ended', function() {
                    $("#video-player").hide();
                    $("#luc-elMain").show();
                    resetLayout();
                });
            });

        return player;
    };

    var supportVideo = (function(video){
        return "play" in video;
    })(document.createElement("video"));

    var _height = 743;

    var setLayout = function(){
        if( !supportVideo ) return;
        $("#luc-mainWrap").css({position: "absolute"});
        $("#video-player").css("position", "static");
        setTimeout(function(){
            $("#luc-banner").height("auto");
        }, 200);
    };

    var resetLayout = function(){
        if( !supportVideo ) return;
        $("#luc-banner").height(_height);
        $("#luc-mainWrap").css({position: "static"});
        $("#video-player").css("position", "");
    };

    var setSize = function(){
        var $main = $("#luc-banner");
        $main.height(_height = Math.max(480, $main.width()/1920*750));
    };

    $(function(){
        setTimeout(function(){
            $("#luc-elMain").hide();
            createPlayer();
        }, 3000);

        if( supportVideo ) {
            setSize();
        } else {
            $("#luc-banner").addClass("lte-banner");
        }
    });

})(jQuery);