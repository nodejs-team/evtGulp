(function(b) {
    var e = function() {
        return function() {};
    }();
    b.GameUtil = e;
    e.prototype.__class__ = "utils.GameUtil";
    b.hitTest = function(b, a) {
        var c = b.getBounds(), e = a.getBounds();
        c.x = b.x;
        c.y = b.y;
        e.x = a.x;
        e.y = a.y;
        return c.intersects(e);
    };
    b.createBitmapByName = function(b) {
        var a = new egret.Bitmap();
        b = RES.getRes(b);
        a.texture = b;
        return a;
    };
    b.createSpriteByName = function(b) {
        var a = new egret.Bitmap();
        b = RES.getRes(b);
        a.texture = b;
        b = new egret.Sprite();
        b.addChild(a);
        return b;
    };
    b.createSoundByName = function(b) {
        return RES.getRes(b);
    };
    b.createRectangular = function(b, a, c, e, q, l) {
        void 0 === b && (b = 0);
        void 0 === a && (a = 0);
        void 0 === c && (c = 480);
        void 0 === e && (e = 640);
        void 0 === q && (q = 1);
        void 0 === l && (l = 0);
        var f = new egret.Sprite();
        f.graphics.beginFill(l, q);
        f.graphics.drawRect(b, a, c, e);
        f.graphics.endFill();
        f.width = c;
        f.height = e;
        return f;
    };
    b.createCircle = function(b, a, c, e, q) {
        void 0 === b && (b = 0);
        void 0 === a && (a = 0);
        void 0 === c && (c = 10);
        void 0 === e && (e = 1);
        void 0 === q && (q = 16777215);
        var l = new egret.Sprite();
        l.graphics.beginFill(q, e);
        l.graphics.drawCircle(b, a, c);
        l.graphics.endFill();
        return l;
    };
    b.createTextLabel = function(b, a, c, e, q, l, f, g, h, n, m, p) {
        void 0 === a && (a = 0);
        void 0 === c && (c = "left");
        void 0 === e && (e = "none");
        void 0 === q && (q = 14);
        void 0 === l && (l = 0);
        void 0 === f && (f = 0);
        void 0 === g && (g = 0);
        void 0 === h && (h = 0);
        void 0 === n && (n = 0);
        void 0 === m && (m = 0);
        void 0 === p && (p = 0);
        b = new egret.TextField();
        b.textColor = a;
        b.textAlign = c;
        b.text = e;
        b.size = q;
		b.fontFamily = "Microsoft Yahei";
        0 != l && (b.width = l);
        0 != f && 0 != g && (b.strokeColor = f, b.stroke = g);
        b.rotation = m;
        0 != p && (b.skewX = p);
        b.x = h;
        b.y = n;
        return b;
    };
    b.hitTestSquare = function(b, a) {
        new egret.Point(b.x, b.y);
        new egret.Point(a.x, a.y);
    };
    b.randomInt = function(b, a) {
        if (0 >= a - b) return 0;
        var c = a - b;
        return Math.floor(Math.random() * c) + b;
    };
    b.createBitmap = function(b, a, c, e) {
        void 0 === c && (c = 0);
        void 0 === e && (e = 0);
        var q = new egret.Bitmap();
        q.texture = b.getTexture(a);
        q.x = c;
        q.y = e;
        return q;
    };
    b.isWeiXin = function() {
        return "MicroMessenger" == navigator.userAgent.toString().match(/MicroMessenger/i) ? !0 : !1;
    };
})(window.utils || (window.utils = {}));

var __extends = this.__extends || function(b, e) {
    function d() {
        this.constructor = b;
    }
    for (var a in e) e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d();
},
myElement = function(b) {
    function e(d) {
        b.call(this);
        this.id = "";
        this.destory = !1;
        this.id = d;
        var a = new egret.Sprite();
        "box1" == d ? a = utils.createSpriteByName("h_box1_png") : "box2" == d ? a = utils.createSpriteByName("h_box2_png") : "box3" == d ? a = utils.createSpriteByName("h_box3_png") : "box4" == d ? a = utils.createSpriteByName("h_box4_png") : "box5" == d ? a = utils.createSpriteByName("h_box5_png") : "box6" == d && (a = utils.createSpriteByName("h_box6_png"));
        this.addChild(a);
    }
    __extends(e, b);
    return e;
}(egret.Sprite),

Settings = function() {
    function b() {}
    b.StageWidth = 640 ;
    b.StageHeight = 1010;
    b.frameTime = 60;
    b.score = 0;
	b.awardScore = __globalCfg.awardScore;
	b.timer = __globalCfg.timer;
    return b;
}(),

