/**
 * 简化log方便使用
 */
var log = console.log.bind(console);
// document.addEventListener("keydown",function(e){console.log(e)});

/**
 * --------------------------------------------------------------------
 */
function pre_rect(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#e98c8c";
    return function (x){
        ctx.clearRect(0,400,800,30);
        ctx.fillRect(x,400,100,30);
    }
}

var rect = pre_rect();
window.onload = rect(350);

function pre_move () {
    var x = 350; //初始位置
    var speed = 5; //移动速度
    var frameRate = 60; //帧率
    var rightBorder = 800; //右边界
    var leftBorder = 0; //左边界
    var timerR,timerL; //定时器
    return function (e) {
        var key = e.key;
        clearInterval(timerR);
        clearInterval(timerL);
        if (key === "ArrowRight") {
            timerR = setInterval(function(){
                if (x <= rightBorder - 105) {
                    x += speed;
                    rect(x);
                }
            },1000/frameRate)
        } else if (key === "ArrowLeft") {
            timerL = setInterval(function(){
                if (x >= leftBorder + 5) {
                    x -= speed;
                    rect(x);
                }
            },1000/frameRate)
        } 
    }
}
var move = pre_move();
document.addEventListener("keydown",move,false);