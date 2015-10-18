/**
 * @file UploadBox
 * @author ycy
 */

import React, {Component} from 'react';

// UploadBox component
class UploadBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Please choose file'
        };
    }

    handleUploadShow(event) {
        let filePath = event.target.value;
        let filename = filePath.substring(filePath.lastIndexOf('\\') + 1);

        this.setState({
            text: filename
        });
    }

    render() {
        return (
            <div className="uploadBox">
                <form action="/" method="post" encType="multipart/form-data" onSubmit={this.props.handleSubmit}>
                    <input type="text" value={this.state.text} disabled />
                    <label className="btn" htmlFor="uploadBtn">Upload</label>
                    <input name="file" id="uploadBtn" onChange={::this.handleUploadShow} type="file" />
                    <label className="btn" htmlFor="submitBtn">Submit</label>
                    <input id="submitBtn" value="Submit" type="submit" />
                </form>
            </div>
        );
    }
}

export default UploadBox;
