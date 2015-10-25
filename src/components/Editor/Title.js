/**
 * @file Title
 * @author ycy
 */

import React, {Component} from 'react';
import {IndexLink} from 'react-router';

// Title component
class Title extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {styleSheet, title} = this.props;

        return (
            <div className={styleSheet}>
                <h1>
                    <IndexLink to="/">{ title.toUpperCase() }</IndexLink>
                </h1>
                <h3>DATA FUSION WEB TOOL</h3>
            </div>
        );
    }
}

export default Title;
