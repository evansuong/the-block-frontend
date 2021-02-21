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
    place_name: name,
    rating: rating,
    text: text,
    imgSrc: image,
    position: [23, 123],
  }
}

const testCities = [
  buildTestData('san diego', 3, 'i broke my back, thpinal', '../res/san-diego.jpg'),
  buildTestData('los angeles', 3, 'i broke my back, thpinal', '../res/los-angeles.jpg'),
  buildTestData('san francisco', 3, 'i broke my back, thpinal', '../res/san-francisco.jpg'),
  buildTestData('bakersfield', 3, 'i broke my back, thpinal', '../res/bakersfield.jpg'),
  buildTestData('la jolla', 3, 'i broke my back, thpinal', '../res/placeholder-image.jpg')
]

const testPlaceData = [
  buildTestData('papa johns', 3, 'i broke my back, thpinal', './res/placeholder-img.jpg'),
  buildTestData('pizza hut', 3, 'i broke my back, thpinal', './res/placeholder-image.jpg'),
  buildTestData('little ceasars', 3, 'i broke my back, thpinal', './res/placeholder-image.jpg'),
  buildTestData('cpk', 3, 'i broke my back, thpinal','./res/placeholder-image.jpg'),
  buildTestData('dominos', 3, 'i broke my back, thpinal', './res/placeholder-image.jpg')
]


const testReviewData = [
  buildTestData('@evan', 3, 'decent food, good price. I enjoy coming here for dinner', false),
  buildTestData('@alana', 3, 'a fine establishment', false),
  buildTestData('@alex', 3, 'solid staff, and friendly folk!', false),
  buildTestData('@tyus', 3, 'easily one of the top spots in SD', false),
  buildTestData('@yixuan', 3, 'great owners, I come here at least once a week', false)
]


export default function Map() {

  const [sideBar, setSideBar] = useState();
  const [searchStack, setSearchStack] = useState([{ barType: 'home', listItem: {} }]);
  const [places, setPlaces] = useState();
  
  useEffect(() => {
    let side =  <BlockList 
      goBack={() => {}}
      itemType="city"
      headerItem={{}}
      search={search}
      changeSideBar={changeSideBar}>{testCities}</BlockList>;
    setSideBar(side);
  }, []);

  
  function search(search, itemType, headerItem) {
    console.log(search)
    console.log(itemType)
    let updated = itemType.filter(place => {
      console.log(place)
      console.log(place.place_name)
      return place.place_name.includes(search)
    });
    console.log(updated);
    let newSideBar = 
    <BlockList 
      goBack={goBack}
      search={search}
      headerItem={headerItem}
      itemType="place"
      changeSideBar={changeSideBar}>{updated}</BlockList>;
    setSideBar(newSideBar)
  }

  async function changeSideBar(barType, clickedItem, fromGoBack) {
   
    // make api calls to get new test data inside each switch statement
    // API READ 
    console.log(clickedItem);


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
        let places = await API.fetchPlaces(clickedItem.place_name);
        console.log(';KASDJFKJSDLKF: ', places[0].photo_ref)
        sideBar = 
          <BlockList 
            goBack={goBack}
            search={search}
            headerItem={clickedItem}
            itemType="place"
            changeSideBar={changeSideBar}>{places}</BlockList>;
        console.log(places);
        setPlaces(places);
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
        center={places ? [places[0].latitude, places[0].longitude] : [0, 0]}
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
          {places && places.map(place => (
            <Circle key={place.id} center={[ place.latitude, place.longitude ]} radius={50} color="green">
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
