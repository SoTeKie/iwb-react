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

appInstance.interceptors.response.use( response => {
    return response
}, error => {


    if (error.response.status !== 401) {
        return new Promise((resolve, reject) => {
            reject(error)
        })
    }

	console.log(error.config.url)
    if (error.config.url === 'token/refresh/' || error.response.message === 'Account is disabled.') {
        localStorage.clear()

        return new Promise((resolve, reject) => {
            reject(error)
        })
    }

    if (!localStorage.getItem('refresh')) {
        return error
    }

    return authInstance.post('refresh/', {
        refresh: localStorage.getItem('refresh')
    })
    .then(response => {
        const newToken = response.data.access
        localStorage.setItem('access', newToken) 

        error.config.headers.Authorization = `Bearer ${newToken}`
        return new Promise((resolve, reject) => { 
            axios.request(error.config)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
    })
    .catch(error => console.log(error))
})
