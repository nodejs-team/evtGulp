var Scene2 = (function (_super) {
    __extends(Scene2, _super);
    function Scene2() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Scene2,p=c.prototype;
    p.onAddToStage = function (event) {
        this.stext = Utils.createBitmapByName('s2_text_png');
        this.stext.x = Main.instance.stageW / 2;
        this.stext.anchorOffsetX = this.stext.width / 2;
        this.stext.y = Main.instance.stageH / 2;
        this.stext.anchorOffsetY = this.stext.height / 2;
        this.addChild(this.stext);
        this.sceneContainer = new egret.Sprite();
        this.sceneContainer.y = -Main.instance.stageH / 2;
        this.bird = new Bird();
        this.bird.x = 736;
        this.bird.y = -135;
        this.sceneContainer.addChild(this.bird);
        var bg = Utils.createBitmapByName('bg2_png');
        this.sceneContainer.addChild(bg);
        this.house = new House();
        this.house.x = 662;
        this.house.y = 126;
        this.sceneContainer.addChild(this.house);
        this.mouse = new Mouse();
        this.mouse.x = 767;
        this.mouse.y = 188;
        this.sceneContainer.addChild(this.mouse);
        this.man = new Man();
        this.man.x = 305;
        this.man.y = 160;
        this.sceneContainer.addChild(this.man);
        this.addChild(this.sceneContainer);
        this.initEvents();
    };
    p.setAnimation = function () {
        this.house.play();
        this.mouse.play();
        this.bird.play();
        this.man.play();
    };
    p.setScroll = function (scrollTop) {
        egret.Tween.removeTweens(this.sceneContainer);
        egret.Tween.get(this.sceneContainer).to({ y: -Main.instance.stageH / 2 + (scrollTop - Main.instance.stageH) }, 600, egret.Ease.circOut);
    };
    p.initEvents = function () {
        this.once('SCENE_ENTER_2', function (event) {
            this.setAnimation();
        }, this);
    };
    return Scene2;
}(egret.Sprite));
egret.registerClass(Scene2,'Scene2');
