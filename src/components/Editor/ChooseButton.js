/**
 * @file ChooseButton
 * @author ycy
 */

import React, {Component} from 'react';

// ChooseButton component
let ChooseButton = ({handleClick}) => {
    return (
        <div className="box">
            <div onClick={handleClick} className="link" data="OK!">
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
};

export default ChooseButton;
