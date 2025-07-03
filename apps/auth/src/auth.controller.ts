import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: 'Health check' })
  getHello(): string {
    return this.authService.getHello();
  }

  @Get('listOfUsers')
  @ApiOperation({
    summary: 'Users List',
    description: 'This will return list of Users',
  })
  listOfProduct() {
    return this.authService.listOfUsers();
  }
}
