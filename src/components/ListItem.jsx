import React from 'react'
import "./componentStyles.css";
import {ReactComponent as Stars} from '../res/stars.svg';


export default function ListItem({ listItem, onClick }) {

  console.log(listItem.imgSrc)
  return (
    <li>
      <div>
        <h2>{ listItem.name }</h2>
        <p>{ listItem.text }</p>
        <Stars></Stars>
      </div>
      <img src={listItem.imgSrc}></img>
    </li>
  )
}
