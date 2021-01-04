import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { GroupNote } from '../group/GroupNote.schema';

@Injectable()
export class GroupnoteService {
  constructor(
    @InjectModel(GroupNote.name)
    private groupNoteModel: Model<GroupNote>,
    @InjectConnection() private connection: Connection,
  ) {}
}
