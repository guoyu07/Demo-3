module.exports = {
    entry:  __dirname + "/app/app.js",//唯一入口文件
    output: {
      path: __dirname + "/public/js",//打包后的文件存放的地方
      filename: "bundle.js"//打包后输出文件的文件名
    }
  }