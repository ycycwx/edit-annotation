/**
 * @file Selector
 * @author ycy
 */

import React, {Component} from 'react';

// Selector component
class Selector extends Component {
    constructor(props) {
        super(props);
    }

    createOption(key) {
        return (
            <option key={key} value={key}>{key}</option>
        );
    }

    render() {
        const {styleSheet} = this.props;

        return (
            <div className={styleSheet}>
                <select defaultValue={Object.keys(this.props.items)[0]} onChange={this.props.handleChangeSelect}>
                    {
                        Object.keys(this.props.items).map(::this.createOption)
                    }
                </select>
            </div>
        );
    }
}

export default Selector;
