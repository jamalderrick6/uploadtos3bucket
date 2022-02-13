import React, { Component } from 'react';
import { Loader } from 'react-feather'

import * as ReactBootstrap from "react-bootstrap";

export default class Spinner extends Component {
  render() {
    return (
      <ReactBootstrap.Spinner animation="grow" />
      // <Loader style={{ animation: 'rotation 1s infinite linear' }} />
    )
  }
}
