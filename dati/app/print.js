var OCR = require ('./OCR.js');
var tool = require ('./tool.js');
var get = require ('./get.js');
const stringOccurrence = require('string-occurrence'); // 文字检索
exports.printResult = printResult;
function printResult(searchEngine, stringBuffer){
    var optOccu =[];//储存选项出现数量
    var i, a, b;
    var optAfterSort;
    console.log(">>>> 以下数据来自 " + searchEngine + " <<<<");
    function printOptions(i){
        var splitWords = [];//储存分词
        var stringOccuTemp = 0;
        var i = Number(i);
        if ( !OCR.isOptionWordsMoreThan5 || !isNaN(OCR.option[i]) ){
            optOccu[i] = stringOccurrence(stringBuffer, OCR.option[i]);
            console.log("选项" +  String.fromCharCode(65+i) + ":" + OCR.option[i] +" 出现约" + optOccu[i] + "次");
        } else if ( OCR.isOptionWordsMoreThan5 ){ //如果某个选项的文字数大于等于4个字
            for ( a = 0; a <= OCR.option[i].length-2; a += 2 ){
                splitWords.push(OCR.option[i].slice(a,a+2)); //两两分词并储存进 splitWords
            }
            console.log(splitWords);
            for ( b in splitWords ){
                stringOccuTemp += stringOccurrence(stringBuffer, splitWords[b]);
            }
            optOccu[i] = stringOccuTemp;
            console.log("选项" +  String.fromCharCode(65+i) + ":" + OCR.option[i] +" 出现约" + optOccu[i] + "次");
        }
    }
    for ( i in OCR.option) {
        printOptions(i);
    } // 打印选项
    optAfterSort = tool.quickSort(optOccu); //[1, 2, 3, 4]
    console.log("— — — — — — — — — — — — — — — — —");
    if( String(OCR.question).search(/不|错|最差|无关|无法|没关|没有|未与|未有+/) >= 0){  //不正确|不属|不包|不可能|不对|不用|不是|不指
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
