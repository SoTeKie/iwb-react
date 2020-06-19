import React, {useState, useEffect, useContext} from 'react'
import {appInstance} from '../Helpers/api_requests'
import listContext from '../Store/list_context'
import {Link} from 'react-router-dom'

export default function MakeOrder(){
	return (
		<div>
			<Items />
			<Link to='/cart'>
				<button>
					Go to checkout
				</button>
			</Link>
		</div>
	)
}

function Items(){
	const [items, setItems] = useState()

	useEffect(() => {
		appInstance.get('/items')
		.then(response => setItems(response.data))
		.catch(error => console.log(error))
	},[])

	return (
		items == null ? <h1>Loading</h1> : items.map(item => <Item key={item.id} item={item}/>)
	)
}

function Item(props){
	const cart = useContext(listContext)

	const amount = cart.items.find( item => item.id === props.item.id)

	return (
		<div>
			<h1>{props.item.name}</h1>
			<h2>{props.item.price}$</h2>
			<ContextButton item={props.item} text='+' fn={cart.incItem} />
			<ContextButton item={props.item} text='-' fn={cart.decItem} />
			<h2>{amount == null ? 0 : amount.amount}</h2>
			<hr />
		</div>	
	)
}

function ContextButton(props){
	return(
		<button onClick={() => props.fn(props.item)}>
			{props.text}	
		</button>
	)
}
