import React from 'react'
import "./componentStyles.css";
import { ListItem, HeaderItem } from './ListItem'

export default function BlockList(props) {

  // onclick we must find the individual place and dispaly that panel

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      { props.listItem !== 'city' && <div id="back-btn" onClick={props.goBack}>back</div> }
      { props.headerItem && 
        <HeaderItem headerItem={props.headerItem} onClick={props.changeSideBar}/>
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
