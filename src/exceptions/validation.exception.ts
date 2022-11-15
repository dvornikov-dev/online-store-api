import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
    constructor(messages) {
        const response = {
            statusCode: HttpStatus.BAD_REQUEST,
            messages: messages,
        };
        super(response, HttpStatus.BAD_REQUEST);
    }
}
