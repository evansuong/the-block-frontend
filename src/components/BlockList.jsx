import React from 'react'
import "./componentStyles.css";
import ListItem from './ListItem'

export default function BlockList(props) {

  // onclick we must find the individual place and dispaly that panel



  return (
    <ul id="block-list">
      { props.children.map(listItem => {
          return (
            <ListItem onClick={props.changeSideBar} listItem={listItem}/>
          )
        })}
    </ul>
  )
}
