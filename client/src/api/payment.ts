import { request } from "./baseRequest"

export function createPaypalOrder(data:any):Promise<any> {
    return request({
        method: 'post',
        url: `/api/payment/create-paypal-order`,
        data:data
    })
}

export function capturePaypalOrder(data:any):Promise<any> {
    return request ({
        method : 'post',
        url: `/api/payment/capture-paypal-order`,
        data:data
    })
}

export function finishPurchasing(data:any):Promise<any> {
    return request({
        method: 'post',
        url: `api/payment/finish-purchasing`,
        data:data,
    })
}
