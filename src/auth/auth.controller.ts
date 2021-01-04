import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SigninCredentials } from './DTO/Signin.dto';
import { SignupCredentials } from './DTO/Signup.dto';
import { GetUser } from './get-user.decorator';
import { User } from './User.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() creds: SignupCredentials) {
    return this.authService.signUp(creds);
  }
  @Post('/signin')
  signin(@Body() creds: SigninCredentials): Promise<{ accessToken: string }> {
    return this.authService.signin(creds);
  }
  @Get('/getuser')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  getUserByToken(@GetUser() user): Promise<User> {
    return user;
  }
  @Post('/finduserbyname')
  findUserByName(@Body() body) {
    const { f_name, l_name } = body;
    return this.authService.findUserByName(f_name, l_name);
  }
}
