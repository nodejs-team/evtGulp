class Scene3 extends egret.Sprite{

    private mouse_c: MouseC;
    private skating: Skating;
    private bird_c: BirdC;
    private fish: Fish;
    private tree: egret.Bitmap;
    private stext: egret.Bitmap;
    private sceneContainer: egret.Sprite;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){

        this.stext = Utils.createBitmapByName('s3_text_png');
        this.stext.x = Main.instance.stageW/2;
        this.stext.anchorOffsetX = this.stext.width/2;
        this.stext.y = Main.instance.stageH/2;
        this.stext.anchorOffsetY = this.stext.height/2;
        this.addChild(this.stext);

        this.sceneContainer = new egret.Sprite();
        this.sceneContainer.y = -Main.instance.stageH/1.6;

        var bg: egret.Bitmap = Utils.createBitmapByName('bg3_png');
        this.sceneContainer.addChild(bg);

        this.fish = new Fish();
        this.fish.x = 542;
        this.fish.y = 310;
        this.sceneContainer.addChild(this.fish);

        this.skating = new Skating();
        this.skating.x = 597;
        this.skating.y = 212;
        this.sceneContainer.addChild(this.skating);

        this.bird_c = new BirdC();
        this.bird_c.x = 1060;
        this.bird_c.y = 120;
        this.sceneContainer.addChild(this.bird_c);

        this.tree = Utils.createBitmapByName('tree_png');
        this.tree.x = 1183;
        this.tree.y = 200;
        this.sceneContainer.addChild(this.tree);

        this.mouse_c = new MouseC();
        this.mouse_c.x = 1403;
        this.mouse_c.y = 260;
        this.sceneContainer.addChild(this.mouse_c);

        this.addChild(this.sceneContainer);

        this.initEvents();

    }

    public setAnimation(): void{
        this.skating.play();
        this.bird_c.play();
        this.fish.play();
        this.mouse_c.play();
    }

    public setScroll(scrollTop: number):void{
        egret.Tween.removeTweens(this.sceneContainer);
        egret.Tween.get(this.sceneContainer).to({y: -Main.instance.stageH/1.6 + (scrollTop - Main.instance.stageH*2)}, 600, egret.Ease.circOut);
    }

    private initEvents(): void{
        this.once('SCENE_ENTER_3', function(event: egret.Event){
            this.setAnimation();
        }, this);
    }
}