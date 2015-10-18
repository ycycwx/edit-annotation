/**
 * @file Navbar
 * @author ycy
 */

import React, { Component } from 'react';
import {IndexLink, Link} from 'react-router';
import u from '../../commons/utils';
import styles from './Navbar.scss';

// Navbar component
class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    createLiItems(nav) {
        const path = u.getPathByHash();
        let activeClass;

        if (nav.link == path) {
            activeClass = styles.active;
        }

        console.log(path);
        console.log(activeClass);

        if (nav.isHome) {
            return (
                <li><IndexLink className={activeClass} to={nav.link}>{nav.title}</IndexLink></li>
            )
        }
        else {
            return (
                <li><Link className={activeClass} to={nav.link}>{nav.title}</Link></li>
            )
        }
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
