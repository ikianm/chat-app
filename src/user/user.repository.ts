import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model, ObjectId } from "mongoose";


@Injectable()
export class UserRepository {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) { }

    async findById(objectId: ObjectId): Promise<User> {
        return await this.userModel.findById(objectId);
    }

}