import React from 'react'
import history from './history'

export default function StartOrder() {
	function handleClick(){
		history.push('/make-order')
	}
	return (
		<button onClick={handleClick}> Start ordering! </button>
	)
}
