var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Book = (function (_super) {
    __extends(Book, _super);
    function Book() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Book.prototype.onAddToStage = function (event) {
        var mcData = RES.getRes("book_json");
        var mcTexture = RES.getRes("book_png");
        var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.book = new egret.MovieClip(mcDataFactory.generateMovieClipData("book"));
        this.addChild(this.book);
    };
    Book.prototype.setFrame = function (frameIndex) {
        var totalFrames = this.book.totalFrames;
        if (frameIndex > totalFrames)
            return;
        this.book.gotoAndStop(frameIndex);
    };
    return Book;
})(egret.Sprite);
//# sourceMappingURL=book.js.map