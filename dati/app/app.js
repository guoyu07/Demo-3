var OCR = require('./OCR.js')
// const fs = require('fs'); // 文件系统
const adb = require('adbkit'); //adb
const client = adb.createClient(); //adb 实例
const gm = require("gm"); // 图片剪裁
// const Buffer = require('buffer').Buffer;

/////////////////////////////////////////////////
/////////////////**参数设置区**///////////////////
///////////////////////////////////////////////

//todo list
//每个选项只有一个字时百度将三个选项合并返回
//呸(play) 针对这个选项优化

// 冲顶 ⛰⛰⛰
// var X = 67, Y = 314, W = 950, H = 670; //通用
// var X = 67, Y = 314, W = 950, H = 640; //一行
// var X = 67, Y = 314, W = 950, H = 720; //两行
// var X = 67, Y = 314, W = 950, H = 807; //三行
// 丁丁当
// var X = 108, Y = 327, W = 866, H = 800;
// 微剧院
// var X = 67, Y = 781, W = 940, H = 983;
// 微博
// var X = 58, Y = 279, W = 970, H = 953;
// 腾讯视频
// var X = 95, Y = 405, W = 888, H = 740;
// 百度视频
// var X = 51, Y = 353, W = 977, H = 860;
// 波波
// var X = 47, Y = 330, W = 980, H = 935;
// 京东
// var X = 81, Y = 272, W = 921, H = 836;
// 波波
// var X = 77, Y = 359, W = 930, H = 795;
// 51 公积金
// var X = 67, Y = 781, W = 940, H = 983;
// 给你花 🌺🌺🌺
// var X = 97, Y = 853, W = 896, H = 836;
// 网易新闻
// var X = 96, Y = 406, W = 881, H = 867;
// 口碑
// var X = 55, Y = 385, W = 965, H = 825;
// 网易云音乐
var X = 116, Y = 454, W = 846, H = 871;
// hello
// var X = 65, Y = 454, W = 968, H = 864;
// 淘宝
// var X = 54, Y = 290, W = 970, H = 865;
// 好看 👀👀👀
// var X = 67, Y = 357, W = 946, H = 770;
// 小米 🍚🍚🍚
// var X = 37, Y = 337, W = 1000, H = 810;
// 贴吧
// var X = 51, Y = 353, W = 977, H = 860;
// 优酷
// var X = 8, Y = 296, W = 1065, H = 953;
// 西瓜 🍉🍉🍉
// var X = 56, Y = 320, W = 975, H = 870;
// 西瓜 🍉🍉🍉(最强大脑)
// var X = 62, Y = 854, W = 964, H = 935;
// 芝士 🧀🧀🧀(映客)
// var X = 32, Y = 285, W = 1020, H = 810;
// 花椒 🌹🌹🌹 
// var X = 34, Y = 322, W = 1015, H = 950;
// 熊猫 🐼🐼🐼
// var X = 51, Y = 390, W = 981, H = 609;
// NICE 👍👍👍
// var X = 37, Y = 268, W = 1010, H = 820;
// 大白 ❄️❄️❄️
// var X = 71, Y = 405, W = 940, H = 650;
// 斗鱼 🐟🐟🐟
// var X = 46, Y = 238, W = 990, H = 855;
// U C 🐯🐯🐯
// var X = 80, Y = 791, W = 908, H = 861;

// 安卓唯一识别设备码，用 adb devices 查看
var SERIAL = "ba0a33f8";

/////////////////////////////////////////////////
///////////////////**程序**//////////////////////
///////////////////////////////////////////////

console.log(">>>> GREEN 答题助手 <<<<");
console.log("v4.5.0");
console.log("正在获取手机图像...")
// 获取手机画面并编码载入 Buffer
client.screencap(SERIAL,function(err){
    if (err) {
        console.log("未连接手机"+err);
    }
}).then(function(stream) {
    console.log("正在剪裁并编码...")
    gm(stream).crop(W, H, X, Y).toBuffer('JPG',function(err, buffer){
        var stream = new Buffer(buffer).toString('base64');
        console.log("正在进行 OCR ...")
        OCR.baiduOCR(stream);
        if(err){
            console.log("编码失败"+err);
        }
    })
})

        


