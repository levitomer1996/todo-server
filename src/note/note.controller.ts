import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { stat } from 'fs';
import { GetUser } from '../auth/get-user.decorator';
import { NoteStatus } from './note-status.enum';
import { Note } from './Note.Schema';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Post('/newnote')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  newNote(@GetUser() user, @Body() body) {
    return this.noteService.newNote({ user, ...body });
  }
  @Get('/getuserposts')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  getUserPosts(@GetUser() user) {
    return this.noteService.getUserNotes(user);
  }

  @Post('/delete')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  deletePost(@Body() id) {
    return this.noteService.deletePost(id.id);
  }
  @Patch('/')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  updateStatus(@Body() body) {
    const { id, status } = body;
    return this.noteService.updateStatus(id, status);
  }
}
