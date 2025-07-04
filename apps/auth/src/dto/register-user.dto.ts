import { ApiProperty } from '@nestjs/swagger';
import { Match } from 'apps/libs/config/constant/match.decorator';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'Jay',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: 'jay@gmail.com',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Jay@1234',
    type: 'string',
    format: 'string',
    required: false,
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#,-./:;<?\]^_`'])[A-Za-z\d@$!%*#+,-./:;<=^_`']{8,}$/,
    {
      message: 'Your password too weak',
    },
  )
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'Jay@1234',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @Match('password', { message: 'Your confirm Password is not match.' })
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty({
    example: 'user',
    enum: ['user', 'admin', 'vendor'],
    type: 'string',
    required: false,
  })
  @IsIn(['admin', 'vendor'])
  @IsOptional()
  role: string;
}
