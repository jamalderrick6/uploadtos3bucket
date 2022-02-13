import React, { Component } from 'react'
import { withStyles } from '@mui/styles';
import LinearProgress from '@mui/material/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 8,
        width: 68,
    },
    colorPrimary: {
        border: 'solid 1px rgba(48, 39, 90, 0.1)',
        borderRadius: 3,
        backgroundColor: '#fff',
    },
    bar: {
        backgroundColor: "#54e7a3",
    },
}))(LinearProgress);


export default class UploadProgressBar extends Component {
    render() {
        console.log("this props", this.props)
        return (
            <div className="progress_bar">
                <BorderLinearProgress variant="determinate" value={this.props.data.upload_percentage} />
                <span>{this.props.data.upload_percentage}%</span>
            </div>
        )
    }
}
