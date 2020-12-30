import { IsString, IsEmail } from 'class-validator';

export class SigninCredentials {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
