import React, { Component } from "react";
import { CheckCircle, Loader, Upload } from "react-feather";

class SuccessBtn extends Component {
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
            <button className="upload_status success" onClick={this.btnClickedHandler}>
                <CheckCircle />
                <span>Success</span>
            </button>
        );
    }
}

export default SuccessBtn;
