const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');

// const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
    context: path.join(__dirname, 'src'),
    entry: ['babel-polyfill', './main.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
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
            {
                test: /\.js$/,
                include: /src/,
                exclude: /(node_modules|bower_components|dist|coverage|tests)/,
                use: [
                  {
                    loader: 'babel-loader',
                    options: { cacheDirectory: true },
                  },
                ],
            },
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({template: './index.html', inject: 'body'}),
        new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000
    }
};

module.exports = config;