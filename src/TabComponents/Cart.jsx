import React, {useContext} from 'react'
import listContext from '../Store/list_context'
import {appInstance} from '../Helpers/api_requests'
import history from '../Helpers/history'
import styles from '../Stylesheets/Store.module.css'
import btStyles from '../Stylesheets/Orders.module.css'
import {Link} from 'react-router-dom'

export default function Cart(){
	const cart = useContext(listContext)

	const itemList = cart.items.map( (item, index) => {
		return (
			<tr key={index}>
				<td>{item.name}</td>
				<td>{item.price}</td>
				<td>{'x'+item.amount}</td>
				<td>{<RemoveButton item={item} />}</td>
			</tr>
		)
	})
	
	function handleClick(){
		const items = []

		cart.items.map( item => {
			items.push({
				item_id: item.id,
				quantity: item.amount
			})
			return null
		})

		appInstance.post('/orders/', {
			customer: localStorage.getItem('user'),
			notes: '',
			items: items
		})
		.then(response => {
			console.log(response)
			history.push('/success')
		})
		.catch(error => {
			console.log(error)
			history.push('/error')
		})
	}

	if (itemList.length > 0){
		return(
			<div>
				<BackButton />
				<table>
					<tbody>
						{itemList}
					</tbody>
				</table>
				<button onClick={handleClick}>Order</button>
			</div>
		)
	}
	else {
		return (
			<div>
				<h1 className={styles.container}>Cart is empty</h1>
				<BackButton />
			</div>
		)
	}
}

function BackButton(){
	return (
		<Link to='/make-order/'>
			<button className={btStyles.button} style={{backgroundColor: "#f7f7f7"}}>
				Go back
			</button>
		</Link>
	)
}

function RemoveButton(props){
	const cart = useContext(listContext)
		
	return(
		<button onClick={ () => cart.removeItem(props.item)}>
			Remove Item
		</button>
	)
}
