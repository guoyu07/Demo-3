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

function baiduOCR(imageBuffer){
    // 新建一个对象，建议只保存一个对象调用服务接口
    var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
    // 带参数调用通用文字识别, 图片参数为本地图片
    client.generalBasic(imageBuffer, options).then(function(result) {
        var words_result_num; //百度返回识别结果数量
        var words_result; //百度返回的识别结果数组
        var isOptionFull = true; //是否三个选项识别完全
        var i, a;
        var question = ""; //储存问题
        var option = []; //储存选项
        var finalOption;
        var reqURL = ""; //储存组合链接--Baidu
        var reqURL2 = ""; //储存组合链接--Google
        var reqURL3 = ""; //储存组合链接--Sogo
        
        // console.log(result);

        console.log("正在整理问题及选项...")
        words_result_num = result["words_result_num"];//百度返回识别结果数量
        words_result = result["words_result"];//百度返回的识别结果数组
        if (words_result_num <= 3 ){
            isOptionFull = false;
        }

        for(i in words_result){
            if (words_result_num >= 4) {
                if(i <= words_result_num-4){
                    question += words_result[i]["words"].replace(/^[1-9]{1}[0-2]?[.:,]?/,"").replace(/[丿]/g,""); //收集问题文字
                }
                if (i > words_result_num-4){
                    option.push(words_result[i]["words"].replace(/^[A-Dc]{1}\b[\.:,]?/,"").replace(/[丿]/g,"")); //收集选项文字
                }
            } else if ( words_result_num <= 3){
                if ( i < 1 ){
                    question += words_result[i]["words"].replace(/^[1-9]{1}[0-2]?[.:,]?/,"").replace(/[丿]/g,"");
                } else if ( i !== 0){
                    option.push(words_result[i]["words"].replace(/^[A-Dc]{1}\b[\.:,]?/,"").replace(/[丿]/g,""));
                }
            }
        } 

        // 测试单元(测试前请连上手机不必亮屏)
        // words_result_num = 3;
        // isOptionFull = true;
        // question = "夜盲症俗称“雀蒙眼”,一般是由于缺乏哪种维生素导致的?";
        // option = ['维生素A','维生素B','维生素C']
        // question = "在华北平原地区烧水时,水的沸点大约是?";
        // option = ['80°C ','90°C','100°C']
        // question = "为什么人先看到闪电后听到雷声";
        // option = ['美国哥伦比亚广播公司','','1998年3月24日']
        // option = ['美国哥伦比亚广播公司']
        // 测试单元

        
        wordsProcessor.OptionWordsProcessor(option);  
        

        console.log("本轮问题是:"+question);
        console.log("正在跳转到百度...")
        opn('https://baidu.com/s?wd='+question);
        var encodeKeyWord = encodeURIComponent(question);
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
        exports.question = question;
        // exports.finalOption = finalOption;
        exports.option = option;

        //下载数据
        tool.download(reqURL3, function(data){get.getWebpage(data, "Sogou", "#main")}) //搜狗
        tool.download(reqURL, function(data){get.getWebpage(data, "Baidu", "#content_left")}) //百度
        tool.downloadG(opts, function(data){get.getWebpage(data, "Google", "#res")}) //Google
        
    }).catch(function(err) {
        console.log(err);
    });
}
