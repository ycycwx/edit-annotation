/**
 * @file util
 * @author ycy
 */

import lodash from 'lodash';

let util = Object.create(lodash);

/**
 * Get path by hash
 */
util.getPathByHash = () => {
    let hash = document.location.hash;
    hash = hash.startsWith('#') ? hash: `#${hash}`;
    return hash.split('?')[0].split('#')[1];
};

/**
 * Compare nav.link with current path
 */
util.isPathEqual = (nav, currentPath) => {
    if (nav.link === currentPath) {
        return true;
    }
    return false;
};

/**
 * Get this year
 */
util.getCurrentYear = () => {
    let now = new Date();
    return now.getFullYear();
};

export default util;
