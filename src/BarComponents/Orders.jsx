import React, {useEffect, useState} from 'react'
import {appInstance} from '../Helpers/api_requests'
import buttonStyles from '../Stylesheets/Button.module.css'
import orderStyles from '../Stylesheets/Orders.module.css'

export default function Orders (){
	const [orders, setOrders] = useState()
	const [filters, setFilter] = useState({
		isPaid: true,
		isCompleted: true
	})

	useEffect(() => {
		appInstance.get('orders/')
		.then( response => setOrders(response.data))
		.catch( error => console.log(error.response))
	},[filters])

	useEffect(() => {
		const interval = setInterval(() => {
			appInstance.get('orders/')
			.then( response => setOrders(response.data))
			.catch( error => console.log(error.response))
		}, 60000)
		return () => clearInterval(interval)
	},[])

	function filterOrders(order){
		return (
			   ((filters.isPaid || !(order.isPaid)) && (filters.isCompleted || !(order.isCompleted)))
		)
	}

	return(
		(orders == null || orders.length === 0)? 
			<h1>No Orders</h1> : 
			<div>
				<div className={buttonStyles.container}>
					<button className={buttonStyles.filterButton} onClick={() => setFilter({...filters, isPaid: !filters.isPaid})}>{filters.isPaid ? 'Paid and unpaid' : 'Open tab'}</button>
					<button className={buttonStyles.filterButton} onClick={() => setFilter({...filters, isCompleted: !filters.isCompleted})}>{filters.isCompleted ?  'Delivered and undelivered' : 'Undelivered'}</button>
				</div>
				<div>
					{orders.filter(filterOrders).map(order => <Order key={order.id} order={order} />)}
				</div>
			</div>
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
		<div className={orderStyles.order}>
			<h1>{props.order.__str__} - at {props.order.customer}</h1>
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
