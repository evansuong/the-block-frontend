import React, { useState } from 'react'
import "./componentStyles.css";
import {ReactComponent as StarEmpty} from '../res/star-empty.svg';
import {ReactComponent as StarFilled} from '../res/star-filled.svg';



export default function PostPanel({ place, changeSideBar, goBack }) {

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [stars, setStars] = useState([false, false, false, false, false]);
  console.log([place])

  // keep array of booleans to represent the chcked state initialized all to false
  // on a star click, get its index in the array
  // set all items up to the clicked star checked = true
  // setRating to index of clicked

  function updateStars(index) {
    let updatedStars = [false, false, false, false, false];
    for (let i = 0; i <= index; i++) {
      updatedStars[i] = true;
    }
    setStars(updatedStars);
    setRating(index);
  }

  console.log(review);
  function submitReview(e) {
    e.preventDefault();
    let reviewForm = {
      rating: rating,
      review: review,
    };
    console.log(reviewForm);
    // API POST HERE
    API.postReview(reviewForm);

    changeSideBar('place', place);
  }

  return (
    <div id="post-panel">
      <div onClick={goBack}>back</div>
      <h1>Review {place.name}</h1>
      <form>
        <div id="star-rating">
          {stars.map((checked, index) => (
            <div>
              <input type="checkbox" class="onoffswitch-checkbox" id={index} onClick={() => updateStars(index)} index={index} checked={checked}/>
              <label for={index}>
                { checked ? 
                  <StarFilled width="25px" height="25px"/> : 
                  <StarEmpty width="25px" height="25px"/>
                }
              </label>
            </div>
          ))}
        </div>
        <textarea onKeyUp={e => setReview(e.target.value)}></textarea>
        <button onClick={e => submitReview(e)}>Submit</button>
      </form>
    </div>
    
  )
}
