import {HashRouter, Route, Link } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";

import Chart from "../components/Chart";
import Serialport from '../components/Serialport';

const App = props => (
  <HashRouter>
    <ul>
      <li>
        <Link to="/">Chart</Link>
      </li>
      <li>
        <Link to="/ports">SerialPort</Link>
      </li>
    </ul>
    
    <Route exact path="/" component={Chart}></Route>
    <Route exact path="/ports" component={Serialport}></Route>
  </HashRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));
