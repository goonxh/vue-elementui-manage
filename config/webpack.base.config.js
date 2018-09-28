const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const ROOT = path.resolve(__dirname, '../');
const root = path.join.bind(path, ROOT);

const METADATA = {
    title: '基于vue的后台管理系统',
    baseUrl: '/',
};

module.exports = function () {

    return {
        context: root(),
        mode: 'development',
        entry: {
            app: ['./src/main.js'],
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': root('src'),
            }
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
                    use: ['vue-style-loader', 'css-loader', {
                        loader: 'postcss-loader', options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('postcss-import')({root: loader.resourcePath}),
                                require('autoprefixer')(),
                            ],
                        },
                    }],
                },
                {
                    test: /\.scss$/,
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
                    test: /\.less$/,
                    use: ['vue-style-loader', 'css-loader', {
                        loader: 'postcss-loader', options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('postcss-import')({root: loader.resourcePath}),
                                require('autoprefixer')(),
                            ],
                        },
                    }, 'less-loader'],
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        outputPath: 'assets/fonts',
                    },
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        outputPath: 'assets/img',
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
}