const adb = require('adbkit'); //adb
const client = adb.createClient(); //adb 实例
const gm = require("gm"); // 图片剪裁
var tool = require ('./tool.js');
var get = require ('./get.js');
var print = require ('./print.js');
var wordsProcessor = require ('./wordsProcessor.js')
const http = require('http');
const HttpProxyAgent = require('http-proxy-agent'); // node http 代理
const url = require('url');
const AipOcrClient = require("baidu-aip-sdk").ocr; // 百度 OCR
const opn = require('opn'); // 跳转浏览器
exports.baiduOCR = baiduOCR;

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

// 富聊
// 题目
var Xq = 81, Yq = 874, Wq = 903, Hq = 133;
// A选项
var Xoa = 135, Yoa = 1024, Woa = 356, Hoa = 109;
// B选项
var Xob = 608, Yob = 1024, Wob = 356, Hob = 109;
// C选项
var Xoc = 135, Yoc = 1200, Woc = 356, Hoc = 109;
// D选项
var Xod = 608, Yod = 1200, Wod = 356, Hod = 109;

// 安卓唯一识别设备码，用 adb devices 查看
var SERIAL = "ba0a33f8";

// function baiduOCROriginal(imageBuffer){
//     // 新建一个对象，建议只保存一个对象调用服务接口
//     var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
//     // 带参数调用通用文字识别, 图片参数为本地图片
//     client.generalBasic(imageBuffer, options).then(function(result) {
//         var words_result_num; //百度返回识别结果数量
//         var words_result; //百度返回的识别结果数组
//         var isOptionFull = true; //是否三个选项识别完全
//         var i, a;
//         var question = ""; //储存问题
//         var option = []; //储存选项
//         var finalOption;
//         var reqURL = ""; //储存组合链接--Baidu
//         var reqURL2 = ""; //储存组合链接--Google
//         var reqURL3 = ""; //储存组合链接--Sogo
        
//         console.log(result);

//         console.log("正在整理问题及选项...")
//         words_result_num = result["words_result_num"];//百度返回识别结果数量
//         words_result = result["words_result"];//百度返回的识别结果数组
//         if (words_result_num <= 3 ){
//             isOptionFull = false;
//         }

//         // //三选项

//         // for(i in words_result){
//         //     if (words_result_num >= 4) {
//         //         if(i <= words_result_num-4){
//         //             question += words_result[i]["words"].replace(/^[1-9]{1}[0-2]?[.:,]?/,"").replace(/[丿]/g,""); //收集问题文字
//         //         }
//         //         if (i > words_result_num-4){
//         //             option.push(words_result[i]["words"].replace(/^[A-Dc]{1}\b[\.:,]?/,"").replace(/[丿]/g,"")); //收集选项文字
//         //         }
//         //     } else if ( words_result_num <= 3){
//         //         if ( i < 1 ){
//         //             question += words_result[i]["words"].replace(/^[1-9]{1}[0-2]?[.:,]?/,"").replace(/[丿]/g,"");
//         //         } else if ( i !== 0){
//         //             option.push(words_result[i]["words"].replace(/^[A-Dc]{1}\b[\.:,]?/,"").replace(/[丿]/g,""));
//         //         }
//         //     }
//         // } 

//         //四选项

//         for(i in words_result){
//             if (words_result_num >= 6) {
//                 if(i <= words_result_num-5){
//                     question += words_result[i]["words"].replace(/^[1-9]{1}[0-2]?[.:,]?/,"").replace(/[丿]/g,""); //收集问题文字
//                 }
//                 if (i > words_result_num-5){
//                     option.push(words_result[i]["words"].replace(/^[A-Dc]{1}\b[\.:,]?/,"").replace(/[丿]/g,"")); //收集选项文字
//                 }
//             } else if ( words_result_num <= 5){
//                 if ( i < 1 ){
//                     question += words_result[i]["words"].replace(/^[1-9]{1}[0-2]?[.:,]?/,"").replace(/[丿]/g,"");
//                 } else if ( i !== 0){
//                     option.push(words_result[i]["words"].replace(/^[A-Dc]{1}\b[\.:,]?/,"").replace(/[丿]/g,""));
//                 }
//             }
//         } 


