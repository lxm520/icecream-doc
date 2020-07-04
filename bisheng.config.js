const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
    root: '/icecream/',
    target: 'node',
    devtool: 'inline-source-map',
    webpackConfig(config) {
        config.node = {
            fs: "empty",
            module: "empty",
            child_process: "empty",
            net: "empty",
        }
        config.optimization.minimize = true;
        config.optimization.splitChunks = {
            chunks: 'async',
            minSize: 50000,
            maxSize: 80000,
            minChunks: 5,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
        config.plugins.push(
            new LodashModuleReplacementPlugin(),
            //new BundleAnalyzerPlugin()
        )

        config.module.rules.push({
            loader: 'babel-loader',
            test: /\.(js|jsx)$/,
            query: {
                'plugins': [
                    'lodash',
                    // [
                    //     "import",
                    //     {
                    //         "libraryName": "antd",
                    //         "style": true
                    //     }
                    // ],
                    ["@babel/plugin-transform-modules-commonjs", {
                        "allowTopLevelThis": false
                    }]
                ],
                'presets': [['@babel/env', { 'targets': { 'node': 6 } }]]
            }
        });

        config.output = {
            filename: "[name].js",
            chunkFilename: '[name].bundle.js',
        }
        return config;
    },
    source: {
        components: './components',
        docs: './docs',
    },
    output: './dist',
    theme: './theme',
    htmlTemplate: path.join(__dirname, './theme/static/template.html'),
    // 主题配置
    themeConfig: {
        categoryOrder: {
            前言: 1,
            文档: 2,
        },
        typeOrder: {
            通用: 1,
            数据展示: 1,
        }
    },
    lessConfig: {
        javascriptEnabled: true,
    },
    baseConfig: {
        logo: "https://test-1253763202.cos.ap-shanghai.myqcloud.com/applications/icecream.png",
        projectName: "Icecream Design",
        homeUrl: "/docs/cn/getting-started-cn.html",
        library: "https://github.com/ZhangWei-KUMO/icecreamd"
    }
};