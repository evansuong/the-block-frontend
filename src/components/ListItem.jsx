import React, { useState, useEffect } from 'react'
import "./componentStyles.css";
import {ReactComponent as Stars} from '../res/stars.svg';
import {ReactComponent as Onestar} from '../res/1star.svg';
import {ReactComponent as Twostar} from '../res/2star.svg';
import {ReactComponent as Threestar} from '../res/3star.svg';
import {ReactComponent as Fourstar} from '../res/4star.svg';
import {ReactComponent as Threefivestar} from '../res/3-5star.svg';
import {ReactComponent as Fourtwostar} from '../res/4-2star.svg';

import sd from '../res/san-diego.jpg';
import la from '../res/los-angeles.jpg';
import ba from '../res/bakersfield.jpg';
import sf from '../res/san-francisco.jpg';
import bb from '../res/better-bowls.jpg';
import tm from '../res/the-mission.jpg';
import ut from '../res/uricchios-trattoria.jpg';

const pics = {
  'san diego': sd,
  'los angeles': la,
  'bakersfield': ba,
  'san francisco': sf,
  'Better Bowls': bb,
  'The Mission. WE ARE OPEN FOR PATIO DINING, TAKEOUT AND DELIVERY 2/13/21!!!!': tm,
  'uricchios trattoria': ut,
}

const stars = [
  <Threestar/>, 
  <Threestar/>,
  <Twostar/>,
  <Stars/>,
  <Fourstar/>,
  <Onestar/>,
]


export function ListItem({ places, itemType, index, listItem, onClick }) {

  

  return (

    <li onClick={() => onClick(itemType, listItem)}>
      <div>
        <h2>{ listItem.place_name }</h2>
        { itemType === 'place' && <p>{ listItem.place_address }</p> }
        { itemType === 'review' && <p>{ listItem.text }</p> }
        {/* todo make this scalable */}
        { itemType !== 'city' && itemType !== 'place' && stars[index] }
 
      </div>
    </li>
  )
}

export function HeaderItem({ onClick, headerItem, photo_ref, itemType, search, goBack, index, places }) {
  const [searchInput, setSearchInput] = useState('');
  const [image, setImage] = useState();

  console.log("HEADER ITEM: ", headerItem.place_name)

  useEffect(() => {
    console.log("AKDSJFHLKAJDSHFJKLD: ", photo_ref);
    if (photo_ref) fetch(`http://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_ref}&key=AIzaSyAIhiPvfSCCmtoxJ4eFuCaWeW3onqe6Lkk`)
    .then(response=> {
      console.log(response)
      setImage(headerItem.imageSrc)
    })
    .catch(err => console.log(err));
  }, [])


  return (

    <div id="block-list-header">
      <div id="header-header">
        { itemType !== 'city' ? <div id="back-btn" onClick={goBack}>back</div> : <div></div> }
        { itemType !== 'review' &&
        <div id="search-bar">
          <input onKeyUp={e => setSearchInput(e.target.value)}/>
          <button onClick={() => search(searchInput, places, headerItem)}>search</button>
        </div>
      }
      </div>
      
      { itemType !== 'city' &&
      
        <div id="block-list-header-info">
          <img id="block-list-header-bkg" src={pics[headerItem.place_name]}/> 
          <div id="header-content">
            <h2>{ headerItem.place_name }</h2>
            {/* <p>{ headerItem.text }</p> */}
            {/* todo make this scalable */}
            { itemType !== 'city' && itemType !== 'place' && stars[index] }
            { itemType === 'review' && <div id="review-btn" onClick={() => onClick('post', headerItem)}>LEAVE A REVIEW</div>  
            }
          </div>
        </div>
      }
    </div>
  )
}
