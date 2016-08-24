class SnowScene extends egret.Sprite{

    private snowX: number;
    private snowY: number;
    private stageW: number = Main.instance.stageW;
    private stageH: number = Main.instance.stageH;
    private scrollHolder: number;
    private snowStack: Snow[] = new Array();


    public constructor(x: number, y: number) {
        super();
        this.snowX = x;
        this.snowY = y;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        this.scrollHolder = Main.instance.scene1.book.height/2;

        for(var i:number = 1; i<13; i++){
            this.createSnow(i);
        }
    }

    public createSnow(type: number): void{
        var snow: Snow = new Snow(type);
        snow.scaleX = snow.scaleY = 0.4;
        snow.alpha = 0;
        snow['typeIndex'] = type;
        snow['randOffsetX'] = this.rand(0, 500);
        this.addChild(snow);
        snow.anchorOffsetX = snow.width/2;
        snow.anchorOffsetY = snow.height/2;
        snow.x = this.snowX - snow.width/2;
        snow.y = this.snowY - snow.height/2;
        this.snowStack.push(snow);
    }

    public doAnimate(snow: Snow, scrollTop: number): void{
        var ratio: number = scrollTop/this.stageH/4;
        var isLeft: boolean = snow['typeIndex'] < 7 ? true: false;
        var offsetX: number = snow['typeIndex']*this.stageW/15;
        var extRatio: number = Math.min(scrollTop/this.scrollHolder, 1);
        var extRatio2: number = scrollTop/this.stageH*60;
        var yRatio: number = 0.05;
        if( scrollTop > this.stageH*2 ){
            yRatio = 0.12;
        }

        if( scrollTop > this.stageH*2.5 ){
            yRatio = 0.26;
        }

        egret.Tween.removeTweens(snow);
        egret.Tween.get(snow).to({
            alpha: extRatio,
            scaleX: extRatio,
            scaleY: extRatio,
            rotation: extRatio2,
            y: this.snowY - scrollTop*yRatio + snow['randOffsetX'],
            x: this.snowX - 250 + (isLeft ? -1 : 1) * Math.sin(ratio*5)*offsetX
        }, 600, egret.Ease.circOut);
    }

    public setAnimates(scrollTop: number): void{
        for(var i=0; i<this.snowStack.length; i++){
            this.doAnimate(this.snowStack[i], scrollTop);
        }
    }

    private rand(min: number, max: number): number{
        return min + Math.random()*(max-min);
    }
}