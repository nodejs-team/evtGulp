var Utils = (function () {
    function Utils() {
    }
    Utils.hitTest = function (a, b) {
        var c = a.getBounds();
        var e = b.getBounds();
        c.x = a.x;
        c.y = a.y;
        e.x = b.x;
        e.y = b.y;
        //return !(c.x > e.x + (b.width*b.scaleX-1) || c.x + (a.width*a.scaleX-1) < e.x || c.y > e.y + (b.height*b.scaleY-1) || c.y + (a.height*a.scaleY-1) < e.y);
        return !(c.x > e.x + (b.width * 0.3 - 1) || c.x + (a.width * 0.3 - 1) < e.x || c.y > e.y + (b.height * 0.3 - 1) || c.y + (a.height * 0.3 - 1) < e.y);
    };
    Utils.randomRange = function (minNum, maxNum) {
        return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
    };
    Utils.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /*public static hitTest(a:egret.Sprite, b:egret.Sprite): boolean {
        var c: egret.Rectangle = a.getBounds();
        var e: egret.Rectangle = b.getBounds();
        c.x = a.x;
        c.y = a.y;
        e.x = b.x;
        e.y = b.y;

        return c.intersects(e);
    }*/
    Utils.createTextField = function (txt, x, y, color, size, anchor, align, middleX, middleY) {
        if (anchor === void 0) { anchor = false; }
        if (align === void 0) { align = "center"; }
        if (middleX === void 0) { middleX = false; }
        if (middleY === void 0) { middleY = false; }
        var txtLabel = new egret.TextField();
        txtLabel.x = x;
        txtLabel.y = y;
        txtLabel.textColor = color;
        txtLabel.textAlign = align;
        txtLabel.text = txt;
        txtLabel.size = size;
        if (anchor) {
            txtLabel.anchorOffsetX = txtLabel.width / 2;
            txtLabel.anchorOffsetY = txtLabel.height / 2;
        }
        if (middleX) {
            txtLabel.x = (egret.MainContext.instance.stage.stageWidth - txtLabel.width) / 2;
        }
        if (middleY) {
            txtLabel.y = (egret.MainContext.instance.stage.stageHeight - txtLabel.height) / 2;
        }
        return txtLabel;
    };
    Utils.createMask = function (color, alpha, w, h) {
        if (color === void 0) { color = 0x000000; }
        if (alpha === void 0) { alpha = 0.8; }
        if (w === void 0) { w = egret.MainContext.instance.stage.stageWidth; }
        if (h === void 0) { h = egret.MainContext.instance.stage.stageHeight; }
        var mask = new egret.Shape();
        mask.graphics.beginFill(color, alpha);
        mask.graphics.drawRect(0, 0, w, h);
        mask.graphics.endFill();
        mask.width = w;
        mask.height = h;
        return mask;
    };
    Utils.setStorage = function (key, value) {
        try {
            localStorage.setItem(key, value);
        }
        catch (e) {
        }
    };
    Utils.getStorage = function (key) {
        try {
            return localStorage.getItem(key);
        }
        catch (e) {
            return null;
        }
    };
    Utils.getStageW = function () {
        var w = egret.MainContext.instance.stage.stageWidth;
        return w;
    };
    Utils.getStageH = function () {
        var h = egret.MainContext.instance.stage.stageHeight;
        return h;
    };
    return Utils;
})();
//# sourceMappingURL=Utils.js.map