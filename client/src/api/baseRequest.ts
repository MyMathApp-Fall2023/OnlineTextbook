import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const service = axios.create({
    baseURL:process.env.REACT_APP_SERVER_DOMAIN,
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
        // const res = response.data
        if (response.status!=200) {
            console.log(response)
        }
        return response
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export function request(config:AxiosRequestConfig):Promise<AxiosResponse> {
    console.log(process.env.BASE_URL)
    console.log(process.env)
    return service(config)
}

