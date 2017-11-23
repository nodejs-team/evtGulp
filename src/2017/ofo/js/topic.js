(function(){

    $(function(){
        var player = videojs('topic_player',{}, function() {
            var self = this;
            var _isPlay = false;

           /* this.play(); 加载播放*/
            this.on('ended', function() {});

            $("#vjs-ctrl").hover(function(){
                $(this).addClass('video-trigger-hover');
            }, function(){
                $(this).removeClass('video-trigger-hover');
            }).on("click",'b', function(){

                _isPlay = !_isPlay;
                if( _isPlay ){
                    self.play();
                    $(this).addClass('video-pause');
                } else {
                    self.pause();
                    $(this).removeClass('video-pause');
                }
            });



              if(document.all){
                  $(".video-trigger b").hide();
                $(".video").on("click", function(){
                  _isPlay = !_isPlay;
                  if( _isPlay ){
                    self.play();
                    $(this).addClass('video-pause');
                  } else {
                    self.pause();
                    $(this).removeClass('video-pause');
                  }
                });
              }

            var ua = navigator.userAgent;
            if(ua.indexOf("MSIE 8.0")>0 || (ua.indexOf("MSIE 9.0")>0 && !window.innerWidth)){
               //$(".video").addClass("ie8");
            }


        });



    });

})();