import React, {useEffect} from 'react'
import {GroupRedirect} from './Login'

export default function Success(){

	useEffect(() => {
		setTimeout(() => {
			GroupRedirect(localStorage.getItem('group'))
		}, 5000)
	},[])

	return(
		<h1>Your order was a success!</h1>
	)
}
