/**
 * @copyright www.egret.com
 * @author 东北大客
 * @desc 开启Log面板可以直接在游戏界面中显示Egret的Log。
 *      在index.html文件中设置data-show-log字段为true
 *      即显示Log面板，反之关闭。
 */

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.once( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
    }

    private onAddToStage(event:egret.Event) {
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this );
        imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this );
        imgLoader.load( "resource/cartoon-egret_00.png" );
    }
    
	private _img:egret.Bitmap;
	private _iDirection = -1;
	private _iSpeed = 1;
	
    private imgLoadHandler( evt:egret.Event ):void{
       
        var img:egret.Bitmap = new egret.Bitmap( evt.currentTarget.data );
        img.x = this.stage.stageWidth / 2;
        img.y = this.stage.stageHeight / 2;
		img.anchorOffsetX = img.width / 2;
		img.anchorOffsetY = img.height / 2;
		this._img = img;
        this.addChild( this._img );
      
		/// 添加帧动画显示脏矩形刷新区域
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    }
	private onEnterFrame() {
		var img = this._img;
		img.rotation += this._iDirection * this._iSpeed;
		/*** 本示例关键代码段开始 ***/
		if ( img.rotation > 45 ) {
			this._iDirection = -1;
			egret.log("====Change Direction====");
		}	
		else if ( img.rotation < -45 ) {
			this._iDirection = 1;
			egret.log("====Change Direction====");
		}	
		/*** 本示例关键代码段结束 ***/
	}
}


