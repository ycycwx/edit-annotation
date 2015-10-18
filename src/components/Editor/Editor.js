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

import style from './Editor.scss';

// Main Component
class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Yugoo',
            items: [],
            selectedItem: ''
        };
    }

    // Handle checkbox change
    // TODO: copy or deep copy
    handleChange(row, col, event) {
        let newData = this.state.items[this.state.selectedItem].slice();
        newData[row][col][0] = event.target.checked;

        let newItems = this.state.items;
        newItems[this.state.selectedItem] = newData;

        this.setState({
            items: newItems
        });
    }

    // Handle set top event
    // TODO: copy or deep copy
    handleSwap(row, col) {
        let newData = this.state.items[this.state.selectedItem].slice();
        let tmpData = newData[row];

        let item = tmpData.splice(col, 1);

        tmpData.unshift(item[0]);

        newData[row] = tmpData;

        let newItems = this.state.items;
        newItems[this.state.selectedItem] = newData;

        this.setState({
            // items: newData,
            items: newItems
        });
    }

    // Handle combine event
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

        let newItems = this.state.items;
        newItems[this.state.selectedItem] = newData;

        this.setState({
            // items: newData,
            items: newItems
        });
    }

    // Handle split event
    handleSplit(row) {

        let newData = this.state.items[this.state.selectedItem].slice();

        let item = newData.splice(row, 1);
        newData = newData.concat(item[0].map((x) => {
            return [x];
        }));

        let newItems = this.state.items;
        newItems[this.state.selectedItem] = newData;

        this.setState({
            // items: newData,
            items: newItems
        });
    }

    handleSubmit(event) {
        let formData = new FormData(event.currentTarget);
        $.ajax({
            url: '/',
            type: 'POST',
            async: true,
            data: formData,
            success: (res) => {
                let data = res;
                this.setState({
                    items: data,
                    selectedItem: Object.keys(data)[0]
                });
            },
            processData: false,
            contentType: false
        });
        event.preventDefault();
    }

    // Display each group under group-parent tag
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

    // Handle Select's change
    handleChangeSelect(event) {
        this.setState({
            selectedItem: event.target.value
        });
    }

    render() {
        return (
            <div>
                <Title title={this.state.title} />
                {
                    this.state.items.length === 0 ? null :
                        <Selector
                            selectedItem={this.state.selectedItem}
                            items={this.state.items}
                            handleChangeSelect={::this.handleChangeSelect} />
                }
                {
                    this.state.items.length === 0 ? null :
                        this.state.items[this.state.selectedItem].map(::this.dispGroup)
                }
                <ChooseButton handleClick={::this.handleClick} />
                <UploadBox handleSubmit={::this.handleSubmit} />
            </div>
        );
    }
}

export default Editor;
