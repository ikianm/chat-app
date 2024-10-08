import { Body, Controller, Delete, Param, Post, Req, UseGuards } from "@nestjs/common";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dtos/createGroup.dto";
import { ObjectIdParamDto } from "../shares/objectIdParam.dto";
import { JoinUserDto } from "./dtos/joinGroup.dto";
import { JwtAuthGuard } from "../auth/guards/jwtAuth.guard";
import { LeaveUserDto } from "./dtos/leaveUser.dto";

@UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupController {

    constructor(private readonly groupService: GroupService) { }

    @Post()
    create(@Body() createGroupDto: CreateGroupDto) {
        return this.groupService.create(createGroupDto);
    }

    @Delete(':objectId')
    delete(@Param() objectIdParamDto: ObjectIdParamDto) {
        return this.groupService.delete(objectIdParamDto);
    }

    @Post('/join')
    joinUser(@Body() joinUserDto: JoinUserDto) {
        return this.groupService.joinUser(joinUserDto);
    }

    @Post('/leave')
    leaveUser(@Body() leaveUserDto: LeaveUserDto) {
        return this.groupService.leaveUser(leaveUserDto);
    }

}  