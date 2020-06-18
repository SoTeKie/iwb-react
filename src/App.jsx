import React from 'react'
import {Router, Switch, Route} from 'react-router-dom'
import history from './history'
import Login, {GroupRedirect} from './Login'
import PrivateRoute from './PrivateRoute'
import Orders from './Orders'
import StartOrder from './StartOrder'
import MakeOrder from './MakeOrder'
import Store from './Store'
import Cart from './Cart'
import Success from './Success'
import Error from './Error'

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
				<PrivateRoute exact path='/cart'>
					<Store>
						<Cart />
					</Store>
				</PrivateRoute>
				<Route exact path='/success'>
					<Success />
				</Route>
				<Route exact path='/error'>
					<Error />
				</Route>
				<Route path='*'>
					{() => GroupRedirect(localStorage.getItem('group'))}
				</Route>
			</Switch>
		</Router>
	)
}
