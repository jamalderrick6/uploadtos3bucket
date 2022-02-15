import React, { Component } from "react";

export default class Modal extends Component {
  componentDidMount() {
    document.body.addEventListener("keydown", this.closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", this.closeOnEscapeKeyDown);
    };
  }

  closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div
        className="modal"
        onClick={this.props.closeModal}
        style={{ display: !this.props.modal_open ? "none" : "" }}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4>Modal title</h4>
          </div>
          <div className="modal-body">body comes here</div>
          <div className="modal-footer">
            <button onClick={this.props.closeModal} className="button">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
