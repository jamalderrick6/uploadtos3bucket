import React, { Component } from "react";
import { Upload } from "react-feather";

class HiddenBtn extends Component {
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
            <button style={{ visibility: "hidden" }} disabled className="upload_status upload" onClick={this.btnClickedHandler}>
                <Upload />
                <span>Upload</span>
            </button>
        );
    }
}

export default HiddenBtn;
