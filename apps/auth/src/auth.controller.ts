import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';

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

  @Post('registration')
  @ApiOperation({
    summary: 'Registration List',
    description: 'This will return list of Users',
  })
  registration(@Body() dto: RegisterUserDto) {
    return this.authService.registration(dto);
  }
}
