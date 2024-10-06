import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { User } from "../user/user.schema";


@Schema()
export class Message {

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    senderId: User;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    recepientId: User;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true, immutable: true })
    sentAt: Date;

}

export const MessageSchema = SchemaFactory.createForClass(Message);