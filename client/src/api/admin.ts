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