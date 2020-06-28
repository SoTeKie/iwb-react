import axios from 'axios'
import history from './history'

const baseURL = 'http://192.168.142.104:8000/api/'

export const authInstance = axios.create({
    baseURL: `${baseURL}auth-token/`,
})

export const appInstance = axios.create({
    baseURL: baseURL
})

appInstance.interceptors.request.use( config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Token ${token}`
    return config
})

appInstance.interceptors.response.use( response => {
    return response
}, error => {

    if (error.response.status !== 401){
        return new Promise( (_resolve, reject) => {
            reject(error)
        })
    }
    localStorage.clear()
    history.push('/login')
})
