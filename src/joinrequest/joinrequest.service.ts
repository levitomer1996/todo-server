import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from '../auth/User.schema';
import { Group } from '../group/Group.schema';
import { NoteStatus } from '../note/note-status.enum';
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
  private logger = new Logger('JoinRequests Service');

  async newJoinRequest(group: Group, user: User) {
    const newRequst = new this.JoinRequestModel({
      user: user.id,
      group_Id: group._id,
      group_name: group.group_name,
      group_admin: group.admin,
      status: JoinRequestStatus.PENDING,
    });
    try {
      await newRequst.save();
      await this.userModel.findOneAndUpdate(
        { _id: user._id },
        { join_requests: [...user.join_requests, newRequst._id] },
      );
      return newRequst;
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async approveRequest(user: User, request: JoinRequest) {
    try {
      await this.userModel.findOneAndUpdate(
        { _id: user._id },
        { group: [...user.group, request.group_Id] },
      );

      await this.JoinRequestModel.findOneAndUpdate(
        { _id: request._id },
        { status: JoinRequestStatus.APPROVED },
      );
      const foundGroup = await this.groupModel.findById(request.group_Id);

      await this.groupModel.findOneAndUpdate(
        { _id: request.group_Id },
        { participants: [...foundGroup.participants, user._id] },
      );
    } catch (error) {}
  }

  async getUserRequests(user: User) {
    const foundUser = await this.userModel.findById(user._id);
    const requestsList = await this.JoinRequestModel.find({
      _id: foundUser.join_requests,
      status: JoinRequestStatus.PENDING,
    });
    return requestsList;
  }

  async sendJoinRequest(userIdList: string[], group_id: string) {
    try {
      this.logger.log('Serches for user');
      const requestedUsersList = await this.userModel.find({
        _id: { $in: userIdList },
      });
      this.logger.log(`Found list:${requestedUsersList}`);
      const foundGroup = await this.groupModel.findById(group_id);
      for (let index = 0; index < requestedUsersList.length; index++) {
        await this.newJoinRequest(foundGroup, requestedUsersList[index]);
      }
    } catch (error) {}
  }
}
