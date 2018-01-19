var OCR = require('./OCR.js')
// const fs = require('fs'); // 文件系统
const adb = require('adbkit'); //adb
const client = adb.createClient(); //adb 实例
const gm = require("gm"); // 图片剪裁
// const Buffer = require('buffer').Buffer;

/////////////////////////////////////////////////
/////////////////**参数设置区**///////////////////
///////////////////////////////////////////////

// 冲顶⛰⛰⛰
// var X = 67, Y = 314, W = 950, H = 640; //一行
var X = 67, Y = 314, W = 950, H = 720; //两行
// var X = 67, Y = 314, W = 950, H = 807; //三行
// 西瓜🍉🍉🍉
// var X = 56, Y = 240, W = 975, H = 920;
// 芝士🧀🧀🧀
// var X = 32, Y = 285, W = 1020, H = 845;
// 花椒🌹🌹🌹
// var X = 34, Y = 322, W = 1015, H = 935;

// 安卓唯一识别设备码，用 adb devices 查看
var SERIAL = "ba0a33f8";

/////////////////////////////////////////////////
///////////////////**程序**//////////////////////
///////////////////////////////////////////////

console.log(">>>> GREEN 答题助手 <<<<");
console.log("v4.0.0");
console.log("正在获取手机图像...")
// 获取手机画面并编码载入 Buffer
client.screencap(SERIAL).then(function(stream) {
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

        


