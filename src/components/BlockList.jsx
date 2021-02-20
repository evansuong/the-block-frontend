import React from 'react'
import "./componentStyles.css";
import ListItem from './ListItem'

export default function BlockList(props) {
  return (
    <ul id="block-list">
      { props.children.map(listItem => {
          return (
            <ListItem listItem={listItem}/>
          )
        })}
    </ul>
  )
}
