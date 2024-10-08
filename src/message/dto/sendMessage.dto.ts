import { IsMongoId, IsString, MaxLength, MinLength } from "class-validator";
import { ObjectId } from "mongoose";


export class SendMessageDto {

    @IsMongoId()
    senderId: ObjectId;

    @IsMongoId()
    recepientId: ObjectId; // either user._id or group._id

    @IsString()
    @MinLength(1)
    @MaxLength(500)
    content: string;

}