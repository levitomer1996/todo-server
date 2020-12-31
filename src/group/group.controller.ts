import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post('/new')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  newGroup(@GetUser() user, @Body() body) {
    const { name, idList } = body;
    return this.groupService.newGroup(user, name, idList);
  }

}
