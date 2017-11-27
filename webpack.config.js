const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
    context: path.join(__dirname, 'src'),
    entry: ['babel-polyfill', './main.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100,
        poll: 1000
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i
        }),
        new HtmlWebpackPlugin({template: './index.html', inject: 'body'})
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};

module.exports = config;