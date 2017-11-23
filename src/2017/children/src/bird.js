var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Bird.prototype.onAddToStage = function (event) {
        var mcData = this.mcData = RES.getRes("bird_json");
        var mcTexture = this.mcTexture = RES.getRes("bird_png");
        var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.bird = new egret.MovieClip(mcDataFactory.generateMovieClipData("bird"));
        this.addChild(this.bird);
        this.initEvents();
    };
    Bird.prototype.setFrame = function (frameIndex) {
        this.bird.gotoAndStop(frameIndex);
    };
    Bird.prototype.play = function () {
        this.bird.frameRate = 20;
        this.bird.gotoAndPlay(1, 1);
    };
    Bird.prototype.infinitePlay = function () {
        this.removeChild(this.bird);
        this.mcData['mc']['bird']['frames'] = this.mcData['mc']['bird']['frames'].slice(35);
        var mcDataFactory = new egret.MovieClipDataFactory(this.mcData, this.mcTexture);
        this.bird = new egret.MovieClip(mcDataFactory.generateMovieClipData("bird"));
        this.addChild(this.bird);
        this.bird.gotoAndPlay(1, -1);
    };
    Bird.prototype.initEvents = function () {
        this.bird.once(egret.Event.COMPLETE, function (e) {
            this.infinitePlay();
        }, this);
    };
    return Bird;
})(egret.Sprite);
//# sourceMappingURL=bird.js.map