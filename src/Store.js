import React, {useState} from 'react'
import list_context from './list_context'

export default function Store({children}){
	const initialState = {
		items: [],
		incItem: incItem,
		decItem: decItem,
		removeItem: removeItem
	}

	const [cart, setCart] = useState(initialState)

	return(
		<list_context.Provider value={cart}>
			{children}
		</list_context.Provider>
	)

	function incItem(incrementedItem){
		let newItems = cart.items

		const newItem = {
			id:incrementedItem.id,
			name:incrementedItem.name,
			amount:1
        }
		
		const filtered = newItems.filter(item => item.id === incrementedItem.id)

		if (filtered.length > 0){
			const index = newItems.map(item => item.id ).indexOf(incrementedItem.id)
			newItems[index].amount += 1
		}
		else {
			newItems.push(newItem)
		}

		setCart({...cart, items:newItems})

	}

	function decItem(decrementedItem){
		const newItems = cart.items

		const filtered = newItems.filter( item => item.id === decrementedItem.id)

		if (filtered.length > 0){
			const index = newItems.map(item => item.id ).indexOf(decrementedItem.id)
			if (newItems[index].amount > 1){ 
				newItems[index].amount -= 1 
				setCart({...cart, items:newItems})
			}
			else {
				cart.removeItem(decrementedItem)
			}
		}

	}

	function removeItem(removedItem){
		const newItems = cart.items

		const index = newItems.indexOf(removedItem)

		newItems.splice(index, 1)
		
		setCart({...cart, items:newItems})
	}
}
