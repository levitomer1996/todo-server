import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { GroupNote, GroupNoteSchema } from '../group/GroupNote.schema';
import { GroupnoteController } from './groupnote.controller';
import { GroupnoteService } from './groupnote.service';

@Module({
  imports: [
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
  ],
  controllers: [GroupnoteController],
  providers: [GroupnoteService],
})
export class GroupnoteModule {}
