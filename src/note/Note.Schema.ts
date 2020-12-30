import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../auth/User.schema';
import { NoteStatus } from './note-status.enum';

@Schema()
export class Note extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  time_Posted: string;
  @Prop({ required: true })
  color: string;
  @Prop({ required: true })
  note_status: NoteStatus;
  @Prop({ required: true })
  user: User;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
