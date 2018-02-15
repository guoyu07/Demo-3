const bosonnlp = require('bosonnlp');
var tool = require('./tool.js')
exports.OptionWordsProcessor = OptionWordsProcessor;

//Boson API KEY
var nlp = new bosonnlp.BosonNLP('y5KSaEvo.23507.7RbLhfw8y5Ef');

function OptionWordsProcessor(option){ //对选项进行文字优化
    var i, a, b, c;
    var finalOption = [];
    var HMOptionsWordsMoreThan5 = 0; //超过5个字符个数
    var option_copy = option.concat();
    for (a in option_copy ){ 
        if(option_copy[a].length < 5 || option_copy[a].search(/[0-9A-Za-z]/)>=0 ){
            HMOptionsWordsMoreThan5 += 0;
        } else if (option_copy[a].length >= 5){
            HMOptionsWordsMoreThan5 += 1;
        }
    }

    function localProcessor(i){
            if(option_copy[i].search(/[#《》“”°「」]/) >= 0){
                option_copy[i] = option_copy[i].replace(/[#《》“”°C「」]/g,"") //去特殊符号（优化对书名的搜索）
                option_copy.skipWordsSpliting = true;
                console.log("(本地处理01)去除特殊符号:"+option_copy[i]);
            }
            if(option_copy[i].search(/[+\-,&/~、，·]/) >= 1){
                option_copy[i] = option_copy[i].split(/[+\-,&/~、，·]/) //去连接符号（优化对于英文名等选项的搜索）
                option_copy.skipWordsSpliting = true;
                console.log("(本地处理02)拆分选项:"+option_copy[i]);
            } 
            if(/^(?:[0-9]+)(?:\.?)(?:[0-9]*)(?:[a-zA-Z]+|[\u4e00-\u9fa5]+)$/.test(option_copy[i]) && option_copy[i].search(/[a-zA-Z]+|[\u4e00-\u9fa5]+/)>=3 ){
                let optionCache = [];
                let wordsStartFrom = option_copy[i].search(/[a-zA-Z]+|[\u4e00-\u9fa5]+/);
                optionCache.push(option_copy[i].slice(0, wordsStartFrom ));
                optionCache.push(option_copy[i].slice(wordsStartFrom, option_copy[i].length ));
                option_copy[i] = optionCache;
                option_copy.skipWordsSpliting = true;
                console.log("(本地处理03)拆分选项:"+option_copy[i]);//拆分数字与中英文单位（优化对带中英文单位的选项的搜索）
            }

        if ( HMOptionsWordsMoreThan5 < option_copy.length || option_copy.skipWordsSpliting ){ // 选项短不用分词
            finalOption[i] = option_copy[i];
            finalOption[i] = tool.getNonRepeatKeywords(option_copy[i], i, option);
        } else if ( HMOptionsWordsMoreThan5 === option_copy.length ){ // 选项长需要分词
            let splitWords = [];//储存分词
            for ( d = 0; d <= option_copy[i].length-2; d += 2 ){
                    splitWords.push(option_copy[i].slice(d, d+2));
            }
            finalOption[i] = tool.getNonRepeatKeywords(splitWords, i, option);
            console.log("(本地处理04)暴力分词:"+finalOption[i])
        }
    }

    nlp.tag(option, function(data){
        var a,b;
        data = JSON.parse(data);
        // console.log(data);
        for(a in data){
            (function (a){
                // console.log('原选项是:'+option[a]);
                let singleOpSpQu = data[a].word.length;
                let cache = 0;
                for(b in data[a].tag){
                    if(/(?:^n.*$)|(?:^[tcp]$)/.test(data[a].tag[b])){ //Boson 处理筛选器
                        cache += 1;
                    }
                }
                if(singleOpSpQu === cache && cache >= 2){
                    // console.log("云端提取关键词"+option[a]);
                    nlp.extractKeywords(option[a], function(data){
                        data = JSON.parse(data);
                        var cache = [];
                        var c;
                        for(c in data[0]){
                            if(data[0][c][0] >= 0.3){
                                cache.push(data[0][c][1]);
                            }
                        }
                        finalOption[a] = tool.getNonRepeatKeywords(cache, a, option);
                        console.log('提取关键词:' + finalOption[a]);
                    })
                } else {
                    localProcessor(a);
                }
            })(a);//闭包防止a变化 
            exports.finalOption = finalOption;
        }
    })
}