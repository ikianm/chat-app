import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model, ObjectId } from "mongoose";
import { Group } from "../group/group.schema";


@Injectable()
export class UserRepository {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) { }

    async findById(objectId: ObjectId): Promise<User> {
        return await this.userModel.findById(objectId);
    }

    async findByUsername(username: string): Promise<User> {
        return await this.userModel.findOne({ username });
    }

    async create(username: string, hashedPassword: string): Promise<User> {
        const newUser = new this.userModel({ username, password: hashedPassword, groups: [] });
        return await newUser.save();
    }

    async updateGroups(id: ObjectId, groups: ObjectId[]) {
        return await this.userModel.updateOne({ _id: id }, { groups });
    }

}