//         // 测试单元(测试前请连上手机不必亮屏)
//         // words_result_num = 3;
//         // isOptionFull = true;

//         // question = "夜盲症俗称“雀蒙眼”,一般是由于缺乏哪种维生素导致的?";
//         // option = ['维生素A','维生素B','维生素C']
//         // question = "在华北平原地区烧水时,水的沸点大约是?";
//         // option = ['80°C ','90°C','100°C']
//         // question = "中世纪城堡楼梯一般都是顺时针方向螺旋上升的原因是什么?";
//         // option = ['符合当时人们的审美','让防守城堡的人有优势','有利于城堡稳固']
//         // question = "发生洪水时洪水的最高水位处叫什么?";
//         // option = ['黄河洪峰水位','洪顶水位测试','洪极水位测试']
//         // question = "“胜作一书生”的前一句是以下哪个选项?";
//         // option = ['歌罢仰天叹','至今思项羽','宁为百夫长']
//         // question = "古代甲骨文是书写在什么上的?";
//         // option = ['大树或兽骨','石头和大树','石头或河流']
//         // question = "“清乾隆各种釉彩大瓶”装饰的釉、彩共达多少层?";
//         // option = ['164,1,243','1,731,443','181333']
//         // question = "一只木桶能装多少水取决于它?";
//         // option = ['最长的木板','最短的木板','无所谓']
//         // question = "“华尔街40号大厦”是哪座建筑的旧称？";
//         // option = ['纽约特朗普大厦','纽约帝国大厦','纽约洛克菲勒中心']
//         // question = "《走出非洲》讲述了女主角远炫肯尼亚的情故事,该片获得了什么奖项?";
//         // option = ['金鸡百花奖','奥斯卡最佳影片','格莱美奖']
//         // question = "大多数非洲人民的皮肤是?";
//         // option = ['白色的','黄色的','黑色的']
//         // question = "十二生肖也叫";
//         // option = ['十二动物','十二属相','十二肖像']
//         // 测试单元

//         wordsProcessor.OptionWordsProcessor(option);  
        

//         console.log("本轮问题是:"+question);
//         console.log("正在跳转到百度...")
//         opn('https://baidu.com/s?wd='+question);
//         var encodeKeyWord = encodeURIComponent(question);
//         reqURL = "http://www.baidu.com/s?wd="+ encodeKeyWord;
//         reqURL2 = "http://www.google.com.hk/search?q=" + encodeKeyWord;
//         reqURL3 = "http://www.sogou.com/web?query=" + encodeKeyWord;
//         // console.log(reqURL3);
//         console.log("正在分析答案...");
//         console.log("=================================");

//         // http 代理
//         var proxy = 'http://127.0.0.1:1087';
//         var endpoint = reqURL2;
//         var opts = url.parse(endpoint);
//         var agent = new HttpProxyAgent(proxy);
//         opts.agent = agent;     
        
//         exports.isOptionFull = isOptionFull;
//         exports.question = question;
//         // exports.finalOption = finalOption;
//         exports.option = option;

//         //下载数据
//         tool.download(reqURL3, function(data){get.getWebpage(data, "Sogou", "div.results")}) //搜狗
//         tool.download(reqURL, function(data){get.getWebpage(data, "Baidu", "#content_left")}) //百度
//         tool.downloadG(opts, function(data){get.getWebpage(data, "Google", "#res")}) //Google
        
//     }).catch(function(err) {
//         console.log(err);
//     });
// }

var recognizeCache = {};
var questionGlobal;

function baiduOCR(imageBuffer, part){
    // 新建一个对象，建议只保存一个对象调用服务接口
    var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
    // 带参数调用通用文字识别, 图片参数为本地图片
    client.generalBasic(imageBuffer, options).then(function(result) {
        if (result.hasOwnProperty('error_code')){
            baiduOCR(imageBuffer, part);
            return;
        }
        recognizeCache[part] = result.words_result;
    })
}

console.log(">>>> GREEN 答题助手 富聊专版 <<<<");
console.log("v5.0.0");
console.log("正在获取手机图像...")

