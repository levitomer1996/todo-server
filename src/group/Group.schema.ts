import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../auth/User.schema';
import { JoinRequest } from '../joinrequest/JoinRequest.schema';
import { Note } from '../note/Note.Schema';
import { GroupNote } from './GroupNote.schema';

@Schema()
export class Group extends Document {
  @Prop({ required: true })
  group_name: string;
  @Prop({ required: true })
  admin: User;
  @Prop({ required: true })
  participants: string[];
  @Prop({ required: true })
  requests: JoinRequest[];
  @Prop({ required: true })
  notes: GroupNote[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
