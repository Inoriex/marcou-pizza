/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "@user/schemas/user.schema";
export declare type ForgotPasswordDocument = ForgotPassword & Document;
export declare class ForgotPassword {
    _id: string;
    email: string;
    firstUsed: boolean;
    finalUsed: boolean;
    expires: Date;
    ip: string;
    browser: string;
    country: string;
    ipChanged: string;
    browserChanged: string;
    countryChanged: string;
    user: User;
}
export declare const ForgotPasswordSchema: MongooseSchema<ForgotPassword, import("mongoose").Model<ForgotPassword, any, any, any, any>, {}, {}, {}, {}, "type", ForgotPassword>;
