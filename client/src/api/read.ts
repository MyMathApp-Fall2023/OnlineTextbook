import { request } from "./baseRequest"

export function readBook():Promise<any> {
    return request({
        method: 'get',
        url: `api/book/read`,
    })
}

export function getAllPurchaseCodeData():Promise<any>{
    return request({
        method: 'get',
        url: 'api/admin/purchaseCode',
    })
}



