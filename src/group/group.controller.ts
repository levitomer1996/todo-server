import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { Group } from './Group.schema';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}
  private logger = new Logger('Group controller');
  @Post('/new')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  newGroup(@GetUser() user, @Body() body) {
    const { name, idList } = body;
    return this.groupService.newGroup(user, name, idList);
  }

  @Get('/usergroups')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  getUserGroups(@GetUser() user): Promise<Group[]> {
    return this.groupService.getUserGroups(user);
  }

  @Post('/newnote')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  newGroupNote(@GetUser() user, @Body() body) {
    const { group_id, content, title } = body;
    this.logger.log({ group_id, content, title });
    return this.groupService.newGroupNote(user, group_id, content, title);
  }
  @Post('/groupnotes')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  getGroupNotes(@GetUser() user, @Body() body) {
    const { group_id } = body;
    return this.groupService.getGroupNotes(user, group_id);
  }
}