__extends = this.__extends || function(b, e) {
    function d() {
        this.constructor = b;
    }
    for (var a in e) e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d();
},

SpriteControl = function(b) {
    function e() {
        b.call(this);
    }
    __extends(e, b);
    e.loadingInit = function() {
        e.GameBg = utils.createBitmapByName("bg_jpg");
        e.loadingBool = !0;
    };
    e.playInit = function() {
        e.ray = utils.createBitmapByName("gam_bg_ray_png");
        e.top_flag = utils.createBitmapByName("game_top_png");
        e.startButton = utils.createBitmapByName("start_button_png");
        e.leaveButton = utils.createBitmapByName("leave_button_png");
        e.restartButton = utils.createBitmapByName("restart_button_png");
        e.playBool = !0;
    };
    e.loadingBool = !1;
    e.playBool = !1;
    return e;
}(egret.Sprite),

__extends = this.__extends || function(b, e) {
    function d() {
        this.constructor = b;
    }
    for (var a in e) e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d();
},

FloatTxt = function(b) {
    function e() {
        b.call(this);
        this.winTxtArr = [];
        this.myTxt = utils.createTextLabel(this.myTxt, 14506853, "center", "MISS", 36, 480, 16777215, 3);
        this.myTxt.anchorX = .5;
        this.myTxt.anchorY = .5;
        this.winTxtArr[0] = "干得漂亮";
        this.winTxtArr[1] = "就是这样";
        this.winTxtArr[2] = "高手";
        this.winTxtArr[3] = "加油";
        this.winTxtArr[4] = "连击";
        this.addChild(this.myTxt);
        this.myTxt.alpha = 0;
        this.myTxt.y = 120 + this.myTxt.height / 2;
        this.myTxt.x = Settings.StageWidth / 2;
    }
    __extends(e, b);
    e.prototype.add = function(b, a) {
        void 0 === a && (a = 0);
        egret.Tween.removeTweens(this.myTxt);
        this.myTxt.scaleX = this.myTxt.scaleY = 1;
        this.myTxt.alpha = 1;
        switch (b) {
          case "win":
            var c = Math.floor(Math.random() * this.winTxtArr.length);
            this.myTxt.text = this.winTxtArr[c] + "+" + a.toString();
            this.myTxt.textColor = 832471;
            break;

          case "lose":
            this.myTxt.text = "MISS!";
            this.myTxt.textColor = 14506853;
        }
        egret.Tween.get(this.myTxt).wait(300).to({
            scaleX: 2,
            scaleY: 2,
            alpha: 0
        }, 100);
    };
    return e;
}(egret.Sprite),

__extends = this.__extends || function(b, e) {
    function d() {
        this.constructor = b;
    }
    for (var a in e) e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d();
},

MyBox = function(b) {
    function e() {
        b.call(this);
        this.boxArray = [];
    }
    __extends(e, b);
    e.prototype.boxinit = function() {
        for (var b = 1; 7 > b; b++) {
            var a = utils.createSpriteByName("box" + b.toString() + "_png");
            a.name = "box" + b.toString();
            this.addChild(a);
            this.boxArray.push(a);
        }
        this.boxArray[0].x = Settings.StageWidth - this.boxArray[0].width;
        this.boxArray[0].y = 716;
        this.boxArray[1].x = Settings.StageWidth - this.boxArray[1].width;
        this.boxArray[1].y = 472;
        this.boxArray[2].x = Settings.StageWidth - this.boxArray[2].width;
        this.boxArray[2].y = 217;
        this.boxArray[3].y = 716;
        this.boxArray[4].y = 472;
        this.boxArray[5].y = 217;

        this.boxFlg = utils.createSpriteByName("success_flg_png");
        this.boxFlg.visible = false;
        this.boxFlg.anchorX = .5;
        this.boxFlg.anchorY = .5;
        this.addChild(this.boxFlg);
    };
    e.prototype.destory = function(b) {
        var a = Number(String(b.id).substr(3, 1)) - 1;
        var c = this.boxArray[a];
        var d = utils.hitTest(b, c);
        b.destory = !0;
        b.visible = !1;
        if( d ) {
            this.showFlag(c);
        }
        return d;
    };
    e.prototype.showFlag = function(b){
        this.boxFlg.visible = true;
        egret.Tween.removeTweens(this.boxFlg);
        this.boxFlg.scaleX = this.boxFlg.scaleY = 1;
        this.boxFlg.alpha = 1;
        this.boxFlg.x = b.x > Settings.StageWidth/2 ? b.x + b.width/2 : b.x + b.width/2;
        this.boxFlg.y = b.y + b.height/2;
        egret.Tween.get(this.boxFlg).wait(500).to({
            scaleX: 2,
            scaleY: 2,
            alpha: 0
        }, 100).call(function(){
            this.boxFlg.visible = false;
        }, this);

    };
    return e;
}(egret.Sprite),

