var OCR = require('./OCR.js')
// const fs = require('fs'); // 文件系统
const adb = require('adbkit'); //adb
const client = adb.createClient(); //adb 实例
const gm = require("gm"); // 图片剪裁
// const Buffer = require('buffer').Buffer;

/////////////////////////////////////////////////
/////////////////**参数设置区**///////////////////
///////////////////////////////////////////////

// 冲顶 ⛰⛰⛰
var X = 67, Y = 314, W = 950, H = 670; //通用
// var X = 67, Y = 314, W = 950, H = 640; //一行
// var X = 67, Y = 314, W = 950, H = 720; //两行
// var X = 67, Y = 314, W = 950, H = 807; //三行
// 贴吧
// var X = 51, Y = 353, W = 977, H = 846;
// 优酷
// var X = 8, Y = 296, W = 1065, H = 953;
// 西瓜 🍉🍉🍉
// var X = 56, Y = 320, W = 975, H = 840;
// 西瓜 🍉🍉🍉(最强大脑)
// var X = 62, Y = 854, W = 964, H = 935;
// 芝士 🧀🧀🧀
// var X = 32, Y = 285, W = 1020, H = 810;
// 花椒 🌹🌹🌹 
// var X = 34, Y = 322, W = 1015, H = 935;
// U C 🐯🐯🐯
// var X = 93, Y = 388, W = 900, H = 910;
// 熊猫 🐼🐼🐼
// var X = 51, Y = 390, W = 981, H = 609;
// NICE 👍👍👍
// var X = 37, Y = 268, W = 1010, H = 820;
// 大白 ❄️❄️❄️
// var X = 71, Y = 405, W = 940, H = 650;
// 斗鱼 🐟🐟🐟
// var X = 46, Y = 238, W = 990 H = 855;

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

        


