class Scene4 extends egret.Sprite{

    private bg: egret.Bitmap;
    private book: egret.Bitmap;
    private text: egret.Bitmap;
    private head: egret.Bitmap;
    private price: egret.Bitmap;
    private sceneMask: egret.Rectangle;
    private buyBtn: egret.Bitmap;
    private buyBtnDisabled: egret.Bitmap;
    private sceneContainer: egret.Sprite;
    private priceSprite: egret.Sprite;
    private headerH: number = 100;
    private isSoldOut: boolean = window['is_disabled'] == undefined ? true : window['is_disabled'] == 0;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){

        this.sceneContainer = new egret.Sprite();
        this.sceneContainer.y = -Main.instance.stageH;

        this.bg = Utils.createBitmapByName("bg4_png");
        this.bg.y = -this.headerH;
        this.sceneContainer.addChild(this.bg);

        this.book = Utils.createBitmapByName('f_book_png');
        this.book.x = 618 - this.book.width/2;
        this.book.y = -20 - this.book.height/3 - this.headerH;
        this.book.alpha = 0;
        this.sceneContainer.addChild(this.book);

        this.text = Utils.createBitmapByName('f_text_png');
        this.text.x = 945 + this.text.width/3;
        this.text.y = 178 - this.text.height/2 - this.headerH;
        this.text.alpha = 0;
        this.sceneContainer.addChild(this.text);

        this.head = Utils.createBitmapByName('man_head_png');
        this.head.x = 937 - 140 + this.head.width/2;
        this.head.y = 320 + this.head.height/2 - this.headerH;
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

        this.priceSprite.x = 618 - this.priceSprite.width/2;
        this.priceSprite.y = 552 + this.priceSprite.height/2 - this.headerH;
        this.priceSprite.alpha = 0;

        this.sceneContainer.addChild(this.priceSprite);

        this.addChild(this.sceneContainer);

        this.initEvents();

    }

    private onOpenClick(e: egret.TouchEvent): void{
        window['href_fun'] && window['href_fun']();
    }

    private onBuyClick(e: egret.TouchEvent): void{
        window['btn_now_buy'] && window['btn_now_buy']();
    }

    private onBuyDisClick(e: egret.TouchEvent): void{
        window['btn_now_disabled'] && window['btn_now_disabled']();
    }

    public setAnimation(): void{
        egret.Tween.get(this.book).to({alpha: 1, x: 618, y: 35 - this.headerH}, 1000, egret.Ease.circOut);
        egret.Tween.get(this.text).wait(1000).to({alpha: 1, x: 945, y: 178 - this.headerH}, 1000, egret.Ease.circOut);
        egret.Tween.get(this.head).wait(2000).to({alpha: 1, x: 937 - 140, y: 320 - this.headerH}, 1000, egret.Ease.circOut);
        egret.Tween.get(this.priceSprite).wait(3000).to({alpha: 1, x: 618, y: 552 - this.headerH}, 1000, egret.Ease.circOut);
    }

    public setScroll(scrollTop: number):void{
        egret.Tween.removeTweens(this.sceneContainer);
        var y: number = Math.min(0, -Main.instance.stageH + (scrollTop - Main.instance.stageH*2));
        egret.Tween.get(this.sceneContainer).to({y: y}, 1200, egret.Ease.circOut);
    }

    private initEvents(): void{
        var self: any = this;
        var body: any = document.body;
        var canvas: any = document.querySelector('canvas');
        var bigMan: egret.Bitmap = Main.instance.bigMan;

        this.once('SCENE_ENTER_4', function(event: egret.Event){
            this.setAnimation();
        }, this);

        canvas.addEventListener('mousemove', function(e){
            var x: number = e.clientX;
            var y: number = e.clientY;
            var isEnd: boolean = window.pageYOffset/Main.instance.stageH > 2.8;

            var ratioX: number = parseFloat(canvas.style.width)/Main.instance.stageW;
            var ratioY: number = parseFloat(canvas.style.height)/Main.instance.stageH;
            var boundX: number = parseFloat(canvas.style.left)||0;
            var boundY: number = parseFloat(canvas.style.top)||0;

            var baseX: number = self.priceSprite.x;
            var baseY: number = self.priceSprite.y;
            var bx: number = (baseX + self.buyBtn.x)*ratioX + boundX;
            var by: number = (baseY + self.buyBtn.y)*ratioY + boundY + 130;
            var bw: number = self.buyBtn.width*ratioX;
            var bh: number = self.buyBtn.height*ratioY;

            var hx: number = self.head.x*ratioX + boundX;
            var hy: number = self.head.y*ratioY + boundY + 130;
            var hw: number = self.head.width*ratioX;
            var hh: number = self.head.height*ratioY;

            var nx: number = bigMan.x*ratioX + boundX - bigMan.width/2;
            var ny: number = bigMan.y*ratioY + boundY;
            var nw: number = bigMan.width*ratioX;
            var nh: number = bigMan.height*ratioY;

            if( ( isEnd && ( ( (x > bx && x < bw + bx) && (y > by && y < bh + by) ) || ( (x > hx && x < hw + hx) && (y > hy && y < hh + hy) ) ) ) || (x > nx && x < nw + nx) && (y > ny && y < nh + ny) ) {
                body.style.cursor = "pointer";
            } else {
                body.style.cursor = '';
            }

        }, false);

    }
}