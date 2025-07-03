import { Controller, Get } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  getHello(): string {
    return this.catalogService.getHello();
  }

  @Get('products')
  @ApiOperation({
    summary: 'Product List',
    description: 'This will return list of products',
  })
  listOfProduct() {
    return this.catalogService.listOfProduct();
  }
}
