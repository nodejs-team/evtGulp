/**
 * Created by mcake on 2016/8/25.
 */
;(function(window, undefined){
    var cvpHandlers = {
        canvasClickHandler: null,
        videoTimeUpdateHandler: null,
        videoCanPlayHandler: null,
        windowResizeHandler: null
    };

    var CanvasVideoPlayer = function (options, fn) {
        var i;

        this.options = {
            framesPerSecond: 25,
            hideVideo: true,
            autoplay: false,
            audio: false,
            timelineSelector: false,
            endFn: fn
        };

        for (i in options) {
            this.options[i] = options[i];
        }

        this.video = document.querySelectorAll(this.options.videoSelector)[0];
        this.canvas = document.querySelectorAll(this.options.canvasSelector)[0];
        this.timeline = document.querySelectorAll(this.options.timelineSelector)[0];
        this.timelinePassed = document.querySelectorAll(this.options.timelineSelector + '> div')[0];

        if (!this.options.videoSelector || !this.video) {
            console.error('No "videoSelector" property, or the element is not found');
            return;
        }

        if (!this.options.canvasSelector || !this.canvas) {
            console.error('No "canvasSelector" property, or the element is not found');
            return;
        }

        if (this.options.timelineSelector && !this.timeline) {
            console.error('Element for the "timelineSelector" selector not found');
            return;
        }

        if (this.options.timelineSelector && !this.timelinePassed) {
            console.error('Element for the "timelinePassed" not found');
            return;
        }

        if (this.options.audio) {
            if (typeof(this.options.audio) === 'string') {
                this.audio = document.querySelectorAll(this.options.audio)[0];

                if (!this.audio) {
                    console.error('Element for the "audio" not found');
                    return;
                }
            } else {
                this.audio = document.createElement('audio');
                this.audio.innerHTML = this.video.innerHTML;
                this.video.parentNode.insertBefore(this.audio, this.video);
                this.audio.load();
            }

            var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
            if (iOS) {
                this.options.autoplay = false;
            }
        }

        this.ctx = this.canvas.getContext('2d');

        this.playing = false;

        this.resizeTimeoutReference = false;
        this.RESIZE_TIMEOUT = 1000;

        this.init();
        this.bind();
    };

    CanvasVideoPlayer.prototype.init = function () {
        this.video.load();

        this.setCanvasSize();

        if (this.options.hideVideo) {
            this.video.style.display = 'none';
        }
    };

    CanvasVideoPlayer.prototype.getOffset = function (elem) {
        var docElem, rect, doc;

        if (!elem) {
            return;
        }

        rect = elem.getBoundingClientRect();

        if (rect.width || rect.height || elem.getClientRects().length) {
            doc = elem.ownerDocument;
            docElem = doc.documentElement;

            return {
                top: rect.top + window.pageYOffset - docElem.clientTop,
                left: rect.left + window.pageXOffset - docElem.clientLeft
            };
        }
    };

    CanvasVideoPlayer.prototype.jumpTo = function (percentage) {
        this.video.currentTime = this.video.duration * percentage;

        if (this.options.audio) {
            this.audio.currentTime = this.audio.duration * percentage;
        }
    };

    CanvasVideoPlayer.prototype.bind = function () {
        var self = this;

        this.video.addEventListener('timeupdate', cvpHandlers.videoTimeUpdateHandler = function () {console.log(1);
            self.drawFrame();
            if (self.options.timelineSelector) {
                self.updateTimeline();
            }
        });

        this.video.addEventListener('canplaythrough', cvpHandlers.videoCanPlayHandler = function () {
            self.drawFrame();
        });

        if (self.options.autoplay) {
            self.play();
        }

        if (self.options.timelineSelector) {
            this.timeline.addEventListener('click',
                function (e) {
                    var offset = e.clientX - self.getOffset(self.canvas).left;
                    var percentage = offset / self.timeline.offsetWidth;
                    self.jumpTo(percentage);
                });
        }

        this.unbind = function () {
            this.canvas.removeEventListener('click', cvpHandlers.canvasClickHandler);
            this.video.removeEventListener('timeupdate', cvpHandlers.videoTimeUpdateHandler);
            this.video.removeEventListener('canplay', cvpHandlers.videoCanPlayHandler);
            window.removeEventListener('resize', cvpHandlers.windowResizeHandler);

            if (this.options.audio) {
                this.audio.parentNode.removeChild(this.audio);
            }
        };
    };

    CanvasVideoPlayer.prototype.updateTimeline = function () {
        var percentage = (this.video.currentTime * 100 / this.video.duration).toFixed(2);
        this.timelinePassed.style.width = percentage + '%';
    };

    CanvasVideoPlayer.prototype.setCanvasSize = function () {
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;

        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);
    };

    CanvasVideoPlayer.prototype.play = function () {
        this.lastTime = Date.now();
        this.playing = true;
        this.loop();

        if (this.options.audio) {
            // Resync audio and video
            this.audio.currentTime = this.video.currentTime;
            this.audio.play();
        }
    };

    CanvasVideoPlayer.prototype.pause = function () {
        this.playing = false;

        if (this.options.audio) {
            this.audio.pause();
        }
    };

    CanvasVideoPlayer.prototype.playPause = function () {
        if (this.playing) {
            this.pause();
        } else {
            // this.play();
        }
    };

    CanvasVideoPlayer.prototype.loop = function () {
        var self = this;

        var time = Date.now();
        var elapsed = (time - this.lastTime) / 1000;

        // Render
        if (elapsed >= (1 / this.options.framesPerSecond)) {
            this.video.currentTime = this.video.currentTime + elapsed;
            this.lastTime = time;
            // Resync audio and video if they drift more than 300ms apart
            if (this.audio && Math.abs(this.audio.currentTime - this.video.currentTime) > .3) {
                this.audio.currentTime = this.video.currentTime;
            }
        }

        // If we are at the end of the video stop
        if (this.video.currentTime >= this.video.duration) {
            this.playing = false;
            // 监听iPhone浏览器视频结束事件
            console.log('视频播放结束（iPhone）');
            this.options.endFn()
        }
        if (this.playing) {
            this.animationFrame = requestAnimationFrame(function () {
                self.loop();
            });
        } else {
            cancelAnimationFrame(this.animationFrame);
        }
    };

    CanvasVideoPlayer.prototype.drawFrame = function () {
        this.ctx.drawImage(this.video, 0, 0, this.width, this.height);
    };

    window.CanvasVideoPlayer = CanvasVideoPlayer;

    /*var canvasVideo = new CanvasVideoPlayer({
        videoSelector: '#live_video',
        canvasSelector: '#live_canvas',
        hideVideo: true,
        audio: true,
        autoplay: true,
        endFn: function () {

        }
    });*/

})(this);