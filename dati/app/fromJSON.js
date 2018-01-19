const AipOcrClient = require("baidu-aip-sdk").ocr; // 百度 OCR
const fs = require('fs'); // 文件系统
const opn = require('opn'); // 跳转浏览器
const cheerio = require('cheerio'); //操作 DOM
const http = require('http');
const iconv = require('iconv-lite'); // 解码
const adb = require('adbkit'); //adb
const client = adb.createClient(); //adb 实例
const gm = require("gm"); // 图片剪裁
const Buffer = require('buffer').Buffer;
const stringOccurrence = require('string-occurrence'); // 文字检索

/////////////////////////////////////////////////
/////////////////**参数设置区**///////////////////
///////////////////////////////////////////////

// 冲顶⛰⛰⛰
// var X = 43, Y = 315, W = 995, H = 625;
// 西瓜🍉🍉🍉
var X = 56, Y = 240, W = 975, H = 920;
// 芝士🧀🧀🧀
// var X = 32, Y = 285, W = 1020, H = 810;
// 花椒🌹🌹🌹
// var X = 34, Y = 322, W = 1015, H = 935;

// 安卓唯一识别设备码，用 adb devices 查看
// var SERIAL = "ba0a33f8";

// 百度APPID/AK/SK
// var APP_ID = "10655178";
// var API_KEY = "jgU2VctUW2aZrbdermrRqWAz";
// var SECRET_KEY = "F8y2UvkXA8IgKNsFmykrXhfZ2yxCZOfE";

// 百度 OCR 参数设置
// var options = {};
// options["language_type"] = "CHN_ENG"; //识别语言类型
// options["detect_direction"] = "false"; //是否检测图像朝向
// options["detect_language"] = "false"; //是否检测语言
// options["probability"] = "false";

// var httpOptions = {
//     host: "127.0.0.1",
//     port: 1087,
    // path: "http://www.google.com",
    // headers: {
    //   Host: "www.google.com"
    // }
//   };
/////////////////////////////////////////////////
///////////////////**程序**//////////////////////
///////////////////////////////////////////////

console.log(">>>> GREEN 答题助手 <<<<");
console.log("v2.0.0");

//函数 获取下载网页源码 异步
function download(url, callback) {
    http.get(url, function(res) {
        var data = "";
        res.on("data", function (chunk) {
            data += chunk;
            // console.log("正在抓取数据...")
        });
        res.on("end", function() {
            callback(data);
            // console.log("数据抓取完成");
        });
    }).on("error", function(err) {
        callback(null);
    });
}



//数组内按大小排序
const quickSort = ([n, ...nums], desc) =>
  isNaN(n)
    ? []
    : [
        ...quickSort(nums.filter(v => (desc ? v > n : v <= n)), desc),
        n,
        ...quickSort(nums.filter(v => (!desc ? v > n : v <= n)), desc)
      ];

//数组判断是否每个key都相等
function isArrEqu (arr){
    var key,
        count = 0;
    for(key = 0;key < arr.length-1;key++){
        if (arr[key] === arr[key+1]){
            count += 1;
        }
    }
    if(count === arr.length - 1){
        return true;
    } else {
        return false;
    }
}
    
// console.log("正在获取手机图像...")
// // 获取手机画面并编码载入 Buffer
// client.screencap(SERIAL).then(function(stream) {
// // console.log("success 获取手机图像");
// console.log("正在剪裁并编码...")
//     gm(stream).crop(W, H, X, Y).toBuffer('JPG',function(err, buffer){
//         var buffer = new Buffer(buffer).toString('base64');
//         if(err){
// console.log("编码失败"+err);
//         }
//         // console.log("success 编码")
// console.log("正在进行 OCR ...")
//         baiduOCR(buffer);
//     })
// })

// function baiduOCR(imageBuffer){
//     // 新建一个对象，建议只保存一个对象调用服务接口
//     var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

    // 带参数调用通用文字识别, 图片参数为本地图片
    // client.generalBasic(imageBuffer, options).then(function(result) {
