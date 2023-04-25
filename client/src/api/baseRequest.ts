import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const service = axios.create({
    baseURL:process.env.REACT_APP_SERVER_DOMAIN + ":" + process.env.PORT,
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

