import React from "react";
import Map from "./Map";
import './styles.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./components/Login";
import UserContextProvider from "./contexts/userContext.jsx";



// Top Level window 
export default function App() {
  

  return (
    <div>
      <UserContextProvider>
        <Router>
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
      </UserContextProvider>
     
    </div>
  );
}
