import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
export declare class ValidateObjectId implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata): Promise<string>;
}
