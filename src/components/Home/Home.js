/**
 * @file Home
 * @author ycy
 */

import React, {Component} from 'react';
import Block from './Block';
import styles from './Home.scss';
import navs from '../../commons/navbar.json';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {navs};
    }

    render() {
        return (
            <div className={styles.page}>
                <header className={styles.header}>
                    <video className={styles.video} autoPlay loop="loop">
                        <source src="/src/images/Naruto.mp4" type="video/mp4" />
                    </video>
                    <div className={styles.title}>Yugoo</div>
                </header>
                <ol className={styles.blockList}>
                    {
                        this.state.navs.map((nav, key) => {
                            return (
                                <li key={key}>
                                    <Block
                                        styleSheet={styles}
                                        nav={nav}
                                    />
                                </li>
                            );
                        })
                    }
                </ol>
            </div>
        );
    }
}

export default Home;
