import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CatalogService {
  getHello(): string {
    return 'Hello World! I am catalog';
  }

  listOfProduct() {
    const products = [
      { name: 'Smartphone', price: 200 },
      { name: 'Watch', price: 100 },
      { name: 'Television', price: 900 },
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
