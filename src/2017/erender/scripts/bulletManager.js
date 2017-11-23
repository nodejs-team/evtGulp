(function ($, window, undefined) {
    var Bullet = EC.Sprite.extend({
        initialize: function (data, startY) {
            Bullet.superclass.initialize.call(this);
            this.bulletText = data.text;
            this.bulletColor = data.color;
            this.startY = startY;

            this.on("addToStage", this.onAddToStage, this);
        },
        onAddToStage: function () {
            this.x = VideoBullet.mainInstance.stageW;
            this.y = this.startY;
            this.triggered = false;
            this.setText(this.bulletText);
            this.endX = -this.width * 2;
            this.shootTo();
        },
        shootTo: function () {
            EC.Tween.get(this).to({x: this.endX}, 5000).onUpdate(function (bulletObj) {
                if (!this.triggered) {
                    if (bulletObj.x < VideoBullet.mainInstance.stageW - this.width * 1.2) {
                        this.dispatch("born");
                        this.triggered = true;
                    }
                }
            }, this).call(function () {
                this.dispatch("dead");
            }, this);
        },
        setText: function (text) {
            if (text == "" || text == null) return;
            var bulletText = new EC.TextField(text, 18, 0, 0, this.bulletColor);
            this.addChild(bulletText);
        }
    });

    function random(min, max) {
        return min + Math.floor(Math.random() * (max - min));
    }

    var VideoBullet = function (canvas, options) {

        this.options = EC.extend({
            trajectoryNum: 5,    //弹道数量
            trajectoryHeight: 60, //弹道高度
            initTop: 60
        }, options || {});

        this.canvas = document.getElementById('canvas-bullets');
        this.stage = new EC.Stage(this.canvas);

        this.stageW = this.stage.width;
        this.stageH = this.stage.height;

        this.subtitles = [];
        var strs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < 100; i++) {
            this.subtitles[this.subtitles.length] = {
                color: "#fff",
                text: "~~~text" + strs.substr(0, random(1, 30)) + i + "~~~"
            };
        }

        VideoBullet.mainInstance = this;

        this.start();
    };

    EC.extend(VideoBullet.prototype, {
        start: function () {
            for (var i = 0; i < this.options.trajectoryNum; i++) {
                this.shootBullet(this.subtitles.shift(), i);
            }
        },
        shootBullet: function (data, trajectoryIndex) {
            if (!data) return;

            var bullet = new Bullet(data, this.options.initTop + trajectoryIndex * this.options.trajectoryHeight);
            bullet.trajectoryIndex = trajectoryIndex;
            this.stage.addChild(bullet);

            bullet.on('born', function () {
                this.shootBullet(this.subtitles.shift(), trajectoryIndex);
            }, this);

            bullet.on('dead', function () {
                this.stage.removeChild(bullet);
            }, this);
        },
        addData: function (data, isPush) {
            if (data == null || data == "" || data == undefined) return;
            if (isPush) {
                this.subtitles.push(data);
            } else {
                this.subtitles.unshift(data);
            }
            if (this.subtitles.length == 1) {
                this.shootBullet(this.subtitles.shift(), random(0, this.options.trajectoryNum));
            }
        },
        clear: function () {
            this.stage.clearChildren();
            //this.subtitles = [];
        }
    });

    $(function () {
        window.videoBullet = new VideoBullet();
    });

})(this.jQuery || this.Zepto, this);
