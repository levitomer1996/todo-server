import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from '../auth/User.schema';
import { NewNote } from './DTO/NewNote.dto';
import { Note } from './Note.Schema';
import * as moment from 'moment';
import { NoteStatus } from './note-status.enum';

@Injectable()
export class NoteService {
  private logger = new Logger('Note service');
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Note.name) private noteModel: Model<Note>,
    @InjectConnection() private connection: Connection,
    private jwtService: JwtService,
  ) {}

  async newNote(creds: NewNote): Promise<Note> {
    const { title, content, color, user } = creds;
    const time_Posted = moment(Date.now()).format('YYYYMMDD');
    const newNote = new this.noteModel({
      title,
      content,
      color,
      user,
      time_Posted,
      note_status: NoteStatus.OPEN,
    });

    try {
      await newNote.save();
      return newNote;
    } catch (error) {
      console.log(error);
      throw new BadGatewayException();
    }
  }

  async getUserNotes(user: User): Promise<Note[]> {
    try {
      const list = await this.noteModel.find({ user });

      return list;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deletePost(id: string): Promise<{ id: string }> {
    try {
      const res = await this.noteModel.findOneAndDelete({ _id: id });
      return { id: res._id };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateStatus(id: string, status: NoteStatus) {
    try {
      const res = await this.noteModel.findOneAndUpdate(
        { _id: id },
        { note_status: status },
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
