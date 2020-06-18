import React, {useEffect} from 'react'
import {appInstance} from './api_requests'

export default function Orders (){

	useEffect(() => {
		appInstance.get('orders/')
		.then( response => console.log(response))
		.catch( error => console.log(error.response))
	},[])
	return(
		<button onClick={handleClick}> Get orders! </button>
	)
}
