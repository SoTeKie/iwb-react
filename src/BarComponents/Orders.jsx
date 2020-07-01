import React, {useEffect, useState} from 'react'
import {appInstance} from '../Helpers/api_requests'
import buttonStyles from '../Stylesheets/Button.module.css'
import orderStyles from '../Stylesheets/Orders.module.css'
import cntStyles from '../Stylesheets/Store.module.css'

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
			<h1 className={cntStyles.container}>No Orders</h1> : 
			<div>
				<div className={buttonStyles.container}>
					<button className={buttonStyles.filterButton} onClick={() => setFilter({...filters, isPaid: !filters.isPaid})}>{filters.isPaid ? 'Paid and unpaid' : 'Open tab'}</button>
					<button className={buttonStyles.filterButton} onClick={() => setFilter({...filters, isCompleted: !filters.isCompleted})}>{filters.isCompleted ?  'Delivered and undelivered' : 'Undelivered'}</button>
				</div>
				<div>
					{orders.filter(filterOrders).reverse().map(order => <Order key={order.id} order={order} />)}
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

	const color = isState => isState ? orderStyles.complete : orderStyles.incomplete

	return(
		<div className={orderStyles.order}>
			<h1 className={orderStyles.name}>{props.order.__str__} - at {props.order.customer}</h1>
			<div className={orderStyles.buttons}>
				<button className={`${orderStyles.button} ${color(isCompleted)}`} onClick={handleCClick}>{isCompleted ? "Delivered" : "Not delivered"}</button>
				<button className={`${orderStyles.button} ${color(isPaid)}`} onClick={handlePClick}>{isPaid ? "Paid" : "Not paid"}</button>
			</div>
			{props.order.items.map( (item, index) => <Item  key={index} item={item} />)}
			<GetPrice  items={props.order.items} />
			<p className={orderStyles.note}>Customer requests: <br />"{props.order.notes}"</p>
		</div>
	)
}

function Item(props){
	return(
		<h3 className={orderStyles.item}>{props.item.name + " x" + props.item.quantity}</h3>
	)
}

function GetPrice(props){
	const price = props.items.reduce((price, item) => price + (item.price*item.quantity), 0)
	return (
		<div className={orderStyles.price}>
			<hr />
			<h3>{price}$</h3>
		</div>
	)
}
