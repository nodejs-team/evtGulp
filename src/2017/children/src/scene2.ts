class Scene2 extends egret.Sprite{

    private mouse: Mouse;
    private house: House;
    private bird: Bird;
    private man: Man;
    private stext: egret.Bitmap;
    private sceneContainer: egret.Sprite;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){

        this.stext = Utils.createBitmapByName('s2_text_png');
        this.stext.x = Main.instance.stageW/2;
        this.stext.anchorOffsetX = this.stext.width/2;
        this.stext.y = Main.instance.stageH/2;
        this.stext.anchorOffsetY = this.stext.height/2;
        this.addChild(this.stext);

        this.sceneContainer = new egret.Sprite();
        this.sceneContainer.y = -Main.instance.stageH/2;

        this.bird = new Bird();
        this.bird.x = 736;
        this.bird.y = -135;
        this.sceneContainer.addChild(this.bird);

        var bg: egret.Bitmap = Utils.createBitmapByName('bg2_png');
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

    }

    public setAnimation(): void{
        this.house.play();
        this.mouse.play();
        this.bird.play();
        this.man.play();
    }

    public setScroll(scrollTop: number):void{
        egret.Tween.removeTweens(this.sceneContainer);
        egret.Tween.get(this.sceneContainer).to({y: -Main.instance.stageH/2 + (scrollTop - Main.instance.stageH)}, 600, egret.Ease.circOut);
    }


    private initEvents(): void{
        this.once('SCENE_ENTER_2', function(event: egret.Event){
            this.setAnimation();
        }, this);
    }
}