import React, {useState, useEffect} from 'react'
import {appInstance} from '../Helpers/api_requests'
import btStyles from '../Stylesheets/Button.module.css'
import itStyles from '../Stylesheets/Mark.module.css'

export default function Items(){
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
		return category === 0 || item.category === category 
	}

	if (categories == null || items == null){
		return (
			<h1>Loading...</h1>
		)
	}

	return (
		<div>
			<div className={btStyles.container}>
				<button className={btStyles.filterButton} onClick={() => setCategory(0)}>Show all</button>
				{categories.map(cat => <Category key={cat.id} fn={setCategory} category={cat} />)}
			</div>
			{items.filter(filterItems).map(item => <Item key={item.id} item={item}/>)}
		</div>
	)
}

function Category(props){
	return(
		<button className={btStyles.filterButton} onClick={() => props.fn(props.category.id)}>{props.category.name}</button>
	)
}

function Item(props){
	const [inStock, setInStock] = useState(props.item.in_stock)

	function handleClick(){
		appInstance.patch(`/items/${props.item.id}/`, {
			in_stock: !inStock,
		})
		.then(response => {
			console.log(response)
			setInStock(!inStock)
		})
		.catch(error => console.log(error))
	}

	const color = inStock ? '#428f38' : '#cf6c61'
	const text = inStock ? 'In stock' : 'Out of stock'

	return (
		<div className={itStyles.container}>
			<h1 className={itStyles.name}>{props.item.name}</h1>
			<button className={itStyles.button} style={{backgroundColor: color}} onClick={handleClick}>{text}</button>
		</div>
	)
}
