var print = require ('./print.js');
var OCR = require ('./OCR.js');
var wordsProcessor = require ('./wordsProcessor.js')
var tool = require ('./tool.js')
const cheerio = require('cheerio'); //操作 DOM
exports.getWebpage = getWebpage;
exports.getBaiduAll3ResNum = getBaiduAll3ResNum;
var areAllOpRd = false;
var resNum = [];//储存每个选项的百度索引量
var areAllBaiduResNumRd = false;
function getWebpage (data, searchEngine, contentId){
    if(data){
        var $ = cheerio.load(data, {
            decodeEntities: false
        });
        try {
            let filterReg = /<\/?(?:a|em|b|span|div|h3|li|ul|ol|img|br|i|p|strong)[\w\W]*?>|<(?:cite|style|script)[\w\W]*?>[\w\W]*?<\/(cite|style|script)|>|<!--[\w\W]*?-->|(?:sogou_preview_link="[\w\W]*?")|(?:url="[\w\W]*?")/gm;
            var stringBuffer = $(contentId).html().replace(filterReg,"");
            // console.log(stringBuffer);
        } catch(error){
            console.log("٩(ŏ﹏ŏ、)۶ "+searchEngine+" 无数据!");
        }
        if (areAllOpRd){
            print.printResult(searchEngine, stringBuffer);
            return;
        } else {
            var timer1 = setInterval(function(){
                var a;
                var count = 0;
                // console.log(wordsProcessor.finalOption);
                for (a in wordsProcessor.finalOption){
                    if(wordsProcessor.finalOption){
                        count += 1;
                    }
                }
                if(count === OCR.option.length){
                    areAllOpRd = true;
                    // console.log(wordsProcessor.finalOption);
                    print.printResult(searchEngine, stringBuffer);
                    clearInterval(timer1);
                } else {
                    console.log("等待分析选项字词...")
                }
            },200)
        }
    } else {
        console.log("下载页面失败");
    }
}

function getBaiduAll3ResNum (data, index){
    if(data){
        var $ = cheerio.load(data, {
            decodeEntities: false
        });
        try {
            var num = $(".nums").html().split("百度为您找到相关结果约")[1].split("个")[0];
            // console.log(num);
        } catch(error){
            console.log("٩(ŏ﹏ŏ、)۶ 获取全部选项百度索引量出错")
        };
        resNum[index] = num;
        exports.resNum = resNum;
        // console.log(baiduResReadyNum);
    } else {
        console.log("err");
    }
}
//获取3个选项百度搜索结果条数
function analyzeBaiduResNum(finalOption){
    var b, c;
    var encodeKeyWord = "";
    var optionInURL = "";
    var reqURLspec = "";
    for(b in finalOption){
        if (typeof finalOption[b] === "string"){
            optionInURL = finalOption[b];
            encodeKeyWord = encodeURIComponent(OCR.question + " " + optionInURL);
        } else if (typeof finalOption[b] === "object"){
            for (c in finalOption[b]){
                optionInURL = optionInURL + finalOption[b][c];
            }
            encodeKeyWord = encodeURIComponent(OCR.question + " " + optionInURL);
        }
        reqURLspec = 'http://www.baidu.com/s?wd='+ encodeKeyWord ;
        tool.download(reqURLspec, getBaiduAll3ResNum, b);
     }
}
var timer2 = setInterval(function(){
    if(areAllOpRd){
        analyzeBaiduResNum(wordsProcessor.finalOption);
        clearInterval(timer2);
        var timer3 = setInterval(function(){
            var a;
            var ready = 0;
            for (a in resNum){
                if(resNum[a]){
                    ready += 1
                }
            }
            if(ready === OCR.option.length){
                areAllBaiduResNumRd = true;
            }
            if(areAllBaiduResNumRd){
                // console.log(baiduResReadyNum+" "+OCR.option.length);
                print.printBaiduAll3ResNum();
                clearInterval(timer3);
            }
        }, 500);
    }
},500)

 


    