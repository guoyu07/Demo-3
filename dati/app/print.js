var OCR = require ('./OCR.js');
var tool = require ('./tool.js');
var wordsProcessor = require ('./wordsProcessor.js');
var get = require ('./get.js');
const stringOccurrence = require('string-occurrence'); // 文字检索
exports.printResult = printResult;
exports.printBaiduAll3ResNum = printBaiduAll3ResNum;
function printResult(searchEngine, stringBuffer){
    var optOccu =[];//储存选项出现数量
    var i, a, b;
    var optAfterSort;
    console.log(">>>> 以下数据来自 " + searchEngine + " <<<<");
    function printOptions(i){
        var b;
        var splitWords = [];//储存分词
        var stringOccuTemp = 0;
        var i = Number(i);
        if ( typeof wordsProcessor.finalOption[i] === "string" ){
            try {
                optOccu[i] = stringOccurrence(stringBuffer, wordsProcessor.finalOption[i]);
                // console.log(stringBuffer);
            } catch(error){
                console.log("٩(ŏ﹏ŏ、)۶ "+searchEngine+" 无数据!");
            }
            console.log("选项" +  String.fromCharCode(65+i) + ":" + OCR.option[i] +" 出现约" + optOccu[i] + "次");
        } else if (typeof wordsProcessor.finalOption[i] === "object"){
            let cache = [];
            for (b in wordsProcessor.finalOption[i]){
                // console.log("正在检索"+wordsProcessor.finalOption[i][b]);
                // console.log(stringBuffer);
                try {
                    cache.push(stringOccurrence(stringBuffer, wordsProcessor.finalOption[i][b]));
                } catch(error){
                    console.log("٩(ŏ﹏ŏ、)۶ "+searchEngine+" 无数据!");
                }
            }
            let cacheAfterSort = tool.quickSort(cache);
            optOccu[i] = cacheAfterSort[cacheAfterSort.length-1];
            console.log("选项" +  String.fromCharCode(65+i) + ":" + OCR.option[i] +" 出现约" + optOccu[i] + "次");
        }
    }
    for (i in wordsProcessor.finalOption) {
        printOptions(i);
    } // 打印选项
    optAfterSort = tool.quickSort(optOccu); //[1, 2, 3, 4]
    console.log("— — — — — — — — — — — — — — — — —");
    if(/(不正确|不属|不适合|不包|不可能|不对|不用|不是|不指|错|无关|无法|没关|没有|未与|未有){1}/.test(String(OCR.question))){
    // if( String(OCR.question).search(/不|错|最差|无关|无法|没关|没有|未与|未有+/) >= 0){  //不正确|不属|不适合|不包|不可能|不对|不用|不是|不指
        if (optAfterSort[0] === optAfterSort[1]){
            console.log("٩(ŏ﹏ŏ、)۶ 无法给出答案！")
        } else {
            var index = optOccu.indexOf(optAfterSort[0]);
            console.log("推荐选择最少项:" + String.fromCharCode(65+index) + "." + OCR.option[index]);
        }
    } else {
        if (optAfterSort[optAfterSort.length-1] === optAfterSort[optAfterSort.length-2]){
            console.log("٩(ŏ﹏ŏ、)۶ 无法给出答案")
        } else {
            var index = optOccu.indexOf(optAfterSort[optAfterSort.length-1]);
            console.log("推荐选择最多项:" + String.fromCharCode(65+index) + "." + OCR.option[index]);
        }
    }
    if(!OCR.isOptionFull){
        console.log("٩(ŏ﹏ŏ、)۶ 警告!选项识别不全!");
    }
    console.log("=================================");
}

function printBaiduAll3ResNum (){
    console.log("各选项索引量为:");
    for (a in OCR.option){
        console.log("选项" +  String.fromCharCode(65+Number(a)) + ":" + OCR.option[a] +" 索引量为" + get.resNum[a] + "条");
    }
}
