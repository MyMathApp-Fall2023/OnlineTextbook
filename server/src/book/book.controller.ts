import {Controller, Get, Request, Res, UseGuards} from '@nestjs/common';
import {BookService} from "../book/book.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";


@Controller('book')
export class BookController {

    constructor(private readonly bookService:BookService) {}

    @UseGuards(JwtAuthGuard)
    @Get("read")
    async read(@Request() req) {
        // console.log(req.user)
        const userId = req.user.user_id
        const itemName = 'Calculus1, 2&3'
        const readValidation = await this.bookService.getBookURL(userId,itemName)
        return {readValidation}
    }

}
