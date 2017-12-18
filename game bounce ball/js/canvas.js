
/**
 * 方便调试
 */

var log = console.log.bind(console);

/**
 * 一些游戏设置
 */
var _settings = (function () {
    var a = {
        x : 350, //初始位置
        speed : 5, //移动速度
        frameRate : 60, //帧率
        rightBorder : 800, //右边界
        leftBorder : 0, //左边界
    }
    return a;
})();

/**
 * 砖块动作
 */

var brick = (function () {
    var a = {
        moveLeft: function(){
            _settings.x -= _settings.speed;
        },//左移动作
        moveRight: function(){
            _settings.x += _settings.speed;
        },//右移动作
    }
    return a;
})();

function pre_draw(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#e98c8c";
    return function (x){
        ctx.clearRect(0,400,800,30);
        ctx.fillRect(x,400,100,30);
    }
};

function pre_move () {
    var timerR,timerL; //定时器
    return function (e) {
        var key = e.key;
        clearInterval(timerR);
        clearInterval(timerL);
        if (key === "ArrowRight") {
            timerR = setInterval(function(){
                if (_settings.x <= _settings.rightBorder - 105) {
                    brick.moveRight();
                    draw(_settings.x);
                }
            },1000/_settings.frameRate)
        } else if (key === "ArrowLeft") {
            timerL = setInterval(function(){
                if (_settings.x >= _settings.leftBorder + 5) {
                    brick.moveLeft();
                    draw(_settings.x);
                }
            },1000/_settings.frameRate)
        } 
    }
}

var draw = pre_draw();//初始化画布
draw(_settings.x);//渲染画布
var move = pre_move();//初始化按键控制
document.addEventListener("keydown", move, false);//添加按键监听事件