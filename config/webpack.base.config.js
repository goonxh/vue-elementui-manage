const path =require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

const METADATA = {
    title: '基于vue的后台管理系统',
    baseUrl: '/',
};

module.exports = {
    mode:'development',
    entry: {
        app: ['./src/main.js'],
    },
    output: {
        filename: 'my-first-webpack.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            /*{
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [utils.root('src')],
                options: {
                    formatter: require('eslint-friendly-formatter'),
                },
            },*/
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: 'css-loader'
            },
            {
                test: /\.scss/,
                use: ['vue-style-loader', 'css-loader', {
                    loader: 'postcss-loader', options: {
                        ident: 'postcss',
                        plugins: (loader) => [
                            require('postcss-import')({root: loader.resourcePath}),
                            require('autoprefixer')(),
                        ],
                    },
                }, 'sass-loader'],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: 'assets/fonts',
                },
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),

        new HtmlWebpackPlugin({
            template: 'index.html',
            title: METADATA.title,
            chunksSortMode: 'manual',
            chunks: ['vendors', 'app'],
            metadata: METADATA,
            inject: 'body',
        }),
    ],
}