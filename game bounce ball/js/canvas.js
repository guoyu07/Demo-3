
var log = console.log.bind(console);


function preference () {
    var a = {
        x : 350, //初始位置
        speed : 5, //移动速度
        frameRate : 60, //帧率
        rightBorder : 800, //右边界
        leftBorder : 0, //左边界
    }
    return a;
}

var _settings = preference();

 function pre_draw(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#e98c8c";
    return function (x){
        ctx.clearRect(0,400,800,30);
        ctx.fillRect(x,400,100,30);
    }
}

var draw = pre_draw();
window.onload = draw(_settings.x);

function pre_move () {
    var timerR,timerL; //定时器
    return function (e) {
        var key = e.key;
        clearInterval(timerR);
        clearInterval(timerL);
        if (key === "ArrowRight") {
            timerR = setInterval(function(){
                if (_settings.x <= _settings.rightBorder - 105) {
                    _settings.x += _settings.speed;
                    draw(_settings.x);
                }
            },1000/_settings.frameRate)
        } else if (key === "ArrowLeft") {
            timerL = setInterval(function(){
                if (_settings.x >= _settings.leftBorder + 5) {
                    _settings.x -= _settings.speed;
                    draw(_settings.x);
                }
            },1000/_settings.frameRate)
        } 
    }
}
var move = pre_move();
document.addEventListener("keydown",move,false);