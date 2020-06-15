import React, {useState, useEffect} from 'react'
import {appInstance} from './api_requests'

export default function MakeOrder(){
	const [items, setItems] = useState()

	useEffect(() => {
		appInstance.get('/items')
		.then(response => setItems(response.data))
		.catch(error => console.log(error))
		console.log(items)
	},[])

	return (
		/*items.map( item => <h1>{item.name}</h1>)*/
		items == null ? <h1>what</h1> : items.map(item => <h1 key={item.id}>{item.name}</h1>)
	)
}
