class House extends egret.Sprite{

    private house:egret.MovieClip;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var mcData = RES.getRes("house_json");
        var mcTexture = RES.getRes("house_png");
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.house = new egret.MovieClip(mcDataFactory.generateMovieClipData("house"));
        this.addChild(this.house);
    }

    public setFrame(frameIndex: number) :void{
        this.house.gotoAndStop(frameIndex);
    }

    public play(): void{
        this.house.frameRate = 20;
        this.house.gotoAndPlay(1, -1);
    }
}