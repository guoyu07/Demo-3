var print = require ('./print.js');
var OCR = require ('./OCR.js');
const cheerio = require('cheerio'); //操作 DOM
exports.getResults = getResults;
exports.getBaiduAll3ResNum = getBaiduAll3ResNum;
function getResults (data, searchEngine, contentId){
    if(data){
        // console.log(data);
        var $ = cheerio.load(data, {
            decodeEntities: false
        });
        var stringBuffer = $(contentId).html();
        print.printResult(searchEngine, stringBuffer);
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
        } catch(error){
            console.log("٩(ŏ﹏ŏ、)۶ 获取全部选项百度索引量出错")
        };
        OCR.resNum[index] = num;
    } else {
        console.log("err");
    }
}


    