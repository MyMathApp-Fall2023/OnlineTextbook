import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

let baseURL = ''
if (process.env.NODE_ENV == 'development')  {
    baseURL = 'http://localhost:3000'
} else {
    baseURL = 'https://mymathapp2023spring.herokuapp.com'
}

const service = axios.create({
    baseURL:baseURL,
    timeout:10000,
})

service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        config.headers['Content-Type'] = 'application/json';

        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

export function request(config:AxiosRequestConfig):Promise<AxiosResponse> {
    return service(config)
}

