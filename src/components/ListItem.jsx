import React from 'react'
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


export function HeaderItem({ onClick, headerItem, itemType }) {

  return (

    <div id="block-list-header">
      { headerItem.imgSrc && <img id="block-list-header-bkg" src={img}/> }
      <div id="block-list-header-info">
        <h2>{ headerItem.name }</h2>
        <p>{ headerItem.text }</p>
        {/* todo make this scalable */}
        <Stars id="stars" fill="black"/>
        { itemType === 'review' && <div id="review-btn" onClick={() => onClick('post', headerItem)}>LEAVE A REVIEW</div>  
        }
      </div>
    </div>
  )
}
