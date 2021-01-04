import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { JoinrequestService } from './joinrequest.service';

@Controller('joinrequest')
export class JoinrequestController {
  constructor(private joinRequestService: JoinrequestService) {}

  @Post('new')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  newJoinRequest(@Body() body) {
    const { group, user } = body;
    return this.joinRequestService.newJoinRequest(group, user);
  }

  @Post('/approverequest')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  approveRequest(@GetUser() user, @Body() body) {
    const { request } = body;
    return this.joinRequestService.approveRequest(user, request);
  }

  @Post('/sendjoinrequest')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  sendJoinRequest(@Body() body) {
    const { userIdList, group_id } = body;
    return this.joinRequestService.sendJoinRequest(userIdList, group_id);
  }

  @Get('/userrequests')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  getUserRequests(@GetUser() user) {
    return this.joinRequestService.getUserRequests(user);
  }
}
