var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var House = (function (_super) {
    __extends(House, _super);
    function House() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    House.prototype.onAddToStage = function (event) {
        var mcData = RES.getRes("house_json");
        var mcTexture = RES.getRes("house_png");
        var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.house = new egret.MovieClip(mcDataFactory.generateMovieClipData("house"));
        this.addChild(this.house);
    };
    House.prototype.setFrame = function (frameIndex) {
        this.house.gotoAndStop(frameIndex);
    };
    House.prototype.play = function () {
        this.house.frameRate = 20;
        this.house.gotoAndPlay(1, -1);
    };
    return House;
})(egret.Sprite);
//# sourceMappingURL=house.js.map