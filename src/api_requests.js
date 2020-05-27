import axios from 'axios'

const baseURL = 'http://localhost:8000/api/'

export const authInstance = axios.create({
    baseURL: baseURL + 'token/',
})

export const appInstance = axios.create({
    baseURL: baseURL
})

appInstance.interceptors.request.use( config => {
    const token = localStorage.getItem('access')
    config.headers.Authorization = `Bearer ${token}`
    return config
})
