/** @jsx React.DOM */

// Header component
var Header = React.createClass({
    render: function() {
        return (
            <nav>
                <a href="#">
                    <img />
                </a>
                <h1>{ this.props.title }</h1>
            </nav>
        )
    }
});

// Title component
var Title = React.createClass({
    render: function() {
        console.log(this.props);
        return (
            <div className="title">
                <h1>
                    <a href="#">{ this.props.title.toUpperCase() }</a>
                </h1>
                <h3>DATA FUSION WEB TOOL</h3>
            </div>
        )
    }
});

// Selector component
var Selector = React.createClass({
    createOption: function(key) {
        return (
            <option value={key} selected={this.props.selectedItem == key}>{key}</option>
        )
    },
    render: function() {
        return (
            <div className="select-items">
        <select defaultValue={Object.keys(this.props.items)[0]} onChange={this.props.handleChangeSelect}>
          {
            Object.keys(this.props.items).map(this.createOption)
          }
        </select>
      </div>
        )
    }
});

// Each group component
var Group = React.createClass({

    // Create each line
    createItem: function(col, item, i) {
        if (typeof item == 'boolean') {
            return (
                <td id="check-switch">
          <div className="switch">
            <input type="checkbox" checked={item} />
            <label>
              <span className="fontawesome-ok"></span>
              <span className="fontawesome-remove"></span>
              <div></div>
            </label>
          </div>
        </td>
            )
        }
        return <td onClick={this.props.handleSwap.bind(this, col)}>{item}</td>
    },

    // Create a group
    createLines: function(lines, col) {
        return <tr onChange={this.props.handleChange.bind(this, col)} key={col}>{lines.map(this.createItem.bind(this, col))}</tr>
    },
    render: function() {
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
            {this.props.item.map(this.createLines)}
          </tbody>
        </table>
        <a onClick={this.props.handleSplit} className="close">
          <div className="middle"></div>
        </a>
      </div>
        )
    }
});

// UploadBox component
var UploadBox = React.createClass({
    getInitialState: function() {
        return {
            text: "Please choose file",
        }
    },

    handleUploadShow: function(event) {

        var filePath = event.target.value;
        var filename = filePath.substring(filePath.lastIndexOf('\\') + 1);

        // console.log("handleChange() fileName = " + event.target.files[0].name);
        // console.log("handleChange() file handle = " + event.target.files[0]);
        // this.setState( {myFileName: event.target.files[0].name} );
        // this.setState( {myFileHandle: event.target.files[0]} );

        this.setState({
            text: filename
        });
    },

    render: function() {
        return (
            <div className="uploadBox">
        <form ref="uploadForm" action="/" method="post" encType="multipart/form-data" onSubmit={this.props.handleSubmit}>
          <input type="text" value={this.state.text} disabled />
          <label className="btn" htmlFor="uploadBtn">Upload</label>
          <input name="file" id="uploadBtn" onChange={this.handleUploadShow} type="file" />
          <label className="btn" htmlFor="submitBtn">Submit</label>
          <input id="submitBtn" value="Submit" type="submit" />
        </form>
      </div>
        )
    }
});

// ChooseButton component
var ChooseButton = React.createClass({
    render: function() {
        return (
            <div className="box">
        <div onClick={this.props.handleClick} className="link" data="OK!">
          <span className="button">
            COMBINE
            <span className="line line-top"></span>
            <span className="line line-right"></span>
            <span className="line line-bottom"></span>
            <span className="line line-left"></span>
          </span>
        </div>
        <div className="link" data="SURE?">
          <span className="button">
            SAVE
            <span className="line line-top"></span>
            <span className="line line-right"></span>
            <span className="line line-bottom"></span>
            <span className="line line-left"></span>
          </span>
        </div>
      </div>
        )
    }
});

// Main Component
var EditApp = React.createClass({
    getInitialState: function() {
        return {
            title: 'Yugoo',
            items: [],
            selectedItem: '',
        }
    },

    // Handle checkbox change
    // TODO: copy or deep copy
    handleChange: function(row, col, event) {
        var newData = this.state.items[this.state.selectedItem].slice();
        newData[row][col][0] = event.target.checked;

        var newItems = this.state.items;
        newItems[this.state.selectedItem] = newData;

        this.setState({
            items: newItems,
        })
    },

    // Handle set top event
    // TODO: copy or deep copy
    handleSwap: function(row, col) {
        var newData = this.state.items[this.state.selectedItem].slice();
        var tmpData = newData[row];

        var item = tmpData.splice(col, 1);

        tmpData.unshift(item[0]);

        newData[row] = tmpData;

        var newItems = this.state.items;
        newItems[this.state.selectedItem] = newData;

        this.setState({
            // items: newData,
            items: newItems,
        });
    },

    // Handle combine event
    handleClick: function() {

        var tmpData = [];
        var newData = this.state.items[this.state.selectedItem].slice();

        for (var i = newData.length - 1; i >= 0; i--) {
            if (newData[i].length === 1 && newData[i][0][0] === true) {
                var item = newData.splice(i, 1);
                item[0][0][0] = false;
                tmpData.push(item[0][0]);
            }
        }

        if (tmpData.length !== 0) {
            newData.push(tmpData);
        }

        var newItems = this.state.items;
        newItems[this.state.selectedItem] = newData;

        this.setState({
            // items: newData,
            items: newItems,
        });
    },

    // Handle split event
    handleSplit: function(row) {

        var newData = this.state.items[this.state.selectedItem].slice();

        var item = newData.splice(row, 1);
        newData = newData.concat(item[0].map(function(x) {
            return [x]
        }));

        var newItems = this.state.items;
        newItems[this.state.selectedItem] = newData;

        this.setState({
            // items: newData,
            items: newItems,
        });
    },

    handleSubmit: function(event) {
        // console.log(event.target.file.files[0]);
        formData = new FormData(event.currentTarget);
        var data = [];
        $.ajax({
            url: '/',
            type: 'POST',
            async: false,
            data: formData,
            success: function(res) {
                data = res;
            },
            processData: false,
            contentType: false
        });
        this.setState({
            items: data,
            selectedItem: Object.keys(data)[0],
        });
        event.preventDefault();
    },

    // Display each group under group-parent tag
    dispGroup: function(item, idx) {
        return (
            <div className="group-parent">
        <Group key={idx} 
          handleSwap={this.handleSwap.bind(this, idx)}
          handleChange={this.handleChange.bind(this, idx)}
          handleSplit={this.handleSplit.bind(this, idx)}
          item={item}
        />
        <br />
      </div>
        );
    },

    // Handle Select's change
    handleChangeSelect: function(event) {
        this.setState({
            selectedItem: event.target.value
        });
    },

    render: function() {
        console.log(this.state);
        return (
            <div>
                <Title title={this.state.title} />
                {
                    this.state.items.length == 0 ? null :
                        <Selector
                            selectedItem={this.state.selectedItem}
                            items={this.state.items}
                            handleChangeSelect={this.handleChangeSelect} />
                }
                {
                    this.state.items.length == 0 ? null : this.state.items[this.state.selectedItem].map(this.dispGroup)
                }
                <ChooseButton handleClick={this.handleClick} />
                <UploadBox handleSubmit={this.handleSubmit} />
            </div>
        )
    }
});

// Header render
React.render(
    <Header title="Yūgō Shōkan" />,
    document.getElementById('navbar')
);

// Main render
React.render(
    <EditApp />,
    document.getElementById('main')
);
