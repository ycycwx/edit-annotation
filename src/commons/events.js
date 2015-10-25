/**
 * EventEmitter
 *
 * @file  事件注册器
 * @author ycy(yangchenyi@baidu.com)
 */

/**
 * @class EventEmitter
 */
class EventEmitter {
    constructor() {
        this._events = {};
    }

    /**
     * 注册事件
     *
     * @public
     * @method EventEmitter#on
     * @param {string} type type
     * @param {Function} handler function
     * @return {Object}
     */
    on(type, handler) {
        if (this._events[type]) {
            this._events[type].push(handler);
        }
        else {
            this._events[type] = [handler];
        }
        return this;
    }

    /**
     * 触发事件
     *
     * @public
     * @method EventEmitter#emit
     * @param {string} type type
     * @param {Array} args arguments
     * @return {Object}
     */
    emit(type, ...args) {
        if (!this._events[type]) {
            return;
        }

        for (let ev of this._events[type]) {
            ev.call(this, args);
        }

        return this;
    }
}

let event = new EventEmitter();

export default event;
