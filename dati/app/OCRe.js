var tool = require ('./tool.js');
var get = require ('./get.js');
var print = require ('./print');
const bosonnlp = require('bosonnlp');
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

//Boson API KEY
var nlp = new bosonnlp.BosonNLP('y5KSaEvo.23507.7RbLhfw8y5Ef');

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
        var finalOption = [];
        var HMOptionsWordsMoreThan3 = 0; //超过5个字符个数
        var reqURL = ""; //储存组合链接--Baidu
        var reqURL2 = ""; //储存组合链接--Google
        var reqURL3 = ""; //储存组合链接--Sogo

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
        words_result_num = 3;
        isOptionFull = true;
        // question = "夜盲症俗称“雀蒙眼”,一般是由于缺乏哪种维生素导致的?";
        // option = ['维生素A','维生素B','维生素C']
        // question = "在华北平原地区烧水时,水的沸点大约是?";
        // option = ['80°C ','90°C','100°C']
        question = "为什么人先看到闪电后听到雷声";
        option = ['美国哥伦比亚广播公司','河南、河北','南极地区','1998年3月24日','广播一件事情']
        // option = ['美国哥伦比亚广播公司']
        // 测试单元

        function OptionWordsProcessor(){ //对选项进行文字优化
            var i, a, b, c;
            var option_copy = option.concat();
            // for (i in option_copy){
            //     if(option_copy[i].search(/[#《》“”°「」]/) >= 0){
            //         option_copy[i] = option_copy[i].replace(/[#《》“”°C「」]/g,"") //去特殊符号（优化对书名的搜索）
            //         console.log("(处理代号01)已去除特殊符号:"+option_copy[i]);
            //     }
            //     if(option_copy[i].search(/[+\-,&/~、，·]/) >= 1){
            //         option_copy[i] = option_copy[i].split(/[+\-,&/~、，·]/) //去连接符号（优化对于英文名等选项的搜索）
            //         console.log("(处理代号02)已拆分选项:"+option_copy[i]);
            //     } 
            //     if(/^(?:[0-9]+)(?:\.?)(?:[0-9]*)(?:[a-zA-Z]+|[\u4e00-\u9fa5]+)$/.test(option_copy[i]) && option_copy[i].search(/[a-zA-Z]+|[\u4e00-\u9fa5]+/)>=3 ){
            //         let optionCache = [];
            //         let wordsStartFrom = option_copy[i].search(/[a-zA-Z]+|[\u4e00-\u9fa5]+/);
            //         optionCache.push(option_copy[i].slice(0, wordsStartFrom ));
            //         optionCache.push(option_copy[i].slice(wordsStartFrom, option_copy[i].length ));
            //         option_copy[i] = optionCache;
            //         console.log("(处理代号03)已拆分选项:"+option_copy[i]);//拆分数字与中英文单位（优化对带中英文单位的选项的搜索）
            //     }
            // }
            for (a in option_copy ){ 
                // if(option_copy[a].length <= 3 || option_copy[a].search(/[0-9A-Za-z]/)>=0 ){
                if(option_copy[a].length <= 3){
                    HMOptionsWordsMoreThan3 += 0;
                } else if (option_copy[a].length > 3){
                    HMOptionsWordsMoreThan3 += 1;
                }
            }
            if ( HMOptionsWordsMoreThan3 < option_copy.length ){ // 选项短不用分词
                console.log(HMOptionsWordsMoreThan3+" "+option_copy.length)
                // console.log("!!!不分词");
                for(b in option_copy) {
                    finalOption[b] = option_copy[b];
                }
            } else if ( HMOptionsWordsMoreThan3 === option_copy.length ){ // 选项长需要分词
                // console.log("!!!分词");
                // for(c in option_copy){
                    // let splitWords = [];//储存分词
                    // for ( d = 0; d <= option_copy[c].length-2; d += 2 ){
                    //     splitWords.push(option_copy[c].slice(d, d+2)); //两两分词并储存进 splitWords
                    // }

                    nlp.tag(option,function(data){
                        data = JSON.parse(data);
                        console.log(data);
                    });

                    nlp.extractKeywords(option,function(data){
                        data = JSON.parse(data);
                        console.log(data);
                    });

                    // nlp.tag(option, function(data){
                    //     data = JSON.parse(data);
                    //     console.log(data);
                    //     for (c in data){
                    //         let cache = [];
                    //         let cache_rubbish = [];
                    //         console.log("选项文字示例:" + option[c]);
                    //         for (i in data[c].word){
                    //             if(!/^(?:ude|c|r|p|vshi|vyou|wkz|wky|wyz|wyy)$/.test(data[c].tag[i])){
                    //                 console.log(data[c].word[i] + "("+data[c].tag[i]+")");
                    //                 cache.push(data[c].word[i]);
                    //             } else {
                    //                 cache_rubbish.push(data[c].word[i]);
                    //             }
                    //         }
                    //         console.log("已去除无用字词:" + cache_rubbish);
                    //         finalOption.push(cache);
                    //         // console.log("(处理代号04)选项过长已智能分词:"+finalOption[c])                            
                    //     }
                    // })
            }
            // console.log(finalOption);
        }
        OptionWordsProcessor();  
        

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
        exports.finalOption = finalOption;
        exports.option = option;

        //下载数据
        tool.download(reqURL3, function(data){get.getResults(data, "Sogou", "#main")}) //搜狗
        tool.download(reqURL, function(data){get.getResults(data, "Baidu", "#content_left")}) //百度
        tool.downloadG(opts, function(data){get.getResults(data, "Google", "#res")}) //Google
        
        //获取3个选项百度搜索结果条数
        function analyzeBaiduResNum(){
            var b, c;
            var encodeKeyWord = "";
            var optionInURL = "";
            var reqURLspec = "";
            var resNum = [];//储存每个选项的百度索引量
            exports.resNum = resNum;
            for(b in finalOption){
                if (typeof finalOption[b] === "string"){
                    optionInURL = finalOption[b];
                    encodeKeyWord = encodeURIComponent(question + " " + optionInURL);
                } else if (typeof finalOption[b] === "object"){
                    for (c in finalOption[b]){
                        optionInURL = optionInURL + finalOption[b][c];
                    }
                    encodeKeyWord = encodeURIComponent(question + " " + optionInURL);
                }
                reqURLspec = 'http://www.baidu.com/s?wd='+ encodeKeyWord ;
                tool.download(reqURLspec, get.getBaiduAll3ResNum, b);
             }
        }
        analyzeBaiduResNum();
        setTimeout(() => {
            print.printBaiduAll3ResNum();
        }, 3000); 
}).catch(function(err) {
    console.log(err);
});
}
