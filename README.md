# myCat
围住神经猫游戏

demo在线演示地址：https://chen1215.github.io/myCat/

### 游戏设置
灰色圆形表示可走的地图，蓝色圆形表示神经猫，黄色圆形表示设置的障碍物。
### 游戏说明
游戏开始后，神经猫会出现在地图中央，周围会随机地生成一些障碍物。点击灰色地图可以设置障碍，每点击一次，神经猫都会朝六个方向随机移动一步。当神经猫移动到地图边缘，神经猫成功逃脱，游戏失败；当神经猫被障碍物围住，游戏成功！

游戏地图部分使用canvas和createjs完成，本游戏中主要使用Easeljs完成对canvas的操作。
### createjs
- EaselJS：用于 Sprites、图形和位图的绘制，是操作canvas的核心库
- TweenJS：用于做动画效果
- SoundJS：音频播放引擎
- PreloadJS：网站资源预加载，提供加载的进度回调，以及资源获取
### EaselJS的使用方法
- Stage类
>用来实例化一个舞台，是对canvas元素的包装，一个canvas元素对应一个stage。我们要把最终所有的元素都添加到stage上，才能显示出来。
```
var stage=new createjs.Stage("canvas");//创建舞台
```
- Container类
>用来新建一个容器对象，可以包含Text、Shape等EaselJS元素，我们把多个元素都包含在一个Container中方便统一管理。只要将这个容器添加到舞台上即可。
```
var gameView=new createjs.Container();//绘制的游戏页面视图
stage.addChild(gameView);//把视图添加到舞台上

```
- Shape类
>用来绘制图形
```
var circle = new createjs.Shape();//创建一个Shape对象
circle.graphics.beginFill(colorString).drawCircle(0,0,25).endFill();//绘制圆形
gameView.addChild(circle);//把图形添加到容器中
```
- ticker类
>舞台刷新要调用stageUpdate()，我们一般通过ticker类来定时调用
```
createjs.Ticker.setFPS(30);//设置帧频
createjs.Ticker.addEventListener("tick", handleTick);
function handleTick(event) {
    stage.update();
}
//也可以这样写
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);//监听事件

```
