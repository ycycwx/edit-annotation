/**
 * @file 404
 * @author ycy
 */

import React, {Component} from 'react';
import {IndexLink} from 'react-router';
import styles from './NotFound.scss';

class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.notFound}>
                <h1>404</h1>
                <h2>Please redirect to <IndexLink to="/">Home</IndexLink></h2>
            </div>
        );
    }
}

export default NotFound;
