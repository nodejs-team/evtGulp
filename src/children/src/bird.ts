class Bird extends egret.Sprite{

    private bird:egret.MovieClip;
    private mcData: Object;
    private mcTexture: any;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var mcData = this.mcData = RES.getRes("bird_json");
        var mcTexture = this.mcTexture = RES.getRes("bird_png");
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.bird = new egret.MovieClip(mcDataFactory.generateMovieClipData("bird"));
        this.addChild(this.bird);

        this.initEvents();
    }

    public setFrame(frameIndex: number) :void{
        this.bird.gotoAndStop(frameIndex);
    }

    public play(): void{
        this.bird.frameRate = 20;
        this.bird.gotoAndPlay(1, 1);
    }

    public infinitePlay(): void{
        this.removeChild(this.bird);

        this.mcData['mc']['bird']['frames'] = this.mcData['mc']['bird']['frames'].slice(35);
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(this.mcData, this.mcTexture);
        this.bird = new egret.MovieClip(mcDataFactory.generateMovieClipData("bird"));
        this.addChild(this.bird);
        this.bird.gotoAndPlay(1, -1);
    }

    private initEvents(): void{
        this.bird.once(egret.Event.COMPLETE, function(e: egret.Event){
            this.infinitePlay();
        }, this);
    }
}