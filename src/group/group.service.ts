import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/User.schema';
import { JoinRequest } from '../joinrequest/JoinRequest.schema';
import { JoinrequestService } from '../joinrequest/joinrequest.service';
import { Group } from './Group.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<Group>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(JoinRequest.name) private JoinRequestModel: Model<JoinRequest>,
    @InjectConnection() private connection: Connection,
    private joinRequestService: JoinrequestService,
  ) {}
  async newGroup(user: User, name: string, idList: string[]) {
    try {
      const requestedUsersList = await this.userModel.find({
        _id: { $in: idList },
      });

      const group = new this.groupModel({
        group_name: name,
        admin: user,
        participants: [],
        requests: [],
        notes: [],
      });
      for (let index = 0; index < requestedUsersList.length; index++) {
        await this.joinRequestService.newJoinRequest(
          group,
          requestedUsersList[index],
        );
      }
      await group.save();
      await this.userModel.findOneAndUpdate(
        { _id: user._id },
        { group: [...user.group, group] },
      );
      return group;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
