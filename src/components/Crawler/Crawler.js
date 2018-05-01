/**
 * @file Crawler
 * @author ycy
 */

import React, { Component } from 'react';
import $ from 'jquery';

import u from '../../commons/util';
import styles from './Crawler.scss';

class Crawler extends Component {
    constructor(props) {
        super(props);
        let value = '';
        let log = ['Crawler log recorder here.'];
        this.state = {value, log};
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.scrollElement();
    }

    componentDidUpdate() {
        this.scrollElement();
    }

    componentWillMount() {
        this.scrollElement();
    }

    scrollElement() {
        let ss = u.bindStyles(styles);
        let logger = u.$$(ss('logger'));
        if (logger !== undefined) {
            logger.scrollTop = logger.scrollHeight;
        }
    }

    handleSubmit(e) {
        let value = this.refs.input.value;

        $.ajax({
            url: '/crawler',
            type: 'POST',
            data: {value}
        });

        if (this.interval) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
            $.ajax({
                url: '/logger',
                type: 'POST',
                data: {value},
                success: (array) => {
                    this.setState({
                        log: array
                    });
                }
            });
        }, 3000);

        e.preventDefault();
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    expand() {
        let ss = u.bindStyles(styles);

        let search = u.$$(ss('search'));
        let input = u.$$(ss('input'));
        let title = u.$(`.${ss('content')}>p`);

        search.toggleClass(ss('close'));
        input.toggleClass(ss('square'));
        title.toggleClass(ss('hide'));

        if (search.hasClass(ss('close'))) {
            input.focus();
        }
        else {
            input.blur();
        }
    }

    render() {
        let ss = u.bindStyles(styles);

        const {value} = this.state;

        return (
            <div className={styles.crawler}>
                <form
                    className={styles.content}
                    onSubmit={::this.handleSubmit}>
                    <p onClick={::this.expand} className={styles.title}> Data Crawler </p>
                    <input
                        ref="input"
                        type="text"
                        name="input"
                        className={ss('input')}
                        onChange={::this.handleChange}
                        value={value}
                    />
                    <button
                        type="reset"
                        className={ss('search')}
                        onClick={::this.expand}>
                    </button>
                </form>
                <div className={styles.logo}> Crawler </div>
                <div className={styles.logger}>
                    {
                        this.state.log.map((line, idx) => {
                            return (
                                <p key={idx}>{line}</p>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Crawler;
