/**
 * @file ChooseButton
 * @author ycy
 */

import React, {Component} from 'react';

// ChooseButton component
class ChooseButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="box">
                <div onClick={this.props.handleClick} className="link" data="OK!">
                    <span className="button">
                        COMBINE
                        <span className="line line-top"></span>
                        <span className="line line-right"></span>
                        <span className="line line-bottom"></span>
                        <span className="line line-left"></span>
                    </span>
                </div>
                <div className="link" data="SURE?">
                    <span className="button">
                        SAVE
                        <span className="line line-top"></span>
                        <span className="line line-right"></span>
                        <span className="line line-bottom"></span>
                        <span className="line line-left"></span>
                    </span>
                </div>
            </div>
        );
    }
}

export default ChooseButton;
