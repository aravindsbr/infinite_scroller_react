import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Favourites  from "./components/Favourites";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route} from "react-router-dom";

const routing = (
  <Router>
      <div>
          <Route exact path="/" component={App}/>
          <Route path="/favourites" component={Favourites}/>
      </div>
  </Router>
  )

ReactDOM.render(routing, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
