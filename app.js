var steps=0;//记录步数
var stage=new createjs.Stage("gameView");//创建舞台
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);//监听事件

var gameView=new createjs.Container();//绘制的游戏页面视图
gameView.x=30;
gameView.y=30;
stage.addChild(gameView);//把视图添加到舞台上

var circleArr=[[],[],[],[],[],[],[],[],[]];

var currentCat;

var MOVE_NONE=-1,MOVE_LEFT=0,MOVE_UP_LEFT=1,MOVE_UP_RIGHT=2,MOVE_RIGHT=3,MOVE_RIGHT_BOTTOM=4,MOVE_LEFT_BOTTOM=5;

function getMoveDir(cat) {
    //记录不同方向可移动的距离
    var distanceMap=[];
    //left
    var can=true;
    for(var x=cat.indexX;x>=0;x--){
        if(circleArr[x][cat.indexY].getCircleType()===Circle.TYPE_SELECTED){
            can=false;
            distanceMap[MOVE_LEFT]=cat.indexX-x;
            break;
        }
    }
    if(can){
        return MOVE_LEFT;
    }

    //left up
    can=true;
    var x=cat.indexX,y=cat.indexY;
    while(true){
        if(circleArr[x][y].getCircleType()===Circle.TYPE_SELECTED){
            can=false;
            distanceMap[MOVE_UP_LEFT]=cat.indexY-y;
            break;
        }
        if(y%2===0){
            x--;
        }
        y--;
        if(y<0 || x<0){
            break;
        }
    }
    if(can){
        return MOVE_UP_LEFT;
    }

    //right up
    can=true;
    var x=cat.indexX,y=cat.indexY;
    while(true){
        if(circleArr[x][y].getCircleType()===Circle.TYPE_SELECTED){
            can=false;
            distanceMap[MOVE_UP_RIGHT]=cat.indexY-y;
            break;
        }
        if(y%2){
            x++;
        }
        y--;
        if(y<0 || x>8){
            break;
        }
    }
    if(can){
        return MOVE_UP_RIGHT;
    }

    //right
    can=true;
    for(var x=cat.indexX;x<9;x++){
        if(circleArr[x][cat.indexY].getCircleType()===Circle.TYPE_SELECTED){
            can=false;
            distanceMap[MOVE_RIGHT]=x-cat.indexX;
            break;
        }
    }
    if(can){
        return MOVE_RIGHT;
    }

    //right bottom
    can=true;
    x=cat.indexX,y=cat.indexY;
    while(true){
        if(circleArr[x][y].getCircleType()===Circle.TYPE_SELECTED){
            can=false;
            distanceMap[MOVE_RIGHT_BOTTOM]=y-cat.indexY;
            break;
        }
        if(y%2){
            x++;
        }
        y++;
        if(y>8 || x>8){
            break;
        }
    }
    if(can){
        return MOVE_RIGHT_BOTTOM;
    }

    //left bottom
    can=true;
    x=cat.indexX, y=cat.indexY;
    while(true){
        if(circleArr[x][y].getCircleType()===Circle.TYPE_SELECTED){
            can=false;
            distanceMap[MOVE_LEFT_BOTTOM]=y-cat.indexY;
            break;
        }
        if(y%2===0){
            x--;
        }
        y++;
        if(y>8 || x<0){
            break;
        }
    }
    if(can){
        return MOVE_LEFT_BOTTOM;
    }
    // maxDir记录方向， maxValue记录可走的步数
    var maxDir=-1,maxValue=-1;
    for(var dir=0;dir<distanceMap.length;dir++){
        if(distanceMap[dir]>maxValue){
            maxValue=distanceMap[dir];
            maxDir=dir;
        }
    }
    if(maxValue>1){
        return maxDir;
    }else{
        return MOVE_NONE;
    }

}
function circleClicked(e) {
    if(currentCat.indexX===0 || currentCat.indexX===8 || currentCat.indexY===0 || currentCat.indexY===8){
        alert("猫逃跑了，你输了！");
        return;
    }
    if(e.target.getCircleType()!==Circle.TYPE_CAT){
        e.target.setCircleType(Circle.TYPE_SELECTED);
        steps++;
        updateSteps(steps);
    }else{
        return;
    }
    //猫在每种状态下如何操作
    var dir=getMoveDir(currentCat);
    switch (dir) {
        case MOVE_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexX-1][currentCat.indexY];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_UP_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexY%2?currentCat.indexX:currentCat.indexX-1][currentCat.indexY-1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_UP_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexY%2?currentCat.indexX+1:currentCat.indexX][currentCat.indexY-1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexX+1][currentCat.indexY];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_RIGHT_BOTTOM:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexY%2?currentCat.indexX+1:currentCat.indexX][currentCat.indexY+1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_LEFT_BOTTOM:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexY%2?currentCat.indexX:currentCat.indexX-1][currentCat.indexY+1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        default:
            alert("恭喜你，成功地抓住了神经猫！");

}
}

function addCircles() {
    for(var indexY=0;indexY<9;indexY++){
        for(var indexX=0;indexX<9;indexX++){
            var c=new Circle();
            gameView.addChild(c);
            circleArr[indexX][indexY]=c;
            c.indexX=indexX;
            c.indexY=indexY;
            c.x=indexY%2?indexX*55+25:indexX*55;
            c.y=indexY*55;

            if(indexX==4&&indexY==4){
                c.setCircleType(Circle.TYPE_CAT);
                currentCat=c;
            }else if(Math.random()<0.1){
                c.setCircleType(Circle.TYPE_SELECTED);
            }
            c.addEventListener("click",circleClicked)
        }
    }
}
//更新步数
function updateSteps(steps) {
    document.getElementById("steps").innerHTML=steps;
}
//初始化游戏
function newgame(){
    addCircles();
    steps=0;
    updateSteps(steps);
}
newgame();
// var s=new createjs.Shape();
// s.graphics.beginFill("#FF0000");
// s.graphics.drawCircle(50,50,25);
// s.graphics.endFill();
// gameView.addChild(s);

// var count=0;
// var txt=new createjs.Text("number->0","20px Arial","#ff7700");
// gameView.addChild(txt);


// function tick() {
//     count++;
//     txt.text="number->0"+count+"!";
//     stage.update();
// }