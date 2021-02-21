import React, { useEffect, useState, useRef } from 'react'
import { MapContainer, Circle, TileLayer, Marker, ZoomControl, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { setSyntheticLeadingComments, setTokenSourceMapRange } from 'typescript';
import BlockList from './components/BlockList';
import PostPanel from './components/PostPanel';
import ReviewPanel from './components/ReviewPanel';
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

const testPlaceData = [
  buildTestData('papa johns', 3, 'i broke my back, thpinal', require('./res/placeholder-img.jpg')),
  buildTestData('pizza hut', 3, 'i broke my back, thpinal', './res/placeholder-image.jpg'),
  buildTestData('little ceasars', 3, 'i broke my back, thpinal', './res/placeholder-image.jpg'),
  buildTestData('cpk', 3, 'i broke my back, thpinal','./res/placeholder-image.jpg'),
  buildTestData('dominos', 3, 'i broke my back, thpinal', './res/placeholder-image.jpg')
]


const testReviewData = [
  buildTestData('@evan', 3, 'everybody meet mr. me too', false),
  buildTestData('@alana', 3, 'everybody meet mr. me too', false),
  buildTestData('@alex', 3, 'everybody meet mr. me too', false),
  buildTestData('@tyus', 3, 'everybody meet mr. me too', false),
  buildTestData('@yixuan', 3, 'everybody meet mr. me too', false)
]


export default function Map() {

  const [sideBar, setSideBar] = useState();
  const [searchStack, setSearchStack] = useState([]);
  
  useEffect(() => {
    let side = <BlockList itemType={'place'} changeSideBar={changeSideBar}>{testPlaceData}</BlockList>
    setSideBar(side);
  }, []);

  function changeSideBar(barType, clickedItem) {
    console.log('clicked item: ', clickedItem);
    console.log('bar type: ', barType);

    // make api calls to get new test data inside each switch statement
    // API READ 
    const lastbar = {
      place: 'city',
      review: 'place',
      post: 'place',
    }

    let sideBar; 
    switch(barType) {
      case 'city': 
        sideBar = 
          <BlockList 
            goBack={goBack}
            itemType="place"
            changeSideBar={changeSideBar}>{testPlaceData}</BlockList>;
        break;
      case 'place':
        // change type of list item to places
        sideBar = 
          <BlockList 
            itemType="review"
            headerItem={clickedItem}
            goBack={goBack}
            changeSideBar={changeSideBar}>{testReviewData}</BlockList>;
        break;
      case 'review': 
      // change type of list item to reviews
       
        break;
      case 'post':
        // change list panel to post panel
        sideBar = 
          <PostPanel 
            goBack={goBack}
            place={clickedItem}
            changeSideBar={changeSideBar}/>
        break;
    }

    let newSearchStack = searchStack;
    newSearchStack.push({ barType: lastbar[barType], listItem: clickedItem });
    setSearchStack(newSearchStack);
    setSideBar(sideBar);
  }

  function goBack() {
    let newSearchStack = searchStack;
    let lastItem = newSearchStack.pop();
    setSearchStack(newSearchStack);
    changeSideBar(lastItem.barType, lastItem.listItem);
  }

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
          {testPlaceData && testPlaceData.map(place => (
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
