import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from '../auth/User.schema';
import { Group, GroupSchema } from '../group/Group.schema';
import { JoinrequestController } from './joinrequest.controller';
import { JoinRequest, JoinRequestSchema } from './JoinRequest.schema';
import { JoinrequestService } from './joinrequest.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JoinRequest.name, schema: JoinRequestSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'tomer',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [JoinrequestController],
  providers: [JoinrequestService],
  exports: [JoinrequestService],
})
export class JoinrequestModule {}
