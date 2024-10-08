import { BadRequestException, Injectable } from "@nestjs/common";
import { GroupRepository } from "./group.repository";
import { CreateGroupDto } from "./dtos/createGroup.dto";
import { Group } from "./group.schema";
import { ObjectIdParamDto } from "../shares/objectIdParam.dto";
import { JoinUserDto } from "./dtos/joinGroup.dto";
import { UserApiService } from "../user/services/userApi.service";
import { LeaveUserDto } from "./dtos/leaveUser.dto";
import { UpdateWriteOpResult } from "mongoose";


@Injectable()
export class GroupService {

    constructor(
        private readonly groupRepo: GroupRepository,
        private readonly userApiService: UserApiService
    ) { }

    async create(createGroupDto: CreateGroupDto): Promise<Group> {
        return await this.groupRepo.create(createGroupDto);
    }

    async delete(objectIdParamDto: ObjectIdParamDto): Promise<any> {
        return await this.groupRepo.deleteOne(objectIdParamDto);
    }

    async joinUser(joinUserDto: JoinUserDto): Promise<UpdateWriteOpResult> {

        const isGroupExist = (await this.groupRepo.findById(joinUserDto.groupId));
        if (!isGroupExist) throw new BadRequestException('no group found with the given id');


        return await this.userApiService.joinUserToGroup(joinUserDto.groupId);
    }

    async leaveUser(leaveUserDto: LeaveUserDto): Promise<UpdateWriteOpResult> {

        return await this.userApiService.leaveUserFromGroup(leaveUserDto.groupId);

    }

}