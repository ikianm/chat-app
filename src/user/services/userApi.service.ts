import { Injectable } from "@nestjs/common";
import { UserRepository } from "../user.repository";
import { ObjectId } from "mongoose";
import { User } from "../user.schema";


@Injectable()
export class UserApiService {

    constructor(private readonly userRepository: UserRepository) { }

    async findById(objectId: ObjectId): Promise<User> {
        return await this.userRepository.findById(objectId);
    }

}