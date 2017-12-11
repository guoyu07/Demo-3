function pre_lazzyLoad () {
    var ele = document.getElementsByClassName("img");
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var n = 0; //优化遍历过程，避免每次都从第一个子项遍历
    return function(){
        for(i=n;i<ele.length;i++){
            var eleLoc = ele[i].getBoundingClientRect();
            if (eleLoc.top < winH && eleLoc.left < winW && ele[i].getAttribute("src")==="img/Spinner.svg") {
                ele[i].src = ele[i].getAttribute("data-src");//加载真正图片
                n += 1;
            }
        }
    }
}
/*
 * 节流函数，优化性能
 */


function throttle (fun, time){
    var init = 0;
    var timer;
    return function () {
        clearTimeout(timer);
        var now = Date.now();
        if (now - init >= time) {
            console.log("正常加载");
            init = now;
            fun();
        } else {
            timer = setTimeout(function(){
            console.log ("延迟加载");
            fun();
            now = Date.now();
            init =now;
            }, time );
        }
    }
}

var lazzyLoad = pre_lazzyLoad();//首先获取窗口宽高信息，并将反复利用的核心程序利用闭包特性提取出来
document.addEventListener('DOMContentLoaded', lazzyLoad);//加载未滚动就出现在视窗里的照片
window.addEventListener('scroll', throttle(lazzyLoad , 500) ,false);//添加滚动监听事件

