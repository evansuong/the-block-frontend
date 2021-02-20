import React from 'react'
import "./componentStyles.css";
import {ReactComponent as Stars} from '../res/stars.svg';
import img from '../res/placeholder-img.jpg'; // with import


export default function ListItem({ listItem, onClick }) {

  console.log(listItem.imgSrc)
  return (
    <li onClick={onClick}>
      <div>
        <h2>{ listItem.name }</h2>
        <p>{ listItem.text }</p>
        {/* todo make this scalable */}
        <Stars id="stars"/>
      </div>
      <img width="100px" height="100px" src={img}/>
    </li>
  )
}
