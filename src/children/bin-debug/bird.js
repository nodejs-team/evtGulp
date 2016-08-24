var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Bird,p=c.prototype;
    p.onAddToStage = function (event) {
        var mcData = this.mcData = RES.getRes("bird_json");
        var mcTexture = this.mcTexture = RES.getRes("bird_png");
        var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.bird = new egret.MovieClip(mcDataFactory.generateMovieClipData("bird"));
        this.addChild(this.bird);
        this.initEvents();
    };
    p.setFrame = function (frameIndex) {
        this.bird.gotoAndStop(frameIndex);
    };
    p.play = function () {
        this.bird.frameRate = 20;
        this.bird.gotoAndPlay(1, 1);
    };
    p.infinitePlay = function () {
        this.removeChild(this.bird);
        this.mcData['mc']['bird']['frames'] = this.mcData['mc']['bird']['frames'].slice(35);
        var mcDataFactory = new egret.MovieClipDataFactory(this.mcData, this.mcTexture);
        this.bird = new egret.MovieClip(mcDataFactory.generateMovieClipData("bird"));
        this.addChild(this.bird);
        this.bird.gotoAndPlay(1, -1);
    };
    p.initEvents = function () {
        this.bird.once(egret.Event.COMPLETE, function (e) {
            this.infinitePlay();
        }, this);
    };
    return Bird;
}(egret.Sprite));
egret.registerClass(Bird,'Bird');
