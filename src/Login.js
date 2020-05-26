import React, {useState} from 'react'
import axios from 'axios'

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
        axios.post('http://localhost:8000/api/token/', {
            username: username,
            password: password
        })
        .then( response => console.log(response))
        .catch( error => console.log(error))
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