import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from '../auth/User.schema';
import { Group } from '../group/Group.schema';
import { JoinRequestStatus } from './DTO/JoinRequestStatus.enum';
import { JoinRequest } from './JoinRequest.schema';

@Injectable()
export class JoinrequestService {
  constructor(
    @InjectModel(JoinRequest.name) private JoinRequestModel: Model<JoinRequest>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Group.name) private groupModel: Model<Group>,
    @InjectConnection() private connection: Connection,
  ) {}
  async newJoinRequest(group: Group, user: User) {
    const newRequst = new this.JoinRequestModel({
      user,
      group: [group],
      status: JoinRequestStatus.PENDING,
    });
    try {
      await newRequst.save();
      await this.userModel.findOneAndUpdate(
        { _id: user._id },
        { join_requests: [...user.join_requests, newRequst] },
      );
      return newRequst;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
