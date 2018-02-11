const bosonnlp = require('bosonnlp');
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
        // for (i in option_copy){
            if(option_copy[i].search(/[#《》“”°「」]/) >= 0){
                option_copy[i] = option_copy[i].replace(/[#《》“”°C「」]/g,"") //去特殊符号（优化对书名的搜索）
                console.log("(本地处理01)去除特殊符号:"+option_copy[i]);
            }
            if(option_copy[i].search(/[+\-,&/~、，·]/) >= 1){
                option_copy[i] = option_copy[i].split(/[+\-,&/~、，·]/) //去连接符号（优化对于英文名等选项的搜索）
                console.log("(本地处理02)拆分选项:"+option_copy[i]);
            } 
            if(/^(?:[0-9]+)(?:\.?)(?:[0-9]*)(?:[a-zA-Z]+|[\u4e00-\u9fa5]+)$/.test(option_copy[i]) && option_copy[i].search(/[a-zA-Z]+|[\u4e00-\u9fa5]+/)>=3 ){
                let optionCache = [];
                let wordsStartFrom = option_copy[i].search(/[a-zA-Z]+|[\u4e00-\u9fa5]+/);
                optionCache.push(option_copy[i].slice(0, wordsStartFrom ));
                optionCache.push(option_copy[i].slice(wordsStartFrom, option_copy[i].length ));
                option_copy[i] = optionCache;
                console.log("(本地处理03)拆分选项:"+option_copy[i]);//拆分数字与中英文单位（优化对带中英文单位的选项的搜索）
            }
        // }

        if ( HMOptionsWordsMoreThan5 < option_copy.length ){ // 选项短不用分词
            // for(b in option_copy) {
                finalOption[i] = option_copy[i];
            // }
            // return finalOption;
        } else if ( HMOptionsWordsMoreThan5 === option_copy.length ){ // 选项长需要分词
            // for(c in option_copy){
            let splitWords = [];//储存分词
            for ( d = 0; d <= option_copy[i].length-2; d += 2 ){
                let isntSpecKeyword = 0;//排除干扰关键词
                let a;
                for(a in option){
                    if(a === i){
                        isntSpecKeyword += 0;
                    } else {
                        isntSpecKeyword += option[a].indexOf(option_copy[i].slice(d, d+2)) + 1 
                    }
                }
                if (!isntSpecKeyword){
                    splitWords.push(option_copy[i].slice(d, d+2));
                } 
                // else {
                //     console.log(option_copy[i].slice(d, d+2)+ "出现在"+ option[a] + (option[a].indexOf(option_copy[i].slice(d, d+2)) + 1))
                // }
            }
            finalOption[i] = splitWords;
            console.log("(本地处理04)暴力分词:"+finalOption[i])
        }
        // exports.finalOption = finalOption;
        // console.log(finalOption);
    }

    nlp.tag(option, function(data){
        // console.log(option);
        var a,b;
        data = JSON.parse(data);
        // console.log(data);
        for(a in data){
            (function (a){
                let singleOpSpQu = data[a].word.length;
                // console.log("singleOpSpQus"+singleOpSpQu)
                let cache = 0;
                for(b in data[a].tag){
                    if(/(?:^n.*$)|(?:^t$)/.test(data[a].tag[b])){
                        cache += 1;
                        // console.log(cache);
                    }
                }
                if(singleOpSpQu === cache && cache >= 2){
                    // console.log("云端提取关键词"+option[a]);
                    nlp.extractKeywords(option[a], function(data){
                        // console.log(data);
                        data = JSON.parse(data);
                        // console.log(data);
                        var cache = [];
                        var c;
                        for(c in data[0]){
                            if(data[0][c][0] >= 0.3){
                                let isntSpecKeyword = 0;//排除干扰关键词
                                let i;
                                for(i in option){
                                    if(i === a){
                                        isntSpecKeyword += 0;
                                    } else {
                                        isntSpecKeyword += (option[i].indexOf(data[0][c][1]) + 1)
                                    }
                                }
                                if (!isntSpecKeyword){
                                    // console.log(data[0][c][1])
                                    cache.push(data[0][c][1]);
                                }
                            }
                        }
                        finalOption[a] = cache;
                        // console.log("finalOption" + finalOption);
                        console.log('(云端处理01)智能提取关键词:' + finalOption[a]);
                    })
                } else {
                    localProcessor(a);
                }
            })(a);//闭包防止a变化 
            exports.finalOption = finalOption;
        }
        
    })

    // exports.finalOption = finalOption;
    // console.log(finalOption);
}