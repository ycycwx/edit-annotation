/**
 * @file RoutesClient
 * @author ycy
 */

import React from 'react';
import {Router, Route, Link, IndexRoute} from 'react-router';
import {createHistory, useBasename} from 'history';

import Home from '../components/Home';
import Crawler from '../components/Crawler';
import Editor from '../components/Editor';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import About from '../components/About';

import styles from '../css/base.scss';

const history = useBasename(createHistory)({
    // basename: '/webapp'
});

let router = (
    <Router history={history}>
        <Route path="/" component={Header}>
            <IndexRoute component={Home} />
            <Route path="editor" component={Editor} />
            <Route path="about" component={About} />
            <Route path="crawler" component={Crawler} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);

export default router;
