import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
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
}
