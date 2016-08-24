var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scene4 = (function (_super) {
    __extends(Scene4, _super);
    function Scene4() {
        _super.call(this);
        this.headerH = 100;
        this.isSoldOut = window['is_disabled'] == undefined ? true : window['is_disabled'] == 0;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Scene4.prototype.onAddToStage = function (event) {
        this.sceneContainer = new egret.Sprite();
        this.sceneContainer.y = -Main.instance.stageH;
        this.bg = Utils.createBitmapByName("bg4_png");
        this.bg.y = -this.headerH;
        this.sceneContainer.addChild(this.bg);
        this.book = Utils.createBitmapByName('f_book_png');
        this.book.x = 618 - this.book.width / 2;
        this.book.y = -20 - this.book.height / 3 - this.headerH;
        this.book.alpha = 0;
        this.sceneContainer.addChild(this.book);
        this.text = Utils.createBitmapByName('f_text_png');
        this.text.x = 945 + this.text.width / 3;
        this.text.y = 178 - this.text.height / 2 - this.headerH;
        this.text.alpha = 0;
        this.sceneContainer.addChild(this.text);
        this.head = Utils.createBitmapByName('man_head_png');
        this.head.x = 937 - 140 + this.head.width / 2;
        this.head.y = 320 + this.head.height / 2 - this.headerH;
        this.head.alpha = 0;
        this.sceneContainer.addChild(this.head);
        this.head.touchEnabled = true;
        this.head.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenClick, this);
        this.priceSprite = new egret.Sprite();
        this.price = Utils.createBitmapByName('price_png');
        this.priceSprite.addChild(this.price);
        /*this.sceneMask = new egret.Rectangle(0, 0, Main.instance.stageW, Main.instance.stageH);
        this.mask = this.sceneMask;*/
        this.buyBtn = Utils.createBitmapByName('buy_btn_png');
        this.buyBtn.x = 5;
        this.buyBtn.y = this.price.height + 15;
        this.priceSprite.addChild(this.buyBtn);
        this.buyBtn.visible = !this.isSoldOut;
        this.buyBtn.touchEnabled = true;
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
        this.buyBtnDisabled = Utils.createBitmapByName('buy_btn_d_png');
        this.buyBtnDisabled.x = 5;
        this.buyBtnDisabled.y = this.price.height + 15;
        this.priceSprite.addChild(this.buyBtnDisabled);
        this.buyBtnDisabled.visible = this.isSoldOut;
        this.buyBtnDisabled.touchEnabled = true;
        this.buyBtnDisabled.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyDisClick, this);
        this.priceSprite.x = 618 - this.priceSprite.width / 2;
        this.priceSprite.y = 552 + this.priceSprite.height / 2 - this.headerH;
        this.priceSprite.alpha = 0;
        this.sceneContainer.addChild(this.priceSprite);
        this.addChild(this.sceneContainer);
        this.initEvents();
    };
    Scene4.prototype.onOpenClick = function (e) {
        window['href_fun'] && window['href_fun']();
    };
    Scene4.prototype.onBuyClick = function (e) {
        window['btn_now_buy'] && window['btn_now_buy']();
    };
    Scene4.prototype.onBuyDisClick = function (e) {
        window['btn_now_disabled'] && window['btn_now_disabled']();
    };
    Scene4.prototype.setAnimation = function () {
        egret.Tween.get(this.book).to({ alpha: 1, x: 618, y: 35 - this.headerH }, 1000, egret.Ease.circOut);
        egret.Tween.get(this.text).wait(1000).to({ alpha: 1, x: 945, y: 178 - this.headerH }, 1000, egret.Ease.circOut);
        egret.Tween.get(this.head).wait(2000).to({ alpha: 1, x: 937 - 140, y: 320 - this.headerH }, 1000, egret.Ease.circOut);
        egret.Tween.get(this.priceSprite).wait(3000).to({ alpha: 1, x: 618, y: 552 - this.headerH }, 1000, egret.Ease.circOut);
    };
    Scene4.prototype.setScroll = function (scrollTop) {
        egret.Tween.removeTweens(this.sceneContainer);
        var y = Math.min(0, -Main.instance.stageH + (scrollTop - Main.instance.stageH * 2));
        egret.Tween.get(this.sceneContainer).to({ y: y }, 1200, egret.Ease.circOut);
    };
    Scene4.prototype.initEvents = function () {
        var self = this;
        var body = document.body;
        var canvas = document.querySelector('canvas');
        var bigMan = Main.instance.bigMan;
        this.once('SCENE_ENTER_4', function (event) {
            this.setAnimation();
        }, this);
        canvas.addEventListener('mousemove', function (e) {
            var x = e.clientX;
            var y = e.clientY;
            var isEnd = window.pageYOffset / Main.instance.stageH > 2.8;
            var ratioX = parseFloat(canvas.style.width) / Main.instance.stageW;
            var ratioY = parseFloat(canvas.style.height) / Main.instance.stageH;
            var boundX = parseFloat(canvas.style.left) || 0;
            var boundY = parseFloat(canvas.style.top) || 0;
            var baseX = self.priceSprite.x;
            var baseY = self.priceSprite.y;
            var bx = (baseX + self.buyBtn.x) * ratioX + boundX;
            var by = (baseY + self.buyBtn.y) * ratioY + boundY + 130;
            var bw = self.buyBtn.width * ratioX;
            var bh = self.buyBtn.height * ratioY;
            var hx = self.head.x * ratioX + boundX;
            var hy = self.head.y * ratioY + boundY + 130;
            var hw = self.head.width * ratioX;
            var hh = self.head.height * ratioY;
            var nx = bigMan.x * ratioX + boundX - bigMan.width / 2;
            var ny = bigMan.y * ratioY + boundY;
            var nw = bigMan.width * ratioX;
            var nh = bigMan.height * ratioY;
            if ((isEnd && (((x > bx && x < bw + bx) && (y > by && y < bh + by)) || ((x > hx && x < hw + hx) && (y > hy && y < hh + hy)))) || (x > nx && x < nw + nx) && (y > ny && y < nh + ny)) {
                body.style.cursor = "pointer";
            }
            else {
                body.style.cursor = '';
            }
        }, false);
    };
    return Scene4;
})(egret.Sprite);
//# sourceMappingURL=scene4.js.map