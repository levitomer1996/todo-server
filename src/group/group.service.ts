import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/User.schema';
import { JoinRequest } from '../joinrequest/JoinRequest.schema';
import { JoinrequestService } from '../joinrequest/joinrequest.service';
import { Group } from './Group.schema';
import * as moment from 'moment';
import { NoteStatus } from '../note/note-status.enum';
import { GroupNote } from './GroupNote.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<Group>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(JoinRequest.name) private JoinRequestModel: Model<JoinRequest>,
    @InjectModel(GroupNote.name) private groupNoteModel: Model<GroupNote>,
    @InjectConnection() private connection: Connection,
    private joinRequestService: JoinrequestService,
  ) {}
  private logger = new Logger('Group service');
  async newGroup(user: User, name: string, idList: string[]) {
    try {
      const requestedUsersList = await this.userModel.find({
        _id: { $in: idList },
      });

      const group = new this.groupModel({
        group_name: name,
        admin: user._id,
        participants: [user._id],
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
        { group: [...user.group, group._id] },
      );
      return group;
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async getUserGroups(user: User): Promise<Group[]> {
    try {
      let list = [];
      const foundUser = await this.userModel.findById(user._id);
      for (let index = 0; index < foundUser.group.length; index++) {
        let group = await this.groupModel.findById(foundUser.group[index]);
        list.push(group);
      }
      return list;
    } catch (error) {}
  }

  async newGroupNote(
    user: User,
    group_id: string,
    content: string,
    title: string,
  ) {
    this.logger.log('Creating new group note...');
    const newNote = new this.groupNoteModel({
      group_id,
      user_posted: user._id,
      user_name: user.f_name + ' ' + user.l_name,
      time_posted: moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a'),
      title,
      content,
      note_status: NoteStatus.OPEN,
    });
    this.logger.log('New note was created');
    try {
      this.logger.log('Saving new note...');
      await newNote.save();
      this.logger.log('New note saved.');
      const foundGroup = await this.groupModel.findById(group_id);
      await this.groupModel.findByIdAndUpdate(foundGroup._id, {
        notes: [...foundGroup.notes, newNote],
      });
      this.logger.log('group was updated');
      return newNote;
    } catch (error) {
      this.logger.log(error);
    }
  }

  async getGroupNotes(user: User, group_id: string) {
    try {
      const foundGroup = await this.groupModel.findById(group_id).exec();

      // this.logger.log(`Found Group: ${foundGroup.group_name}`);
      // this.logger.log(
      //   `Is user in group?: ${this.isUserInGroup(
      //     foundGroup.participants,
      //     user._id.toString(),
      //   )}`,
      // );

      return foundGroup.notes;
    } catch (error) {
      console.log(error);
    }
  }

  private isUserInGroup(pList, userId) {
    return pList.some(function(arrVal) {
      return userId === arrVal;
    });
  }
}
