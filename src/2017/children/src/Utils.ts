class Utils {

    public constructor() {

    }

    public static hitTest(a:egret.Sprite, b:egret.Sprite):boolean {
        var c: egret.Rectangle = a.getBounds();
        var e: egret.Rectangle = b.getBounds();
        c.x = a.x;
        c.y = a.y;
        e.x = b.x;
        e.y = b.y;

        //return !(c.x > e.x + (b.width*b.scaleX-1) || c.x + (a.width*a.scaleX-1) < e.x || c.y > e.y + (b.height*b.scaleY-1) || c.y + (a.height*a.scaleY-1) < e.y);
        return !(c.x > e.x + (b.width*0.3-1) || c.x + (a.width*0.3-1) < e.x || c.y > e.y + (b.height*0.3-1) || c.y + (a.height*0.3-1) < e.y);
    }

    public static randomRange(minNum:number, maxNum:number):number {
        return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
    }

    public static createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /*public static hitTest(a:egret.Sprite, b:egret.Sprite): boolean {
        var c: egret.Rectangle = a.getBounds();
        var e: egret.Rectangle = b.getBounds();
        c.x = a.x;
        c.y = a.y;
        e.x = b.x;
        e.y = b.y;

        return c.intersects(e);
    }*/

    static createTextField(txt: string, x: number, y: number, color: number, size: number, anchor: boolean = false, align: string = "center", middleX: boolean = false, middleY: boolean = false): egret.TextField {
        var txtLabel:egret.TextField = new egret.TextField();
        txtLabel.x = x;
        txtLabel.y = y;
        txtLabel.textColor = color;
        txtLabel.textAlign = align;
        txtLabel.text = txt;
        txtLabel.size = size;
        if( anchor ){
            txtLabel.anchorOffsetX = txtLabel.width/2;
            txtLabel.anchorOffsetY = txtLabel.height/2;
        }
        if( middleX ){
            txtLabel.x = (egret.MainContext.instance.stage.stageWidth - txtLabel.width)/2;
        }
        if( middleY ){
            txtLabel.y = (egret.MainContext.instance.stage.stageHeight - txtLabel.height)/2;
        }
        return txtLabel;
    }

    static createMask(color: number = 0x000000, alpha: number = 0.8, w: number = egret.MainContext.instance.stage.stageWidth, h: number = egret.MainContext.instance.stage.stageHeight): egret.Shape{
        var mask: egret.Shape = new egret.Shape();
        mask.graphics.beginFill(color, alpha);
        mask.graphics.drawRect(0, 0, w, h);
        mask.graphics.endFill();
        mask.width = w;
        mask.height = h;

        return mask;
    }

    public static setStorage (key :string, value: any) :void{
        try {
            localStorage.setItem(key, value);
        } catch (e) {
        }
    }

    public static getStorage(key :string) :any {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    }

    public static getStageW(): number{
        var w:number = egret.MainContext.instance.stage.stageWidth;
        return w;
    }

    public static getStageH(): number{
        var h:number = egret.MainContext.instance.stage.stageHeight;
        return h;
    }

}