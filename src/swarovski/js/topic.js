(function(){

    $(function(){
        var player = videojs('topic_player',{}, function() {
            var self = this;
            var _isPlay = true;

            this.play();
            this.on('ended', function() {});

            $("#vjs-ctrl").hover(function(){
                $(this).addClass('video-trigger-hover');
            }, function(){
                $(this).removeClass('video-trigger-hover');
            }).on("click", "b", function(){
                _isPlay = !_isPlay;
                if( _isPlay ){
                    self.play();
                    $(this).addClass('video-pause');
                } else {
                    self.pause();
                    $(this).removeClass('video-pause');
                }
            }).find('b').addClass('video-pause');
        });

        var dc = document.documentElement,
            db = document.body,
            target = $('.diamond-select'),
            clientH = dc.clientHeight || db.clientHeight,
            targetTop = target.offset().top,
            scrollTop;

        var getScrollTop = function(){
            return window.pageYOffset || dc.scrollTop || db.scrollTop;
        };

        var initScrollTop = getScrollTop();

        $(window).on('scroll', function(){
            scrollTop = getScrollTop();
            if( scrollTop + clientH > targetTop + initScrollTop ){
                target.addClass('flake');
                $(this).off('scroll', arguments.callee);
            }
        });

    });

})();