import React, {useEffect, useState} from 'react'
import {appInstance} from './api_requests'

export default function Orders (){
	const [orders, setOrders] = useState()

	useEffect(() => {
		appInstance.get('orders/')
		.then( response => setOrders(response.data))
		.catch( error => console.log(error.response))
	},[])
	return(
		orders == null ? 
			<h1>No Orders</h1> : 
			orders.map((order, index) => <Order key={index} order={order} />)
	)
}

function Order(props){
	return(
		<div>
			<h1>{props.order.__str__}</h1>
			<h2>at {props.order.customer}</h2>
			<h3>{props.order.isCompleted ? "Delivered" : "Not delivered"}</h3>
			<h3>{props.order.isPaid ? "Paid" : "Not paid"}</h3>
			{props.order.items.map( (item, index) => <Item key={index} item={item} />)}
			<GetPrice items={props.order.items} />
		</div>
	)
}

function Item(props){
	return(
		<h3>{props.item.name + " x" + props.item.quantity}</h3>
	)
}

function GetPrice(props){
	const price = props.items.reduce((price, item) => price + (item.price*item.quantity), 0)
	return (
		<h3>{price}$</h3>
	)
}
