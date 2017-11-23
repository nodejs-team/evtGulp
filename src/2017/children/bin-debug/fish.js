var Fish = (function (_super) {
    __extends(Fish, _super);
    function Fish() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Fish,p=c.prototype;
    p.onAddToStage = function (event) {
        var mcData = RES.getRes("fish_json");
        var mcTexture = RES.getRes("fish_png");
        var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.fish = new egret.MovieClip(mcDataFactory.generateMovieClipData("fish"));
        this.addChild(this.fish);
    };
    p.setFrame = function (frameIndex) {
        this.fish.gotoAndStop(frameIndex);
    };
    p.play = function () {
        this.fish.frameRate = 20;
        this.fish.gotoAndPlay(1, -1);
    };
    return Fish;
}(egret.Sprite));
egret.registerClass(Fish,'Fish');
