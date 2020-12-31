import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../auth/User.schema';
import { JoinRequest } from '../joinrequest/JoinRequest.schema';
import { Note } from '../note/Note.Schema';

@Schema()
export class Group extends Document {
  @Prop({ required: true })
  group_name: string;
  @Prop({ required: true })
  admin: User;
  @Prop({ required: true })
  participants: User[];
  @Prop({ required: true })
  requests: JoinRequest[];
  @Prop({ required: true })
  notes: Note[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
