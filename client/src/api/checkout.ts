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