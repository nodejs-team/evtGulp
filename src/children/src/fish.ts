class Fish extends egret.Sprite{

    private fish:egret.MovieClip;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var mcData = RES.getRes("fish_json");
        var mcTexture = RES.getRes("fish_png");
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.fish = new egret.MovieClip(mcDataFactory.generateMovieClipData("fish"));
        this.addChild(this.fish);
    }

    public setFrame(frameIndex: number) :void{
        this.fish.gotoAndStop(frameIndex);
    }

    public play(): void{
        this.fish.frameRate = 20;
        this.fish.gotoAndPlay(1, -1);
    }
}