__extends = this.__extends || function(b, e) {
    function d() {
        this.constructor = b;
    }
    for (var a in e) e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d();
},

BitMapText = function(b) {
    function e() {
        b.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    __extends(e, b);
    e.prototype.onAddToStage = function(){

    };
    e.prototype.setText = function(text) {
        if( text == null || text == undefined ) return;

        var self = this;
        var lastNumBitMap;

        this._children = [];
        text.split("").forEach(function(num){
            var numBitMap;
            if( num == ":" ){
                numBitMap = utils.createBitmapByName("--_png");
            } else {
                numBitMap = utils.createBitmapByName("g"+num+"_png");
            }
            if( lastNumBitMap ){
                numBitMap.x = lastNumBitMap.x + lastNumBitMap.width + 3;
            }
            self.addChild(numBitMap);
            lastNumBitMap = numBitMap;
        });
    };
    return e;
}(egret.Sprite),

Score_Time_Plan = function(b) {
    function e() {
        b.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    __extends(e, b);
    e.prototype.onAddToStage = function(){

        this.scoreTxt = new BitMapText();
        this.timeTxt = new BitMapText();

        this.scoreTxt.x = 75;
        this.scoreTxt._x = this.scoreTxt.x;
        this.scoreTxt.rotation = -10;
        this.timeTxt.x = 495;
        this.timeTxt.rotation = 10;
        this.timeTxt.setText(Settings.timer.toString());

        this.addChild(this.scoreTxt);
        this.addChild(this.timeTxt);
    };
    e.prototype.setTime = function(b) {
        this.timeTxt.setText(b.toString());
    };
    e.prototype.setScore = function(b) {
        Settings.score += b;
        this.scoreTxt.x = this.scoreTxt._x -21 * (Settings.score.toString().length - 1);
        this.scoreTxt.setText(Settings.score.toString());
    };
    return e;
}(egret.Sprite),

__extends = this.__extends || function(b, e) {
    function d() {
        this.constructor = b;
    }
    for (var a in e) e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d();
},

VIEW_Over = function(b) {
    function e() {
        b.call(this);
        this.hotGameLoaded = !1;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    __extends(e, b);
    e.prototype.onAddToStage = function(){
        this.addChild(SpriteControl.leaveButton);
        SpriteControl.leaveButton.y = 253;
        SpriteControl.leaveButton.x = Settings.StageWidth/2 - SpriteControl.leaveButton.width/2;
        this.addChild(SpriteControl.restartButton);
        SpriteControl.restartButton.y = 533;
        SpriteControl.restartButton.x = Settings.StageWidth/2 - SpriteControl.restartButton.width/2;
        SpriteControl.leaveButton.touchEnabled = true;
        SpriteControl.restartButton.touchEnabled = true;
        SpriteControl.leaveButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
            alert("have a rest");
        }, this);
        SpriteControl.restartButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
            this.parent.removeChild(this);
            Game.MainInstance.rStart();
        }, this);
    };
    e.prototype.setScore = function() {
        //this.ScoreTxt.text = "您的成绩：" + Settings.score.toString() + "分";
		gameResult(Settings.score);
    };
    return e;
}(egret.Sprite),

__extends = this.__extends || function(b, e) {
    function d() {
        this.constructor = b;
    }
    for (var a in e) e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d();
},

