import { ArgumentMetadata, ConsoleLogger, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (value) {
            if (!metatype) {
                return value;
            }
            const object = plainToInstance(metatype, value); // how this method work
            const errors = await validate(object);
            if (errors.length) {
                const messages = {};
                errors.forEach((error) => {
                    messages[error.property] = Object.values(error.constraints);
                });
                throw new ValidationException(messages);
            }
        }

        return value;
    }
}
