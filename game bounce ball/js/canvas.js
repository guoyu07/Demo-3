
/**
 * 方便调试
 */

var log = console.log.bind(console);


/**
 * 画布(全局变量)
 */

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


/**
 * 一些游戏设置
 */
function init_settings () {
    var a = {
        x : 350, //初始位置
        speed : 5, //移动速度
        frameRate : 60, //帧率
        rightBorder : 800, //右边界
        leftBorder : 0, //左边界
    }
    return a;
};

/**
 * 砖块
 */
function init_brick (settings) {
    ctx.fillStyle = "#e98c8c"; //砖块颜色
    var a = {
        draw: function (){
            ctx.clearRect(0,400,800,30);
            ctx.fillRect(settings.x,400,100,30);
        },//砖块渲染动作
        moveLeft: function(){
            settings.x -= settings.speed;
        },//砖块左移动作
        moveRight: function(){
            settings.x += settings.speed;
        },//砖块右移动作
    }
    return a;
};


/**
 * 控制函数
 */

function init_control (settings, brick) {
    var timerR,timerL; //定时器
    return function (e) {
        var key = e.key;
        clearInterval(timerR);
        clearInterval(timerL);
        if (key === "ArrowRight") {
            timerR = setInterval(function(){
                if (settings.x <= settings.rightBorder - 105) {
                    brick.moveRight();
                    brick.draw(settings.x);
                }
            },1000/settings.frameRate)
        } else if (key === "ArrowLeft") {
            timerL = setInterval(function(){
                if (settings.x >= settings.leftBorder + 5) {
                    brick.moveLeft();
                    brick.draw(settings.x);
                }
            },1000/settings.frameRate)
        } 
    }
}

function _main () {
var settings = init_settings();//注册设置
var brick = init_brick(settings);//注册砖块
brick.draw(settings);//初始化砖块
var control = init_control(settings, brick);//注册控制组件
window.addEventListener("keydown", control, false);//添加按键监听事件
}

_main();