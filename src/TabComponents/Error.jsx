import React, {useEffect} from 'react'
import {GroupRedirect} from '../Login'

export default function Error(){

	useEffect(() => {
		setTimeout(() => {
			GroupRedirect(localStorage.getItem('group'))
		}, 5000)
	},[])

	return(
		<h1>There was an error with your order, please try again.</h1>
	)
}
