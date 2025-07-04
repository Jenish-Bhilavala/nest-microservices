import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AuthUser,
  AuthUserDocument,
} from 'apps/libs/config/schema/auth.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthUser.name)
    private readonly userModel: Model<AuthUserDocument>,
  ) {}

  getHello(): string {
    return 'Hello World! I am auth';
  }

  listOfUsers() {
    const products = [
      { name: 'John Doe', age: 40 },
      { name: 'Sara rose', age: 26 },
      { name: 'Mitchel Anderson', age: 30 },
      { name: 'Jack Son', age: 24 },
      { name: 'Maxi', age: 21 },
    ];

    if (products.length === 0) {
      Logger.error(`Products list not found.`);
      return {
        status: 'Error',
        statusCode: 404,
        message: 'Products not found.',
      };
    }

    Logger.log(`Products getting successfully.`);
    return {
      status: 'Success',
      statusCode: 200,
      products,
    };
  }

  async registration(dto: RegisterUserDto) {
    const { email, password, full_name, role } = dto;

    const userExists = await this.userModel.findOne({ email });

    if (userExists) {
      return {
        status: 'Error',
        statusCode: 400,
        message: 'Email already exists',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      email,
      password: hashedPassword,
      full_name,
      role,
    });

    return {
      status: 'Success',
      statusCode: 201,
      message: 'User registered successfully',
      userId: newUser._id,
    };
  }
}
