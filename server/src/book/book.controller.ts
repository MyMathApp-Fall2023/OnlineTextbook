import {Controller, Get, Res} from '@nestjs/common';
import {BookService} from "../book/book.service";
import {Response} from 'express'


@Controller('book')
export class BookController {

    constructor(private readonly bookService:BookService) {}


    @Get("read")
    async read(@Res() res: Response) {
        const bookContent = await this.bookService.getBookContent()

        res.send(bookContent)

    }

}
