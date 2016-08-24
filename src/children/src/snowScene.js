var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SnowScene = (function (_super) {
    __extends(SnowScene, _super);
    function SnowScene(x, y) {
        _super.call(this);
        this.stageW = Main.instance.stageW;
        this.stageH = Main.instance.stageH;
        this.snowStack = new Array();
        this.snowX = x;
        this.snowY = y;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    SnowScene.prototype.onAddToStage = function (event) {
        this.scrollHolder = Main.instance.scene1.book.height / 2;
        for (var i = 1; i < 13; i++) {
            this.createSnow(i);
        }
    };
    SnowScene.prototype.createSnow = function (type) {
        var snow = new Snow(type);
        snow.scaleX = snow.scaleY = 0.4;
        snow.alpha = 0;
        snow['typeIndex'] = type;
        snow['randOffsetX'] = this.rand(0, 500);
        this.addChild(snow);
        snow.anchorOffsetX = snow.width / 2;
        snow.anchorOffsetY = snow.height / 2;
        snow.x = this.snowX - snow.width / 2;
        snow.y = this.snowY - snow.height / 2;
        this.snowStack.push(snow);
    };
    SnowScene.prototype.doAnimate = function (snow, scrollTop) {
        var ratio = scrollTop / this.stageH / 4;
        var isLeft = snow['typeIndex'] < 7 ? true : false;
        var offsetX = snow['typeIndex'] * this.stageW / 15;
        var extRatio = Math.min(scrollTop / this.scrollHolder, 1);
        var extRatio2 = scrollTop / this.stageH * 60;
        var yRatio = 0.05;
        if (scrollTop > this.stageH * 2) {
            yRatio = 0.12;
        }
        if (scrollTop > this.stageH * 2.5) {
            yRatio = 0.26;
        }
        egret.Tween.removeTweens(snow);
        egret.Tween.get(snow).to({
            alpha: extRatio,
            scaleX: extRatio,
            scaleY: extRatio,
            rotation: extRatio2,
            y: this.snowY - scrollTop * yRatio + snow['randOffsetX'],
            x: this.snowX - 250 + (isLeft ? -1 : 1) * Math.sin(ratio * 5) * offsetX
        }, 600, egret.Ease.circOut);
    };
    SnowScene.prototype.setAnimates = function (scrollTop) {
        for (var i = 0; i < this.snowStack.length; i++) {
            this.doAnimate(this.snowStack[i], scrollTop);
        }
    };
    SnowScene.prototype.rand = function (min, max) {
        return min + Math.random() * (max - min);
    };
    return SnowScene;
})(egret.Sprite);
//# sourceMappingURL=snowScene.js.map