var path = require('path');
var Webpack = require("webpack");
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry:'./src/main',//入口地址
    output: {//输出
        path: path.join(__dirname, './dist'),//文件地址
        filename: '[name].[hash].js',//文件名称由入口文件直接生成
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [//加载器
            { test: /\.js$/, loader:'babel-loader', exclude: /node_modules/ },// 转化ES6的语法
            { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?minimize!autoprefixer-loader?sourceMap')},// 编译css,自动添加css前缀并压缩，启用source-map
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},//图片转化，小于8K自动转化为base64的编码
            { test: /\.vue$/, loader:'vue-loader',
                options:{
                    loaders: {  
                        css: ExtractTextPlugin.extract({  
                            fallback:'vue-style-loader',   
                            use:'css-loader?minimize!autoprefixer-loader?sourceMap',  
                            publicPath:"../"  
                        }),  
                    }  
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
        }
    },
    devServer: {
        contentBase: './',// 输出文件的路径
        host: 'localhost',
        port: 9090,//9090端口访问
        inline: true,//监控js变化
        hot: true,// 开启热加载
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: path.join(__dirname, 'index.html'),//获取模板文件
            filename: 'index.html',//生成的文件名
            inject: 'body',//js插入的位置
            hash: true,//为静态资源生成hash值
            minify: { //压缩HTML文件    
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new Webpack.optimize.UglifyJsPlugin({minimize: true}),
        new ExtractTextPlugin("[name].[hash].css"),
    ],

}