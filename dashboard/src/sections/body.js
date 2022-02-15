import React, { Component } from "react";
import Modal from "../component/Modal";

export default class BodyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      add_files: false,
      add_urls: false,
    };
  }

  triggerModal = (val) => {
    if (val === "files") {
      this.setState({
        add_files: true,
        open: true,
      });
    } else {
      this.setState({
        add_urls: true,
        open: true,
      });
    }
  };

  closeModal = () => {
    this.setState({
      open: false,
      add_files: false,
      add_urls: false,
    });
  };
  render() {
    return (
      <div className="upload--grid">
        <div className="grid --files">
          <span className="description">
            Click the button below to upload file(s)
          </span>

          <button onClick={() => this.triggerModal("files")}>Add files</button>
        </div>

        <div className="grid --url">
          <span className="description">
            Click the button below to upload url(s)
          </span>
          <button onClick={() => this.triggerModal("urls")}>Add urls</button>
        </div>
        <Modal modal_open={this.state.open} closeModal={this.closeModal} />
      </div>
    );
  }
}
