import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Group } from '../group/Group.schema';
import { JoinRequest } from '../joinrequest/JoinRequest.schema';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  salt: string;
  @Prop({ required: true })
  f_name: string;
  @Prop({ required: true })
  l_name: string;
  @Prop({ required: true })
  group: Group[];
  @Prop({ required: true })
  join_requests: JoinRequest[];
}

export const UserSchema = SchemaFactory.createForClass(User);
