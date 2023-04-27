import {Controller, ForbiddenException, Get, Injectable, Res} from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import {RecordService} from "../record/record.service";


@Injectable()
export class BookService {

    constructor(readonly recordService:RecordService) {
    }

    async getBookContent() {
        const appDirectory = process.cwd();
        const bookPath = path.resolve(appDirectory,"src","book","bookContent","index.html")

        console.log(bookPath)
        const fileContent = await fs.promises.readFile(bookPath, 'utf-8');
       return fileContent
    }

    getBookURL() {
        // const ifPurchase = this.recordService.checkOneUser()
        // //const ifEmailSub = this.emailSubscriptionService.checkOneUser()
        // if (ifPurchase) {
        //     return 'http://localhost:6324'
        // } else {
        //     throw new ForbiddenException()
        // }
        return 'http://localhost:6324'
    }
}
