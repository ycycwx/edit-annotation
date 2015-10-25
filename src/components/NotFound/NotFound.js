/**
 * @file 404
 * @author ycy
 */

import React from 'react';
import {IndexLink} from 'react-router';
import styles from './NotFound.scss';

let NotFound = () => (
    <div className={styles.notFound}>
        <h1>404</h1>
        <h2>Please redirect to <IndexLink to="/">Home</IndexLink></h2>
    </div>
);

export default NotFound;
