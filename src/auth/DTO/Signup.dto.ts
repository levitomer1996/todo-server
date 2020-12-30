import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNumber,
  IsEmail,
} from 'class-validator';

export class SignupCredentials {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
  @IsString()
  f_name: string;
  @IsString()
  l_name: string;
}
