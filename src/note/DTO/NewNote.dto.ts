import { IsBoolean, IsIn, IsString } from 'class-validator';
import { User } from '../../auth/User.schema';

export class NewNote {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsString()
  color: string;
  user: User;
}
