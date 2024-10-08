import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../user/user.schema";


@Schema()
export class Group {

    @Prop({ required: true })
    name: string;

}

export const GroupSchema = SchemaFactory.createForClass(Group);