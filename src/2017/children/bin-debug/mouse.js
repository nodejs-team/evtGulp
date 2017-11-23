var Mouse = (function (_super) {
    __extends(Mouse, _super);
    function Mouse() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Mouse,p=c.prototype;
    p.onAddToStage = function (event) {
        var mcData = this.mcData = RES.getRes("mouse_json");
        var mcTexture = this.mcTexture = RES.getRes("mouse_png");
        var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.mouse = new egret.MovieClip(mcDataFactory.generateMovieClipData("mouse"));
        this.addChild(this.mouse);
        this.initEvents();
    };
    p.setFrame = function (frameIndex) {
        this.mouse.gotoAndStop(frameIndex);
    };
    p.play = function () {
        this.mouse.frameRate = 20;
        this.mouse.gotoAndPlay(1, 1);
    };
    p.infinitePlay = function () {
        this.removeChild(this.mouse);
        this.mcData['mc']['mouse']['frames'] = this.mcData['mc']['mouse']['frames'].slice(28);
        var mcDataFactory = new egret.MovieClipDataFactory(this.mcData, this.mcTexture);
        this.mouse = new egret.MovieClip(mcDataFactory.generateMovieClipData("mouse"));
        this.addChild(this.mouse);
        this.mouse.gotoAndPlay(1, -1);
    };
    p.initEvents = function () {
        this.mouse.once(egret.Event.COMPLETE, function (e) {
            this.infinitePlay();
        }, this);
    };
    return Mouse;
}(egret.Sprite));
egret.registerClass(Mouse,'Mouse');
