import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../auth/User.schema';
import { Group } from '../group/Group.schema';
import { JoinRequestStatus } from './DTO/JoinRequestStatus.enum';

@Schema()
export class JoinRequest extends Document {
  @Prop({ required: true })
  user: string;
  @Prop({ required: true })
  group_Id: string;
  @Prop({ required: true })
  group_name: string;
  @Prop({ required: true })
  group_admin: string;
  @Prop({ required: true })
  status: JoinRequestStatus;
}

export const JoinRequestSchema = SchemaFactory.createForClass(JoinRequest);
