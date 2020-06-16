import React, {useState, useEffect} from 'react'
import {appInstance} from './api_requests'

export default function MakeOrder(){
	const [items, setItems] = useState()

	useEffect(() => {
		appInstance.get('/items')
		.then(response => setItems(response.data))
		.catch(error => console.log(error))
	},[])

	return (
		items == null ? <h1>what</h1> : items.map(item => <Item key={item.id} item={item}/>)
	)
}

function Item(props){
	return (
		<div>
			<h1>{props.item.name}</h1>
			<h2>{props.item.price}</h2>
			<hr />
		</div>	
	)
}
