import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../auth/User.schema';
import { JoinrequestModule } from '../joinrequest/joinrequest.module';
import {
  JoinRequest,
  JoinRequestSchema,
} from '../joinrequest/JoinRequest.schema';
import { JoinrequestService } from '../joinrequest/joinrequest.service';
import { GroupController } from './group.controller';
import { Group, GroupSchema } from './Group.schema';
import { GroupService } from './group.service';
import { GroupNote, GroupNoteSchema } from './GroupNote.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    MongooseModule.forFeature([
      { name: JoinRequest.name, schema: JoinRequestSchema },
    ]),
    MongooseModule.forFeature([
      { name: GroupNote.name, schema: GroupNoteSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'tomer',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    JoinrequestModule,
  ],
  controllers: [GroupController],
  providers: [GroupService, JoinrequestService],
  exports: [GroupService],
})
export class GroupModule {}
