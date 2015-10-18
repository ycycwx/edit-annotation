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
        return (
            <div className="title">
                <h1>
                    <IndexLink to="/">{ this.props.title.toUpperCase() }</IndexLink>
                </h1>
                <h3>DATA FUSION WEB TOOL</h3>
            </div>
        );
    }
}

export default Title;
