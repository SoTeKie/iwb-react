import React from 'react'
import {Link} from 'react-router-dom'
import styles from '../Stylesheets/Store.module.css'

export default function StartOrder() {
	return (
		<Link className={styles.container} to='/make-order'>
			<button className={styles.button}>Start ordering! </button>
		</Link>
	)
}
