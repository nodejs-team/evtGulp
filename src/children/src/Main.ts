//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;
    static  instance:any;
    private stageW:number;
    private stageH:number;
    private scrollRatio: number = 1;

    public constructor() {
        super();
        Main.instance = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;

        var baseUrl: string = window['_SOURCE_BASE_'] || "";

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig(baseUrl + "resource/default.res.json", baseUrl + "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName=="loading"){
            //设置加载进度界面
            //Config to load process interface
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);

            RES.loadGroup("preload");
        }

        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */

    public sceneContainer: egret.Sprite;
    private scene1: Scene1;
    private scene2: Scene2;
    private scene3: Scene3;
    private scene4: Scene4;
    public bigMan: egret.Bitmap;

    private snowScene: SnowScene;

    private createGameScene():void {

        this.sceneContainer = new egret.Sprite();
        this.addChild(this.sceneContainer);

        this.createBigMan();
        this.createAllScenes();

        this.snowScene = new SnowScene(this.scene1.book.x, this.scene1.book.y + this.scene1.book.height/2);
        this.addChild(this.snowScene);

        this.setScrollView();
        this.initEvents();

    }

    public setScrollView():void{
        var bg: egret.Bitmap = Utils.createBitmapByName('page_bg_png');
        var bgsrc: string = bg.texture.bitmapData['attributes']['src']['value'];
        var scrollNode: any = document.querySelector('.evt-scroll-view');
        scrollNode.style.height = this.stageH*this.sceneContainer.numChildren - (800-window.innerHeight)/2 + "px";
        scrollNode.style.background = 'url('+ bgsrc +')';
    }

    private createAllScenes(): void{
        for(var i: number = 0; i<4; i++){
            var sceneInstance = egret.getDefinitionByName('Scene' + (i + 1));
            this['scene' + (i + 1)] = new sceneInstance();
            this['scene' + (i + 1)].y = -this.stageH*i;
            this.sceneContainer.addChild(this['scene' + (i + 1)]);
        }
    }

    public setRatio(): void{
        this.scrollRatio = this.stageH/window.innerHeight;
    }

    private getStageTop(): number{
        return (Math.ceil(window.innerWidth/this.stageW*this.stageH) - window.innerHeight)/2;
    }

    private initEvents(): void{
        var self: any = this;
        var bookCellH: number = this.scene1.book.height/25;
        var initY: number = this.sceneContainer.y;
        var scrollHandle: Function;

        //this.setRatio();

        window.addEventListener('scroll', scrollHandle = function(e: any){
            var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
            scrollTop = scrollTop*self.scrollRatio;

            self.setSceneAnimate(initY + scrollTop);
            self.snowScene.setAnimates(scrollTop);
            self.scene1.book.setFrame(Math.ceil(scrollTop/bookCellH));
            self.scene1.setScrollAnim(scrollTop);

            if( scrollTop > self.stageH ){
                self.scene2.dispatchEvent(new egret.Event('SCENE_ENTER_2'));
                self.scene2.setScroll(scrollTop);
            }

            if( scrollTop > self.stageH*2 ){
                self.scene3.dispatchEvent(new egret.Event('SCENE_ENTER_3'));
                self.scene3.setScroll(scrollTop);
            }

            if( scrollTop > self.stageH*2.7 ){
                self.scene4.dispatchEvent(new egret.Event('SCENE_ENTER_4'));
                self.scene4.setScroll(scrollTop);
            }

            if( scrollTop > self.stageH*0.5 && scrollTop < self.stageH*2.4  ){
                self.showBigMan();
            } else {
                self.hideBigMan();
            }

        }, false);

        scrollHandle();

        window.addEventListener('resize', function (e) {
            //self.setRatio();
            self.setScrollView();
            scrollHandle();
        }, false);
    }

    public setSceneAnimate(scrollDist: number): void{
        egret.Tween.removeTweens(this.sceneContainer);
        egret.Tween.get(this.sceneContainer).to({y: scrollDist}, 800, egret.Ease.circOut);
    }

    public createBigMan(): void{
        this.bigMan = Utils.createBitmapByName('big_man_png');
        this.bigMan.anchorOffsetX = this.bigMan.width/2;
        this.bigMan.x = this.stageW/2 - 50;
        this.bigMan.y = this.stageH;
        this.addChild(this.bigMan);
        this.bigMan.touchEnabled = true;
        this.bigMan.addEventListener(egret.TouchEvent.TOUCH_TAP, function(e: egret.TouchEvent){
            window['href_fun'] && window['href_fun']();
        }, this);
    }

    public showBigMan(): void{
        egret.Tween.removeTweens(this.bigMan);
        egret.Tween.get(this.bigMan).to({y: this.stageH - this.bigMan.height - this.getStageTop()}, 1000, egret.Ease.circOut);
    }

    public hideBigMan(): void{
        egret.Tween.removeTweens(this.bigMan);
        egret.Tween.get(this.bigMan).to({y: this.stageH}, 1000, egret.Ease.circOut);
    }
}


