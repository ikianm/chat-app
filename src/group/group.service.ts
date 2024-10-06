import { Injectable } from "@nestjs/common";
import { GroupRepository } from "./group.repository";
import { CreateGroupDto } from "./dtos/createGroup.dto";
import { Group } from "./group.schema";
import { ObjectIdParamDto } from "../shares/objectIdParam.dto";


@Injectable()
export class GroupService {

    constructor(
        private readonly groupRepo: GroupRepository
    ) { }

    async create(createGroupDto: CreateGroupDto): Promise<Group> {
        return await this.groupRepo.create(createGroupDto);
    }

    async delete(objectIdParamDto: ObjectIdParamDto): Promise<any> {
        return await this.groupRepo.deleteOne(objectIdParamDto);
    }

}