import React, { useEffect, useState, useRef } from 'react'
import { MapContainer, Circle, TileLayer, Marker, ZoomControl, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import BlockList from './components/BlockList';
import "./styles.css";


const API = {
  // query by place that we got from google
  fetchReviews: async function() {
    let reviews = await fetch("out backend")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("something terrible happened: error: ", error))
    return reviews;
  },
  // fetch place from google api
  fetchPlaces: async function() {
    let response;
    fetch("google api")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("something terrible happened: error: ", error));
    return response;
  },
}

function buildTestData(name, rating, text, image) {
  return {
    id: name,
    name: name,
    rating: rating,
    text: text,
    imgSrc: image,
    position: [23, 123],
  }
}

const testData = [
  buildTestData('papa johns', 3, 'i broke my back, thpinal', require('./res/placeholder-img.jpg')),
  buildTestData('pizza hut', 3, 'i broke my back, thpinal', './res/placeholder-image.jpg'),
  buildTestData('little ceasars', 3, 'i broke my back, thpinal', './res/placeholder-image.jpg'),
  buildTestData('cpk', 3, 'i broke my back, thpinal','./res/placeholder-image.jpg'),
  buildTestData('dominos', 3, 'i broke my back, thpinal', './res/placeholder-image.jpg')
]


export default function Map() {

  const [sideBar, setSideBar] = useState();

  function changeSideBar(newSidebar) {
    console.log(newSidebar);
  }

  useEffect(() => {
    let side = <BlockList changeSideBar={changeSideBar}>{testData}</BlockList>
    setSideBar(side);
  }, []);


  // TODO: ADD IN HOVER FUNCTIONALITY TO PULL UP SESSION INFO PANELS

  return (
    <div id="map-container">
      <MapContainer
        className="markercluster-map"
        center={[0,0]}
        zoom={4}
        worldCopyJump={true}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic21hcnRmaW4tbWFwcyIsImEiOiJja2w0cG45Mm4wcWJvMm5wZWRtd3dsbG5jIn0.5W4X8d9QNECWLq2tMQp49w"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup zoomToBoundsOnClick={true}>
          {testData && testData.map(place => (
            <Circle key={place.id} center={place.position} radius={50} color="green">
              <Popup key={place.id}>
                <div>{place.id}</div>
              </Popup>
            </Circle>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      <div id="sidebar-container">
        { sideBar }
      </div>
    </div>
    
  )
}
