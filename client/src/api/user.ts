import { AxiosResponse } from "axios"
import { request } from "./baseRequest"
import { Subscription } from "../entities"

export function getUserSubscriptions(): Promise<AxiosResponse<Subscription[]>> {
    return request({
        method: 'get',
        url: `api/subscription`
    })
}

export function getProfileApi():Promise<any> {
    return request ({
        method : 'get',
        url: `api/auth/profile`
    })
}

export function getItem(data:any):Promise<any> {
    return request ({
        method : 'get',
        url: `api/item/id`,
        data: data
    })
}