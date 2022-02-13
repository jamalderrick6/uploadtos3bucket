import React, { Component } from "react";
import { Loader, Upload } from "react-feather";

class RunningBtn extends Component {
    constructor(props) {
        super(props);
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }

    btnClickedHandler(e) {
        e.preventDefault();
        this.props.clicked(this.props.value);
    }

    render() {
        console.log("props", this.props)
        return (
            <button className="upload_status running" onClick={this.btnClickedHandler}>
                <Loader style={{ animation: 'rotation 1s infinite linear' }} />
                <span>{this.props.data.upload_status}</span>
            </button>
        );
    }
}

export default RunningBtn;
