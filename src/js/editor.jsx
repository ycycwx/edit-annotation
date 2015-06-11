/** @jsx React.DOM */

var data = [
  [[false, "jd", "型号", "酷睿i5 4690K"], [false, "yixun", "型号", "i5-4690k"]], [[false, "jd", "类型", "CPU"]], [[false, "jd", "指令集", "SSE 4.1/4.2, AVX 2.0"], [false, "jd", "主频", "3.5GHz"], [false, "yixun", "二级缓存", "1M"]], [[false, "yixun", "CPU主频范围", "3.0GHz以上"]], [[false, "yixun", "三级缓存", "6M"], [false, "jd", "三级缓存", "6M"]], [[false, "jd", "特性", "处理器显卡Intel? HD Graphics 4600，显卡基本频率350 MHz，.显卡最大动态频率1.2 GHz，最大内存大小32GB,内存通道数 2，内存类型DDR3-1333/1600"]], [[false, "yixun", "核心显卡型号", "HD4600"]], [[false, "yixun", "耗电功率", "89W"]], [[false, "yixun", "色系", "蓝色系"]], [[false, "yixun", "超线程技术", "不支持"]], [[false, "yixun", "CPU系列", "酷睿i5"]], [[false, "yixun", "包装形式", "原包"]], [[false, "yixun", "适用类型", "台式"]], [[false, "jd", "接口类型", "LGA1150"]], [[false, "yixun", "版本", "i5-4690K"]], [[false, "jd", "系列", "酷睿"]], [[false, "yixun", "保修时限", "三年"]], [[false, "yixun", "CPU频率", "3.5GHZ"]], [[false, "jd", "功率", "88 W"]], [[false, "jd", "64位支持", "是"], [false, "yixun", "64位技术", "支持"]], [[false, "yixun", "制程工艺", "22纳米"], [false, "jd", "制程工艺", "22纳米"]], [[false, "yixun", "CPU插槽类型", "LGA 1150"]], [[false, "yixun", "核心数量", "四核心"], [false, "jd", "核心数量", "四核"]], [[false, "yixun", "核心代号", "Haswell-refresh"], [false, "jd", "核心代号", "haswell"]], [[false, "yixun", "品牌", "Intel/英特尔"], [false, "jd", "品牌", "英特尔 Intel"]]
];

// Header component
var Header = React.createClass({
  render: function() {
    return (
      <nav>
        <a href="#">
          <img />
        </a>
        <h1>{this.props.title}</h1>
      </nav>
    )
  }
});

// Title component
var Title = React.createClass({
  render: function() {
    return (
      <div className="title">
        <h1>
          <a href="#">SCHEMA MATCH</a>
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
    if ( typeof item == 'boolean' ) {
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

    this.setState({ text: filename });
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
      title: 'Schema Matching',
      items: [],
      selectedItem: '',
    }
  },

  // Handle checkbox change
  // TODO copy or deep copy
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
  // TODO copy or deep copy
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

    for (var i = newData.length - 1; i >= 0; i --) {
      if(newData[i].length === 1 && newData[i][0][0] === true) {
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
    newData = newData.concat(item[0].map(function(x) {return [x]}));

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
    this.setState({selectedItem: event.target.value});
  },

  render: function() {
    // console.log(this.state.items);
    return (
      <div>
        <Title />
        {
          this.state.items.length == 0 ? null :
            <Selector
              selectedItem={this.state.selectedItem}
              items={this.state.items}
              handleChangeSelect={this.handleChangeSelect}
            />
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
