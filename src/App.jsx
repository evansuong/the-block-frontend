import React, { useState } from "react";
import Map from "./Map";
import './styles.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from "./components/Login";



// Top Level window 
export default function App() {

  // const [mapView, setMapView] = useState(true);
  

  return (
    <div>
      <Router>
        <Link to="/">login</Link>
        <Link to="/home">home</Link>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path="/home">
            <div id="app-container">
              <header>
                <h1><span>The</span> <span>Block</span></h1>
              </header>
              <Map/>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
