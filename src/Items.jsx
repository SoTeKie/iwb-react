import React, {useState, useEffect} from 'react'
import {appInstance} from './api_requests'

export default function Items() {
	const [items, setItems] = useState([])

	useEffect( () => {
		appInstance.get('items/')
		.then(response => setItems(response))
		.catch(error => console.log(error))
		console.log(items)
	}, [])
	return (
		<h1>Hi</h1>
	)
}
