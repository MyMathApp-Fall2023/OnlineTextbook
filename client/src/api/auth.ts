import { request } from "./baseRequest"

export function localLoginApi(data:any):Promise<any> {
    return request({
        method: 'post',
        url: `api/auth/local-login`,
        data:data
    })
}

export function localSignupApi(data:any):Promise<any> {
    return request ({
        method : 'post',
        url: `api/auth/local-signup`,
        data:data
    })
}

export function activateUser(data:any):Promise<any> {
    return request({
        method: 'post',
        url: `api/auth/activate`,
        data:data,
    })
}