// 获取手机画面并编码载入 Buffer
client.screencap(SERIAL,function(err){
    if (err) {
        console.log("未连接手机"+err);
    }
}).then(function(stream) {
    console.log("正在剪裁并编码...")
    gm(stream).crop(Wq, Hq, Xq, Yq).toBuffer('JPG',function(err, buffer){
        var stream = new Buffer(buffer).toString('base64');
        baiduOCR(stream, 'question');
        if(err){
            console.log("编码失败"+err);
        }
    })
    gm(stream).crop(Woa, Hoa, Xoa, Yoa).toBuffer('JPG',function(err, buffer){
        var stream = new Buffer(buffer).toString('base64');
        baiduOCR(stream, 'A');
        if(err){
            console.log("编码失败"+err);
        }
    })
    gm(stream).crop(Wob, Hob, Xob, Yob).toBuffer('JPG',function(err, buffer){
        var stream = new Buffer(buffer).toString('base64');
        baiduOCR(stream, 'B');
        if(err){
            console.log("编码失败"+err);
        }
    })
    gm(stream).crop(Woc, Hoc, Xoc, Yoc).toBuffer('JPG',function(err, buffer){
        var stream = new Buffer(buffer).toString('base64');
        baiduOCR(stream, 'C');
        if(err){
            console.log("编码失败"+err);
        }
    })
    gm(stream).crop(Wod, Hod, Xod, Yod).toBuffer('JPG',function(err, buffer){
        var stream = new Buffer(buffer).toString('base64');
        baiduOCR(stream, 'D');
        if(err){
            console.log("编码失败"+err);
        }
    })
    var timer2 = setInterval(function(){
        if(recognizeCache.question){
            var questionCache = '';
            // console.log(recognizeCache.question);
            recognizeCache.question.forEach(function(item){
                questionCache += item.words
            });
            questionGlobal = questionCache;
            opn('https://baidu.com/s?wd='+questionGlobal);
            clearInterval(timer2);
        }
    },500)
    var timer1 = setInterval(function(){
        console.log('正在进行 OCR...')
        var readyItems = 0;
        for(key in recognizeCache){
            if (recognizeCache[key]){
                readyItems += 1;
            }
        }
        // console.log(recognizeCache);
        if(readyItems === 5){
            // console.log(recognizeCache);
            clearInterval(timer1);
            next();
        }
    },500)
})

function next(){
    var words_result_num = 5; //百度返回识别结果数量
    var isOptionFull = true; //是否三个选项识别完全
    var option = []; //储存选项
    var reqURL = ""; //储存组合链接--Baidu
    var reqURL2 = ""; //储存组合链接--Google
    var reqURL3 = ""; //储存组合链接--Sogo
    var a;
    
    for (a = 0; a < 4; a++){
        let cache = "";
        recognizeCache[String.fromCharCode(65+a)].forEach(function(item){
            cache += item.words.replace(/^[A-Dc]\b[.,]?/,'')
        })
        option.push(cache);
    }
    wordsProcessor.OptionWordsProcessor(option);  
    console.log("本轮问题是:"+ questionGlobal);
    console.log("正在跳转到百度...")
    // opn('https://baidu.com/s?wd='+question);
    var encodeKeyWord = encodeURIComponent(questionGlobal);
    reqURL = "http://www.baidu.com/s?wd="+ encodeKeyWord;
    reqURL2 = "http://www.google.com.hk/search?q=" + encodeKeyWord;
    reqURL3 = "http://www.sogou.com/web?query=" + encodeKeyWord;
    // console.log(reqURL3);
    console.log("正在分析答案...");
    console.log("=================================");
    // http 代理
    var proxy = 'http://127.0.0.1:1087';
    var endpoint = reqURL2;
    var opts = url.parse(endpoint);
    var agent = new HttpProxyAgent(proxy);
    opts.agent = agent;     
    
    exports.isOptionFull = isOptionFull;
    exports.question = questionGlobal;
    exports.option = option;
    //下载数据
    tool.download(reqURL3, function(data){get.getWebpage(data, "Sogou", "div.results")}) //搜狗
    tool.download(reqURL, function(data){get.getWebpage(data, "Baidu", "#content_left")}) //百度
    tool.downloadG(opts, function(data){get.getWebpage(data, "Google", "#res")}) //Google
}


