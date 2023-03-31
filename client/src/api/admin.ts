import { request } from "./baseRequest"

export function getAllUserData():Promise<any> {
    return request({
        method: 'get',
        url: `api/admin/user`,
    })
}

export function getAllPurchaseCodeData():Promise<any>{
    return request({
        method: 'get',
        url: 'api/admin/purchaseCode',
    })
}

export function addCodeApi(data:any):Promise<any> {
    return request({
        method: 'post',
        url: `api/admin/add-code`,
        data:data
    })
}