var Skating = (function (_super) {
    __extends(Skating, _super);
    function Skating() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Skating,p=c.prototype;
    p.onAddToStage = function (event) {
        var mcData = this.mcData = RES.getRes("skating_json");
        var mcTexture = this.mcTexture = RES.getRes("skating_png");
        var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.skating = new egret.MovieClip(mcDataFactory.generateMovieClipData("skating"));
        this.addChild(this.skating);
        this.initEvents();
    };
    p.setFrame = function (frameIndex) {
        this.skating.gotoAndStop(frameIndex);
    };
    p.play = function () {
        this.skating.frameRate = 20;
        this.skating.gotoAndPlay(1, 1);
    };
    p.infinitePlay = function () {
        this.removeChild(this.skating);
        this.mcData['mc']['skating']['frames'] = this.mcData['mc']['skating']['frames'].slice(20);
        var mcDataFactory = new egret.MovieClipDataFactory(this.mcData, this.mcTexture);
        this.skating = new egret.MovieClip(mcDataFactory.generateMovieClipData("skating"));
        this.addChild(this.skating);
        this.skating.gotoAndPlay(1, -1);
    };
    p.initEvents = function () {
        this.skating.once(egret.Event.COMPLETE, function (e) {
            this.infinitePlay();
        }, this);
    };
    return Skating;
}(egret.Sprite));
egret.registerClass(Skating,'Skating');
