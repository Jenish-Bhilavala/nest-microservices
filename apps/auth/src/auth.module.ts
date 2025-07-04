import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'apps/libs/config/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUser, AuthUserSchema } from 'apps/libs/config/schema/auth.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: AuthUser.name, schema: AuthUserSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
