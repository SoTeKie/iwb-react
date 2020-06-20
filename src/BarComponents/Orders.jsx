import React, {useEffect, useState} from 'react'
import {appInstance} from '../Helpers/api_requests'

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
	const [isCompleted, setIsCompleted] = useState(props.order.isCompleted)
	const [isPaid, setIsPaid] = useState(props.order.isPaid)

	function handlePClick(){
		appInstance.patch(`/orders/${props.order.id}/`,{
			isPaid: !isPaid,
		})
		.then(response => {
			setIsPaid(!isPaid)
			console.log(response)
		})
		.catch(error => console.log(error))
	}

	function handleCClick(){
		appInstance.patch(`/orders/${props.order.id}/`,{
			isCompleted: !isCompleted,
		})
		.then(response => {
			console.log(response)
			setIsCompleted(!isCompleted)
		})
		.catch(error => console.log(error))
	}
	return(
		<div>
			<h1>{props.order.__str__}</h1>
			<h2>at {props.order.customer}</h2>
			<button onClick={handleCClick}>{isCompleted ? "Delivered" : "Not delivered"}</button>
			<button onClick={handlePClick}>{isPaid ? "Paid" : "Not paid"}</button>
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
