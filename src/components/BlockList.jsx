import React, { useState } from 'react'
import "./componentStyles.css";
import { ListItem, HeaderItem } from './ListItem';

export default function BlockList(props) {

  // onclick we must find the individual place and dispaly that panel

  return (
    <div id="list-container">
     
    
      { props.headerItem && 
        <HeaderItem headerItem={props.headerItem} goBack={props.goBack} search={props.search} itemType={props.itemType} onClick={props.changeSideBar}/>
      }
      <ul id="block-list">
        {props.children.map(listItem => {
          return (
            <ListItem key={listItem.name} onClick={props.changeSideBar} itemType={props.itemType} listItem={listItem}/>
          )
        })}
      </ul>
    </div>
   
  )
}
