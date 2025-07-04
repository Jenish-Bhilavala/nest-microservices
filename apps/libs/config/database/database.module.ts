import { Module } from '@nestjs/common';
import { mongoProvider } from './database.providers';

@Module({
  imports: [mongoProvider],
  exports: [mongoProvider],
})
export class DatabaseModule {}
