class Skating extends egret.Sprite{

    private skating:egret.MovieClip;
    private mcData: Object;
    private mcTexture: any;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var mcData = this.mcData = RES.getRes("skating_json");
        var mcTexture = this.mcTexture = RES.getRes("skating_png");
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.skating = new egret.MovieClip(mcDataFactory.generateMovieClipData("skating"));
        this.addChild(this.skating);

        this.initEvents();
    }

    public setFrame(frameIndex: number) :void{
        this.skating.gotoAndStop(frameIndex);
    }

    public play(): void{
        this.skating.frameRate = 20;
        this.skating.gotoAndPlay(1, 1);
    }

    public infinitePlay(): void{
        this.removeChild(this.skating);

        this.mcData['mc']['skating']['frames'] = this.mcData['mc']['skating']['frames'].slice(20);
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(this.mcData, this.mcTexture);
        this.skating = new egret.MovieClip(mcDataFactory.generateMovieClipData("skating"));
        this.addChild(this.skating);
        this.skating.gotoAndPlay(1, -1);
    }

    private initEvents(): void{
        this.skating.once(egret.Event.COMPLETE, function(e: egret.Event){
            this.infinitePlay();
        }, this);
    }
}