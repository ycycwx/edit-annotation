/**
 * @file Group
 * @author ycy
 */

import React, {Component} from 'react';

// Each group component
class Group extends Component {
    constructor(props) {
        super(props);
    }

    // Create each line
    createItem(col, item, key) {
        if (typeof item === 'boolean') {
            return (
                <td key={key} id="check-switch">
                    <div className="switch">
                        <input type="checkbox" checked={item} />
                        <label>
                            <span className="fontawesome-ok"></span>
                            <span className="fontawesome-remove"></span>
                            <div></div>
                        </label>
                    </div>
                </td>
            );
        }
        return <td key={key} onClick={this.props.handleSwap.bind(this, col)}>{item}</td>;
    }

    // Create a group
    createLines(lines, col) {
        return (
            <tr onChange={this.props.handleChange.bind(this, col)} key={col}>
                {lines.map(this.createItem.bind(this, col))}
            </tr>
        );
    }

    render() {
        return (
            <div className="parent">
                <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Source</th>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.item.map(::this.createLines)}
                    </tbody>
                </table>
                <a onClick={this.props.handleSplit} className="close">
                    <div className="middle"></div>
                </a>
            </div>
        );
    }
}

export default Group;
