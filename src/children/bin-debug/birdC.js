var BirdC = (function (_super) {
    __extends(BirdC, _super);
    function BirdC() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=BirdC,p=c.prototype;
    p.onAddToStage = function (event) {
        var mcData = RES.getRes("bird_c_json");
        var mcTexture = RES.getRes("bird_c_png");
        var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.bird_c = new egret.MovieClip(mcDataFactory.generateMovieClipData("bird_c"));
        this.addChild(this.bird_c);
    };
    p.setFrame = function (frameIndex) {
        this.bird_c.gotoAndStop(frameIndex);
    };
    p.play = function () {
        this.bird_c.frameRate = 20;
        this.bird_c.gotoAndPlay(1, -1);
    };
    return BirdC;
}(egret.Sprite));
egret.registerClass(BirdC,'BirdC');
