import { IsArray, IsMongoId, IsString, MaxLength, MinLength } from "class-validator";
import { ObjectId } from "mongoose";


export class CreateGroupDto {

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsArray()
    @IsMongoId({ each: true })
    members: ObjectId[];

}