/**
 * @file Navbar
 * @author ycy
 */

import React, { Component } from 'react';
import {IndexLink, Link} from 'react-router';
import u from '../../commons/util';
import styles from './Navbar.scss';

// Navbar component
class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    createLiItems(nav, key) {
        const path = u.getPathByHash();
        let activeClass;

        if (nav.link === path) {
            activeClass = styles.active;
        }

        if (nav.isHome) {
            return (
                <li key={key}><IndexLink className={activeClass} to={nav.link}>{nav.title}</IndexLink></li>
            );
        }

        return (
            <li key={key}><Link className={activeClass} to={nav.link}>{nav.title}</Link></li>
        );
    }

    render() {
        const {navs} = this.props;
        return (
            <ul className={styles.navUl}>
                {
                    navs.map(::this.createLiItems)
                }
            </ul>
        );
    }
}

export default Navbar;
