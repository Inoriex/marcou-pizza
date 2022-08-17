import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { Schema } from "joi";
export declare class JoiValidationPipe implements PipeTransform {
    private readonly schema;
    constructor(schema: Schema);
    transform(value: any, metadata: ArgumentMetadata): any;
}
