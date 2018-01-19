var print = require ('./print.js');
const cheerio = require('cheerio'); //操作 DOM
exports.getResults = getResults;
var stringBuffer;
function getResults (data, searchEngine, contentId){
    if(data){
        // console.log(data);
        var $ = cheerio.load(data, {
            decodeEntities: false
        });
        stringBuffer = $(contentId).html();
        print.printResult(searchEngine, stringBuffer);
    } else {
        console.log("下载页面失败");
    }
}


    