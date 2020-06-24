import React, {useState} from 'react'
import {authInstance} from './Helpers/api_requests'
import history from './Helpers/history'
import styles from './Stylesheets/Login.module.css'

export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState('')

    function handleNameChange (e) {
        setUsername(e.target.value)
    }
    
    function handlePasswordChange (e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
		setLoginError('')
        authInstance.post('', {
            username: username,
            password: password
        })
        .then( response => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('group', response.data.user_group)
            localStorage.setItem('user', username)
			GroupRedirect(response.data.user_group)
        })
        .catch( error => {
			setLoginError(`ERROR: ${error}`)
            localStorage.clear()
        })
        e.preventDefault()
    }
    
    return(
		<form className={styles.container} onSubmit={handleSubmit}>
			<label className={styles.formLabel}> Name: </label>
			<input className={styles.input} type="text" value={username} onChange={handleNameChange} />

			<label className={styles.formLabel}> Password: </label>
			<input className={styles.input} type="password" value={password} onChange={handlePasswordChange} />
			
			<button className={styles.button}>Login!</button>
			{loginError && <h2 className={styles.error}>An error has occured.</h2>}
		</form>
    )
}

export function GroupRedirect(group) {
	if (group === 'Bartender'){
		history.push('/orders')
	}
	else if (group === 'Table'){
		history.push('/start-order')
	}
	else {
		localStorage.clear()
		history.push('/login')
	}
	return null
	
}
