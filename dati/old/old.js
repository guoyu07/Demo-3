const AipOcrClient = require("baidu-aip-sdk").ocr; // 百度 OCR
const fs = require('fs'); // 文件系统
const opn = require('opn'); // 跳转浏览器
const cheerio = require('cheerio'); //操作 DOM
const http = require('http');
var url = require('url');
// const https =require('https');
const iconv = require('iconv-lite'); // 解码
const adb = require('adbkit'); //adb
const client = adb.createClient(); //adb 实例
const gm = require("gm"); // 图片剪裁
const Buffer = require('buffer').Buffer;
const stringOccurrence = require('string-occurrence'); // 文字检索
var HttpProxyAgent = require('http-proxy-agent');

/////////////////////////////////////////////////
/////////////////**参数设置区**///////////////////
///////////////////////////////////////////////

// 冲顶⛰⛰⛰
var X = 43, Y = 315, W = 995, H = 670; 
// 西瓜🍉🍉🍉
// var X = 56, Y = 240, W = 975, H = 920;
// 芝士🧀🧀🧀
// var X = 32, Y = 285, W = 1020, H = 845;
// 花椒🌹🌹🌹
// var X = 34, Y = 322, W = 1015, H = 935;

// 安卓唯一识别设备码，用 adb devices 查看
var SERIAL = "ba0a33f8";

// 百度APPID/AK/SK
var APP_ID = "10655178";
var API_KEY = "jgU2VctUW2aZrbdermrRqWAz";
var SECRET_KEY = "F8y2UvkXA8IgKNsFmykrXhfZ2yxCZOfE";

// 百度 OCR 参数设置
var options = {};
options["language_type"] = "CHN_ENG"; //识别语言类型
options["detect_direction"] = "false"; //是否检测图像朝向
options["detect_language"] = "false"; //是否检测语言
options["probability"] = "false";

// var httpOptions = {
//     host: "127.0.0.1",
//     port: 1087,
//     method: 'get',
//     path: "",
// };

function downloadG(httpOptions, callback) {
    http.get(httpOptions, function(res) {
        // var data = [];
        var data = "";
        res.on("data", function (chunk) {
            // data.push(chunk);
            data += iconv.decode(chunk, 'big-5');
            // console.log("正在抓取Google数据...")
            // console.log(chunk);
        });
        res.on("end", function() {
            // var html = iconv.decode(Buffer.concat(data), 'utf-8');
            callback(data);
            // console.log(data);
            // console.log("数据抓取Google完成");
        });
    }).on("error", function(err) {
        callback(null);
    });
}
/////////////////////////////////////////////////
///////////////////**程序**//////////////////////
///////////////////////////////////////////////

console.log(">>>> GREEN 答题助手 <<<<");
console.log("v4.0.0");

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
    if (err){
        console.log("快速排序出错："+err);
    }
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
    
console.log("正在获取手机图像...")
// 获取手机画面并编码载入 Buffer
client.screencap(SERIAL).then(function(stream) {
// console.log("success 获取手机图像");
console.log("正在剪裁并编码...")
    gm(stream).crop(W, H, X, Y).toBuffer('JPG',function(err, buffer){
        var stream = new Buffer(buffer).toString('base64');
        if(err){
console.log("编码失败"+err);
        }
        // console.log("success 编码")
console.log("正在进行 OCR ...")
        baiduOCR(stream);
    })
})

