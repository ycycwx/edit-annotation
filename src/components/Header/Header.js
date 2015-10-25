/**
 * @file Header
 * @author ycy
 */

import React, { Component } from 'react';
import {IndexLink} from 'react-router';
import Navbar from './Navbar';

import styles from './Header.scss';
import navs from '../../commons/navbar.json';

// Header component
class Header extends Component {
    constructor(props) {
        super(props);

        let isOverNav = false;
        this.state = {navs, isOverNav};
    }

    handleScroll(event) {
        let scrollTop = event.srcElement.body.scrollTop;
        let isOverNav = scrollTop > 287;

        this.setState({isOverNav});
    }

    render() {
        const {isOverNav} = this.state;
        let handleScroll = ::this.handleScroll;

        return (
            <div className={styles.nav}>
                <nav className={isOverNav ? styles.navShow : null}>
                    <IndexLink to="/"><img /></IndexLink>
                    <Navbar navs={this.state.navs} />
                </nav>
                {
                    React.cloneElement(this.props.children, {isOverNav, handleScroll})
                }
            </div>
        );
    }
}

export default Header;
