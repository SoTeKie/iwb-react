import React, {useEffect} from 'react'
import {GroupRedirect} from '../Login'
import styles from '../Stylesheets/Store.module.css'

export default function Error(){

	useEffect(() => {
		setTimeout(() => {
			GroupRedirect(localStorage.getItem('group'))
		}, 5000)
	},[])

	return(
		<h1 className={styles.container}>There was an error with your order, please try again.</h1>
	)
}
