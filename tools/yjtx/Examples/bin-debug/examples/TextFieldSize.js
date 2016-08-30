//libs:egret
//resources:
//docs:文本字体大小设置。\n触摸舞台更改文本字体大小。
//name:110-text-size
var TextFieldSize = (function (_super) {
    __extends(TextFieldSize, _super);
    function TextFieldSize() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=TextFieldSize,p=c.prototype;
    p.onAddToStage = function (event) {
        var text = new egret.TextField();
        text.text = "这是个文本字体示例，请轻触更换文本字体大小!";
        /*** 本示例关键代码段开始 ***/
        text.size = 30;
        /*** 本示例关键代码段结束 ***/
        this.addChild(text);
        text.width = 480;
        text.x = 320 - text.textWidth / 2;
        text.y = 400 - text.textHeight / 2;
        var sizes = [];
        sizes.push(12);
        sizes.push(24);
        sizes.push(36);
        sizes.push(48);
        sizes.push(60);
        var count = 3;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            count %= sizes.length;
            text.size = sizes[count++];
            text.x = 320 - text.textWidth / 2;
            text.y = 400 - text.textHeight / 2;
        }, this);
    };
    return TextFieldSize;
}(egret.DisplayObjectContainer));
egret.registerClass(TextFieldSize,'TextFieldSize');
