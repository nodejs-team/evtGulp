class MouseC extends egret.Sprite{

    private mouse_c:egret.MovieClip;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var mcData = RES.getRes("mouse_c_json");
        var mcTexture = RES.getRes("mouse_c_png");
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.mouse_c = new egret.MovieClip(mcDataFactory.generateMovieClipData("mouse_c"));
        this.addChild(this.mouse_c);
    }

    public setFrame(frameIndex: number) :void{
        this.mouse_c.gotoAndStop(frameIndex);
    }

    public play(): void{
        this.mouse_c.frameRate = 20;
        this.mouse_c.gotoAndPlay(1, -1);
    }
}