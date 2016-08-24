var Snow = (function (_super) {
    __extends(Snow, _super);
    function Snow(type) {
        _super.call(this);
        this.type = type;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Snow,p=c.prototype;
    p.onAddToStage = function (event) {
        this.snow = Utils.createBitmapByName('snow' + this.type);
        this.width = this.snow.width;
        this.height = this.snow.height;
        this.addChild(this.snow);
    };
    return Snow;
}(egret.Sprite));
egret.registerClass(Snow,'Snow');
