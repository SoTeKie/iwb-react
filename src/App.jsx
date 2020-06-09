import React from 'react'
import {Router, Switch, Route} from 'react-router-dom'
import history from './history'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import Orders from './Orders'


export default function App() {
	return (
		<Router history={history}>
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
