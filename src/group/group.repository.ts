import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Group } from "./group.schema";
import { Model, ObjectId } from "mongoose";
import DeleteResult from 'mongoose';
import { CreateGroupDto } from "./dtos/createGroup.dto";
import { ObjectIdParamDto } from "../shares/objectIdParam.dto";

@Injectable()
export class GroupRepository {

    constructor(
        @InjectModel(Group.name)
        private readonly groupModel: Model<Group>
    ) { }

    async create(createGroupDto: CreateGroupDto): Promise<Group> {
        const newGroup = new this.groupModel(createGroupDto);
        return await newGroup.save();
    }

    async deleteOne(objectIdParamDto: ObjectIdParamDto): Promise<any> {

        return await this.groupModel.deleteOne({ _id: objectIdParamDto.objectId });
    }

    async findById(id: ObjectId): Promise<Group> {
        return await this.groupModel.findById(id);
    }

}