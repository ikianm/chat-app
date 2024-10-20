import { BadRequestException, Injectable } from "@nestjs/common";
import { GroupRepository } from "./group.repository";
import { CreateGroupDto } from "./dtos/createGroup.dto";
import { Group } from "./group.schema";
import { ObjectIdParamDto } from "../shares/objectIdParam.dto";
import { JoinUserDto } from "./dtos/joinGroup.dto";
import { UserApiService } from "../user/services/userApi.service";
import { LeaveUserDto } from "./dtos/leaveUser.dto";
import { UpdateWriteOpResult } from "mongoose";
import { Message } from "../message/message.schema";
import { MessageApiService } from "../message/services/messageApi.service";
import { RequestContextService } from "../shares/requestContext";


@Injectable()
export class GroupService {

    constructor(
        private readonly groupRepo: GroupRepository,
        private readonly userApiService: UserApiService,
        private readonly messageApiService: MessageApiService
    ) { }

    async getGroupMessages(objectIdParamDto: ObjectIdParamDto): Promise<Message[]> {
        const groupId = objectIdParamDto.objectId;
        const group = await this.groupRepo.findById(groupId);
        if (!group) throw new BadRequestException('no group found with the given id');

        const currentUser = RequestContextService.getCurrentUser();
        
        if (!currentUser.groups.includes(groupId)) throw new BadRequestException('you are not a member of this group');

        return await this.messageApiService.findGroupMessages(groupId);
    }

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