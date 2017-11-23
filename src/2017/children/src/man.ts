class Man extends egret.Sprite{

    private man:egret.MovieClip;
    private mcData: Object;
    private mcTexture: any;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var mcData = this.mcData = RES.getRes("man_json");
        var mcTexture = this.mcTexture = RES.getRes("man_png");
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.man = new egret.MovieClip(mcDataFactory.generateMovieClipData("man"));
        this.addChild(this.man);

        this.initEvents();
    }

    public setFrame(frameIndex: number) :void{
        this.man.gotoAndStop(frameIndex);
    }

    public play(): void{
        this.man.frameRate = 20;
        this.man.gotoAndPlay(1, 1);
    }

    public infinitePlay(): void{
        this.removeChild(this.man);

        this.mcData['mc']['man']['frames'] = this.mcData['mc']['man']['frames'].slice(25);
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(this.mcData, this.mcTexture);
        this.man = new egret.MovieClip(mcDataFactory.generateMovieClipData("man"));
        this.addChild(this.man);
        this.man.gotoAndPlay(1, -1);
    }

    private initEvents(): void{
        this.man.once(egret.Event.COMPLETE, function(e: egret.Event){
            this.infinitePlay();
        }, this);
    }
}