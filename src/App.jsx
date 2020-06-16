import React from 'react'
import {Router, Switch, Route, Redirect} from 'react-router-dom'
import history from './history'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import Orders from './Orders'
import StartOrder from './StartOrder'
import MakeOrder from './MakeOrder'
import Store from './Store'

export default function App() {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path='/login'>
					<Login />
				</Route>
				<PrivateRoute exact path='/orders'>
					<Orders />
				</PrivateRoute>
				<PrivateRoute exact path='/start-order'>
					<StartOrder />
				</PrivateRoute>
				<PrivateRoute exact path='/make-order'>
					<Store>
						<MakeOrder />
					</Store>
				</PrivateRoute>
				<Route path='*'>
					<Redirect to='/login' />
				</Route>
			</Switch>
		</Router>
	)
}
