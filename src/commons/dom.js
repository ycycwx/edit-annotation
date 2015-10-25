/**
 * @file Dom
 * @author ycy
 */

/**
 * @class Dom
 */
class Dom {
    constructor(param) {
        if (param instanceof NodeList) {
            this.doms = Array.from(param);
        }
        else if (param instanceof Node) {
            this.doms = [param];
        }
        this.prepare();
    }

    prepare() {
        if (this.doms.length > 0) {
            this._scrollTop = this.doms[0].scrollTop;
            this._scrollHeight = this.doms[0].scrollHeight;
        }
    }

    get scrollTop() {
        return this._scrollTop;
    }

    set scrollTop(newScrollTop) {
        this._scrollTop = newScrollTop;
        if (this.doms.length > 0) {
            this.doms[0].scrollTop = newScrollTop;
        }
    }

    get scrollHeight() {
        return this._scrollHeight;
    }

    set scrollHeight(newScrollHeight) {
        this._scrollHeight = newScrollHeight;
        if (this.doms.length > 0) {
            this.doms[0].scrollHeight = newScrollHeight;
        }
    }

    /**
     * Add className
     *
     * @private
     * @param {Object} o Dom Object
     * @param {string} className CSS string
     */
    _addClass(o, className) {
        if (this._hasClass(o, className)) {
            return;
        }

        o.className = (o.className + ' ' + className).replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
    }

    /**
     * Remove className
     *
     * @private
     * @param {Object} o Dom Object
     * @param {string} className CSS string
     */
    _removeClass(o, className) {
        let re = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
        o.className = o.className.replace(re, '$1').replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
    }

    /**
     * Has className
     *
     * @private
     * @param {Object} o Dom Object
     * @param {string} className CSS string
     * @return {boolean}
     */
    _hasClass(o, className) {
        let re = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
        if (re.test(o.className)) {
            return true;
        }
        return false;
    }

    /**
     * Add className
     *
     * @public
     * @param {string} className CSS string
     * @return {Object}
     */
    addClass(className) {
        this.doms.forEach((el) => {
            if (this._hasClass(el, className)) {
                return;
            }
            this._addClass(el, className);
        });

        return this;
    }

    /**
     * Remove className
     *
     * @public
     * @param {string} className CSS string
     * @return {Object}
     */
    removeClass(className) {
        this.doms.forEach((el) => {
            this._removeClass(el, className);
        });

        return this;
    }

    /**
     * Toggle className
     *
     * @public
     * @param {string} className CSS string
     * @return {Object}
     */
    toggleClass(className) {
        this.doms.forEach((el) => {
            if (this._hasClass(el, className)) {
                this._removeClass(el, className);
            }
            else {
                this._addClass(el, className);
            }
        });

        return this;
    }

    /**
     * Has className
     *
     * @public
     * @param {string} className CSS string
     * @return {Object}
     */
    hasClass(className) {
        if (this.doms.length > 0) {
            let re = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
            if (re.test(this.doms[0].className)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Focus with first domElement
     *
     * @public
     * @return {Object}
     */
    focus() {
        if (this.doms.length > 0) {
            this.doms[0].focus();
        }

        return this;
    }

    /**
     * Blur with first domElement
     *
     * @public
     * @return {Object}
     */
    blur() {
        if (this.doms.length > 0) {
            this.doms[0].blur();
        }

        return this;
    }
}

export default Dom;
