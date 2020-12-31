import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
}
