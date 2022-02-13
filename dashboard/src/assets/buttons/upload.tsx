import React, { Component } from "react";
import { Upload } from "react-feather";

class UploadBtn extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }

  btnClickedHandler(e) {
    e.preventDefault();
    this.props.clicked(this.props.value);
  }

  render() {
    return (
      <button className="upload_status upload" onClick={this.btnClickedHandler}>
        <Upload />
        <span>Upload</span>
      </button>
    );
  }
}

export default UploadBtn;
