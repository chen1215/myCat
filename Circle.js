function Circle() {
    createjs.Shape.call(this);//回调构造方法
    this.setCircleType=function (type) {
        this._circleType=type;
        switch(type){
            case Circle.TYPE_UNSELECTED:
                this.setColor("#cccccc");//默认颜色
                break;
            case Circle.TYPE_SELECTED:
                this.setColor("#ff6600");//点击后的颜色
                break;
            case Circle.TYPE_CAT:
                this.setColor("#0000ff");//猫的颜色
                break;
        }
    }

    //设置颜色
    this.setColor=function (colorString) {
        this.graphics.beginFill(colorString).drawCircle(0,0,25).endFill();
        // this.graphics.drawCircle(0,0,25);
        // this.graphics.endFill();
    }
    this.getCircleType=function () {
        return this._circleType;
    }
    this.setCircleType(1);
}
Circle.prototype=new createjs.Shape();//调用构造函数设置原型对象，设置实例共享属性
Circle.TYPE_UNSELECTED=1;
Circle.TYPE_SELECTED=2;
Circle.TYPE_CAT=3;