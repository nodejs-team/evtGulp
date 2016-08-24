class Snow extends egret.Sprite{

    snow: egret.Bitmap;
    type: number;

    public constructor(type: number) {
        super();
        this.type = type;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        this.snow = Utils.createBitmapByName('snow'+this.type);
        this.width = this.snow.width;
        this.height = this.snow.height;
        this.addChild(this.snow);
    }
}