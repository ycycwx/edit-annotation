/**
 * @file About
 * @author ycy
 */

import React, {Component} from 'react';
import u from '../../commons/util';
import styles from './About.scss';

class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.blockList}>
                <ol>
                    <li>
                        © {u.getCurrentYear()} Contributed by Ycy
                    </li>
                    <li ref="email">
                        <a href="mailto:yytcjcy@gmail.com">Contact Us</a>
                    </li>
                </ol>
            </div>
        );
    }
}

export default About;
