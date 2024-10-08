import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "../user.repository";
import { ObjectId, UpdateWriteOpResult } from "mongoose";
import { User } from "../user.schema";
import { RequestContextService } from "../../shares/requestContext";
import { Group } from "../../group/group.schema";


@Injectable()
export class UserApiService {

    constructor(private readonly userRepository: UserRepository) { }

    async findById(objectId: ObjectId): Promise<User> {
        return await this.userRepository.findById(objectId);
    }

    async findByUsername(username: string): Promise<User> {
        return await this.userRepository.findByUsername(username);
    }

    async create(username: string, hashedPassword: string): Promise<User> {
        return await this.userRepository.create(username, hashedPassword);
    }

    async joinUserToGroup(groupId: ObjectId): Promise<UpdateWriteOpResult> {

        const currentUser = RequestContextService.getCurrentUser();

        const user = await this.findById(currentUser._id);
        if (!user) throw new BadRequestException('no user found with the given id');

        if (user.groups.includes(groupId)) throw new BadRequestException('already joined')

        user.groups.push(groupId);

        return await this.userRepository.updateGroups(user._id, user.groups);

    }

    async leaveUserFromGroup(groupId: ObjectId): Promise<UpdateWriteOpResult> {

        const currentUser = RequestContextService.getCurrentUser();

        const user = await this.findById(currentUser._id);
        if (!user) throw new BadRequestException('no user found with the given id');

        const indexOfGroupId = user.groups.indexOf(groupId);
        user.groups.splice(indexOfGroupId, 1);

        return await this.userRepository.updateGroups(user._id, user.groups);

    }

}