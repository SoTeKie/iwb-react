import React from 'react'
import {Router, Switch, Route} from 'react-router-dom'
import history from './Helpers/history'
import Login, {GroupRedirect} from './Login'
import PrivateRoute from './PrivateRoute'
import Orders from './BarComponents/Orders'
import Items from './BarComponents/Items'
import StartOrder from './TabComponents/StartOrder'
import MakeOrder from './TabComponents/MakeOrder'
import Cart from './TabComponents/Cart'
import Success from './TabComponents/Success'
import Error from './TabComponents/Error'
import Store from './Store/Store'

export default function App() {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path='/login'>
					<Login />
				</Route>
				{/*Bartender routes*/}
				<PrivateRoute exact path='/orders'>
					<Orders />
				</PrivateRoute>
				<PrivateRoute exact path='/mark-items'>
					<Items />
				</PrivateRoute>
				{/*Customer routes*/}
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
				{/*Redirect*/}
				<Route path='*'>
					{() => GroupRedirect(localStorage.getItem('group'))}
				</Route>
			</Switch>
		</Router>
	)
}
