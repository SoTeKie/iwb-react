import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login'
import {appInstance} from "./api_requests"

// Temporary function
function GetOrders (){

  function handleClick() {
    appInstance.get('orders/')
    .then( response => console.log(response))
    .catch( error => console.log(error.response))
  }

  return(
    <button onClick={handleClick}>
      Get orders!
    </button>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <Login />
    <GetOrders />
  </React.StrictMode>,
  document.getElementById('root')
);
