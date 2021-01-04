import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NoteStatus } from '../note/note-status.enum';

@Schema()
export class GroupNote extends Document {
  @Prop({ required: true })
  group_id: string;
  @Prop({ required: true })
  user_posted: string;
  @Prop({ required: true })
  user_name: string;
  @Prop({ required: true })
  time_posted: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  note_status: NoteStatus;
}

export const GroupNoteSchema = SchemaFactory.createForClass(GroupNote);
