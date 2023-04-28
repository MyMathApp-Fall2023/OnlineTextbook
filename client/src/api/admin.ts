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

export function getAllEmailSubscriptionData():Promise<any>{
    return request({
        method: 'get',
        url: 'api/admin/emailSubscription',
    })
}

export function getTransactionRecordData():Promise<any>{
    return request({
        method: 'get',
        url: 'api/admin/transaction',
    })
}

export function getAllItemData():Promise<any>{
    return request({
        method: 'get',
        url: 'api/item',
    })
}


export function addCodeApi(data:any):Promise<any> {
    return request({
        method: 'post',
        url: `api/admin/add-code`,
        data:data
    })
}

export function deleteCodeApi(data:any):Promise<any> {
    return request({
        method: 'post',
        url: `api/admin/delete-code`,
        data:data
    })
}

export function updateCodeApi(data:any):Promise<any> {
    return request({
        method: 'post',
        url: `api/admin/update-code`,
        data:data
    })
}

export function addEmailSubApi(data:any):Promise<any> {
    return request({
        method: 'post',
        url: `api/admin/add-emailsub`,
        data:data
    })
}

export function deleteEmailSubApi(data:any):Promise<any> {
    console.log("client admin");
    console.log(data);
    return request({
        method: 'post',
        url: `api/admin/delete-emailsub`,
        data:data
    })
}

export function updateEmailSubApi(data:any):Promise<any> {
    return request({
        method: 'post',
        url: `api/admin/update-emailsub`,
        data:data
    })
}


export function getItem(data:any):Promise<any> {
    return request ({
        method : 'get',
        url: `api/item/id`,
        data: data
    })
}

export function getPurchaseCode(data:any):Promise<any> {
    return request ({
        method : 'get',
        url: `api/purchaseCode/id`,
        data: data
    })
}
