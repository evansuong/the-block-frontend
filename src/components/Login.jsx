import React, {useState} from 'react';
import { render } from 'react-dom';
//import ReactDOM from 'react-dom';
import "./componentStyles.css";
import "./loginStyles.css";
import API from '../API.js';

export default function Login() {
  const [isLogin, setLogin] = useState(true)
  const [loggingIn, setLoggingIn] = useState(false)  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [city, setCity] = useState('')

  function handleLogin () {
    if(isLogin) {
      console.log('logging in')
      let userInfo = {
        username: username,
        password: password,
      } 
      API.login(username, password);
    }
    else {
      console.log('singing up')
      let userInfo = {
        username: username,
        password: password,
        cPassword: cPassword,
        city: city,
      }
      API.signup(username, password, city);
    }
    console.log(username);
    console.log(password);
    console.log(cPassword);
    console.log(city);
  }

  function toggleLogin () {
      document.getElementById('login-button').style.backgroundColor='#32FC8F'
      document.getElementById('signup-button').style.backgroundColor='#020202'
  }

  function toggleSignup () {
    document.getElementById('signup-button').style.backgroundColor='#32FC8F'
    document.getElementById('login-button').style.backgroundColor='#020202'
  }

  return (
    isLogin ?
    <div id="bg">
      <div id="login">
        
        <div id="the">
          The
        </div>
        <div id="block">
          Block
        </div>

        <div id="login-form">
          <form action="/home" method="get">
            <section class="username">
              <label for="username" class="label">Username</label> 
              <br></br>
              <textarea onKeyUp={e => setUsername(e.target.value)}></textarea>
            </section>
          
            <section class="password">
              <label for="password" class="label">Password </label>
              <br></br>
              <textarea onKeyUp={e => setPassword(e.target.value)}></textarea>
            </section>
            <button id="go-button" class="go" onClick={() => {handleLogin(); setLoggingIn(true)}}>go</button>
          </form>
        </div>

        <button id="login-button" class="loginB" onClick={() => {setLogin(true); toggleLogin()}}>login</button>
        <button id="signup-button" class="loginB" onClick={() => {setLogin(false); toggleSignup()}}>signup</button>

      </div>
    </div> :

    <div id="bg">
      <div id="login">
      
        <div id="the">
          The
        </div>
        <div id="block">
          Block
        </div>

        <div id="signup-form">
          <form action="/home" method="get">
            <section class="username">
              <label for="username" class="label">Username</label> 
              <br></br>
              <textarea onKeyUp={e => setUsername(e.target.value)}></textarea>
            </section>
          
            <section class="password">
              <label for="password" class="label">Password </label>
              <br></br>
              <textarea onKeyUp={e => setPassword(e.target.value)}></textarea>
            </section>

            <section class="c-password">
              <label for="c-password" class="label">Confirm Password </label>
              <br></br>
              <textarea onKeyUp={e => setCPassword(e.target.value)}></textarea>
            </section>

            <section class="home-city">
              <label for="home-city" class="label">Home City</label>
              <br></br>
              <textarea onKeyUp={e => setCity(e.target.value)}></textarea>
            </section>

            <button id="go-button" class="go" onClick={() => {handleLogin(); setLoggingIn(true)}}>go</button>
          </form>
        </div>

        <button id="login-button" class="loginB" onClick={() => {setLogin(true); toggleLogin()}}>login</button>
        <button id="signup-button" class="loginB" onClick={() => {setLogin(false); toggleSignup()}}>signup</button>

    </div>
  </div>
  );
}



