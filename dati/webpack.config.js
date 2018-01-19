module.exports = {
    devtool: 'eval-source-map',
    entry:  __dirname + "/app/app.js",//唯一入口文件
    output: {
      path: __dirname + "/public",//打包后的文件存放的地方
      filename: "bundle.js"//打包后输出文件的文件名
    },
    module: {
      loaders: [
        { test: /\.json$/, loader: 'json-loader' }
      ]
    },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.js']
    },
    node: {
      // console: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    }
}