// console.log("success OCR")
var UCAPI= "http://answer.sm.cn/answer/curr?format=json&activity=million&_t=1515999633445&activity=million"
download(UCAPI, parseJSON )
function parseJSON (data){
console.log("正在整理问题及选项...")
        var i,o;
        var question = "";
        var option = [];
        var optOccu =[];
        var words_result;
        //var resNum =[]; //储存百度搜索条数
        var reqURL = ""; //储存组合链接--Baidu
        var reqURL2 = ""; //储存组合链接--Google

        function getResults (data, searchEngine, contentId){
            if(data){
                // console.log(data);
                var $ = cheerio.load(data, {
                    decodeEntities: false
                })
                var stringBuffer = $(contentId).html();
                console.log(">>>> 以下数据来自 " + searchEngine + " <<<<");
                optOccu[0] = stringOccurrence(stringBuffer, option[0]);
                console.log("选项" +  String.fromCharCode(65) + ":" + option[0] +" 出现约" + optOccu[0] + "次");
                optOccu[1] = stringOccurrence(stringBuffer, option[1]);
                console.log("选项" +  String.fromCharCode(66) + ":" + option[1] +" 出现约" + optOccu[1] + "次");
                optOccu[2] = stringOccurrence(stringBuffer, option[2]);
                console.log("选项" +  String.fromCharCode(67) + ":" + option[2] +" 出现约" + optOccu[2] + "次");
                var optAfterSort = quickSort(optOccu); //[1, 2, 3, 4]
                if( question.search(/不正确|不属于|不包括|不可能|不对|不用|不是|错|无关|无法|没关|没有|未与|未有+/) >= 0){  //不正确|不属于|不对|不用|不是
                    if (optAfterSort[0] ===optAfterSort[1]){
                        console.log("**** 我也不知道选哪个！****")
                    } else {
                        var index = optOccu.indexOf(optAfterSort[0]);
                        console.error("**** 推荐选择最少项:" + String.fromCharCode(65+index) + "." + option[index] + "****");

                    }
                } else {
                    if (optAfterSort[optAfterSort.length-1] === optAfterSort[optAfterSort.length-2]){
                        console.log("**** 我也不知道选哪个！****")
                    } else {
                        var index = optOccu.indexOf(optAfterSort[2]);
                        console.error("**** 推荐选择最多项:" + String.fromCharCode(65+index) + "." + option[index] + "****");
                    }
                }
                console.log(" ");
            } else {
                console.log("下载页面失败");
            }
        }

        // for(i in words_result){
        //     if(i <= words_result.length-4){
        //         question += words_result[i]["words"]; //收集问题文字
        //     }
        //     if (i > words_result.length-4){
        //         option.push(words_result[i]["words"]) //收集选项文字
        //     }
        // } 
        var words_result = JSON.parse(data);
        // console.log(words_result);
        question = words_result.data.title;
        for (key in words_result.data.options){
            option.push(words_result.data.options[key].title)
        };
//console.log("success 整理文字")
console.log("本轮问题是:"+question);
console.log("正在跳转到百度...")
        opn('https://baidu.com/s?wd='+question);
        var encodeKeyWord = encodeURIComponent(question);
        reqURL = "http://www.baidu.com/s?wd="+ encodeKeyWord;
        // reqURL2 = "http://www.google.com/search?q=" + encodeKeyWord;
        reqURL3 = "http://www.sogou.com/web?query=" + encodeKeyWord;
        // console.log(reqURL2);
console.log("正在分析答案...")
        //下载数据
        download(reqURL3, function(data){getResults(data, "搜狗 Sogo", "#main")}) //搜狗
        download(reqURL, function(data){getResults(data, "百度 Baidu", "#content_left")}) //百度
        // download(httpOptions, reqURL2, function(data){getResults(data, "谷歌 Google","#res")}) //Google
        
}

