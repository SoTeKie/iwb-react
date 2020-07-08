import React, {useState, useEffect, useContext} from 'react'
import {appInstance} from '../Helpers/api_requests'
import listContext from '../Store/list_context'
import {Link} from 'react-router-dom'
import btStyles from '../Stylesheets/Button.module.css'
import orStyles from '../Stylesheets/Order.module.css'

export default function MakeOrder(){
	return (
		<Items />
	)
}

function Items(){
	const [category, setCategory] = useState(0)
	const [categories, setCategories] = useState()

	useEffect(() => {
		appInstance.get('/categories')
		.then(response => setCategories(response.data))
		.catch(error => console.log(error))
	},[])

	const [items, setItems] = useState()

	useEffect(() => {
		appInstance.get('/items')
		.then(response => setItems(response.data))
		.catch(error => console.log(error))
	},[category])

	function filterItems(item){
		return (category === 0 || item.category === category) && item.in_stock 
	}

	return (
		<div>
			<div className={btStyles.container}>
				<button className={btStyles.filterButton} onClick={() => setCategory(0)}>Show all</button>
				{categories == null ? "" : categories.map(cat => <Category key={cat.id} fn={setCategory} category={cat}/>)}
				<Link to='/cart'>
					<button style={{backgroundColor: "#428f38"}} className={btStyles.filterButton}>
						<i style={{fontSize:"20px"}} className="fas fa-shopping-cart">Cart</i>
					</button>
				</Link>
			</div>
			<div className={orStyles.container} style={{gridGap: "5px", backgroundColor:"#e8e8e8", marginTop: "10px"}}>
				{items == null ? <h1>Loading</h1> : items.filter(filterItems).map(item => <Item key={item.id} item={item}/>)}
			</div>
		</div>
	)
}

function Category(props){
	return(
		<button className={btStyles.filterButton} onClick={() => props.fn(props.category.id)}>{props.category.name}</button>
	)
}

function Item(props){
	const cart = useContext(listContext)

	const amount = cart.items.find( item => item.id === props.item.id)

	return (
		<div className={orStyles.container}>
			<h1>{props.item.name}</h1>
			<h2>{props.item.price}$</h2>
			<div>
				<ContextButton item={props.item} icon='fas fa-plus' fn={cart.incItem} />
				<ContextButton item={props.item} icon='fas fa-minus' fn={cart.decItem} />
			</div>
			<h2>{amount == null ? 0 : amount.amount}x</h2>
		</div>	
	)
}

function ContextButton(props){
	return(
		<button className={orStyles.button} onClick={() => props.fn(props.item)}>
			<i className={props.icon}></i>		
		</button>
	)
}
