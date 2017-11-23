var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Snow = (function (_super) {
    __extends(Snow, _super);
    function Snow(type) {
        _super.call(this);
        this.type = type;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Snow.prototype.onAddToStage = function (event) {
        this.snow = Utils.createBitmapByName('snow' + this.type);
        this.width = this.snow.width;
        this.height = this.snow.height;
        this.addChild(this.snow);
    };
    return Snow;
})(egret.Sprite);
//# sourceMappingURL=snow.js.map