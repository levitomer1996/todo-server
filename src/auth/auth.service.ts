import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupCredentials } from './DTO/Signup.dto';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './User.schema';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { SigninCredentials } from './DTO/Signin.dto';
import { JoinRequest } from '../joinrequest/JoinRequest.schema';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
    private jwtService: JwtService,
  ) {}
  async signUp(creds: SignupCredentials) {
    const salt = await bcrypt.genSalt();
    const genPass = await this.hashPassword(creds.password, salt);
    const newUser = new this.userModel({
      ...creds,
      password: genPass,
      salt,
      join_requests: [],
    });
    const result = await newUser.save();
    return result.id as string;
  }
  async signin(creds: SigninCredentials): Promise<{ accessToken: string }> {
    const { email, password } = creds;
    const user = await this.userModel.find({ email });

    if (!user) {
      throw new BadRequestException(
        'Invalid detials. Youre user or password details are wrong. ',
      );
    } else if (!bcrypt.compare(password, user[0].password)) {
      throw new BadRequestException(
        'Invalid detials. Youre user or password details are wrong. ',
      );
    }

    const payload: JwtPayload = {
      email: user[0].email,
      f_name: user[0].f_name,
      l_name: user[0].l_name,
      id: user[0].id,
    };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async findUserByName(f_name: string, l_name: string) {
    try {
      var newList = [];
      const findByFirstNameRes = await this.userModel.find({ f_name });
      if (findByFirstNameRes.length === 0) {
        return findByFirstNameRes;
      } else {
        findByFirstNameRes.map(item => {
          newList.push({
            _id: item._id,
            f_name: item.f_name,
            l_name: item.l_name,
            email: item.email,
          });
        });
        return newList;
      }
    } catch (error) {}
  }

  private async getUserByToken(token) {
    const user = this.jwtService.verify(token);
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
