var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Skating = (function (_super) {
    __extends(Skating, _super);
    function Skating() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Skating.prototype.onAddToStage = function (event) {
        var mcData = this.mcData = RES.getRes("skating_json");
        var mcTexture = this.mcTexture = RES.getRes("skating_png");
        var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.skating = new egret.MovieClip(mcDataFactory.generateMovieClipData("skating"));
        this.addChild(this.skating);
        this.initEvents();
    };
    Skating.prototype.setFrame = function (frameIndex) {
        this.skating.gotoAndStop(frameIndex);
    };
    Skating.prototype.play = function () {
        this.skating.frameRate = 20;
        this.skating.gotoAndPlay(1, 1);
    };
    Skating.prototype.infinitePlay = function () {
        this.removeChild(this.skating);
        this.mcData['mc']['skating']['frames'] = this.mcData['mc']['skating']['frames'].slice(20);
        var mcDataFactory = new egret.MovieClipDataFactory(this.mcData, this.mcTexture);
        this.skating = new egret.MovieClip(mcDataFactory.generateMovieClipData("skating"));
        this.addChild(this.skating);
        this.skating.gotoAndPlay(1, -1);
    };
    Skating.prototype.initEvents = function () {
        this.skating.once(egret.Event.COMPLETE, function (e) {
            this.infinitePlay();
        }, this);
    };
    return Skating;
})(egret.Sprite);
//# sourceMappingURL=Skating.js.map