import React, { useEffect, useState, useRef } from 'react'
import { MapContainer, Circle, TileLayer, Marker, useMapEvent, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "./styles.css";


// const API = {
//   fetchSessions: async function() {
//     let sessions = await fetch("http://ec2-54-203-7-235.us-west-2.compute.amazonaws.com/ride/rides/fields=longitude,latitude")
//     .then(response => response.json())
//     .then(data => (data.data));
//     sessions = sessions.map(session => (
//       {
//         position: [session.latitude, session.longitude],
//         popup: session.rideId,
//         id: session.rideId,
//       }
//     ));
//     return sessions;
//   },
//   fetchBuoys: async function() {
//     let response;
//     fetch("http://ec2-54-203-7-235.us-west-2.compute.amazonaws.com/ride/rides/fields=longitude,latitude")
//     .then(response => response.json())
//     .then(data => {
//       return data.data.map(session => (
//         {
//           position: [session.latitude, session.longitude],
//           popup: session.rideId,
//           id: session.rideId,
//         }
//       ));
//     })
//     .catch(error => console.log(error));
//     return response;
//   },
// }

const testData = [
  {
    id: 1,
    position: [ 23, 107 ],
  },
  {
    id: 2,
    position: [ 24, 109 ],
  },
  {
    id: 3,
    position: [ 25, 103 ],
  },
  {
    id: 4,
    position: [ 26, 105 ],
  }
]


export default function Map() {


  // TODO: ADD IN HOVER FUNCTIONALITY TO PULL UP SESSION INFO PANELS

  return (
    <div id="map-container">
      <MapContainer
        className="markercluster-map"
        center={[0,0]}
        zoom={4}
        worldCopyJump={true}
      >
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
    </div>
    
  )
}
