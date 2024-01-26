import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';
import { HttpExceptionFilter } from 'common/http-Exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Test'),
    TestModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
