
const API = {
  postReview: async function(username, form) {
    console.log(username, form)
    fetch('http://192.168.4.77:3001/reviews/submit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username: username, ...form })
    }).then(response => console.log(response.json()))
  },
  // query by place that we got from google
  fetchReviews: async function(place) {
    let response;
    fetch(`http://192.168.4.77:3001/reviews/${place}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("something terrible happened: error: ", error))
    return response;
  },
  // fetch place from google api
  fetchPlaces: async function(city) {
    let response = fetch(`http://192.168.4.77:3001/places/${city}`)
    .then(response => response.json())
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
  },
  login: async function(username, password) {
    let response;
    console.log('fields: ', username, password);
    fetch(`http://192.168.4.77:3001/login/${username},${password}`)
    .then(response => {
      console.log(response.json())
      console.log(JSON.parse(response));
      console.log(JSON.stringify(response));
    })
    .then(data => console.log(data))
    .catch(error => console.log("something terible happened: error: ", error));
    return response;
  },
  signup: async function (username, password, city) {
    let response;
    let form = {
      username: username,
      password: password,
      home_city: city,
    }
    console.log('foirmL: ', form)
    fetch('http://192.168.4.77:3001/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form)
    }).then(response => console.log(response.json()));
    return response;
  }
}

export default API;