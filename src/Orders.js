import React from 'react'
import {appInstance} from "./api_requests"

function Orders (){

  function handleClick() {
    appInstance.get('orders/')
    .then( response => console.log(response))
    .catch( error => console.log(error.response))
  }

  return()
}
