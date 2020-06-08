import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import Orders from './Orders'

export default function App() {
	return (
		<Router>
			<Switch>
				<Route path='/login'>
					<Login />
				</Route>
				<PrivateRoute path='/orders'>
					<Orders />
				</PrivateRoute>
				<PrivateRoute path='/items'>
					<h1> Items </h1>
				</PrivateRoute>
			</Switch>
		</Router>
	)
}
