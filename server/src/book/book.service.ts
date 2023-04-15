import {Controller, Get, Injectable, Res} from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';


@Injectable()
export class BookService {

    async getBookContent() {
        const appDirectory = process.cwd();
        const bookPath = path.resolve(appDirectory,"src","book","bookContent","index.html")

        console.log(bookPath)
        const fileContent = await fs.promises.readFile(bookPath, 'utf-8');
       return fileContent
    }
}
