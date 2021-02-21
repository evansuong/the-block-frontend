

const API = {
  // query by place that we got from google
  fetchReviews: async function() {
    fetch("our backend")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("something terrible happened: error: ", error))
    return reviews;
  },
  // fetch place from google api
  fetchRestaurants: async function() {
    let response;
    fetch("our backend")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("something terrible happened: error: ", error));
    return response;
  },
  // fetch cities from google api
  fetchCities: async function() {
    let response; 
    fetch("our backend url")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("something terible happened: error: ", error));
    return response;
  }
}

export default API;