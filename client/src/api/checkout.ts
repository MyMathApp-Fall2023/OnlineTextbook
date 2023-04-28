import { request } from "./baseRequest"


export function getCurrentItem(data:any):Promise<any> {
    return request({
        method: 'get',
        url: `api/item/${data}`,
        data:data
    })
}
export function checkPurchaseCode(data:any):Promise<any> {

    return request({
        method: 'get',
        url: `api/purchaseCode/${data}`,
        data:data
    })
}

export function addRecord(data:any):Promise<any>{
    return request({
        method: 'patch',
        url: 'api/record/record',
        data:data,
    })
}

export function addTransaction(data:any):Promise<any>{
    return request({
        method: 'patch',
        url: 'api/transaction/transaction',
        data:data,
    })
}
