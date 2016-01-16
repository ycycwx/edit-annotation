/**
 * @file Editor
 * @author ycy
 */

import React, { Component } from 'react';
import $ from 'jquery';

import Title from './Title';
import Selector from './Selector';
import Group from './Group';
import UploadBox from './UploadBox';
import ChooseButton from './ChooseButton';

import u from '../../commons/util';

import styles from './Editor.scss';

// Main Component
class Editor extends Component {

    /**
     * @override
     */
    constructor(props) {
        super(props);

        this.state = {
            title: 'Yugoo',
            items: {},
            selectedItem: ''
        };
    }

    /**
     * @override
     */
    componentDidMount() {
        window.addEventListener('scroll', this.props.handleScroll);
    }

    /**
     * @override
     */
    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.handleScroll);
    }

    /**
     * @override
     */
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.isOverNav !== this.props.isOverNav)
            || (nextState.selectedItem !== this.state.selectedItem)
            || (nextState.items !== this.state.items);
    }

    /**
     * Handle checkbox change
     * `TODO`: copy or deep copy
     *
     * @private
     * @param {number} row row number
     * @param {number} col col number
     * @param {Event} event event object
     */
    handleChange(row, col, event) {
        let newData = this.state.items[this.state.selectedItem].slice();
        newData[row][col][0] = event.target.checked;

        let newItems = u.clone(this.state.items);
        newItems[this.state.selectedItem] = newData;

        this.setState({
            items: newItems
        });
    }

    /**
     * Handle set top event
     * `TODO`: copy or deep copy
     *
     * @private
     * @param {number} row row number
     * @param {number} col col number
     */
    handleSwap(row, col) {
        let newData = this.state.items[this.state.selectedItem].slice();
        let tmpData = newData[row];

        let item = tmpData.splice(col, 1);

        tmpData.unshift(item[0]);

        newData[row] = tmpData;

        let newItems = u.clone(this.state.items);
        newItems[this.state.selectedItem] = newData;

        this.setState({
            items: newItems
        });
    }

    /**
     * Handle combine event
     *
     * @private
     */
    handleClick() {
        let tmpData = [];
        let newData = this.state.items[this.state.selectedItem].slice();

        for (let i = newData.length - 1; i >= 0; i--) {
            if (newData[i].length === 1 && newData[i][0][0] === true) {
                let item = newData.splice(i, 1);
                item[0][0][0] = false;
                tmpData.push(item[0][0]);
            }
        }

        if (tmpData.length !== 0) {
            newData.push(tmpData);
        }

        let newItems = u.clone(this.state.items);
        newItems[this.state.selectedItem] = newData;

        this.setState({
            items: newItems
        });
    }

    /**
     * Handle split event
     *
     * @private
     * @param {number} row row number
     */
    handleSplit(row) {

        let newData = this.state.items[this.state.selectedItem].slice();

        let item = newData.splice(row, 1);
        newData = newData.concat(item[0].map(x => [x]));

        let newItems = u.clone(this.state.items);
        newItems[this.state.selectedItem] = newData;

        this.setState({
            items: newItems
        });
    }

    /**
     * submit jQuery ajax
     *
     * @private
     * @param {Event} event event object
     */
    handleSubmit(event) {
        let formData = new FormData(event.currentTarget);
        $.ajax({
            url: '/',
            type: 'POST',
            async: true,
            data: formData,
            processData: false,
            contentType: false
        })
        .done((items) => {
            this.setState({
                items,
                selectedItem: Object.keys(items)[0]
            });
        });
        event.preventDefault();
    }

    /**
     * Display each group under group-parent tag
     *
     * @private
     * @param {Object} item data
     * @param {number} idx number
     */
    dispGroup(item, idx) {
        return (
            <div key={idx} className="group-parent">
                <Group
                    handleSwap={this.handleSwap.bind(this, idx)}
                    handleChange={this.handleChange.bind(this, idx)}
                    handleSplit={this.handleSplit.bind(this, idx)}
                    item={item}
                />
                <br />
            </div>
        );
    }

    /**
     * Handle Select's change
     *
     * @private
     * @param {Event} event event object
     */
    handleChangeSelect(event) {
        this.setState({
            selectedItem: event.target.value
        });
    }

    /**
     * @override
     */
    render() {
        let styleSheet = u.bindStyles(styles);
        let {isOverNav} = this.props;
        let url = 'http://bcscdn.baidu.com/weigou-baidu-com/combine.json';

        return (
            <div>
                <Title
                    styleSheet={isOverNav ? styleSheet('title', 'fix') : styleSheet('title')}
                    title={this.state.title}
                />
                <div className={styleSheet('center', 'download')}>
                    <a href={url} download>Template Download</a>
                </div>
                {
                    Object.keys(this.state.items).length === 0 ? null :
                        <Selector
                            styleSheet={isOverNav ? styleSheet('select-items', 'fix-select-items') :
                                styleSheet('select-items')}
                            selectedItem={this.state.selectedItem}
                            items={this.state.items}
                            handleChangeSelect={::this.handleChangeSelect} />
                }
                <div className={isOverNav ? styles.groups : null}>
                    {
                        Object.keys(this.state.items).length === 0 ? null :
                            this.state.items[this.state.selectedItem].map(::this.dispGroup)
                    }
                </div>
                <div className={isOverNav ? styles.block : null}></div>
                <ChooseButton handleClick={::this.handleClick} />
                <UploadBox handleSubmit={::this.handleSubmit} />
            </div>
        );
    }
}

export default Editor;
