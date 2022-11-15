import {
    ArgumentMetadata,
    Logger,
    Optional,
    PipeTransform,
    ValidationPipeOptions,
} from '@nestjs/common';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
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

        return value;
    }
}
