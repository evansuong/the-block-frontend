import React from 'react'
import "./componentStyles.css";


export default function PostPanel({ place }) {

  const [stars, setStars] = useState(0);
  const [review, setReview] = useState('');


  return (
    <form>
      <div>
        <input type="checkbox" class="onoffswitch-checkbox" id="inline" checked/> 
        <input type="checkbox" class="onoffswitch-checkbox" id="inline" checked/> 
        <input type="checkbox" class="onoffswitch-checkbox" id="inline" checked/> 
        <input type="checkbox" class="onoffswitch-checkbox" id="inline" checked/> 
        <input type="checkbox" class="onoffswitch-checkbox" id="inline" checked/> 
      </div>
      <textarea></textarea>
    </form>
  )
}
