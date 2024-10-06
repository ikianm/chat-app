import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dtos/createGroup.dto";
import { ObjectIdParamDto } from "../shares/objectIdParam.dto";


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

    // TODO: leave, join, ...

}