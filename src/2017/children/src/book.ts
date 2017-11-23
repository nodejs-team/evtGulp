class Book extends egret.Sprite{

    private book:egret.MovieClip;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var mcData = RES.getRes("book_json");
        var mcTexture = RES.getRes("book_png");
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.book = new egret.MovieClip(mcDataFactory.generateMovieClipData("book"));
        this.addChild(this.book);
    }

    public setFrame(frameIndex: number) :void{
        var totalFrames: number = this.book.totalFrames;
        if( frameIndex > totalFrames ) return;
        this.book.gotoAndStop(frameIndex);
    }
}