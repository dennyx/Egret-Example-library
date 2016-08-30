//libs:egret,game
//resources:resource/assets/mc/animation.png,resource/assets/mc/animation.json
//docs:帧动画示例。\n触摸舞台会重新播放。\n播放过程中如果有帧事件，会触发 egret.MovieClipEvent.FRAME_LABEL 事件。\n在播放结束一次后会触发 egret.Event.LOOP_COMPLETE 事件。全部播放完全后，会触发 egret.Event.COMPLETE 事件。
//name:100-anim-flash
//log:true

class MovieClipNormal extends egret.DisplayObjectContainer {

    private _mcData:any;
    private _mcTexture:egret.Texture;
    
    constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.load(this.initMovieClip);
    }
    
    private initMovieClip():void {
        /*** 本示例关键代码段开始 ***/
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        var role:egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("attack"));
        this.addChild(role);
        role.gotoAndPlay(1, 3);
        role.x = 300;
        role.y = 600;
        role.addEventListener(egret.Event.COMPLETE, function (e:egret.Event):void {
            egret.log("play over!")
        }, this);
        
        var count:number = 0;
        role.addEventListener(egret.Event.LOOP_COMPLETE, function (e:egret.Event):void {
            egret.log("play times:" + ++count);
        }, this);
        role.addEventListener(egret.MovieClipEvent.FRAME_LABEL, function (e:egret.MovieClipEvent):void {
            egret.log("frameLabel:" + e.frameLabel);
        }, this);
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent):void {
            count = 0;
            role.gotoAndPlay(1, 3);
        }, this);
        /*** 本示例关键代码段结束 ***/
    }
    
    protected load(callback:Function):void {
        var count:number = 0;
        var self = this;
        
        var check = function () {
            count++;
            if (count == 2) {
                callback.call(self);
            }
        }
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;

            this._mcTexture = loader.data;
            
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var request = new egret.URLRequest("resource/assets/mc/animation.png");
        loader.load(request);
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;

            this._mcData = JSON.parse(loader.data);
            
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest("resource/assets/mc/animation.json");
        loader.load(request);
    }
}