Game = function(b) {
    function e() {
        b.call(this);
        this.ScoreTimePlan = new Score_Time_Plan();
        this.Box = new MyBox();
        this.GameTimeNum = Settings.timer;
        this.GameTime = new egret.Timer(1e3);
        this.EnterFrameTime = new egret.Timer(1e3 / Settings.frameTime);
        this.runTimeNum = 2e3;
        this.runTime = new egret.Timer(this.runTimeNum);
        this.ElementArr = [];
        this.speed = 2;
        this.eTarget = null;
        this.floatTxt = new FloatTxt();
        this.combo = 0;
        this.miss = !1;
        Game.MainInstance = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    __extends(e, b);
    e.prototype.onAddToStage = function(b) {
        this.layer_bg = new egret.Sprite();
        this.layer_center = new egret.Sprite();
        this.layer_top = new egret.Sprite();
        this.addChild(this.layer_bg);
        this.addChild(this.layer_center);
        this.addChild(this.layer_top);
    };
    e.prototype.readyStart = function(){
        this.layer_bg.addChild(SpriteControl.GameBg);
        this.layer_bg.addChild(SpriteControl.startButton);
        SpriteControl.startButton.x = (Settings.StageWidth - SpriteControl.startButton.width)/2 + 20;
        SpriteControl.startButton.y = (Settings.StageHeight - SpriteControl.startButton.height)/2 + 10;
        SpriteControl.startButton.touchEnabled = true;
        SpriteControl.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
            this.start();
            this.layer_bg.removeChild(SpriteControl.startButton);
        }, this);
    };
    e.prototype.start = function() {
        this.layer_top.addChild(SpriteControl.top_flag);
        this.layer_top.addChild(this.floatTxt);
		
        this.layer_top.addChild(this.ScoreTimePlan);
        this.ScoreTimePlan.y = 100;

        this.Box.boxinit();
        this.layer_bg.addChild(SpriteControl.ray);
        this.layer_bg.addChild(this.Box);

        this.GameTime.addEventListener(egret.TimerEvent.TIMER, this.onGameTime, this);
        this.EnterFrameTime.addEventListener(egret.TimerEvent.TIMER, this.onEnterFrameTime, this);
        this.runTime.addEventListener(egret.TimerEvent.TIMER, this.onRunTime, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.myElementTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.myElementTouchEnd, this);
        this.bgSound = utils.createSoundByName("bgSound_mp3");
        //this.over_view = new VIEW_Over();
		
		this.play();
    };
    e.prototype.rStart = function(b) {
		this.play();	
    };
    e.prototype.helpTap = function(b) {
        this.removeChild(SpriteControl.help_view);
        SpriteControl.help_view.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.helpTap, this);
        this.play();
    };
    e.prototype.play = function() {
        this.GameTimeNum = Settings.timer;
        this.runTime.delay = 2e3;
        this.speed = 2;
		this.combo = 0;
        Settings.score = 0;
        this.ScoreTimePlan.setScore(0);
        this.GameTime.start();
        this.EnterFrameTime.start();
        this.runTime.start();
        this.miss = !1;
        this.bgSound.play(-1);
        console.log("<--游戏开始-->");
    };
    e.prototype.over = function() {
        console.log("<--游戏结束-->");
        this.GameTime.stop();
        this.EnterFrameTime.stop();
        this.runTime.stop();
        this.destory();
        this.bgSound.pause();
        /*if( Settings.score >= Settings.awardScore ){
            showGameResult(Settings.score);
        } else {
            this.addChild(this.over_view);
            this.over_view.setScore();
        }*/
        showGameResult(Settings.score);
    };
    e.prototype.destory = function() {
        for (var b = this.ElementArr.length - 1; 0 <= b; b--) this.layer_center.removeChild(this.ElementArr[b]), 
        this.ElementArr[b] = null, this.ElementArr.splice(b, 1);
        this.eTarget = null;
    };
    e.prototype.onGameTime = function(b) {
        0 >= this.GameTimeNum ? this.over() : (this.GameTimeNum -= 1, this.ScoreTimePlan.setTime(this.GameTimeNum), 
        this.runTime.delay -= 40, this.speed += .15);
    };
    e.prototype.onEnterFrameTime = function(b) {
        if (!(0 >= this.ElementArr.length)) for (b = 0; b < this.ElementArr.length; b++) this.ElementArr[b].destory ? (this.layer_center.removeChild(this.ElementArr[b]), 
        this.ElementArr.splice(b, 1)) : Settings.StageHeight > this.ElementArr[b].y && this.eTarget != this.ElementArr[b] ? this.ElementArr[b].y += this.speed : this.eTarget != this.ElementArr[b] && Settings.StageHeight <= this.ElementArr[b].y && (this.layer_center.removeChild(this.ElementArr[b]),
        this.ElementArr.splice(b, 1), this.floatTxt.add("lose"), this.miss = !0, this.combo = 0);
    };
    e.prototype.onRunTime = function(b) {
        b = "box" + (Math.floor(6 * Math.random()) + 1).toString();
        b = new myElement(b);
        b.x = (Settings.StageWidth - b.width)/2 + 5;
        b.y = 0;
        this.layer_center.addChild(b);
        b.touchEnabled = !0;
        b.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.myElementTouchDown, this);
        this.ElementArr.push(b);
    };
    e.prototype.myElementTouchDown = function(b) {
        null == this.eTarget && (this.eTarget = b.target);
    };
    e.prototype.myElementTouchEnd = function(b) {
        null != this.eTarget && (b = this.Box.destory(this.eTarget), this.check(b));
        console.log("touch_end");
        this.eTarget = null;
    };
    e.prototype.check = function(b) {
        b ? (this.combo += 1, b = 2 * this.combo + 1, this.ScoreTimePlan.setScore(b), this.floatTxt.add("win", b),
        this.miss = !1) : (this.floatTxt.add("lose"), this.miss = !0, this.combo = 0);
    };
    e.prototype.myElementTouchMove = function(b) {
        null != this.eTarget && (/*console.log("touchMove_" + Math.floor(65535 * Math.random())), */
        this.eTarget.x = b.stageX - this.eTarget.width / 2, this.eTarget.y = b.stageY - this.eTarget.height / 2);
    };
    return e;
}(egret.DisplayObjectContainer),

