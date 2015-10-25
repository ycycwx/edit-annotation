/**
 * @file Server
 * @author ycy
 */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import methodOverride from 'method-override';

import routes from './src/routes/routes-server';

let devServer = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true
    }
});

devServer.app.use(bodyParser.json()); // to support JSON-encoded bodies
devServer.app.use(bodyParser.urlencoded({
    extended: true
})); // to support URL-encoded bodies
devServer.app.use(morgan('dev')); // log every request to the console
devServer.app.use(methodOverride()); // simulate DELETE and PUT
devServer.app.use(express.static(__dirname));
devServer.app.use(express.static(__dirname + '/uploads/'));

devServer.listen(3000, 'localhost', (err) => {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:3000');
});

routes(devServer.app);
