import React, {useContext} from 'react'
import listContext from './list_context'

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

	if (itemList.length > 0){
		return(
			<table>
				<tbody>
					{itemList}
				</tbody>
			</table>
		)
	}
	else {
		return <h1>Cart is empty</h1>
	}
}

function RemoveButton(props){
	const cart = useContext(listContext)

	return(
		<button onClick={ () => cart.removeItem(props.item)}>
			Remove Item
		</button>
	)
}
