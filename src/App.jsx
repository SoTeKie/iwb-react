import React from 'react'
import {Router, Switch, Route} from 'react-router-dom'
import history from './history'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import Orders from './Orders'
import StartOrder from './StartOrder'
import MakeOrder from './MakeOrder'

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
				<PrivateRoute path='/start-order'>
					<StartOrder />
				</PrivateRoute>
				<PrivateRoute path='/make-order'>
					<MakeOrder />
				</PrivateRoute>
			</Switch>
		</Router>
	)
}
