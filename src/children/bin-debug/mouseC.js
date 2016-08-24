var MouseC = (function (_super) {
    __extends(MouseC, _super);
    function MouseC() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=MouseC,p=c.prototype;
    p.onAddToStage = function (event) {
        var mcData = RES.getRes("mouse_c_json");
        var mcTexture = RES.getRes("mouse_c_png");
        var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.mouse_c = new egret.MovieClip(mcDataFactory.generateMovieClipData("mouse_c"));
        this.addChild(this.mouse_c);
    };
    p.setFrame = function (frameIndex) {
        this.mouse_c.gotoAndStop(frameIndex);
    };
    p.play = function () {
        this.mouse_c.frameRate = 20;
        this.mouse_c.gotoAndPlay(1, -1);
    };
    return MouseC;
}(egret.Sprite));
egret.registerClass(MouseC,'MouseC');
