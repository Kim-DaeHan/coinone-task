import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HttpExceptionFilter } from 'common/http-Exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
