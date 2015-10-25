/**
 * @file util
 * @author ycy
 */

import lodash from 'lodash';
import classNames from 'classnames/bind';
import Dom from './dom';
import event from './events';

let util = Object.create(lodash);

/**
 * querySelectorAll
 *
 * @param {string} query CSS selector
 * @return {Object}
 */
util.$ = (query) => {
    let dom = document.querySelectorAll(query);
    return new Dom(dom);
};

/**
 * create Dom instanceof by className
 *
 * @param {string} className CSS class
 * @return {Object}
 */
util.$$ = (className) => {
    let dom = document.querySelectorAll(`.${className}`);
    return new Dom(dom);
};

/**
 * Get path by hash
 *
 * @return {string}
 */
util.getPathByHash = () => {
    let hash = document.location.hash;

    hash = hash.startsWith('#') ? hash : `#${hash}`;
    return hash.split('?')[0].split('#')[1];
};

/**
 * Get this year
 *
 * @return {string}
 */
util.getCurrentYear = () => {
    let now = new Date();
    return now.getFullYear();
};

/**
 * Bind CSS module classes
 *
 * @param {Object} styles 样式
 * @return {Function}
 */
util.bindStyles = (styles) => {
    return classNames.bind(styles);
};

/**
 * instance of EventEmitter
 */
util.event = event;

export default util;
