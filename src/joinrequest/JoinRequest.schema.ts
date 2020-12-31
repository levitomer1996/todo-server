import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../auth/User.schema';
import { Group } from '../group/Group.schema';
import { JoinRequestStatus } from './DTO/JoinRequestStatus.enum';

@Schema()
export class JoinRequest extends Document {
  @Prop({ required: true })
  user: User;
  @Prop({ required: true })
  group: Group[];
  @Prop({ required: true })
  status: JoinRequestStatus;
}

export const JoinRequestSchema = SchemaFactory.createForClass(JoinRequest);
