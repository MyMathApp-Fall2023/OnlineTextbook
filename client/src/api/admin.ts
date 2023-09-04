import { Axios, AxiosResponse } from "axios";
import PurchaseCode from "../entities/purchaseCode";
import { PurchaseCodeFormValues } from "../pages/Admin/PurchaseCode";
import { request } from "./baseRequest"
import User from "../entities/user";
import { Subscription } from "../entities";
import FreeSubscription from "../entities/freeSubscription";

export function getAllUserData(): Promise<AxiosResponse<User[]>> {
    return request<User[]>({
        method: 'GET',
        url: `api/admin/user`,
    })
}

export function updateUser(data: User): Promise<AxiosResponse<User>> {
    return request<User>({
        method: 'PUT',
        url: `api/admin/user/${data.userId}`,
        data: data
    });
}

export function sendAccountActivationEmail(data: any):Promise<any> {
    console.log('user:', data);
    return request({
        method: 'POST',
        url: `api/admin/user/${data.id}/sendActivateEmail`,
        data: data
    });
}

export function deleteUser(id: number):Promise<any> {
    return request({
        method: 'DELETE',
        url: `api/admin/user/${id}`,
    })
}

export function getAllPurchaseCodeData():Promise<any>{
    return request({
        method: 'GET',
        url: 'api/purchaseCode',
    })
}

export function getTransactionRecordData():Promise<any>{
    return request({
        method: 'GET',
        url: 'api/admin/transaction',
    })
}

export function getAllItemData():Promise<any>{
    return request({
        method: 'GET',
        url: 'api/item',
    })
}

export function addCodeApi(data:any):Promise<any> {
    return request({
        method: 'POST',
        url: `api/purchaseCode`,
        data:data
    })
}

export function deleteCodeApi(id: number): Promise<any> {
    return request({
        method: 'DELETE',
        url: `api/purchaseCode/${id}`
    })
}

export function updateCodeApi(data: PurchaseCodeFormValues): Promise<AxiosResponse<PurchaseCode>> {
    return request({
        method: 'PUT',
        url: `api/purchaseCode/${data.code_id}`,
        data: data
    })
}

export function getAllFreeSubs(): Promise<AxiosResponse<FreeSubscription[]>> {
    return request({
        method: 'GET',
        url: 'api/admin/free-subscription',
    })
}

export function addFreeSub(data: {suffix: string}): Promise<AxiosResponse<FreeSubscription>> {
    return request({
        method: 'POST',
        url: `api/admin/free-subscription`,
        data: data
    })
}

export function deleteFreeSub(id: number): Promise<AxiosResponse<FreeSubscription>> {
    return request({
        method: 'DELETE',
        url: `api/admin/free-subscription/${id}`
    })
}

export function updateFreeSub(data: FreeSubscription): Promise<AxiosResponse<FreeSubscription>> {
    return request({
        method: 'PUT',
        url: `api/admin/free-subscription/${data.email_sub_id}`,
        data: {suffix: data.suffix}
    })
}

export function getItem(data:any):Promise<any> {
    return request ({
        method : 'GET',
        url: `api/item/id`,
        data: data
    })
}

export function getPurchaseCode(data:any):Promise<any> {
    return request ({
        method : 'GET',
        url: `api/purchaseCode/id`,
        data: data
    })
}
