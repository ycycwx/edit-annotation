/**
 * @file Block
 * @author ycy
 */

import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';

class Block extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {nav, styleSheet} = this.props;

        let linkEl;

        if (nav.isHome) {
            linkEl = (
                <Link className={styleSheet.block} to={nav.link}>
                    <div className={styleSheet.title}>{nav.title}</div>
                    <div className={styleSheet.info}>{nav.info}</div>
                </Link>
            )
        }
        else {
            linkEl = (
                <IndexLink className={styleSheet.block} to={nav.link}>
                    <div className={styleSheet.title}>{nav.title}</div>
                    <div className={styleSheet.info}>{nav.info}</div>
                </IndexLink>
            )
        }

        return linkEl;
    }
}

export default Block;
