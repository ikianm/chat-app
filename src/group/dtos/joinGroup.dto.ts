import { IsMongoId } from "class-validator";
import { ObjectId } from "mongoose";


export class JoinUserDto {

    @IsMongoId()
    groupId: ObjectId;

}