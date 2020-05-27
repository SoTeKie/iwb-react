import React, {useState} from 'react'
import {authInstance} from './api_requests'

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
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            localStorage.setItem('groups', response.data.groups)
            localStorage.setItem('user', username)
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