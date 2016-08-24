var House = (function (_super) {
    __extends(House, _super);
    function House() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=House,p=c.prototype;
    p.onAddToStage = function (event) {
        var mcData = RES.getRes("house_json");
        var mcTexture = RES.getRes("house_png");
        var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.house = new egret.MovieClip(mcDataFactory.generateMovieClipData("house"));
        this.addChild(this.house);
    };
    p.setFrame = function (frameIndex) {
        this.house.gotoAndStop(frameIndex);
    };
    p.play = function () {
        this.house.frameRate = 20;
        this.house.gotoAndPlay(1, -1);
    };
    return House;
}(egret.Sprite));
egret.registerClass(House,'House');
