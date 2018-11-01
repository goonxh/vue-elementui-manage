const path = require('path');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const ROOT = path.resolve(__dirname, '..');
const root = path.join.bind(path, ROOT);

const METADATA = webpackMerge(baseWebpackConfig().metadata,{
    host: 'localhost',
    port: 3003
})
process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

module.exports = function() {
    return webpackMerge(baseWebpackConfig(),{
        mode: 'development',
        devtool: 'cheap-module-source-map',
        output: {
            path: root('dist'),
            filename: '[name].bundle.js',
            sourceMapFilename: '[file].map',
            chunkFilename: '[id].chunk.js',
        },
        module: {

        },
        plugins: [

        ],
        devServer: {
            host: METADATA.host,
            port: METADATA.port,
            inline: true,
            historyApiFallback: true,
            watchOptions: {
                ignored: /node_modeles/,
            },
            proxy: {
                '/api' :{
                    target: 'http://localhost:8787',
                    pathRewrite: {"^/api" : ""},
                    secure: false,
                    changeOrigin: true,
                }
            },
        }
    })
}
