class BirdC extends egret.Sprite{

    private bird_c:egret.MovieClip;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var mcData = RES.getRes("bird_c_json");
        var mcTexture = RES.getRes("bird_c_png");
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.bird_c = new egret.MovieClip(mcDataFactory.generateMovieClipData("bird_c"));
        this.addChild(this.bird_c);
    }

    public setFrame(frameIndex: number) :void{
        this.bird_c.gotoAndStop(frameIndex);
    }

    public play(): void{
        this.bird_c.frameRate = 20;
        this.bird_c.gotoAndPlay(1, -1);
    }
}