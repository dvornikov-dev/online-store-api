import { ArgumentMetadata, PipeTransform, Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype) {
            return value;
        }
        console.log(typeof metatype);
        const object = plainToInstance(metatype, value); // how this method work
        const errors = await validate(object);
        console.log(object);
        return value;
    }
}
