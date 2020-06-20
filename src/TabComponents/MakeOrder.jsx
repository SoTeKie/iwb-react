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

	const [category, setCategory] = useState(0)
	const [categories, setCategories] = useState()

	useEffect(() => {
		appInstance.get('/categories')
		.then(response => setCategories(response.data))
		.catch(error => console.log(error))
	},[])

	function filterItems(item){
		if (category === 0){
			return true
		}
		return item.category === category
	}

	return (
		<div>
			<button onClick={() => setCategory(0)}>Show all</button>
			{categories == null ? "" : categories.map(cat => <Category key={cat.id} fn={setCategory} category={cat}/>)}
			{items == null ? <h1>Loading</h1> : items.filter(filterItems).map(item => <Item key={item.id} item={item}/>)}
		</div>
	)
}

function Category(props){
	return(
		<button onClick={() => props.fn(props.category.id)}>{props.category.name}</button>
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
