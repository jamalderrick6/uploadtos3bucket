import React from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import Router from "./router";

const App: React.FC = (props) => {
    console.log("I came here")
    return (
        <main>
            <div className="app">
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </div>
        </main>
    )
};

export default App;