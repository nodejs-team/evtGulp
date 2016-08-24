class Mouse extends egret.Sprite{

    private mouse:egret.MovieClip;
    private mcData: Object;
    private mcTexture: any;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var mcData = this.mcData = RES.getRes("mouse_json");
        var mcTexture = this.mcTexture = RES.getRes("mouse_png");
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.mouse = new egret.MovieClip(mcDataFactory.generateMovieClipData("mouse"));
        this.addChild(this.mouse);

        this.initEvents();
    }

    public setFrame(frameIndex: number) :void{
        this.mouse.gotoAndStop(frameIndex);
    }

    public play(): void{
        this.mouse.frameRate = 20;
        this.mouse.gotoAndPlay(1, 1);
    }

    public infinitePlay(): void{
        this.removeChild(this.mouse);

        this.mcData['mc']['mouse']['frames'] = this.mcData['mc']['mouse']['frames'].slice(28);
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(this.mcData, this.mcTexture);
        this.mouse = new egret.MovieClip(mcDataFactory.generateMovieClipData("mouse"));
        this.addChild(this.mouse);
        this.mouse.gotoAndPlay(1, -1);
    }

    private initEvents(): void{
        this.mouse.once(egret.Event.COMPLETE, function(e: egret.Event){
            this.infinitePlay();
        }, this);
    }
}