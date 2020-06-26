import React, {useEffect} from 'react'
import {GroupRedirect} from '../Login'
import styles from '../Stylesheets/Store.module.css'

export default function Success(){

	useEffect(() => {
		setTimeout(() => {
			GroupRedirect(localStorage.getItem('group'))
		}, 5000)
	},[])

	return(
		<h1 className={styles.container}>Your order was a success!</h1>
	)
}
