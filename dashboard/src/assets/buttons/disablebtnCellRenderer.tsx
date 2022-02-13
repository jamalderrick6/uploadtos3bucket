import React, { Component } from "react";

class DisabledBtnCellRenderer extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <button disabled>Upload</button>
    );
  }
}

export default DisabledBtnCellRenderer;
