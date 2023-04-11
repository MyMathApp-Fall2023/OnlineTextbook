import { request } from "./baseRequest"

export function getRecords(data:any):Promise<any> {
    return request({
        method: 'get',
        url: `api/record/record`,
        data:data
    })
}

export function getProfileApi():Promise<any> {
    return request ({
        method : 'get',
        url: `api/auth/profile`
    })
}


