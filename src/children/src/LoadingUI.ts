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

class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;

    private createView():void {
        var bg: egret.Shape = Utils.createMask(0xffffff, 1);
        bg.width = Main.instance.stageW;
        bg.height = Main.instance.stageH;
        this.addChild(bg);

        var mcData = RES.getRes("loading_json");
        var mcTexture = RES.getRes("loading_png");
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        var loading: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("loading"));
        loading.x = 753;
        loading.y = 158;
        loading.gotoAndPlay(1,-1);
        this.addChild(loading);

        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = loading.y + loading.height + 100; //Main.instance.stageH/2;
        this.textField.x = Main.instance.stageW/2;
        this.textField.anchorOffsetX = 240;
        //this.textField.anchorOffsetY = 50;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textColor = 0x444444;
        this.textField.textAlign = "center";
    }

    public setProgress(current, total):void {
        this.textField.text = "loading: " + Math.floor(current / total * 100) + "%";
    }
}
