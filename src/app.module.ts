import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { GroupModule } from './group/group.module';
import { JoinrequestModule } from './joinrequest/joinrequest.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://tomer:junkerms1@cluster0.vj77n.mongodb.net/todo?retryWrites=true&w=majority',
    ),
    AuthModule,
    NoteModule,
    GroupModule,
    JoinrequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
