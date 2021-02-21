import React, { useState } from 'react'
import "./componentStyles.css";
import { ListItem, HeaderItem } from './ListItem';

export default function BlockList(props) {

  const [search, setSearch] = useState('');
  
  // onclick we must find the individual place and dispaly that panel

  return (

    <div id="list-container">
      { props.headerItem && 
        <HeaderItem places={props.children} headerItem={props.headerItem} photo_ref={props.photo_ref} goBack={props.goBack} search={props.search} itemType={props.itemType} onClick={props.changeSideBar}/>
      }
      <ul id="block-list">
        {props.children.map((listItem, index) => {
          return (
            <ListItem index={index} key={listItem.name} onClick={props.changeSideBar} itemType={props.itemType} listItem={listItem}/>
          )
        })}
      </ul>
    </div>
   
  )
}
