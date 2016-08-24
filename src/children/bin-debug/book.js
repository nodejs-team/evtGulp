var Book = (function (_super) {
    __extends(Book, _super);
    function Book() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Book,p=c.prototype;
    p.onAddToStage = function (event) {
        var mcData = RES.getRes("book_json");
        var mcTexture = RES.getRes("book_png");
        var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.book = new egret.MovieClip(mcDataFactory.generateMovieClipData("book"));
        this.addChild(this.book);
    };
    p.setFrame = function (frameIndex) {
        var totalFrames = this.book.totalFrames;
        if (frameIndex > totalFrames)
            return;
        this.book.gotoAndStop(frameIndex);
    };
    return Book;
}(egret.Sprite));
egret.registerClass(Book,'Book');
