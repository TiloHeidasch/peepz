import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import RegisterDto from './types/register.dto';
import { User } from './types/user.schema';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private db: Model<User>
  ) {}
  async getByUsername(username: string): Promise<User> {
    const user = await this.db.findOne({
      username: { $regex: new RegExp(username, 'i') },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this username does not exist',
      HttpStatus.NOT_FOUND
    );
  }

  async getById(id: number) {
    const user = await this.db.findById(id);
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND
    );
  }

  public async register(registrationData: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(registrationData.password, 10);
      const createdUser = await this.db.create({
        username: registrationData.username,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error.code === 11000) {
        // duplicate key error
        console.error(error);
        throw new BadRequestException();
      } else {
        console.error(error);
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  async updateUsername(user: any, username: any): Promise<User> {
    try {
      await this.db.updateOne({ username: user.username }, { username }).exec();
      return this.getByUsername(username);
    } catch (error) {
      if (error.code === 11000) {
        // duplicate key error
        throw new BadRequestException();
      } else {
        console.error(error);
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }
  async updatePassword(user: any, passwordPlain: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(passwordPlain, 10);
    await this.db
      .updateOne({ username: user.username }, { password: hashedPassword })
      .exec();
    return this.getByUsername(user.username);
  }
  private async getUserById(id: string): Promise<User> {
    return await this.db.findById(id);
  }

  async setCurrentRefreshToken(token: string, id: any): Promise<User> {
    const user = await this.getUserById(id);
    user.refreshToken = await bcrypt.hash(token, 10);
    await this.db.updateOne({ _id: id }, user).exec();
    return await this.getUserById(id);
  }
  async getUserIfRefreshTokenMatches(
    refreshToken: any,
    userId: any
  ): Promise<User> {
    try {
      const user = await this.getUserById(userId);

      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        user.refreshToken
      );
      if (isRefreshTokenMatching) {
        return user;
      }
    } catch (error) {}
    return null;
  }

  async removeRefreshToken(userId: number) {
    return this.db.updateOne(
      { _id: userId },
      {
        refreshToken: undefined,
      }
    );
  }
}
