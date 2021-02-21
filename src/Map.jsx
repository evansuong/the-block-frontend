import React, { useEffect, useState, useRef } from 'react'
import { MapContainer, Circle, TileLayer, Marker, ZoomControl, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { setSyntheticLeadingComments, setTokenSourceMapRange } from 'typescript';
import BlockList from './components/BlockList';
import PostPanel from './components/PostPanel';
import ReviewPanel from './components/ReviewPanel';
import API from "./API";
import "./styles.css";


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

const testCities = [
  buildTestData('san diego', 3, 'i broke my back, thpinal', require('./res/placeholder-img.jpg')),
  buildTestData('los angeles', 3, 'i broke my back, thpinal', './res/placeholder-image.jpg'),
  buildTestData('san francisco', 3, 'i broke my back, thpinal', './res/placeholder-image.jpg'),
  buildTestData('bakersfield', 3, 'i broke my back, thpinal','./res/placeholder-image.jpg'),
  buildTestData('la jolla', 3, 'i broke my back, thpinal', './res/placeholder-image.jpg')
]

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
  const [searchStack, setSearchStack] = useState([{ barType: 'home', listItem: {} }]);
  
  useEffect(() => {
    let side =  <BlockList 
      goBack={() => {}}
      itemType="city"
      headerItem={{}}
      search={search}
      changeSideBar={changeSideBar}>{testCities}</BlockList>;
    setSideBar(side);
  }, []);

  
  function search(search, itemType) {
    // query the api 
    switch(itemType) {
      case 'city':
        API.fetchCities(search)
        .then(response => console.log(response));
        // TODO set the list data to the API response
        break;
      case 'place':
        API.fetchRestaurants(search)
        .then(response => console.log(response));
        // TODO set the list data to the API response
        break;
    }
  }

  function changeSideBar(barType, clickedItem, fromGoBack) {
   
    // make api calls to get new test data inside each switch statement
    // API READ 
    const lastbar = {
      city: 'home',
      place: 'city',
      review: 'place',
      post: 'place',
    }

    let sideBar; 
    switch(barType) {
      case 'home':
        sideBar =  
          <BlockList 
            goBack={() => {}}
            itemType="city"
            headerItem={{}}
            search={search}
            changeSideBar={changeSideBar}>{testCities}</BlockList>;
        break;
      case 'city': 
        sideBar = 
          <BlockList 
            goBack={goBack}
            search={search}
            headerItem={clickedItem}
            itemType="place"
            changeSideBar={changeSideBar}>{testPlaceData}</BlockList>;
        break;
      case 'place':
        // change type of list item to places
        sideBar = 
          <BlockList 
            itemType="review"
            headerItem={clickedItem}
            search={search}
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
    console.log(fromGoBack)
    if (fromGoBack) {
      console.log('not pushing')
    } else {
    console.log("pushing: ", clickedItem, barType);
      newSearchStack.push({ barType: barType, listItem: clickedItem });
    }
    setSearchStack(newSearchStack);
    setSideBar(sideBar);
  }

  function goBack() {
    let newSearchStack = searchStack;
    newSearchStack.pop();
    let lastItem = newSearchStack[newSearchStack.length - 1];
    console.log("popping: ", lastItem);
    setSearchStack(newSearchStack);
    changeSideBar(lastItem.barType, lastItem.listItem, true);
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
