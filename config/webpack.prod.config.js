const path = require('path');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ROOT = path.resolve(__dirname, '..');
const root = path.join.bind(path, ROOT);
process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';

module.exports = function() {
    return webpackMerge(baseWebpackConfig(),{
        mode: 'production',
        devtool: 'source-map',
        output: {
            path: root('dist'),
            filename: '[name].[chunkhash].bundle.js',
            sourceMapFilename: '[file].map',
            chunkFilename: '[id].[chunkhash].chunk.js',
        },
        module: {

        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[id].[contenthash].css',
            }),
            new CompressionPlugin({
                test: /\.js$|\.css$|\.html$/,
                cache: true,
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                threshold: 0,
                minRatio: 0.8,
                // 压缩完成后是否删除源文件,
                deleteOriginalAssets: false,
            }),
        ],
        optimization: {
            // production模式下自动开启
            minimize: true,
            minimizer: [
                new UglifyJsPlugin({
                    test: /\.js($|\?)/i,
                    // 是否启用缓存
                    cache: true,
                    // 启用并行化
                    parallel: true,
                    uglifyOptions: {
                        // 支持ie8
                        ie8: false,
                        // enable work around safari 10/11 bugs in loop scoping and await,
                        // 在循环作用域内能绕过safari 10/11 bugs并等待
                        safari10: true,
                        // ecma版本
                        ecma: 5,
                        warnings: true,
                        parse: {},
                        compress: true,
                        output: {
                            comments: false,
                            beautify: false,
                        },
                        mangle: {},
                    },
                }),
            ],
            runtimeChunk: {
                // 返回运行时的chunk名称，可用来修改最后输出的chunk块的name
                name: entrypoint => `${entrypoint.name}`,
            },
            // 注意如果设置chunkFilename，splitChunks中设置的name无效，
            // 会被chunkFilename取代，除非在splitChunks中设置filename
            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                cacheGroups: {
                    vendors: {
                        chunks: 'initial',
                        // 设置split chunk的文件名称，只适用于chunks: "initial",其他情况报错
                        filename: '[name].[chunkhash].bundle.js',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        name: 'vendors',
                    },
                },
            },
        },

    })
}
