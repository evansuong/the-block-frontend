import React, { useState } from "react";
import Map from "./Map";
import './styles.css'



// Top Level window 
export default function App() {

  // const [mapView, setMapView] = useState(true);
  

  return (
    <div id="app-container">
      <header>
        <h1><span>The</span> <span>Block</span></h1>
      </header>
      <Map/>
    </div>
  );
}
