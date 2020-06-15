import React, {useState} from 'react'
import {authInstance} from './api_requests'
import history from './history'

export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleNameChange (e) {
        setUsername(e.target.value)
    }
    
    function handlePasswordChange (e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
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
            console.log(`ERROR: ${error}`)
            localStorage.clear()
        })
        e.preventDefault()
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={username} onChange={handleNameChange} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            
            <button>Login!</button>
        </form>
    )
}

function GroupRedirect(group) {
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
	
}