__extends = this.__extends || function(b, e) {
    function d() {
        this.constructor = b;
    }
    for (var a in e) e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d();
},

UILoading = function(b) {
    function e() {
        b.call(this);
    }
    __extends(e, b);
    e.prototype.loading = function(b, a, c) {console.log(b);
        void 0 === a && (a = 0);
        void 0 === c && (c = 0);
        "start" == b ? (

		this.addChild(SpriteControl.GameBg),
        this.loadingtxt = utils.createTextLabel(this.loadingtxt, 0xffffff, "center", "LOADING... 0%", 32, 0, "",2),
        this.addChild(this.loadingtxt),
        this.loadingtxt.y = Settings.StageHeight/2 - this.loadingtxt.height/2,
        this.loadingtxt.x = (Settings.StageWidth-this.loadingtxt.width)/2) : "end" == b ? (

        this.removeChild(SpriteControl.GameBg)
		
		) : "set" == b && (
		
		//this.loadingtxt.text = "正在加载资源：" + a.toString() + "/" + c.toString()
		//SpriteControl.GameLoadingBar.width = a/c*320,
		//SpriteControl.GameLoadingTxtBG.x = a/c*320 + 30,
		//this.loadingtxt.x = a/c*320 + 50,
		this.loadingtxt.text = "LOADING... " + parseInt(a/c*100).toString() + "%"
		);
    };
    return e;
}(egret.Sprite),

__extends = this.__extends || function(b, e) {
    function d() {
        this.constructor = b;
    }
    for (var a in e) e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d();
},

UIControl = function(b) {
    function e() {
        b.call(this);
        this.GameLoading = new UILoading();
        this.Game = new Game();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    __extends(e, b);
    e.prototype.onAddToStage = function(b) {
        this.addChild(this.GameLoading);
    };
    e.prototype.GameStart = function() {
        SpriteControl.loadingBool && (this.GameLoading.loading("end"),
        this.addChild(this.Game), this.Game.readyStart())
    };
	e.prototype.showRule = function() {
		if( typeof showRule == "undefined" ) return;
		showRule();
	}
    return e;
}(egret.DisplayObjectContainer),

__extends = this.__extends || function(b, e) {
    function d() {
        this.constructor = b;
    }
    for (var a in e) e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d();
},

Main = function(b) {
    function e() {
        b.call(this);
        this.GameUI = new UIControl();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    __extends(e, b);
    e.prototype.onAddToStage = function(b) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    e.prototype.onConfigComplete = function(b) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload", 1);
        RES.loadGroup("loading", 2);
    };
    e.prototype.onResourceLoadComplete = function(b) {
        "preload" == b.groupName && (RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), 
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this), 
        //this.GameUI.GameLoading.loadingtxt.text = "点击开始游戏", 
		this.GameUI.GameLoading.removeChild(this.GameUI.GameLoading.loadingtxt),
		SpriteControl.playInit(),
        this.GameUI.GameStart()
		);
        "loading" == b.groupName && (SpriteControl.loadingInit(), this.addChild(this.GameUI), 
        this.GameUI.GameLoading.loading("start"));
    };
    e.prototype.onResourceProgress = function(b) {
        "preload" == b.groupName && SpriteControl.loadingBool && this.GameUI.GameLoading.loading("set", b.itemsLoaded, b.itemsTotal);
    };
    return e;
}(egret.DisplayObjectContainer);