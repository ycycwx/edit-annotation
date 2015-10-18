/**
 * @file Header
 * @author ycy
 */

import React, { Component } from 'react';
import {IndexLink} from 'react-router';
import Navbar from './Navbar';

import navs from '../../commons/navbar.json';

// Header component
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {navs};
    }

    render() {
        return (
            <div>
                <nav>
                    <IndexLink to="/"><img /></IndexLink>
                    <Navbar navs={this.state.navs} />
                </nav>
                {this.props.children}
            </div>
        );
    }
}

export default Header;
