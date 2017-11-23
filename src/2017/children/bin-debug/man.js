var Man = (function (_super) {
    __extends(Man, _super);
    function Man() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Man,p=c.prototype;
    p.onAddToStage = function (event) {
        var mcData = this.mcData = RES.getRes("man_json");
        var mcTexture = this.mcTexture = RES.getRes("man_png");
        var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.man = new egret.MovieClip(mcDataFactory.generateMovieClipData("man"));
        this.addChild(this.man);
        this.initEvents();
    };
    p.setFrame = function (frameIndex) {
        this.man.gotoAndStop(frameIndex);
    };
    p.play = function () {
        this.man.frameRate = 20;
        this.man.gotoAndPlay(1, 1);
    };
    p.infinitePlay = function () {
        this.removeChild(this.man);
        this.mcData['mc']['man']['frames'] = this.mcData['mc']['man']['frames'].slice(25);
        var mcDataFactory = new egret.MovieClipDataFactory(this.mcData, this.mcTexture);
        this.man = new egret.MovieClip(mcDataFactory.generateMovieClipData("man"));
        this.addChild(this.man);
        this.man.gotoAndPlay(1, -1);
    };
    p.initEvents = function () {
        this.man.once(egret.Event.COMPLETE, function (e) {
            this.infinitePlay();
        }, this);
    };
    return Man;
}(egret.Sprite));
egret.registerClass(Man,'Man');
