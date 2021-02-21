import React, { useState } from 'react'
import "./componentStyles.css";
import {ReactComponent as Stars} from '../res/stars.svg';
import img from '../res/placeholder-img.jpg'; // with import


export function ListItem({ itemType, listItem, onClick }) {

  return (

    <li onClick={() => onClick(itemType, listItem)}>
      <div>
        <h2>{ listItem.name }</h2>
        <p>{ listItem.text }</p>
        {/* todo make this scalable */}
        <Stars id="stars"/>
      </div>
      { listItem.imgSrc && <img width="70px" height="70px" src={img}/> }
    </li>
  )
}


export function HeaderItem({ onClick, headerItem, itemType, search, goBack }) {
  const [searchInput, setSearchInput] = useState('');

  return (

    <div id="block-list-header">
      <div id="header-header">
        { itemType !== 'city' ? <div id="back-btn" onClick={goBack}>back</div> : <div></div> }
        { itemType !== 'review' &&
        <div id="search-bar">
          <input onKeyUp={e => setSearchInput(e.target.value)}/>
          <button onClick={() => search(searchInput, itemType)}>search</button>
        </div>
      }
      </div>
      
     
      { itemType !== 'city' &&
      
        <div id="block-list-header-info">
          { headerItem.imgSrc && <img id="block-list-header-bkg" src={img}/> }
          <div id="header-content">
            <h2>{ headerItem.name }</h2>
            <p>{ headerItem.text }</p>
            {/* todo make this scalable */}
            <Stars id="stars" fill="black"/>
            { itemType === 'review' && <div id="review-btn" onClick={() => onClick('post', headerItem)}>LEAVE A REVIEW</div>  
            }
          </div>
        </div>

      }
      
    </div>
  )
}
