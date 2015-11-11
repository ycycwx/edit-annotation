/**
 * @file Section
 * @author ycy
 */

import React, {Component} from 'react';
import Line from './Line';
import styles from './Section.scss';

class Block extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {module, position} = this.props;

        return (
            <div className={styles.section}>
                {
                    module.map((item, idx) => {
                        return (
                            <Line
                                {...item}
                                position={position}
                                key={idx} />
                        );
                    })
                }
            </div>
        );
    }
}

export default Block;
