import React, { Component } from "react";
import BodyComponent from "./sections/body";
import IntroComponent from "./sections/intro";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <main className="app">
        <nav className="navigation">UploadBackendToS3</nav>
        <div className="section--wrapper">
          <section className="--intro">
            <IntroComponent />
          </section>

          <section className="--body">
            <BodyComponent />
          </section>
        </div>
      </main>
    );
  }
}
