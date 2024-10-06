import { IsMongoId } from "class-validator";
import { ObjectId } from "mongoose";


export class ObjectIdParamDto {

    @IsMongoId()
    objectId: ObjectId;

}