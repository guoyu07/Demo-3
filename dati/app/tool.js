const iconv = require('iconv-lite'); // 解码
const http = require('http');
exports.download = download;
exports.downloadG = downloadG;

//函数 获取下载网页源码 异步
function download(url, callback, index) {
    index = index || undefined;
    http.get(url, function(res) {
        var data = "";
        res.on("data", function (chunk) {
            data += chunk;
            // console.log("正在抓取数据..."+data)
        });
        res.on("end", function() {
            callback(data, index);
            // console.log("数据抓取完成");
        });
    }).on("error", function(err) {
        callback(null);
    });
}// 针对国内搜索引擎

function downloadG(httpOptions, callback) {
    http.get(httpOptions, function(res) {
        var data = "";
        res.on("data", function (chunk) {
            data += iconv.decode(chunk, 'big-5');
        });
        res.on("end", function() {
            callback(data);
        });
    }).on("error", function(err) {
        callback(null);
    });
}// 针对 Google


var quickSort = ([n, ...nums], desc) => 
  isNaN(n)
    ? []
    : [
        ...quickSort(nums.filter(v => (desc ? v > n : v <= n)), desc),
        n,
        ...quickSort(nums.filter(v => (!desc ? v > n : v <= n)), desc)
      ];

exports.quickSort = quickSort;
//数组判断是否每个key都相等
// function isArrEqu (arr){
//     var key,
//         count = 0;
//     for(key = 0;key < arr.length-1;key++){
//         if (arr[key] === arr[key+1]){
//             count += 1;
//         }
//     }
//     if(count === arr.length - 1){
//         return true;
//     } else {
//         return false;
//     }
// }