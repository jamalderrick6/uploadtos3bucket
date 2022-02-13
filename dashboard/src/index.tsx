import React from "react";
import { render } from "react-dom";
import App from "./App";

import './assets/styles.css'
import './assets/grid.scss'

render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);