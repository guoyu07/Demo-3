// var capPath = "assets/android.jpg";
// client.screencap(serial).then(function(stream){
//     stream.pipe(fs.createWriteStream(capPath)).pipe(
//         gm(stream).crop(1015, 935, 34, 322).write("assets/example.jpg", function(err){
//             if(err){
//                 console.log("图片剪裁失败:"+err);
//             }
//     }));
// })
// gm(stream).crop(1015, 935, 34, 322).write("assets/example.jpg", function(err){
    //     if(err){
    //         console.log("图片剪裁失败:"+err);
    //     }
    // })
    //gm(stream).crop(1015, 935, 34, 322).stream(function (err, stdout, stderr) {
        // var writeStream = fs.createWriteStream('assets/example.jpg');
        //stdout.pipe(baiduOCR(stdout));
    //});

// client.screencap(serial,function(stream){
//     stream.pipe(gm(stream).crop(1015, 935, 34, 322).write("assets/example.jpg", function(err){
//         if(err){
//         console.log("图片剪裁失败:"+err);
//         }
//     }))
// })
    // gm("assets/android.jpg").crop(1015, 935, 34, 322).write("assets/example.jpg", function(err){
    //     if(err){
    //     console.log("图片剪裁失败:"+err);
    //     }
    // }); 
    // var stream = fs.createReadStream('assets/android.jpg');
    // stream.on('data',function(data){
    //     console.log(data);
    // });
    // stream.on('end',function(data){
    //     console.log("成功获取手机画面,开始剪裁")
    //     gm(data,'img.jpg').write('assets/example.jpg', function (err) {
    //         if (err) console.log("结束剪裁"+err);
    // })
    // stream.on('error',function(data){
    //     console.log("剪裁失败"+err);
    // })

    // gm("assets/android.jpg").crop(1015, 935, 34, 322).stream(
    //     function (err, stdout, stderr) {
    //         if(err){
    //             console.log("图片剪裁失败:"+err);
    //             }
    //         var writeStream = fs.createWriteStream("assets/example.jpg");
    //         stdout.pipe(writeStream);
    //     }
    // )



//西瓜
// gm("assets/android.jpg").crop(975, 920, 56, 240).write("assets/example.jpg", function(err){
//     console.log("图片剪裁失败:"+err);
// });





// 冲顶
// gm("assets/android.jpg").crop(995, 780, 45, 270).write("assets/example.jpg", function(err){
//     console.log("图片剪裁失败:"+err);
// }); 



// fetchScreenCap = async () => {
//     const {stdout, stderr} = await exec(`${ADB_PATH} shell screencap -p ${SCREENCAP_REMOTE_PATH}`);
//     console.log('fetch...');
// };

// pullScreenCap = async () => {
//     const {stdout, stderr} = await exec(
//         `${ADB_PATH} pull ${SCREENCAP_REMOTE_PATH} ${SCREENCAP_PATH}/screencap.png`,
//         []
//     );
//     console.log('pull...');
// };

// refreshScreencap = async () => {
//     await fetchScreenCap();
//     await pullScreenCap();
// };

// refreshScreencap();

//设置图片路径
// var imgPath = "assets/example.jpg"

//设置计时器
var timer1 = Date.now();
var timer2;

// var image = fs.readFileSync(imgPath).toString("base64");
// var encodeKeyWord = question + " " + option[o];
// console.log("选项A:" + option[0] + resNum[0] + " " + "选项B:" + option[1] + resNum[1] + " " + "选项C:" + option[2] + resNum[2])
            //本次耗时
            // timer2 = Date.now();
            // time_consuming = timer2-timer1;
            // console.log("本次耗时:"+ time_consuming +" ms");
            //记录题目
    // var baiduRecog = JSON.stringify(result);
    // fs.writeFile("record.json",baiduRecog,function(err){
    //     if(err){
    //         console.error(err);
    //     }
    //     console.log("自动记录题目 done!");
    //     fs.readFile("input.txt",function(err,data){
    //         if(err){
    //             console.error(err);
    //         }
    //         console.log("读取记录内容:"+ data +" done!");
    //     });
    // })