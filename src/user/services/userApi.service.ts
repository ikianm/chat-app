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

    async findByUsername(username: string): Promise<User> {
        return await this.userRepository.findByUsername(username);
    }

    async create(username: string, hashedPassword: string): Promise<User> {
        return await this.userRepository.create(username, hashedPassword);
    }

}