function baiduOCR(imageBuffer){
    // 新建一个对象，建议只保存一个对象调用服务接口
    var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

    // 带参数调用通用文字识别, 图片参数为本地图片
    client.generalBasic(imageBuffer, options).then(function(result) {
// console.log(result);
console.log("正在整理问题及选项...")
        var i,o,a;
        var question = "";
        var option = [];
        var optOccu =[];
        var words_result_num = result["words_result_num"];//百度返回识别结果数量
        var words_result = result["words_result"];//百度返回的识别结果数组
        var isOptionFull = true;
        var isOptionWordsMoreThan5 = false;
        //var resNum =[]; //储存百度搜索条数
        var reqURL = ""; //储存组合链接--Baidu
        var reqURL2 = ""; //储存组合链接--Google
        if (words_result_num <= 3 ){
            isOptionFull = false;
        }

        function getResults (data, searchEngine, contentId){
            if(data){
                var optOccu = [];
                function printResult(i){
                    // console.log(isNaN(option[i]))
                    var splitWords = [], a, b, stringOccuTemp = 0;
                    i = Number(i);
                    if ( !isOptionWordsMoreThan5 || !isNaN(option[i]) ){
                        optOccu[i] = stringOccurrence(stringBuffer, option[i]);
                        console.log("选项" +  String.fromCharCode(65+i) + ":" + option[i] +" 出现约" + optOccu[i] + "次");
                    } else if ( isOptionWordsMoreThan5 ){ //如果某个选项的文字数大于等于4个字
                        for ( a = 0; a <= option[i].length-2; a += 2 ){
                            splitWords.push(option[i].slice(a,a+2)); //两两分词并储存进 splitWords
                        }
                        for ( b in splitWords ){
                            stringOccuTemp += stringOccurrence(stringBuffer, splitWords[b]);
                        }
                        optOccu[i] = stringOccuTemp;
                        console.log("选项" +  String.fromCharCode(65+i) + ":" + option[i] +" 出现约" + optOccu[i] + "次");
                    }
                } //分析并打印词频率
                // console.log(data);
                var $ = cheerio.load(data, {
                    decodeEntities: false
                });
                var stringBuffer = $(contentId).html();
                console.log(">>>> 以下数据来自 " + searchEngine + " <<<<");
                for ( i in option) {
                    printResult(i);
                }
                var optAfterSort = quickSort(optOccu); //[1, 2, 3, 4]
                console.log("— — — — — — — — — — — — — — — — —");
                if( question.search(/不|错|最差|无关|无法|没关|没有|未与|未有+/) >= 0){  //不正确|不属|不包|不可能|不对|不用|不是|不指
                    if (optAfterSort[0] === optAfterSort[1]){
                        console.log("推荐选项：无法给出答案！")
                    } else {
                        var index = optOccu.indexOf(optAfterSort[0]);
                        console.log("推荐选择最少项:" + String.fromCharCode(65+index) + "." + option[index]);
                    }
                } else {
                    if (optAfterSort[optAfterSort.length-1] === optAfterSort[optAfterSort.length-2]){
                        console.log("推荐选项：无法给出答案")
                    } else {
                        var index = optOccu.indexOf(optAfterSort[optAfterSort.length-1]);
                        console.log("推荐选择最多项:" + String.fromCharCode(65+index) + "." + option[index]);
                    }
                }
                if(!isOptionFull){
                    console.log("٩(ŏ﹏ŏ、)۶ 警告!选项识别不全!");
                }
                console.log("=================================");
            } else {
                console.log("下载页面失败");
            }
        }

        for(i in words_result){
            if (words_result_num >= 4) {
                if(i <= words_result_num-4){
                    question += words_result[i]["words"]; //收集问题文字
                }
                if (i > words_result_num-4){
                    option.push(words_result[i]["words"]); //收集选项文字
                }
            } else if ( words_result_num <= 3){
                if ( i < 1 ){
                    question += words_result[i]["words"];
                } else if ( i !== 0){
                    option.push(words_result[i]["words"]);
                }
            }
        } 

        for ( a in option ){ 
            if(option[a].length < 5){
                isOptionWordsMoreThan5 = false;
            } else if (option[a].length >= 5){
                isOptionWordsMoreThan5 = true;
            }
        }
        // console.log("question"+question);
        // console.log("option"+option);
//console.log("success 整理文字")
console.log("本轮问题是:"+question);
console.log("正在跳转到百度...")
        opn('https://baidu.com/s?wd='+question);
        var encodeKeyWord = encodeURIComponent(question);
        reqURL = "http://www.baidu.com/s?wd="+ encodeKeyWord;
        reqURL2 = "http://www.google.com.hk/search?q=" + encodeKeyWord;
        reqURL3 = "http://www.sogou.com/web?query=" + encodeKeyWord;
        // console.log(reqURL2);

        var proxy = 'http://127.0.0.1:1087';
        var endpoint = reqURL2;
        var opts = url.parse(endpoint);
        var agent = new HttpProxyAgent(proxy);
        opts.agent = agent;

        // console.log(httpOptions.path);
console.log("正在分析答案...");
console.log("=================================");

        //下载数据
        download(reqURL3, function(data){getResults(data, "搜狗 Sogo", "#main")}) //搜狗
        download(reqURL, function(data){getResults(data, "百度 Baidu", "#content_left")}) //百度
        downloadG(opts, function(data){getResults(data, "谷歌 Google","#res")}) //Google
        

        //获取3个选项百度搜索结果条数
        // for(o=0;o < option.length;o++){
        //     var encodeKeyWord = encodeURIComponent(question + option[o]);
        //     reqURL = 'http://www.baidu.com/s?wd='+ encodeKeyWord ;
        //     download(reqURL, o, function(data,index){
        //         if(data){
        //             var $ = cheerio.load(data, {
        //                 decodeEntities: false
        //             });
        //             var num = $(".nums").html().split("百度为您找到相关结果约")[1].split("个")[0]
        //             resNum[index] = num;
        //         } else {
        //             console.log("err");
        //         }
        //         console.log("选项"+  String.fromCharCode(65+index) + ":" + option[index] +" 结果约" + resNum[index] + "个")
        //     });
        // }
        //console.log("抓取各选项百度数据量为:");
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});

}
