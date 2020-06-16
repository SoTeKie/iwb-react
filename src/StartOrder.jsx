import React from 'react'
import {Link} from 'react-router-dom'

export default function StartOrder() {
	return (
		<Link to='/make-order'>
			<button>Start ordering! </button>
		</Link>
	)
}
