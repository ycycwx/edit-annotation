/**
 * @file Line
 * @author ycy
 */

import React, {Component} from 'react';
import styles from './Line.scss';
import u from '../../commons/util';

class Line extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const {url, text, position} = this.props;
        let ss = u.bindStyles(styles);

        if (position === 'right') {
            return (
                <div className={ss('line', 'right')}>
                    <span className={styles.text}> {text} </span>
                    <img className={styles.image} src={url} />
                </div>
            );
        }
        else {
            return (
                <div className={ss('line', 'left')}>
                    <img className={styles.image} src={url} />
                    <span className={styles.text}> {text} </span>
                </div>
            );
        }
    }
}

export default Line;
