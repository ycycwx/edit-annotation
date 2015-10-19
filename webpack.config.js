/**
 * @file config
 * @author ycy
 */

import path from 'path';
import webpack from 'webpack';

let config = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        // 'webpack/hot/only-dev-server',
        './main'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader?optional[]=runtime&stage=0'],
            exclude: [/node_modules/],
            include: __dirname
        }, {
            test: /\.json$/,
            loaders: ['json-loader']
        }, {
            test: /\.(png|woff)$/,
            loader: 'url-loader?limit=100000'
        }, {
            test: /\.s?css$/,
            loader: 'style!css!sass'
        }, {
            test: /\.html$/,
            loaders: ['html-loader']
        }, {
            test: /\.md$/,
            loaders: ['markdown-loader']
        }, {
            test: /\.txt$/,
            loaders: ['raw-loader']
        }]
    }
};

export default config;
